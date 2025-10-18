import { getSupportTickets } from '@/lib/cosmic'
import Header from '@/components/Header'
import SupportTickets from '@/components/SupportTickets'

export default async function SupportPage() {
  const tickets = await getSupportTickets()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Support</h1>
          <p className="text-gray-600">Manage support tickets and issues</p>
        </div>
        
        <SupportTickets tickets={tickets} />
      </div>
    </div>
  )
}