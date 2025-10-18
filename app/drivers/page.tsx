import { getDrivers } from '@/lib/cosmic'
import Header from '@/components/Header'
import DriversGrid from '@/components/DriversGrid'

export default async function DriversPage() {
  const drivers = await getDrivers()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Drivers</h1>
          <p className="text-gray-600">Manage your delivery fleet</p>
        </div>
        
        <DriversGrid drivers={drivers} />
      </div>
    </div>
  )
}