
// Database connection utility
// In a production environment, you would use a proper database connection
// This is a simplified implementation for demonstration purposes

// Types based on our database schema
export interface User {
  user_id: number;
  name: string;
  email: string;
  role: 'admin' | 'mechanic' | 'customer';
  phone?: string;
  address?: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface Vehicle {
  vehicle_id: number;
  owner_id: number;
  make: string;
  model: string;
  year: number;
  license_plate: string;
  vin?: string;
  color?: string;
  last_service_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  service_id: number;
  name: string;
  description?: string;
  base_price: number;
  estimated_hours: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceOrder {
  order_id: number;
  customer_id: number;
  vehicle_id: number;
  mechanic_id?: number;
  service_date: string;
  completed_date?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  diagnosis?: string;
  total_cost?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Part {
  part_id: number;
  name: string;
  description?: string;
  part_number: string;
  price: number;
  quantity: number;
  min_quantity: number;
  supplier?: string;
  created_at: string;
  updated_at: string;
}

export interface ServicePart {
  service_part_id: number;
  order_id: number;
  part_id: number;
  quantity: number;
  unit_price: number;
  created_at: string;
}

export interface Testimonial {
  testimonial_id: number;
  user_id?: number;
  name: string;
  role?: string;
  content: string;
  rating: number;
  avatar_url?: string;
  is_approved: boolean;
  created_at: string;
}

// Mock database connection (simulate fetch from MySQL database)
// In a real implementation, replace this with actual MySQL connection
class DatabaseConnection {
  private static instance: DatabaseConnection;
  
  // Tables
  private users: User[] = [];
  private vehicles: Vehicle[] = [];
  private services: Service[] = [];
  private serviceOrders: ServiceOrder[] = [];
  private parts: Part[] = [];
  private serviceParts: ServicePart[] = [];
  private testimonials: Testimonial[] = [];
  
  private constructor() {
    this.loadInitialData();
  }
  
  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }
  
  // Load initial data from the SQL script (simulated)
  private loadInitialData() {
    // Users
    this.users = [
      {
        user_id: 1,
        name: 'Admin',
        email: 'admin@bengkel.com',
        role: 'admin',
        is_approved: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        user_id: 2,
        name: 'John Smith',
        email: 'john.smith@example.com',
        role: 'mechanic',
        is_approved: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        user_id: 3,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        role: 'mechanic',
        is_approved: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        user_id: 4,
        name: 'Mike Wilson',
        email: 'mike.wilson@example.com',
        role: 'mechanic',
        is_approved: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        user_id: 5,
        name: 'Lisa Brown',
        email: 'lisa.brown@example.com',
        role: 'mechanic',
        is_approved: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        user_id: 6,
        name: 'James Wilson',
        email: 'james.wilson@example.com',
        role: 'customer',
        phone: '+1 555-123-4567',
        is_approved: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        user_id: 7,
        name: 'Emma Thomas',
        email: 'emma.thomas@example.com',
        role: 'customer',
        phone: '+1 555-987-6543',
        is_approved: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    
    // Vehicles
    this.vehicles = [
      {
        vehicle_id: 1,
        owner_id: 6,
        make: 'Toyota',
        model: 'Avanza',
        year: 2020,
        license_plate: 'B 1234 XYZ',
        color: 'Silver',
        last_service_date: '2023-12-15',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        vehicle_id: 2,
        owner_id: 6,
        make: 'Honda',
        model: 'CR-V',
        year: 2019,
        license_plate: 'XYZ789',
        color: 'Blue',
        last_service_date: '2023-04-20',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        vehicle_id: 3,
        owner_id: 7,
        make: 'Honda',
        model: 'Jazz',
        year: 2018,
        license_plate: 'B 5678 ABC',
        color: 'Red',
        last_service_date: '2024-01-20',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    
    // Services
    this.services = [
      {
        service_id: 1,
        name: 'Oil Change',
        description: 'Standard oil change with filter replacement',
        base_price: 50.00,
        estimated_hours: 0.5,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        service_id: 2,
        name: 'Brake Pad Replacement',
        description: 'Replace front or rear brake pads',
        base_price: 150.00,
        estimated_hours: 1.5,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        service_id: 3,
        name: 'Tire Rotation',
        description: 'Rotate tires to ensure even wear',
        base_price: 30.00,
        estimated_hours: 0.5,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    
    // Service orders
    this.serviceOrders = [
      {
        order_id: 1,
        customer_id: 6,
        vehicle_id: 1,
        mechanic_id: 2,
        service_date: '2023-12-15T10:30:00',
        status: 'in_progress',
        notes: 'Customer reports engine noise',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        order_id: 2,
        customer_id: 7,
        vehicle_id: 3,
        mechanic_id: 3,
        service_date: '2023-06-16T09:15:00',
        status: 'pending',
        notes: 'Front brakes only',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        order_id: 3,
        customer_id: 6,
        vehicle_id: 2,
        mechanic_id: 2,
        service_date: '2023-06-17T14:00:00',
        completed_date: '2023-06-17T16:00:00',
        status: 'completed',
        notes: 'Annual maintenance',
        total_cost: 200.00,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    
    // Parts
    this.parts = [
      {
        part_id: 1,
        name: 'Oil Filter',
        description: 'Standard oil filter',
        part_number: 'OF-12345',
        price: 8.99,
        quantity: 50,
        min_quantity: 10,
        supplier: 'AutoParts Inc.',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        part_id: 2,
        name: 'Air Filter',
        description: 'Engine air filter',
        part_number: 'AF-54321',
        price: 12.99,
        quantity: 35,
        min_quantity: 8,
        supplier: 'FilterPro',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    
    // Service parts
    this.serviceParts = [
      {
        service_part_id: 1,
        order_id: 1,
        part_id: 1,
        quantity: 1,
        unit_price: 8.99,
        created_at: new Date().toISOString()
      }
    ];
    
    // Testimonials
    this.testimonials = [
      {
        testimonial_id: 1,
        name: 'John Smith',
        role: 'Toyota Owner',
        content: 'OtoService saved me so much time and hassle. The mechanics were professional and I could track the progress of my repair in real-time.',
        rating: 5,
        is_approved: true,
        created_at: new Date().toISOString()
      },
      {
        testimonial_id: 2,
        name: 'Sarah Johnson',
        role: 'Honda Civic Owner',
        content: 'I love being able to book my service appointments online. The whole process is smooth and the staff are very friendly!',
        rating: 5,
        is_approved: true,
        created_at: new Date().toISOString()
      },
      {
        testimonial_id: 3,
        name: 'Michael Chen',
        role: 'BMW Owner',
        content: 'As someone who knows very little about cars, I appreciate how transparent the mechanics are about explaining what needs to be fixed.',
        rating: 4,
        is_approved: true,
        created_at: new Date().toISOString()
      },
      {
        testimonial_id: 4,
        name: 'Emma Wilson',
        role: 'Ford Owner',
        content: 'The workshop is always clean and the waiting area is comfortable. My car is always ready when promised.',
        rating: 5,
        is_approved: true,
        created_at: new Date().toISOString()
      }
    ];
  }
  
  // Database operations
  
  // Users
  public async getUsers(): Promise<User[]> {
    return this.users;
  }
  
  public async getUserById(id: number): Promise<User | undefined> {
    return this.users.find(u => u.user_id === id);
  }
  
  public async getUsersByRole(role: string): Promise<User[]> {
    return this.users.filter(u => u.role === role);
  }
  
  public async updateUserStatus(id: number, status: boolean): Promise<boolean> {
    const index = this.users.findIndex(u => u.user_id === id);
    if (index !== -1) {
      this.users[index].is_approved = status;
      this.users[index].updated_at = new Date().toISOString();
      return true;
    }
    return false;
  }
  
  public async addUser(user: Omit<User, 'user_id' | 'created_at' | 'updated_at'>): Promise<User> {
    const newUser: User = {
      ...user,
      user_id: this.users.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.users.push(newUser);
    return newUser;
  }
  
  // Vehicles
  public async getVehicles(): Promise<Vehicle[]> {
    return this.vehicles;
  }
  
  public async getVehiclesByOwner(ownerId: number): Promise<Vehicle[]> {
    return this.vehicles.filter(v => v.owner_id === ownerId);
  }
  
  public async getVehicleById(id: number): Promise<Vehicle | undefined> {
    return this.vehicles.find(v => v.vehicle_id === id);
  }
  
  // Services
  public async getServices(): Promise<Service[]> {
    return this.services.filter(s => s.is_active);
  }
  
  public async getServiceById(id: number): Promise<Service | undefined> {
    return this.services.find(s => s.service_id === id);
  }
  
  // Service Orders
  public async getServiceOrders(): Promise<ServiceOrder[]> {
    return this.serviceOrders;
  }
  
  public async getServiceOrderById(id: number): Promise<ServiceOrder | undefined> {
    return this.serviceOrders.find(o => o.order_id === id);
  }
  
  public async getServiceOrdersByCustomer(customerId: number): Promise<ServiceOrder[]> {
    return this.serviceOrders.filter(o => o.customer_id === customerId);
  }
  
  public async getServiceOrdersByMechanic(mechanicId: number): Promise<ServiceOrder[]> {
    return this.serviceOrders.filter(o => o.mechanic_id === mechanicId);
  }
  
  public async updateServiceOrderStatus(id: number, status: ServiceOrder['status']): Promise<boolean> {
    const index = this.serviceOrders.findIndex(o => o.order_id === id);
    if (index !== -1) {
      this.serviceOrders[index].status = status;
      this.serviceOrders[index].updated_at = new Date().toISOString();
      
      if (status === 'completed') {
        this.serviceOrders[index].completed_date = new Date().toISOString();
      }
      
      return true;
    }
    return false;
  }
  
  // Parts
  public async getParts(): Promise<Part[]> {
    return this.parts;
  }
  
  public async getPartById(id: number): Promise<Part | undefined> {
    return this.parts.find(p => p.part_id === id);
  }
  
  // Service Parts
  public async getServicePartsByOrder(orderId: number): Promise<ServicePart[]> {
    return this.serviceParts.filter(sp => sp.order_id === orderId);
  }
  
  // Testimonials
  public async getTestimonials(approvedOnly: boolean = true): Promise<Testimonial[]> {
    return approvedOnly 
      ? this.testimonials.filter(t => t.is_approved)
      : this.testimonials;
  }
  
  public async addTestimonial(testimonial: Omit<Testimonial, 'testimonial_id' | 'created_at'>): Promise<Testimonial> {
    const newTestimonial: Testimonial = {
      ...testimonial,
      testimonial_id: this.testimonials.length + 1,
      created_at: new Date().toISOString()
    };
    this.testimonials.push(newTestimonial);
    return newTestimonial;
  }
  
  public async updateTestimonialApproval(id: number, isApproved: boolean): Promise<boolean> {
    const index = this.testimonials.findIndex(t => t.testimonial_id === id);
    if (index !== -1) {
      this.testimonials[index].is_approved = isApproved;
      return true;
    }
    return false;
  }
}

// Export singleton database instance
export const db = DatabaseConnection.getInstance();
