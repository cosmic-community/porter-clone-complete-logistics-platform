import Link from 'next/link'
import { getOrders } from '@/lib/cosmic'
import Header from '@/components/Header'
import OrdersTable from '@/components/OrdersTable'

export default async function OrdersPage() {
  const orders = await getOrders()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Orders</h1>
            <p className="text-gray-600">Manage and track all delivery orders</p>
          </div>
          <Link href="/orders/new" className="btn btn-primary">
            + New Order
          </Link>
        </div>
        
        <OrdersTable orders={orders} />
      </div>
    </div>
  )
}