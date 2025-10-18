'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Order, OrderStatus } from '@/types'
import { formatDateTime, getStatusColor, formatCurrency } from '@/lib/utils'

export default function OrderDetails({ order }: { order: Order }) {
  const [updating, setUpdating] = useState(false)
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.metadata?.status || 'Pending')
  
  const metadata = order.metadata
  
  if (!metadata) {
    return <div className="card">No order details available.</div>
  }
  
  const handleStatusUpdate = async (newStatus: OrderStatus) => {
    setUpdating(true)
    
    try {
      const response = await fetch(`/api/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      
      if (response.ok) {
        setCurrentStatus(newStatus)
      }
    } catch (error) {
      console.error('Error updating status:', error)
    } finally {
      setUpdating(false)
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order {metadata.order_number || order.title}
          </h1>
          <p className="text-gray-600">Created on {formatDateTime(order.created_at || '')}</p>
        </div>
        <Link href="/orders" className="btn btn-secondary">
          ← Back to Orders
        </Link>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="font-semibold text-gray-700 mb-2">Status</h3>
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(currentStatus)}`}>
            {currentStatus}
          </span>
        </div>
        
        <div className="card">
          <h3 className="font-semibold text-gray-700 mb-2">Payment Status</h3>
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(metadata.payment_status || 'Pending')}`}>
            {metadata.payment_status || 'Pending'}
          </span>
        </div>
        
        <div className="card">
          <h3 className="font-semibold text-gray-700 mb-2">Total Amount</h3>
          <p className="text-2xl font-bold text-blue-600">
            {formatCurrency(metadata.total_amount || '0')}
          </p>
        </div>
      </div>
      
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Update Status</h2>
        <div className="flex flex-wrap gap-2">
          {(['Pending', 'Confirmed', 'Driver Assigned', 'In Transit', 'Delivered', 'Cancelled'] as OrderStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => handleStatusUpdate(status)}
              disabled={updating || currentStatus === status}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentStatus === status
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Customer Information</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-semibold">{metadata.customer_name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-semibold">{metadata.customer_phone || 'N/A'}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Payment Details</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Method</p>
              <p className="font-semibold">{metadata.payment_method || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="font-semibold">{metadata.payment_status || 'Pending'}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Pickup & Delivery</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Pickup Address</h3>
            <p className="text-gray-600">{metadata.pickup_address || 'N/A'}</p>
            {metadata.pickup_contact && (
              <p className="text-sm text-gray-500 mt-2">Contact: {metadata.pickup_contact}</p>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Delivery Address</h3>
            <p className="text-gray-600">{metadata.delivery_address || 'N/A'}</p>
            {metadata.delivery_contact && (
              <p className="text-sm text-gray-500 mt-2">Contact: {metadata.delivery_contact}</p>
            )}
          </div>
        </div>
      </div>
      
      {metadata.vehicle_type && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Vehicle Information</h2>
          <p className="text-lg font-semibold">{metadata.vehicle_type.title}</p>
        </div>
      )}
      
      {metadata.driver && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Driver Information</h2>
          <p className="text-lg font-semibold">{metadata.driver.title}</p>
        </div>
      )}
      
      {metadata.special_instructions && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Special Instructions</h2>
          <p className="text-gray-600">{metadata.special_instructions}</p>
        </div>
      )}
    </div>
  )
}