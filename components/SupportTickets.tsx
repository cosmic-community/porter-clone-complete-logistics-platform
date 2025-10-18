import { SupportTicket } from '@/types'
import { formatDateTime, getStatusColor } from '@/lib/utils'

export default function SupportTickets({ tickets }: { tickets: SupportTicket[] }) {
  if (!tickets || tickets.length === 0) {
    return (
      <div className="card">
        <p className="text-gray-600 text-center py-8">No support tickets found.</p>
      </div>
    )
  }
  
  return (
    <div className="card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Ticket #</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Issue Type</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Priority</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Created</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => {
              const metadata = ticket.metadata
              
              if (!metadata) {
                return null
              }
              
              return (
                <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">
                    {metadata.ticket_number || ticket.title}
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{metadata.customer_name || 'N/A'}</p>
                      <p className="text-sm text-gray-600">{metadata.customer_email || ''}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">{metadata.issue_type || 'N/A'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(metadata.priority || 'Low')}`}>
                      {metadata.priority || 'Low'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(metadata.status || 'Open')}`}>
                      {metadata.status || 'Open'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {formatDateTime(ticket.created_at || '')}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}