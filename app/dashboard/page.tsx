import Link from 'next/link'
import { getOrders, getDrivers, getVehicleTypes } from '@/lib/cosmic'
import Header from '@/components/Header'
import DashboardStats from '@/components/DashboardStats'
import RecentOrders from '@/components/RecentOrders'

export default async function DashboardPage() {
  const [orders, drivers, vehicleTypes] = await Promise.all([
    getOrders(),
    getDrivers(),
    getVehicleTypes(),
  ])
  
  const activeOrders = orders.filter(order => 
    order.metadata?.status && !['Delivered', 'Cancelled'].includes(order.metadata.status)
  )
  
  const availableDrivers = drivers.filter(driver => 
    driver.metadata?.status === 'Available'
  )
  
  const todayRevenue = orders
    .filter(order => {
      const orderDate = new Date(order.created_at || '')
      const today = new Date()
      return orderDate.toDateString() === today.toDateString()
    })
    .reduce((sum, order) => {
      const amount = parseFloat(order.metadata?.total_amount || '0')
      return sum + amount
    }, 0)
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your logistics operations</p>
        </div>
        
        {/* Stats Overview */}
        <DashboardStats 
          activeOrders={activeOrders.length}
          availableDrivers={availableDrivers.length}
          totalOrders={orders.length}
          todayRevenue={todayRevenue}
        />
        
        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Link href="/orders/new" className="card hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">New Order</h3>
                <p className="text-sm text-gray-600">Create booking</p>
              </div>
            </div>
          </Link>
          
          <Link href="/orders" className="card hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">All Orders</h3>
                <p className="text-sm text-gray-600">View history</p>
              </div>
            </div>
          </Link>
          
          <Link href="/drivers" className="card hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Drivers</h3>
                <p className="text-sm text-gray-600">Manage fleet</p>
              </div>
            </div>
          </Link>
          
          <Link href="/analytics" className="card hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Analytics</h3>
                <p className="text-sm text-gray-600">View reports</p>
              </div>
            </div>
          </Link>
        </div>
        
        {/* Recent Orders */}
        <RecentOrders orders={orders.slice(0, 10)} />
      </div>
    </div>
  )
}