import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl">
              P
            </div>
            <span className="font-bold text-xl text-gray-900">Porter Clone</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
              Dashboard
            </Link>
            <Link href="/orders" className="text-gray-700 hover:text-blue-600 font-medium">
              Orders
            </Link>
            <Link href="/drivers" className="text-gray-700 hover:text-blue-600 font-medium">
              Drivers
            </Link>
            <Link href="/analytics" className="text-gray-700 hover:text-blue-600 font-medium">
              Analytics
            </Link>
            <Link href="/support" className="text-gray-700 hover:text-blue-600 font-medium">
              Support
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <button className="text-gray-700 hover:text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <Link href="/orders/new" className="btn btn-primary text-sm">
              New Order
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}