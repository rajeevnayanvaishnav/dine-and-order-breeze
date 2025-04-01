
-- Dine and Order Database Schema

-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_admin BOOLEAN DEFAULT FALSE
);

-- Restaurants Table
CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  address VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  postal_code VARCHAR(20),
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  opening_hours VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Menu Categories Table
CREATE TABLE menu_categories (
  id SERIAL PRIMARY KEY,
  restaurant_id INTEGER NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Menu Items Table
CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY,
  restaurant_id INTEGER NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES menu_categories(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(255),
  is_available BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  restaurant_id INTEGER NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, confirmed, preparing, ready, delivered, cancelled
  total_amount DECIMAL(10, 2) NOT NULL,
  order_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  delivery_address TEXT,
  delivery_notes TEXT,
  payment_method VARCHAR(50),
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, failed, refunded
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id INTEGER NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  price_at_time DECIMAL(10, 2) NOT NULL,
  special_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Reviews Table
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  restaurant_id INTEGER NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  order_id INTEGER REFERENCES orders(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sample Data Insertion

-- Insert sample restaurants
INSERT INTO restaurants (name, description, image_url, address, city, state, postal_code)
VALUES 
('The Italian Kitchen', 'Authentic Italian cuisine', '/images/italian-kitchen.jpg', '123 Main St', 'Foodville', 'CA', '90210'),
('Sushi Paradise', 'Fresh sushi and Japanese dishes', '/images/sushi-paradise.jpg', '456 Ocean Ave', 'Seafood City', 'CA', '90211'),
('Burger Joint', 'Juicy burgers and crispy fries', '/images/burger-joint.jpg', '789 Beef Blvd', 'Meatown', 'CA', '90212');

-- Insert sample menu categories
INSERT INTO menu_categories (restaurant_id, name, description, display_order)
VALUES
(1, 'Appetizers', 'Start your meal with these delicious options', 1),
(1, 'Pasta', 'Homemade pasta dishes', 2),
(1, 'Desserts', 'Sweet treats to finish your meal', 3),
(2, 'Sashimi', 'Fresh raw fish', 1),
(2, 'Rolls', 'Traditional and fusion sushi rolls', 2),
(3, 'Burgers', 'Our signature burgers', 1),
(3, 'Sides', 'Perfect accompaniments to your burger', 2);

-- Insert sample menu items
INSERT INTO menu_items (restaurant_id, category_id, name, description, price, is_featured)
VALUES
(1, 1, 'Bruschetta', 'Toasted bread with tomatoes, garlic and basil', 8.99, true),
(1, 2, 'Spaghetti Carbonara', 'Creamy pasta with pancetta and egg', 16.99, true),
(1, 3, 'Tiramisu', 'Coffee-flavored Italian dessert', 7.99, false),
(2, 4, 'Salmon Sashimi', 'Fresh cuts of premium salmon', 14.99, true),
(2, 5, 'California Roll', 'Crab, avocado and cucumber roll', 9.99, true),
(3, 6, 'Classic Cheeseburger', '1/3 lb beef patty with American cheese', 12.99, true),
(3, 7, 'Truffle Fries', 'Crispy fries with truffle oil and parmesan', 6.99, false);

-- Create indexes for performance
CREATE INDEX idx_restaurant_menu_items ON menu_items(restaurant_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_user_orders ON orders(user_id);
CREATE INDEX idx_restaurant_orders ON orders(restaurant_id);
