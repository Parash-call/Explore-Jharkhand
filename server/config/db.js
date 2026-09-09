const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// In-Memory Fallback Store if MySQL DB is not connected locally
const memoryStore = {
  users: [
    { id: 1, name: 'Admin Explorer', email: 'admin@jharkhand.gov.in', password_hash: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeg6Lruj3vjPGga31lW', role: 'admin', phone: '+919876543210', created_at: new Date() },
    { id: 2, name: 'Aarav Sharma', email: 'aarav@gmail.com', password_hash: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeg6Lruj3vjPGga31lW', role: 'tourist', phone: '+919812345678', created_at: new Date() }
  ],
  destinations: [
    {
      id: 1,
      title: 'Hundru Falls',
      slug: 'hundru-falls',
      category: 'waterfall',
      description: 'Cascading from a height of 98 meters (322 ft), Hundru Falls is one of the highest and most majestic waterfalls in Jharkhand, formed by the Subarnarekha River.',
      location_name: 'Purulia Road, Ormanjhi',
      district: 'Ranchi',
      latitude: 23.4478,
      longitude: 85.6534,
      image_url: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1000&q=80',
      gallery: '["https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=80"]',
      opening_hours: '8:00 AM - 5:00 PM',
      entry_fee: 20.00,
      best_time: 'October to February',
      avg_rating: 4.80,
      review_count: 124,
      created_at: new Date()
    },
    {
      id: 2,
      title: 'Dassam Falls',
      slug: 'dassam-falls',
      category: 'waterfall',
      description: 'A spectacular natural waterfall where the Kanchi River tumbles over rock ledges from a height of 44 meters, producing a thunderous echo.',
      location_name: 'Taimara, Bundu Road',
      district: 'Ranchi',
      latitude: 23.1415,
      longitude: 85.4597,
      image_url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=80',
      gallery: '["https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1000&q=80"]',
      opening_hours: '8:30 AM - 5:00 PM',
      entry_fee: 15.00,
      best_time: 'September to March',
      avg_rating: 4.70,
      review_count: 98,
      created_at: new Date()
    },
    {
      id: 3,
      title: 'Betla National Park',
      slug: 'betla-national-park',
      category: 'wildlife',
      description: 'One of India’s earliest national parks under Project Tiger, Betla is famous for tigers, elephants, sloth bears, gaurs, and lush teak covers.',
      location_name: 'Daltonganj - Betla Rd',
      district: 'Palamu',
      latitude: 23.8863,
      longitude: 84.1901,
      image_url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
      gallery: '["https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80"]',
      opening_hours: '6:00 AM - 5:30 PM',
      entry_fee: 100.00,
      best_time: 'November to April',
      avg_rating: 4.90,
      review_count: 210,
      created_at: new Date()
    },
    {
      id: 4,
      title: 'Baidyanath Jyotirlinga Temple',
      slug: 'baidyanath-temple-deoghar',
      category: 'temple',
      description: 'One of the 12 sacred Jyotirlingas of Lord Shiva in India, drawing millions of pilgrims during the holy Shravani Mela every monsoon season.',
      location_name: 'Shivganga, Deoghar',
      district: 'Deoghar',
      latitude: 24.4926,
      longitude: 86.7001,
      image_url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80',
      gallery: '["https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80"]',
      opening_hours: '4:00 AM - 9:00 PM',
      entry_fee: 0.00,
      best_time: 'July to August (Shravani Mela), Oct-Mar',
      avg_rating: 4.95,
      review_count: 540,
      created_at: new Date()
    },
    {
      id: 5,
      title: 'Sarhul Tribal Festival',
      slug: 'sarhul-festival',
      category: 'festival',
      description: 'The vibrant spring festival celebrating Nature and Mother Earth in Jharkhand, marked by traditional tribal dances, Sal flower worship, and community feasts.',
      location_name: 'Statewide Celebration, Tribal Akhra',
      district: 'Ranchi',
      latitude: 23.3441,
      longitude: 85.3096,
      image_url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80',
      gallery: '["https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80"]',
      opening_hours: 'All Day Celebration',
      entry_fee: 0.00,
      best_time: 'March - April (Spring)',
      avg_rating: 4.85,
      review_count: 75,
      created_at: new Date()
    },
    {
      id: 6,
      title: 'Authentic Jharkhand Dhuska & Rugra Delicacy',
      slug: 'dhuska-rugra-food',
      category: 'food',
      description: 'Deep-fried crispy rice and chana dal fritters served hot with spicy black chickpea curry or wild seasonal Rugra mushroom gravy.',
      location_name: 'Main Road Street Food Hubs',
      district: 'Ranchi',
      latitude: 23.3700,
      longitude: 85.3250,
      image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80',
      gallery: '["https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80"]',
      opening_hours: '7:00 AM - 10:00 PM',
      entry_fee: 50.00,
      best_time: 'Monsoon & Winter',
      avg_rating: 4.90,
      review_count: 160,
      created_at: new Date()
    },
    {
      id: 7,
      title: 'Patratu Valley & Lake',
      slug: 'patratu-valley',
      category: 'adventure',
      description: 'A serene hill valley known for its winding snake-like hairpin bends, crystal clear dam waters, boating, and scenic sunset viewpoints.',
      location_name: 'Patratu Dam, Ramgarh',
      district: 'Ramgarh',
      latitude: 23.6339,
      longitude: 85.2869,
      image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
      gallery: '["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"]',
      opening_hours: '6:00 AM - 7:00 PM',
      entry_fee: 0.00,
      best_time: 'Throughout the Year',
      avg_rating: 4.88,
      review_count: 320,
      created_at: new Date()
    }
  ],
  reviews: [
    { id: 1, user_id: 2, user_name: 'Aarav Sharma', destination_id: 1, rating: 5, comment: 'Hundru Falls is magnificent! The rainbow in the morning spray is stunning.', created_at: new Date() }
  ],
  wishlist: [
    { id: 1, user_id: 2, destination_id: 1, created_at: new Date() }
  ],
  bookings: [
    { id: 1, user_id: 2, destination_id: 3, type: 'guide', title: 'Betla Wildlife Jungle Safari Guide', booking_date: '2026-08-15', guests: 2, total_price: 800.00, status: 'confirmed', special_requests: 'Morning slot preferred', created_at: new Date() }
  ],
  notifications: [
    { id: 1, user_id: 2, title: 'Booking Confirmed!', message: 'Your Betla Wildlife Jungle Safari Guide booking is confirmed for Aug 15, 2026.', type: 'booking', is_read: false, created_at: new Date() }
  ]
};

let dbPool = null;
let isUsingFallback = false;

const initDb = async () => {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'explore_jharkhand',
      port: Number(process.env.DB_PORT) || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Test connection
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL Database successfully!');
    connection.release();
    dbPool = pool;
  } catch (error) {
    console.warn('⚠️ MySQL connection failed:', error.message);
    console.warn('🔄 Switching seamlessly to In-Memory Database Fallback for Instant Execution.');
    isUsingFallback = true;
  }
};

initDb();

const query = async (sql, params = []) => {
  if (dbPool && !isUsingFallback) {
    try {
      const [rows] = await dbPool.execute(sql, params);
      return [rows];
    } catch (err) {
      console.error('MySQL Query Error:', err.message);
      // Fallback on query error
      return queryMemory(sql, params);
    }
  } else {
    return queryMemory(sql, params);
  }
};

// Memory query execution engine for resilient fallback
const queryMemory = async (sql, params = []) => {
  const lowerSql = sql.trim().toLowerCase();

  if (lowerSql.startsWith('select')) {
    if (lowerSql.includes('from users') && lowerSql.includes('where email = ?')) {
      const user = memoryStore.users.find(u => u.email === params[0]);
      return [user ? [user] : []];
    }
    if (lowerSql.includes('from users') && lowerSql.includes('where id = ?')) {
      const user = memoryStore.users.find(u => u.id == params[0]);
      return [user ? [user] : []];
    }
    if (lowerSql.includes('from users')) {
      return [memoryStore.users];
    }
    if (lowerSql.includes('from destinations') && lowerSql.includes('where id = ?')) {
      const dest = memoryStore.destinations.find(d => d.id == params[0]);
      return [dest ? [dest] : []];
    }
    if (lowerSql.includes('from destinations')) {
      return [memoryStore.destinations];
    }
    if (lowerSql.includes('from reviews')) {
      if (params.length > 0) {
        const destReviews = memoryStore.reviews.filter(r => r.destination_id == params[0]);
        return [destReviews];
      }
      return [memoryStore.reviews];
    }
    if (lowerSql.includes('from wishlist')) {
      const userWishlist = memoryStore.wishlist.filter(w => w.user_id == params[0]);
      // Join with destinations
      const result = userWishlist.map(w => {
        const dest = memoryStore.destinations.find(d => d.id == w.destination_id);
        return { ...dest, wishlist_id: w.id };
      });
      return [result];
    }
    if (lowerSql.includes('from bookings')) {
      const userBookings = memoryStore.bookings.filter(b => b.user_id == params[0]);
      return [userBookings];
    }
    if (lowerSql.includes('from notifications')) {
      const userNotifs = memoryStore.notifications.filter(n => n.user_id == params[0]);
      return [userNotifs];
    }
    return [[]];
  }

  if (lowerSql.startsWith('insert into users')) {
    const newUser = {
      id: memoryStore.users.length + 1,
      name: params[0],
      email: params[1],
      password_hash: params[2],
      role: params[3] || 'tourist',
      phone: params[4] || '',
      created_at: new Date()
    };
    memoryStore.users.push(newUser);
    return [{ insertId: newUser.id, affectedRows: 1 }];
  }

  if (lowerSql.startsWith('insert into destinations')) {
    const newDest = {
      id: memoryStore.destinations.length + 1,
      title: params[0],
      slug: params[0].toLowerCase().replace(/ /g, '-'),
      category: params[1],
      description: params[2],
      location_name: params[3],
      district: params[4],
      latitude: parseFloat(params[5]),
      longitude: parseFloat(params[6]),
      image_url: params[7],
      gallery: params[8] || '[]',
      opening_hours: params[9] || '8:00 AM - 5:00 PM',
      entry_fee: parseFloat(params[10] || 0),
      best_time: params[11] || 'Oct-Mar',
      avg_rating: 5.0,
      review_count: 0,
      created_at: new Date()
    };
    memoryStore.destinations.push(newDest);
    return [{ insertId: newDest.id, affectedRows: 1 }];
  }

  if (lowerSql.startsWith('insert into reviews')) {
    const newReview = {
      id: memoryStore.reviews.length + 1,
      user_id: params[0],
      destination_id: params[1],
      rating: params[2],
      comment: params[3],
      image_url: params[4] || null,
      created_at: new Date()
    };
    memoryStore.reviews.push(newReview);
    return [{ insertId: newReview.id, affectedRows: 1 }];
  }

  if (lowerSql.startsWith('insert into wishlist')) {
    const exists = memoryStore.wishlist.find(w => w.user_id == params[0] && w.destination_id == params[1]);
    if (!exists) {
      const newWish = { id: memoryStore.wishlist.length + 1, user_id: params[0], destination_id: params[1], created_at: new Date() };
      memoryStore.wishlist.push(newWish);
      return [{ insertId: newWish.id, affectedRows: 1 }];
    }
    return [{ affectedRows: 0 }];
  }

  if (lowerSql.startsWith('delete from wishlist')) {
    const idx = memoryStore.wishlist.findIndex(w => w.user_id == params[0] && w.destination_id == params[1]);
    if (idx !== -1) {
      memoryStore.wishlist.splice(idx, 1);
      return [{ affectedRows: 1 }];
    }
    return [{ affectedRows: 0 }];
  }

  if (lowerSql.startsWith('insert into bookings')) {
    const newBooking = {
      id: memoryStore.bookings.length + 1,
      user_id: params[0],
      destination_id: params[1],
      type: params[2],
      title: params[3],
      booking_date: params[4],
      guests: params[5],
      total_price: params[6],
      status: 'confirmed',
      special_requests: params[7] || '',
      created_at: new Date()
    };
    memoryStore.bookings.push(newBooking);
    return [{ insertId: newBooking.id, affectedRows: 1 }];
  }

  if (lowerSql.startsWith('update bookings set status = ?')) {
    const booking = memoryStore.bookings.find(b => b.id == params[1] && b.user_id == params[2]);
    if (booking) {
      booking.status = params[0];
      return [{ affectedRows: 1 }];
    }
    return [{ affectedRows: 0 }];
  }

  if (lowerSql.startsWith('delete from destinations')) {
    const idx = memoryStore.destinations.findIndex(d => d.id == params[0]);
    if (idx !== -1) {
      memoryStore.destinations.splice(idx, 1);
      return [{ affectedRows: 1 }];
    }
    return [{ affectedRows: 0 }];
  }

  if (lowerSql.startsWith('delete from reviews')) {
    const idx = memoryStore.reviews.findIndex(r => r.id == params[0]);
    if (idx !== -1) {
      memoryStore.reviews.splice(idx, 1);
      return [{ affectedRows: 1 }];
    }
    return [{ affectedRows: 0 }];
  }

  return [{ affectedRows: 1, insertId: 999 }];
};

module.exports = { query, memoryStore };
