import Link from 'next/link'
import { getVehicleTypes } from '@/lib/cosmic'
import BookingForm from '@/components/BookingForm'
import Header from '@/components/Header'
import VehicleCard from '@/components/VehicleCard'

export default async function HomePage() {
  const vehicleTypes = await getVehicleTypes()
  
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Fast & Reliable Delivery Service
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Book bikes, tempos, and trucks for all your delivery needs. Available 24/7 across the city.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/dashboard" className="btn btn-primary bg-white text-blue-600 hover:bg-gray-100">
                Go to Dashboard
              </Link>
              <Link href="#booking" className="btn bg-blue-700 text-white hover:bg-blue-800">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick pickup and delivery with real-time tracking</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Drivers</h3>
              <p className="text-gray-600">All drivers are background checked and trained</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
              <p className="text-gray-600">No hidden charges, pay only what you see</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Vehicle Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Fleet</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {vehicleTypes.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
          {vehicleTypes.length === 0 && (
            <p className="text-center text-gray-600">No vehicles available at the moment.</p>
          )}
        </div>
      </section>
      
      {/* Booking Form Section */}
      <section id="booking" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Book a Delivery</h2>
            <BookingForm vehicleTypes={vehicleTypes} />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Porter Clone. All rights reserved.</p>
          <div className="mt-4 flex gap-6 justify-center">
            <Link href="/dashboard" className="hover:text-blue-400">Dashboard</Link>
            <Link href="/support" className="hover:text-blue-400">Support</Link>
            <Link href="/about" className="hover:text-blue-400">About</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}