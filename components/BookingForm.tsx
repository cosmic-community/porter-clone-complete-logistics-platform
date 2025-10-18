'use client'

import { useState } from 'react'
import { VehicleType } from '@/types'
import { useRouter } from 'next/navigation'

export default function BookingForm({ vehicleTypes }: { vehicleTypes: VehicleType[] }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    pickup_address: '',
    delivery_address: '',
    vehicle_type: '',
    payment_method: 'Cash',
    special_instructions: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const selectedVehicle = vehicleTypes.find(v => v.id === formData.vehicle_type)
      const estimatedPrice = selectedVehicle ? 
        (parseFloat(selectedVehicle.metadata?.base_price || '0') + 500).toString() : '500'
      
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          total_amount: estimatedPrice,
        }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        router.push('/dashboard')
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
    <form onSubmit={handleSubmit} className="card space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      
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
        <label className="label">Delivery Address *</label>
        <textarea
          className="input"
          rows={3}
          value={formData.delivery_address}
          onChange={(e) => setFormData({ ...formData, delivery_address: e.target.value })}
          required
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
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
                {vehicle.metadata?.vehicle_name || vehicle.title}
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
      
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? 'Creating Order...' : 'Book Now'}
      </button>
    </form>
  )
}