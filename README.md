# Porter Clone - Complete Logistics & Delivery Platform

![App Preview](https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1200&h=300&fit=crop&auto=format)

A comprehensive logistics and delivery platform that replicates all core Porter functionalities including real-time booking, fleet management, driver tracking, dynamic pricing, payment processing, and customer support.

## Features

- 🚚 **Real-Time Booking System** - Instant delivery requests with automatic driver assignment
- 🚗 **Multi-Vehicle Fleet Management** - Bikes, tempos, trucks, and specialized vehicles
- 📍 **Live GPS Tracking** - Real-time location tracking and route optimization
- 💰 **Dynamic Pricing Engine** - Distance-based, time-based, and surge pricing
- 👨‍✈️ **Driver Management Portal** - Complete driver profiles, ratings, and earnings
- 💳 **Payment Integration** - Multiple payment methods with invoicing
- 🎯 **Route Optimization** - Intelligent routing for fastest deliveries
- 📊 **Analytics Dashboard** - Comprehensive business insights and reports
- 💬 **Customer Support** - Integrated ticket management and chat support
- 🔔 **Real-Time Notifications** - Push notifications for order updates
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🔐 **Secure Authentication** - Role-based access for customers, drivers, and admins

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68f3455431ae16149e6f0fcf&clone_repository=68f3485e776fdf504d0dc37a)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a app like porter which do all yhings in real porter app what they do everyhing will this clone will doo"

### Code Generation Prompt

> "Create a app like porter all things will functuon in this app just like in real app allyhing will present and work in this clone app"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic
- **SDK**: @cosmicjs/sdk v1.5.6
- **Runtime**: Bun
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Bun installed on your machine
- A Cosmic account and bucket
- Environment variables configured

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd porter-clone
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Delivery Orders
```typescript
import { cosmic } from '@/lib/cosmic'

const orders = await cosmic.objects
  .find({
    type: 'orders'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

return orders.objects
```

### Creating a New Booking
```typescript
const newOrder = await cosmic.objects.insertOne({
  type: 'orders',
  title: `Order #${Date.now()}`,
  metadata: {
    customer_name: 'John Doe',
    pickup_address: '123 Main St',
    delivery_address: '456 Oak Ave',
    vehicle_type: vehicleId,
    status: 'Pending',
    payment_method: 'Cash',
    total_amount: '500'
  }
})
```

### Updating Order Status
```typescript
await cosmic.objects.updateOne(orderId, {
  metadata: {
    status: 'In Transit'
  }
})
```

## Cosmic CMS Integration

This application uses Cosmic CMS to manage:

- **Vehicle Types** - Bikes, tempos, trucks with pricing and capacity
- **Delivery Orders** - Complete order management with status tracking
- **Driver Profiles** - Driver information, ratings, and availability
- **Service Areas** - Geographic coverage and pricing zones
- **Pricing Rules** - Base rates, distance charges, and surge pricing
- **Customer Data** - Customer profiles and order history
- **Support Tickets** - Customer support and issue tracking
- **Payment Records** - Transaction history and invoicing

All content is fetched dynamically from your Cosmic bucket, making it easy to update vehicles, pricing, service areas, and other business rules without code changes.

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the "Deploy" button above
2. Connect your GitHub repository
3. Add your environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Environment Variables

Make sure to set these in your deployment platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key
- `COSMIC_WRITE_KEY` - Your Cosmic write key (for creating/updating orders)

## Project Structure

```
porter-clone/
├── app/
│   ├── layout.tsx           # Root layout with global styles
│   ├── page.tsx             # Homepage with booking form
│   ├── dashboard/           # Main dashboard
│   ├── orders/              # Order management
│   ├── drivers/             # Driver management
│   ├── fleet/               # Vehicle fleet management
│   ├── analytics/           # Analytics and reports
│   ├── support/             # Customer support
│   └── api/                 # API routes
├── components/              # Reusable components
├── lib/                     # Utilities and Cosmic client
├── types.ts                 # TypeScript definitions
└── public/                  # Static assets
```

## License

MIT License - feel free to use this project for your own logistics platform!

<!-- README_END -->