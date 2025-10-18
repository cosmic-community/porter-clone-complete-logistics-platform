import { VehicleType } from '@/types'
import { formatCurrency } from '@/lib/utils'

export default function VehicleCard({ vehicle }: { vehicle: VehicleType }) {
  const metadata = vehicle.metadata
  
  if (!metadata) {
    return null
  }
  
  return (
    <div className="card hover:shadow-lg transition-shadow">
      {metadata.vehicle_icon && (
        <div className="mb-4">
          <img 
            src={`${metadata.vehicle_icon.imgix_url}?w=200&h=150&fit=crop&auto=format,compress`}
            alt={metadata.vehicle_name || vehicle.title}
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>
      )}
      
      <h3 className="text-xl font-bold mb-2">{metadata.vehicle_name || vehicle.title}</h3>
      
      {metadata.description && (
        <p className="text-gray-600 text-sm mb-4">{metadata.description}</p>
      )}
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Capacity:</span>
          <span className="font-semibold">{metadata.capacity_kg} kg</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Base Price:</span>
          <span className="font-semibold">{formatCurrency(metadata.base_price)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Per KM:</span>
          <span className="font-semibold">{formatCurrency(metadata.price_per_km)}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium ${metadata.available ? 'text-green-600' : 'text-red-600'}`}>
          {metadata.available ? '✓ Available' : '✗ Not Available'}
        </span>
      </div>
    </div>
  )
}