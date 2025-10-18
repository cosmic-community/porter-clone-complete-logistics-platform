import Link from 'next/link'
import { getSession } from '@/lib/auth'

export default async function Header() {
  const session = await getSession()

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
            {session?.role === 'Admin' && (
              <Link href="/admin" className="text-gray-700 hover:text-blue-600 font-medium">
                Admin
              </Link>
            )}
          </nav>
          
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <span className="text-gray-700 hidden md:inline">{session.name}</span>
                <form action="/api/auth/logout" method="POST">
                  <button className="text-gray-700 hover:text-blue-600">
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <Link href="/login" className="btn btn-primary text-sm">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}