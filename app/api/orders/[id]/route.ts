// app/api/orders/[id]/route.ts
import { NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const updateData: Record<string, any> = {}
    
    if (body.status) {
      updateData.status = body.status
    }
    
    if (body.driver) {
      updateData.driver = body.driver
    }
    
    if (body.payment_status) {
      updateData.payment_status = body.payment_status
    }
    
    await cosmic.objects.updateOne(id, {
      metadata: updateData
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update order' },
      { status: 500 }
    )
  }
}