import { getOrders, getDrivers } from '@/lib/cosmic'
import Header from '@/components/Header'
import AnalyticsCharts from '@/components/AnalyticsCharts'

export default async function AnalyticsPage() {
  const [orders, drivers] = await Promise.all([
    getOrders(),
    getDrivers(),
  ])
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
          <p className="text-gray-600">Business insights and reports</p>
        </div>
        
        <AnalyticsCharts orders={orders} drivers={drivers} />
      </div>
    </div>
  )
}