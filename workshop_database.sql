
-- Workshop Database Schema
-- This SQL script creates a database schema for an auto repair workshop management system

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS testimonials;
DROP TABLE IF EXISTS service_parts;
DROP TABLE IF EXISTS parts_inventory;
DROP TABLE IF EXISTS service_orders;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS vehicles;
DROP TABLE IF EXISTS users;

-- Users table (admin, mechanics, customers)
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'mechanic', 'customer')),
    phone VARCHAR(20),
    address TEXT,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicles table
CREATE TABLE vehicles (
    vehicle_id SERIAL PRIMARY KEY,
    owner_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    license_plate VARCHAR(20) UNIQUE NOT NULL,
    vin VARCHAR(50) UNIQUE,
    color VARCHAR(30),
    last_service_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table (service types available)
CREATE TABLE services (
    service_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    base_price DECIMAL(10, 2) NOT NULL,
    estimated_hours DECIMAL(4, 2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Service orders table
CREATE TABLE service_orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES users(user_id),
    vehicle_id INTEGER NOT NULL REFERENCES vehicles(vehicle_id),
    mechanic_id INTEGER REFERENCES users(user_id),
    service_date TIMESTAMP NOT NULL,
    completed_date TIMESTAMP,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
    diagnosis TEXT,
    total_cost DECIMAL(10, 2),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Parts inventory
CREATE TABLE parts_inventory (
    part_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    part_number VARCHAR(50) UNIQUE NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    min_quantity INTEGER DEFAULT 5,
    supplier VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Service parts (parts used in service orders)
CREATE TABLE service_parts (
    service_part_id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES service_orders(order_id) ON DELETE CASCADE,
    part_id INTEGER NOT NULL REFERENCES parts_inventory(part_id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials table
CREATE TABLE testimonials (
    testimonial_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100),
    content TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    avatar_url TEXT,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert admin user (password should be hashed in a real application)
INSERT INTO users (name, email, password, role, is_approved)
VALUES ('Admin', 'admin@bengkel.com', 'admin_password', 'admin', TRUE);

-- Insert sample services
INSERT INTO services (name, description, base_price, estimated_hours) VALUES
('Oil Change', 'Standard oil change with filter replacement', 50.00, 0.5),
('Brake Pad Replacement', 'Replace front or rear brake pads', 150.00, 1.5),
('Tire Rotation', 'Rotate tires to ensure even wear', 30.00, 0.5),
('Engine Tune-Up', 'Comprehensive engine tune-up service', 200.00, 2.0),
('Air Conditioning Service', 'A/C system check and recharge', 120.00, 1.0),
('Battery Replacement', 'Replace and install new battery', 85.00, 0.5),
('Alignment', 'Four-wheel alignment service', 90.00, 1.0),
('Transmission Fluid Change', 'Replace transmission fluid', 120.00, 1.0),
('Coolant Flush', 'Drain and replace engine coolant', 85.00, 1.0),
('Filter Replacement', 'Replace air and cabin filters', 40.00, 0.5);

-- Insert sample parts inventory
INSERT INTO parts_inventory (name, description, part_number, price, quantity, min_quantity, supplier) VALUES
('Oil Filter', 'Standard oil filter', 'OF-12345', 8.99, 50, 10, 'AutoParts Inc.'),
('Air Filter', 'Engine air filter', 'AF-54321', 12.99, 35, 8, 'FilterPro'),
('Brake Pads (Front)', 'Standard front brake pads', 'BP-FRONT-1', 45.99, 20, 5, 'BrakeMax'),
('Brake Pads (Rear)', 'Standard rear brake pads', 'BP-REAR-1', 39.99, 20, 5, 'BrakeMax'),
('Engine Oil (5W-30)', '5W-30 synthetic oil (1 quart)', 'OIL-5W30', 7.99, 100, 20, 'LubriTech'),
('Transmission Fluid', 'Automatic transmission fluid (1 quart)', 'TF-AUTO-1', 9.99, 40, 10, 'LubriTech'),
('Coolant', 'Engine coolant (1 gallon)', 'COOLANT-1', 15.99, 30, 8, 'AutoParts Inc.'),
('Cabin Filter', 'Standard cabin air filter', 'CF-AIR-1', 14.99, 25, 5, 'FilterPro'),
('Battery', '12V standard car battery', 'BAT-12V', 89.99, 15, 3, 'PowerCell'),
('Wiper Blades', 'Standard wiper blade set', 'WB-STANDARD', 24.99, 30, 8, 'VisibilityPro');

-- Insert sample testimonials
INSERT INTO testimonials (name, role, content, rating, is_approved) VALUES
('John Smith', 'Toyota Owner', 'OtoService saved me so much time and hassle. The mechanics were professional and I could track the progress of my repair in real-time.', 5, TRUE),
('Sarah Johnson', 'Honda Civic Owner', 'I love being able to book my service appointments online. The whole process is smooth and the staff are very friendly!', 5, TRUE),
('Michael Chen', 'BMW Owner', 'As someone who knows very little about cars, I appreciate how transparent the mechanics are about explaining what needs to be fixed.', 4, TRUE),
('Emma Wilson', 'Ford Owner', 'The workshop is always clean and the waiting area is comfortable. My car is always ready when promised.', 5, TRUE),
('David Rodriguez', 'Mazda Owner', 'Fair prices and great service. Will definitely come back for all my car maintenance needs.', 4, TRUE),
('Lisa Thompson', 'Nissan Owner', 'The mechanics here really know what they are doing. Fixed an issue that two other shops couldn''t figure out!', 5, TRUE);

-- Create indexes for better performance
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_vehicles_owner ON vehicles(owner_id);
CREATE INDEX idx_service_orders_status ON service_orders(status);
CREATE INDEX idx_service_orders_customer ON service_orders(customer_id);
CREATE INDEX idx_service_orders_mechanic ON service_orders(mechanic_id);
CREATE INDEX idx_testimonials_approved ON testimonials(is_approved);

-- Create views for common queries

-- View for active service orders with customer and vehicle info
CREATE VIEW active_service_orders AS
SELECT 
    so.order_id,
    u.name AS customer_name,
    u.email AS customer_email,
    u.phone AS customer_phone,
    v.make,
    v.model,
    v.year,
    v.license_plate,
    so.service_date,
    so.status,
    m.name AS mechanic_name
FROM 
    service_orders so
JOIN 
    users u ON so.customer_id = u.user_id
JOIN 
    vehicles v ON so.vehicle_id = v.vehicle_id
LEFT JOIN 
    users m ON so.mechanic_id = m.user_id
WHERE 
    so.status IN ('pending', 'in_progress');

-- View for mechanic performance
CREATE VIEW mechanic_performance AS
SELECT 
    u.user_id,
    u.name AS mechanic_name,
    COUNT(CASE WHEN so.status = 'completed' THEN 1 ELSE NULL END) AS completed_orders,
    COUNT(CASE WHEN so.status = 'in_progress' THEN 1 ELSE NULL END) AS in_progress_orders,
    COALESCE(AVG(EXTRACT(EPOCH FROM (so.completed_date - so.service_date)) / 3600), 0) AS avg_completion_hours
FROM 
    users u
LEFT JOIN 
    service_orders so ON u.user_id = so.mechanic_id
WHERE 
    u.role = 'mechanic'
GROUP BY 
    u.user_id, u.name;

-- View for approved testimonials
CREATE VIEW approved_testimonials AS
SELECT 
    testimonial_id,
    name,
    role,
    content,
    rating,
    avatar_url,
    created_at
FROM 
    testimonials
WHERE 
    is_approved = TRUE
ORDER BY 
    created_at DESC;
