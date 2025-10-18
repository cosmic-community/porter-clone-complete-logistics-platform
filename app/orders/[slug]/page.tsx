// app/orders/[slug]/page.tsx
import { getOrderBySlug } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import OrderDetails from '@/components/OrderDetails'

export default async function OrderDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const order = await getOrderBySlug(slug)
  
  if (!order) {
    notFound()
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <OrderDetails order={order} />
      </div>
    </div>
  )
}