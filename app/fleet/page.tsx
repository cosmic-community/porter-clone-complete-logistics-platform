import { getVehicleTypes } from '@/lib/cosmic'
import Header from '@/components/Header'
import VehicleCard from '@/components/VehicleCard'

export default async function FleetPage() {
  const vehicleTypes = await getVehicleTypes()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fleet Management</h1>
          <p className="text-gray-600">Manage your vehicle types and pricing</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {vehicleTypes.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
        
        {vehicleTypes.length === 0 && (
          <div className="card text-center py-12">
            <p className="text-gray-600">No vehicle types configured yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}