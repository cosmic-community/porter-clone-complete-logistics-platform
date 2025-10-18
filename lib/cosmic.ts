import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all vehicle types
export async function getVehicleTypes() {
  try {
    const response = await cosmic.objects
      .find({ type: 'vehicle-types' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch vehicle types');
  }
}

// Fetch all orders
export async function getOrders() {
  try {
    const response = await cosmic.objects
      .find({ type: 'orders' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    const orders = response.objects.sort((a, b) => {
      const dateA = new Date(a.created_at || '').getTime();
      const dateB = new Date(b.created_at || '').getTime();
      return dateB - dateA;
    });
    
    return orders;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch orders');
  }
}

// Fetch single order by slug
export async function getOrderBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'orders', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch order');
  }
}

// Fetch all drivers
export async function getDrivers() {
  try {
    const response = await cosmic.objects
      .find({ type: 'drivers' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch drivers');
  }
}

// Fetch available drivers
export async function getAvailableDrivers() {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'drivers',
        'metadata.status': 'Available'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch available drivers');
  }
}

// Fetch support tickets
export async function getSupportTickets() {
  try {
    const response = await cosmic.objects
      .find({ type: 'support-tickets' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch support tickets');
  }
}

// Fetch service areas
export async function getServiceAreas() {
  try {
    const response = await cosmic.objects
      .find({ type: 'service-areas' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch service areas');
  }
}