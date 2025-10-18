import { getVehicleTypes } from '@/lib/cosmic'
import Header from '@/components/Header'
import NewOrderForm from '@/components/NewOrderForm'

export default async function NewOrderPage() {
  const vehicleTypes = await getVehicleTypes()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Order</h1>
            <p className="text-gray-600">Fill in the details to book a delivery</p>
          </div>
          
          <NewOrderForm vehicleTypes={vehicleTypes} />
        </div>
      </div>
    </div>
  )
}