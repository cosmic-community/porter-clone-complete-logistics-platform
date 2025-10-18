'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { VehicleType } from '@/types'
import { formatCurrency } from '@/lib/utils'

export default function NewOrderForm({ vehicleTypes }: { vehicleTypes: VehicleType[] }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    pickup_address: '',
    delivery_address: '',
    vehicle_type: '',
    payment_method: 'Cash',
    special_instructions: '',
    pickup_contact: '',
    delivery_contact: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const selectedVehicle = vehicleTypes.find(v => v.id === formData.vehicle_type)
  const estimatedPrice = selectedVehicle ? 
    parseFloat(selectedVehicle.metadata?.base_price || '0') + 500 : 0
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          total_amount: estimatedPrice.toString(),
        }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        router.push('/orders')
      } else {
        setError('Failed to create order. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-bold mb-6">Customer Information</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="label">Customer Name *</label>
            <input
              type="text"
              className="input"
              value={formData.customer_name}
              onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="label">Phone Number *</label>
            <input
              type="tel"
              className="input"
              value={formData.customer_phone}
              onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
              required
            />
          </div>
        </div>
      </div>
      
      <div className="card">
        <h2 className="text-xl font-bold mb-6">Pickup & Delivery Details</h2>
        
        <div className="space-y-6">
          <div>
            <label className="label">Pickup Address *</label>
            <textarea
              className="input"
              rows={3}
              value={formData.pickup_address}
              onChange={(e) => setFormData({ ...formData, pickup_address: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="label">Pickup Contact Person</label>
            <input
              type="text"
              className="input"
              value={formData.pickup_contact}
              onChange={(e) => setFormData({ ...formData, pickup_contact: e.target.value })}
              placeholder="Optional"
            />
          </div>
          
          <div>
            <label className="label">Delivery Address *</label>
            <textarea
              className="input"
              rows={3}
              value={formData.delivery_address}
              onChange={(e) => setFormData({ ...formData, delivery_address: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="label">Delivery Contact Person</label>
            <input
              type="text"
              className="input"
              value={formData.delivery_contact}
              onChange={(e) => setFormData({ ...formData, delivery_contact: e.target.value })}
              placeholder="Optional"
            />
          </div>
        </div>
      </div>
      
      <div className="card">
        <h2 className="text-xl font-bold mb-6">Service Details</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="label">Vehicle Type *</label>
            <select
              className="input"
              value={formData.vehicle_type}
              onChange={(e) => setFormData({ ...formData, vehicle_type: e.target.value })}
              required
            >
              <option value="">Select vehicle</option>
              {vehicleTypes.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.metadata?.vehicle_name || vehicle.title} - {formatCurrency(vehicle.metadata?.base_price || '0')}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="label">Payment Method</label>
            <select
              className="input"
              value={formData.payment_method}
              onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="UPI">UPI</option>
              <option value="Wallet">Wallet</option>
              <option value="Net Banking">Net Banking</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="label">Special Instructions</label>
          <textarea
            className="input"
            rows={3}
            value={formData.special_instructions}
            onChange={(e) => setFormData({ ...formData, special_instructions: e.target.value })}
            placeholder="Any special delivery instructions..."
          />
        </div>
        
        {selectedVehicle && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Estimated Total:</span>
              <span className="text-2xl font-bold text-blue-600">
                {formatCurrency(estimatedPrice)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Base price: {formatCurrency(selectedVehicle.metadata?.base_price || '0')} + 
              Estimated distance charges
            </p>
          </div>
        )}
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn btn-secondary flex-1"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary flex-1"
          disabled={loading}
        >
          {loading ? 'Creating Order...' : 'Create Order'}
        </button>
      </div>
    </form>
  )
}