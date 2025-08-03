import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Get current date and calculate previous period dates
    const now = new Date()
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)

    // For better debugging, let's also get all-time stats
    const allTimeRevenue = await prisma.order.aggregate({
      where: {
        paymentStatus: 'PAID'
      },
      _sum: {
        total: true,
      }
    })

    // Revenue calculation - current month
    const currentRevenue = await prisma.order.aggregate({
      where: {
        paymentStatus: 'PAID',
        createdAt: {
          gte: currentMonthStart,
        }
      },
      _sum: {
        total: true,
      }
    })

    // If no current month data, use all-time data for better display
    const currentRevenueValue = parseFloat(currentRevenue._sum.total?.toString() || '0')
    const allTimeRevenueValue = parseFloat(allTimeRevenue._sum.total?.toString() || '0')

    const lastMonthRevenue = await prisma.order.aggregate({
      where: {
        paymentStatus: 'PAID',
        createdAt: {
          gte: lastMonthStart,
          lte: lastMonthEnd,
        }
      },
      _sum: {
        total: true,
      }
    })

    // Orders calculation
    const allTimeOrders = await prisma.order.count()
    
    const currentOrders = await prisma.order.count({
      where: {
        createdAt: {
          gte: currentMonthStart,
        }
      }
    })

    const lastMonthOrders = await prisma.order.count({
      where: {
        createdAt: {
          gte: lastMonthStart,
          lte: lastMonthEnd,
        }
      }
    })

    // Customers calculation (unique emails)
    const currentCustomers = await prisma.order.groupBy({
      by: ['email'],
      where: {
        createdAt: {
          gte: currentMonthStart,
        }
      }
    })

    const lastMonthCustomers = await prisma.order.groupBy({
      by: ['email'],
      where: {
        createdAt: {
          gte: lastMonthStart,
          lte: lastMonthEnd,
        }
      }
    })

    // Top products
    const topProductsData = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
        total: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        }
      },
      take: 5,
    })

    const productIds = topProductsData.map(item => item.productId)
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        }
      },
      select: {
        id: true,
        name: true,
      }
    })

    const topProducts = topProductsData.map(item => {
      const product = products.find(p => p.id === item.productId)
      return {
        name: product?.name || 'Unknown Product',
        sales: item._sum.quantity || 0,
        revenue: parseFloat(item._sum.total?.toString() || '0'),
      }
    })

    // Sales by month (last 6 months)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const salesByMonth = await prisma.order.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: sixMonthsAgo,
        },
        paymentStatus: 'PAID',
      },
      _sum: {
        total: true,
      },
      _count: {
        id: true,
      }
    })

    // Group by month
    const monthlyData: { [key: string]: { revenue: number; orders: number } } = {}
    salesByMonth.forEach(item => {
      const month = item.createdAt.toISOString().substring(0, 7) // YYYY-MM
      if (!monthlyData[month]) {
        monthlyData[month] = { revenue: 0, orders: 0 }
      }
      monthlyData[month].revenue += parseFloat(item._sum.total?.toString() || '0')
      monthlyData[month].orders += item._count.id
    })

    const salesByMonthArray = Object.entries(monthlyData).map(([month, data]) => ({
      month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      revenue: data.revenue,
      orders: data.orders,
    }))

    // Calculate growth percentages  
    const lastMonthRevenueValue = parseFloat(lastMonthRevenue._sum.total?.toString() || '0')
    
    // Use all-time data if current month is empty (better UX for new/testing sites)
    const displayRevenue = currentRevenueValue > 0 ? currentRevenueValue : allTimeRevenueValue
    const displayOrders = currentOrders > 0 ? currentOrders : allTimeOrders
    
    const revenueGrowth = lastMonthRevenueValue > 0 
      ? ((displayRevenue - lastMonthRevenueValue) / lastMonthRevenueValue) * 100 
      : 0

    const ordersGrowth = lastMonthOrders > 0 
      ? ((displayOrders - lastMonthOrders) / lastMonthOrders) * 100 
      : 0

    const customersGrowth = lastMonthCustomers.length > 0 
      ? ((currentCustomers.length - lastMonthCustomers.length) / lastMonthCustomers.length) * 100 
      : 0

    const currentAOV = displayOrders > 0 ? displayRevenue / displayOrders : 0
    const lastMonthAOV = lastMonthOrders > 0 ? lastMonthRevenueValue / lastMonthOrders : 0
    const aovGrowth = lastMonthAOV > 0 ? ((currentAOV - lastMonthAOV) / lastMonthAOV) * 100 : 0

    const analytics = {
      revenue: {
        current: displayRevenue,
        previous: lastMonthRevenueValue,
        growth: Math.round(revenueGrowth * 100) / 100,
      },
      orders: {
        current: displayOrders,
        previous: lastMonthOrders,
        growth: Math.round(ordersGrowth * 100) / 100,
      },
      customers: {
        current: currentCustomers.length,
        previous: lastMonthCustomers.length,
        growth: Math.round(customersGrowth * 100) / 100,
      },
      averageOrderValue: {
        current: Math.round(currentAOV * 100) / 100,
        previous: Math.round(lastMonthAOV * 100) / 100,
        growth: Math.round(aovGrowth * 100) / 100,
      },
      topProducts,
      salesByMonth: salesByMonthArray,
      salesByCategory: [], // Will implement if categories are needed
      customerLocations: [], // Will implement if needed
    }

    const analyticsResponse = NextResponse.json(analytics)
    analyticsResponse.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    analyticsResponse.headers.set('Pragma', 'no-cache')
    analyticsResponse.headers.set('Expires', '0')
    return analyticsResponse

  } catch (error) {
    console.error('Analytics fetch error:', error)
    
    // Return empty analytics data
    const emptyAnalytics = {
      revenue: {
        current: 0,
        previous: 0,
        growth: 0,
      },
      orders: {
        current: 0,
        previous: 0,
        growth: 0,
      },
      customers: {
        current: 0,
        previous: 0,
        growth: 0,
      },
      averageOrderValue: {
        current: 0,
        previous: 0,
        growth: 0,
      },
      topProducts: [],
      salesByMonth: [],
      salesByCategory: [],
      customerLocations: [],
    }

    const emptyResponse = NextResponse.json(emptyAnalytics)
    emptyResponse.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    emptyResponse.headers.set('Pragma', 'no-cache')
    emptyResponse.headers.set('Expires', '0')
    return emptyResponse
  }
}