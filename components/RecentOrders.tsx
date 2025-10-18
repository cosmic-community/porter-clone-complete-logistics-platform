import Link from 'next/link'
import { Order } from '@/types'
import { formatDateTime, getStatusColor, formatCurrency } from '@/lib/utils'

export default function RecentOrders({ orders }: { orders: Order[] }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <p className="text-gray-600">No orders yet.</p>
      </div>
    )
  }
  
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Recent Orders</h2>
        <Link href="/orders" className="text-blue-600 hover:text-blue-700 font-medium">
          View All →
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Order #</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <Link href={`/orders/${order.slug}`} className="text-blue-600 hover:underline font-medium">
                    {order.metadata?.order_number || order.title}
                  </Link>
                </td>
                <td className="py-3 px-4">{order.metadata?.customer_name || 'N/A'}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.metadata?.status || 'Pending')}`}>
                    {order.metadata?.status || 'Pending'}
                  </span>
                </td>
                <td className="py-3 px-4 font-semibold">
                  {formatCurrency(order.metadata?.total_amount || '0')}
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {formatDateTime(order.created_at || '')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}