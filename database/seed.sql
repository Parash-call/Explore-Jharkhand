-- Explore Jharkhand Seed Dataset (MySQL)
-- Passwords seeded as 'password123' (bcrypt hash: $2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeg6Lruj3vjPGga31lW)

USE explore_jharkhand;

-- Seed Users
INSERT INTO users (id, name, email, password_hash, role, phone) VALUES
(1, 'Admin Explorer', 'admin@jharkhand.gov.in', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeg6Lruj3vjPGga31lW', 'admin', '+919876543210'),
(2, 'Aarav Sharma', 'aarav@gmail.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeg6Lruj3vjPGga31lW', 'tourist', '+919812345678'),
(3, 'Priya Singh', 'priya@gmail.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeg6Lruj3vjPGga31lW', 'tourist', '+919898765432');

-- Seed Destinations
INSERT INTO destinations (id, title, slug, category, description, location_name, district, latitude, longitude, image_url, gallery, opening_hours, entry_fee, best_time, avg_rating, review_count) VALUES
(1, 
 'Hundru Falls', 
 'hundru-falls', 
 'waterfall', 
 'Cascading from a height of 98 meters (322 ft), Hundru Falls is one of the highest and most majestic waterfalls in Jharkhand, formed by the Subarnarekha River.', 
 'Purulia Road, Ormanjhi', 
 'Ranchi', 
 23.4478, 
 85.6534, 
 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1000&q=80', 
 '["https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=80"]', 
 '8:00 AM - 5:00 PM', 
 20.00, 
 'October to February', 
 4.80, 
 124),

(2, 
 'Dassam Falls', 
 'dassam-falls', 
 'waterfall', 
 'A spectacular natural water fall where the Kanchi River tumbles over rock ledges from a height of 44 meters, producing a thunderous echo and fine water spray.', 
 'Taimara, Bundu Road', 
 'Ranchi', 
 23.1415, 
 85.4597, 
 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=80', 
 '["https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=80"]', 
 '8:30 AM - 5:00 PM', 
 15.00, 
 'September to March', 
 4.70, 
 98),

(3, 
 'Betla National Park', 
 'betla-national-park', 
 'wildlife', 
 'One of India’s earliest national parks under Project Tiger, Betla is famous for tigers, elephants, sloth bears, gaurs, and lush teak and sal tree covers.', 
 'Daltonganj - Betla Rd', 
 'Palamu', 
 23.8863, 
 84.1901, 
 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80', 
 '["https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80"]', 
 '6:00 AM - 5:30 PM', 
 100.00, 
 'November to April', 
 4.90, 
 210),

(4, 
 'Baidyanath Jyotirlinga Temple', 
 'baidyanath-temple-deoghar', 
 'temple', 
 'One of the 12 sacred Jyotirlingas of Lord Shiva in India, drawing millions of pilgrims during the holy Shravani Mela every monsoon season.', 
 'Shivganga, Deoghar', 
 'Deoghar', 
 24.4926, 
 86.7001, 
 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80', 
 '["https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80"]', 
 '4:00 AM - 9:00 PM', 
 0.00, 
 'July to August (Shravani Mela), Oct-Mar', 
 4.95, 
 540),

(5, 
 'Sarhul Tribal Festival', 
 'sarhul-festival', 
 'festival', 
 'The vibrant spring festival celebrating Nature and Mother Earth in Jharkhand, marked by traditional tribal dances, Sal flower worship, and community feasts.', 
 'Statewide Celebration, Tribal Akhra', 
 'Ranchi', 
 23.3441, 
 85.3096, 
 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80', 
 '["https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80"]', 
 'All Day Celebration', 
 0.00, 
 'March - April (Spring)', 
 4.85, 
 75),

(6, 
 'Authentic Jharkhand Dhuska & Rugra Delicacy', 
 'dhuska-rugra-food', 
 'food', 
 'Deep-fried crispy rice and chana dal fritters served hot with spicy black chickpea curry or wild seasonal Rugra mushroom gravy.', 
 'Main Road Street Food Hubs', 
 'Ranchi', 
 23.3700, 
 85.3250, 
 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80', 
 '["https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80"]', 
 '7:00 AM - 10:00 PM', 
 50.00, 
 'Monsoon & Winter', 
 4.90, 
 160),

(7, 
 'Patratu Valley & Lake', 
 'patratu-valley', 
 'adventure', 
 'A serene hill valley known for its winding snake-like hairpin bends, crystal clear dam waters, boating, and scenic sunset viewpoints.', 
 'Patratu Dam, Ramgarh', 
 'Ramgarh', 
 23.6339, 
 85.2869, 
 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80', 
 '["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"]', 
 '6:00 AM - 7:00 PM', 
 0.00, 
 'Throughout the Year', 
 4.88, 
 320),

(8, 
 'Jonha Falls (Gautamdhara)', 
 'jonha-falls', 
 'waterfall', 
 'Named after Lord Buddha who is believed to have bathed in these holy waters. Features 722 steps leading down to a tranquil pool.', 
 'Jonha Village, Ormanjhi', 
 'Ranchi', 
 23.3421, 
 85.6074, 
 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80', 
 '["https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80"]', 
 '8:00 AM - 5:00 PM', 
 15.00, 
 'October to March', 
 4.65, 
 88);

-- Seed Sample Reviews
INSERT INTO reviews (id, user_id, destination_id, rating, comment) VALUES
(1, 2, 1, 5, 'Hundru Falls is absolutely mesmerizing! The mist in winter mornings is unforgettable.'),
(2, 3, 3, 5, 'Betla National Park Safari was fantastic. Spotted wild elephants near the watering hole!'),
(3, 2, 4, 5, 'Spiritual divine energy at Baidyanath Dham. A must visit for every traveler in India.');

-- Seed Sample Wishlist
INSERT INTO wishlist (user_id, destination_id) VALUES
(2, 1),
(2, 3),
(2, 7);

-- Seed Sample Bookings
INSERT INTO bookings (id, user_id, destination_id, type, title, booking_date, guests, total_price, status, special_requests) VALUES
(1, 2, 3, 'guide', 'Betla Wildlife Jungle Safari Guide', '2026-08-15', 2, 800.00, 'confirmed', 'Prefer morning 6 AM safari slot'),
(2, 2, 7, 'homestay', 'Patratu Valley Eco Homestay', '2026-08-20', 3, 2500.00, 'confirmed', 'Vegetarian breakfast requested');

-- Seed Sample Notifications
INSERT INTO notifications (user_id, title, message, type) VALUES
(2, 'Booking Confirmed!', 'Your Betla Wildlife Jungle Safari Guide booking is confirmed for Aug 15, 2026.', 'booking'),
(2, 'Weather Alert', 'Pleasant clear skies forecasted for Patratu Valley tomorrow.', 'weather');
