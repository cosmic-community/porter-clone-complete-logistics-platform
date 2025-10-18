import { createBucketClient } from '@cosmicjs/sdk'
import { Order, User } from '@/types'

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
    
    const orders = response.objects.sort((a: Order, b: Order) => {
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

// Fetch user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    console.log('Fetching user by email from Cosmic:', email)
    
    const response = await cosmic.objects
      .find({ 
        type: 'users',
        'metadata.email': email
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    console.log('Cosmic response:', response)
    
    if (response.objects && response.objects.length > 0) {
      console.log('User found in Cosmic:', response.objects[0].id)
      return response.objects[0] as User;
    }
    
    console.log('No user found in Cosmic for email:', email)
    return null;
  } catch (error) {
    console.error('Error fetching user by email:', error)
    
    if (hasStatus(error) && error.status === 404) {
      console.log('404 error - no users found in Cosmic')
      return null;
    }
    
    throw new Error(`Failed to fetch user: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Fetch user by ID
export async function getUserById(id: string) {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'users',
        id
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as User;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch user');
  }
}

// Create new user
export async function createUser(userData: {
  full_name: string;
  email: string;
  password_hash: string;
  phone_number?: string;
  role: 'Admin' | 'Customer' | 'Driver';
}) {
  try {
    console.log('Creating new user in Cosmic:', userData.email)
    
    const newUser = await cosmic.objects.insertOne({
      type: 'users',
      title: userData.full_name,
      metadata: {
        full_name: userData.full_name,
        email: userData.email,
        password_hash: userData.password_hash,
        phone_number: userData.phone_number || '',
        role: userData.role,
        is_active: true
      }
    });
    
    console.log('User created successfully:', newUser.object.id)
    
    return newUser.object as User;
  } catch (error) {
    console.error('Error creating user:', error)
    throw new Error(`Failed to create user: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}