import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Get all orders for debugging
    const allOrders = await prisma.order.findMany({
      select: {
        id: true,
        orderNumber: true,
        email: true,
        status: true,
        paymentStatus: true,
        total: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Get count by payment status
    const statusCounts = await prisma.order.groupBy({
      by: ['paymentStatus'],
      _count: {
        paymentStatus: true
      }
    })

    // Get paid orders specifically
    const paidOrders = await prisma.order.findMany({
      where: {
        paymentStatus: 'PAID'
      },
      select: {
        id: true,
        orderNumber: true,
        total: true,
        createdAt: true,
      }
    })

    return NextResponse.json({
      success: true,
      debug: {
        totalOrders: allOrders.length,
        allOrders: allOrders,
        statusCounts: statusCounts,
        paidOrders: paidOrders,
        paidOrdersCount: paidOrders.length,
        totalPaidRevenue: paidOrders.reduce((sum, order) => sum + parseFloat(order.total.toString()), 0)
      }
    })

  } catch (error) {
    console.error('Debug orders error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      debug: {
        message: 'Database connection failed or orders table does not exist'
      }
    })
  }
}