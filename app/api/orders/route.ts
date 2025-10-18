import { NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'
import { generateOrderNumber } from '@/lib/utils'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const orderNumber = generateOrderNumber()
    
    const newOrder = await cosmic.objects.insertOne({
      type: 'orders',
      title: `Order ${orderNumber}`,
      metadata: {
        order_number: orderNumber,
        customer_name: body.customer_name || '',
        customer_phone: body.customer_phone || '',
        pickup_address: body.pickup_address || '',
        delivery_address: body.delivery_address || '',
        vehicle_type: body.vehicle_type || '',
        status: 'Pending',
        payment_method: body.payment_method || 'Cash',
        payment_status: 'Pending',
        total_amount: body.total_amount || '0',
        special_instructions: body.special_instructions || '',
      }
    })
    
    return NextResponse.json({ success: true, order: newOrder.object })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    )
  }
}