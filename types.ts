// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Vehicle Type
export interface VehicleType extends CosmicObject {
  type: 'vehicle-types';
  metadata: {
    vehicle_name: string;
    capacity_kg: string;
    base_price: string;
    price_per_km: string;
    vehicle_icon?: {
      url: string;
      imgix_url: string;
    };
    description?: string;
    available: boolean;
  };
}

// Delivery Order
export interface Order extends CosmicObject {
  type: 'orders';
  metadata: {
    order_number: string;
    customer_name: string;
    customer_phone: string;
    pickup_address: string;
    pickup_lat?: string;
    pickup_lng?: string;
    delivery_address: string;
    delivery_lat?: string;
    delivery_lng?: string;
    vehicle_type?: VehicleType;
    driver?: Driver;
    status: OrderStatus;
    distance_km?: string;
    estimated_time?: string;
    total_amount: string;
    payment_method: PaymentMethod;
    payment_status: PaymentStatus;
    special_instructions?: string;
    pickup_contact?: string;
    delivery_contact?: string;
  };
}

// Driver Profile
export interface Driver extends CosmicObject {
  type: 'drivers';
  metadata: {
    full_name: string;
    phone_number: string;
    license_number: string;
    vehicle_type?: VehicleType;
    vehicle_number: string;
    rating: string;
    total_deliveries: string;
    status: DriverStatus;
    current_location_lat?: string;
    current_location_lng?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    earnings_total?: string;
  };
}

// Service Area
export interface ServiceArea extends CosmicObject {
  type: 'service-areas';
  metadata: {
    area_name: string;
    city: string;
    state: string;
    pincode: string;
    is_active: boolean;
    surge_multiplier?: string;
  };
}

// Pricing Rule
export interface PricingRule extends CosmicObject {
  type: 'pricing-rules';
  metadata: {
    rule_name: string;
    vehicle_type?: VehicleType;
    base_fare: string;
    per_km_charge: string;
    per_minute_charge?: string;
    minimum_fare: string;
    maximum_fare?: string;
    surge_enabled: boolean;
    surge_multiplier?: string;
  };
}

// Support Ticket
export interface SupportTicket extends CosmicObject {
  type: 'support-tickets';
  metadata: {
    ticket_number: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    order_id?: Order;
    issue_type: IssueType;
    priority: Priority;
    status: TicketStatus;
    description: string;
    resolution?: string;
    assigned_to?: string;
  };
}

// Payment Record
export interface PaymentRecord extends CosmicObject {
  type: 'payment-records';
  metadata: {
    transaction_id: string;
    order_id?: Order;
    amount: string;
    payment_method: PaymentMethod;
    payment_status: PaymentStatus;
    payment_date: string;
  };
}

// Type literals for select-dropdown values
export type OrderStatus = 'Pending' | 'Confirmed' | 'Driver Assigned' | 'In Transit' | 'Delivered' | 'Cancelled';
export type PaymentMethod = 'Cash' | 'Card' | 'UPI' | 'Wallet' | 'Net Banking';
export type PaymentStatus = 'Pending' | 'Completed' | 'Failed' | 'Refunded';
export type DriverStatus = 'Available' | 'On Trip' | 'Offline';
export type IssueType = 'Payment Issue' | 'Driver Issue' | 'Delivery Issue' | 'App Issue' | 'Other';
export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isOrder(obj: CosmicObject): obj is Order {
  return obj.type === 'orders';
}

export function isDriver(obj: CosmicObject): obj is Driver {
  return obj.type === 'drivers';
}

export function isVehicleType(obj: CosmicObject): obj is VehicleType {
  return obj.type === 'vehicle-types';
}

// Utility types
export type CreateOrderData = Omit<Order, 'id' | 'created_at' | 'modified_at'>;