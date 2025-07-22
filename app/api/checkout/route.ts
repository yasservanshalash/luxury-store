import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const {
      items,
      customer_info,
      shipping_address,
      shipping_amount,
      tax_amount,
    } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items provided' },
        { status: 400 }
      )
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items,
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/checkout?cancelled=true`,
      customer_email: customer_info.email,
      shipping_address_collection: {
        allowed_countries: ['LB', 'AE', 'SA', 'JO', 'TR', 'CY', 'QA', 'KW', 'BH', 'OM', 'EG', 'US', 'CA', 'GB', 'FR', 'DE', 'AU'],
      },
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: shipping_amount,
              currency: 'usd',
            },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 3,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
      ],
      automatic_tax: {
        enabled: false,
      },
      metadata: {
        customer_name: customer_info.name,
        customer_phone: customer_info.phone,
        shipping_address: JSON.stringify(shipping_address.address),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 