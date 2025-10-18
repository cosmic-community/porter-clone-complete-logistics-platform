import { Order, Driver } from '@/types'
import { formatCurrency } from '@/lib/utils'

export default function AnalyticsCharts({ 
  orders, 
  drivers 
}: { 
  orders: Order[]
  drivers: Driver[]
}) {
  // Calculate metrics
  const totalRevenue = orders.reduce((sum, order) => {
    const amount = parseFloat(order.metadata?.total_amount || '0')
    return sum + amount
  }, 0)
  
  const completedOrders = orders.filter(order => 
    order.metadata?.status === 'Delivered'
  )
  
  const cancelledOrders = orders.filter(order => 
    order.metadata?.status === 'Cancelled'
  )
  
  const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0
  
  const statusCounts = orders.reduce((acc, order) => {
    const status = order.metadata?.status || 'Pending'
    acc[status] = (acc[status] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const paymentMethodCounts = orders.reduce((acc, order) => {
    const method = order.metadata?.payment_method || 'Cash'
    acc[method] = (acc[method] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card">
          <h3 className="text-sm text-gray-600 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-blue-600">{formatCurrency(totalRevenue)}</p>
        </div>
        
        <div className="card">
          <h3 className="text-sm text-gray-600 mb-2">Completed Orders</h3>
          <p className="text-3xl font-bold text-green-600">{completedOrders.length}</p>
        </div>
        
        <div className="card">
          <h3 className="text-sm text-gray-600 mb-2">Cancelled Orders</h3>
          <p className="text-3xl font-bold text-red-600">{cancelledOrders.length}</p>
        </div>
        
        <div className="card">
          <h3 className="text-sm text-gray-600 mb-2">Avg Order Value</h3>
          <p className="text-3xl font-bold text-purple-600">{formatCurrency(averageOrderValue)}</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-6">Orders by Status</h2>
          <div className="space-y-4">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">{status}</span>
                  <span className="font-semibold">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(count / orders.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-bold mb-6">Payment Methods</h2>
          <div className="space-y-4">
            {Object.entries(paymentMethodCounts).map(([method, count]) => (
              <div key={method}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">{method}</span>
                  <span className="font-semibold">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(count / orders.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="card">
        <h2 className="text-xl font-bold mb-6">Driver Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Driver Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Total Deliveries</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">{driver.metadata?.full_name || driver.title}</td>
                  <td className="py-3 px-4">{driver.metadata?.status || 'N/A'}</td>
                  <td className="py-3 px-4">{driver.metadata?.total_deliveries || '0'}</td>
                  <td className="py-3 px-4">⭐ {driver.metadata?.rating || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}