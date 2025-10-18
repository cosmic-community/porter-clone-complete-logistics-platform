import { Driver } from '@/types'
import { getStatusColor } from '@/lib/utils'

export default function DriversGrid({ drivers }: { drivers: Driver[] }) {
  if (!drivers || drivers.length === 0) {
    return (
      <div className="card">
        <p className="text-gray-600 text-center py-8">No drivers found.</p>
      </div>
    )
  }
  
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {drivers.map((driver) => {
        const metadata = driver.metadata
        
        if (!metadata) {
          return null
        }
        
        return (
          <div key={driver.id} className="card">
            <div className="flex items-start gap-4 mb-4">
              {metadata.profile_photo ? (
                <img 
                  src={`${metadata.profile_photo.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
                  alt={metadata.full_name || driver.title}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
              
              <div className="flex-1">
                <h3 className="text-lg font-bold">{metadata.full_name || driver.title}</h3>
                <p className="text-sm text-gray-600">{metadata.phone_number || 'No phone'}</p>
              </div>
              
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(metadata.status || 'Offline')}`}>
                {metadata.status || 'Offline'}
              </span>
            </div>
            
            <div className="space-y-2 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Vehicle:</span>
                <span className="font-semibold">
                  {metadata.vehicle_type?.title || 'N/A'}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Vehicle #:</span>
                <span className="font-semibold">{metadata.vehicle_number || 'N/A'}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">License:</span>
                <span className="font-semibold">{metadata.license_number || 'N/A'}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Rating:</span>
                <span className="font-semibold">
                  ⭐ {metadata.rating || 'N/A'} / 5
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Deliveries:</span>
                <span className="font-semibold">{metadata.total_deliveries || '0'}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}