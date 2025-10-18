import Header from '@/components/Header'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Porter Clone</h1>
          
          <div className="prose prose-lg">
            <p className="text-gray-700 mb-6">
              Porter Clone is a comprehensive logistics and delivery platform built with Next.js and Cosmic CMS. 
              This application demonstrates a complete implementation of modern logistics management features.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Features</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Real-time order booking and management</li>
              <li>Multi-vehicle fleet support (bikes, tempos, trucks)</li>
              <li>Driver management and tracking</li>
              <li>Dynamic pricing based on vehicle type and distance</li>
              <li>Payment processing and invoicing</li>
              <li>Customer support ticket system</li>
              <li>Analytics and business insights</li>
              <li>Responsive design for all devices</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Technology Stack</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Next.js 15 with App Router</li>
              <li>TypeScript for type safety</li>
              <li>Tailwind CSS for styling</li>
              <li>Cosmic CMS for content management</li>
              <li>Bun for fast package management</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Use Cases</h2>
            <p className="text-gray-700 mb-6">
              This platform is perfect for logistics companies, delivery services, courier businesses, 
              or anyone looking to build an on-demand delivery application. The flexible content model 
              allows for easy customization to fit your specific business needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}