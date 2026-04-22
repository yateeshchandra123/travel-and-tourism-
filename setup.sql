-- ============================================
--  WanderLux Travel & Tourism - Database Setup
--  Run this file in phpMyAdmin or MySQL terminal
-- ============================================

-- Step 1: Create database
CREATE DATABASE IF NOT EXISTS travel_db;
USE travel_db;

-- Step 2: Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 3: Destinations table
CREATE TABLE IF NOT EXISTS destinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  category VARCHAR(50),
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 4: Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  customer_email VARCHAR(150) NOT NULL,
  customer_phone VARCHAR(20),
  destination_id INT NOT NULL,
  travel_date DATE NOT NULL,
  num_persons INT DEFAULT 1,
  notes TEXT,
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'confirmed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE
);

-- Step 5: Insert sample destinations
INSERT INTO destinations (name, description, price, category, image_url) VALUES
('Goa, India', 'Golden beaches, vibrant nightlife, and Portuguese heritage await you in India''s premier beach destination.', 12999, 'Beach', ''),
('Manali, Himachal Pradesh', 'Snow-capped peaks, thrilling adventure sports, and serene mountain valleys for the nature lover.', 15499, 'Mountains', ''),
('Rajasthan Royal Tour', 'Majestic forts, opulent palaces, camel safaris, and the rich cultural heritage of the royal state.', 18999, 'Heritage', ''),
('Kerala Backwaters', 'Tranquil houseboat rides through emerald waterways, lush greenery, and authentic Ayurvedic wellness.', 14299, 'Nature', ''),
('Andaman Islands', 'Crystal clear turquoise waters, pristine coral reefs, and white sand beaches untouched by time.', 22999, 'Beach', ''),
('Ladakh Adventure', 'High altitude desert landscapes, ancient monasteries, and legendary bike journeys through the roof of the world.', 24999, 'Adventure', '');

-- Verify
SELECT 'Database setup complete! ✅' as Status;
SELECT COUNT(*) as 'Total Destinations' FROM destinations;
