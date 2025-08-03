import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    
    // Get customer data from orders
    const orderData = await prisma.order.findMany({
      where: search ? {
        OR: [
          { email: { contains: search, mode: 'insensitive' } },
        ]
      } : {},
      select: {
        id: true,
        email: true,
        total: true,
        status: true,
        paymentStatus: true,
        createdAt: true,
        billingAddress: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Group by email to get customer statistics
    const customerMap = new Map()
    
    orderData.forEach(order => {
      const email = order.email
      
      if (!customerMap.has(email)) {
        const billingAddress = order.billingAddress as any
        customerMap.set(email, {
          email,
          name: billingAddress?.firstName && billingAddress?.lastName 
            ? `${billingAddress.firstName} ${billingAddress.lastName}` 
            : 'Guest Customer',
          phone: billingAddress?.phone || '',
          totalOrders: 0,
          totalSpent: 0,
          firstOrder: order.createdAt,
          lastOrder: order.createdAt,
          status: 'active',
        })
      }
      
      const customer = customerMap.get(email)
      customer.totalOrders += 1
      customer.totalSpent += parseFloat(order.total.toString())
      
      // Update last order date
      if (order.createdAt > customer.lastOrder) {
        customer.lastOrder = order.createdAt
      }
      
      // Update first order date
      if (order.createdAt < customer.firstOrder) {
        customer.firstOrder = order.createdAt
      }
    })

    const customers = Array.from(customerMap.values()).map(customer => ({
      ...customer,
      id: customer.email, // Use email as ID
      totalSpent: Math.round(customer.totalSpent * 100) / 100,
      firstOrder: customer.firstOrder.toISOString(),
      lastOrder: customer.lastOrder.toISOString(),
      averageOrderValue: customer.totalOrders > 0 
        ? Math.round((customer.totalSpent / customer.totalOrders) * 100) / 100 
        : 0,
    }))

    // Sort by total spent (highest first)
    customers.sort((a, b) => b.totalSpent - a.totalSpent)

    return NextResponse.json({
      customers,
      total: customers.length,
    })

  } catch (error) {
    console.error('Customers fetch error:', error)
    
    return NextResponse.json({
      customers: [],
      total: 0,
    })
  }
}