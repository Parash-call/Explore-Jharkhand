const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// In-Memory Fallback Store if MySQL DB is not connected locally
const memoryStore = {
  users: [
    { id: 1, name: 'Admin Explorer', email: 'admin@jharkhand.gov.in', password_hash: '$2a$10$v9CeTWNkpNIDpREStVBDz.GMbpqpOQQ7hW0ZaygEnisnGrdCn/nJS', role: 'admin', phone: '+919876543210', created_at: new Date() },
    { id: 2, name: 'Aarav Sharma', email: 'aarav@gmail.com', password_hash: '$2a$10$v9CeTWNkpNIDpREStVBDz.GMbpqpOQQ7hW0ZaygEnisnGrdCn/nJS', role: 'tourist', phone: '+919812345678', created_at: new Date() }
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
      state: 'jharkhand',
      latitude: 23.4478,
      longitude: 85.6534,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hundru_Falls%2C_Jharkhand%2C_India.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Hundru_Falls%2C_Jharkhand%2C_India.jpg?width=1280"]',
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
      state: 'jharkhand',
      latitude: 23.1415,
      longitude: 85.4597,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dassam_Falls%2C_Jharkhand%2C_India_01.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Dassam_Falls%2C_Jharkhand%2C_India_01.jpg?width=1280"]',
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
      state: 'jharkhand',
      latitude: 23.8863,
      longitude: 84.1901,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Forest_in_Betla_National_Park_2025.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Forest_in_Betla_National_Park_2025.jpg?width=1280"]',
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
      state: 'jharkhand',
      latitude: 24.4926,
      longitude: 86.7001,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Baba_Baidyanath_Jyotirlinga_Temple.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Baba_Baidyanath_Jyotirlinga_Temple.jpg?width=1280"]',
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
      state: 'jharkhand',
      latitude: 23.3441,
      longitude: 85.3096,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sarhul_Festival_Celebration_In_Central_University_Of_Jharkhand_%2CBrambe_Campus%2C_Ranchi.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Sarhul_Festival_Celebration_In_Central_University_Of_Jharkhand_%2CBrambe_Campus%2C_Ranchi.jpg?width=1280"]',
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
      state: 'jharkhand',
      latitude: 23.3700,
      longitude: 85.3250,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dhuska-Jharkhand.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Dhuska-Jharkhand.jpg?width=1280"]',
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
      state: 'jharkhand',
      latitude: 23.6339,
      longitude: 85.2869,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Patratu_Valley_at_night.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Patratu_Valley_at_night.jpg?width=1280"]',
      opening_hours: '6:00 AM - 7:00 PM',
      entry_fee: 0.00,
      best_time: 'Throughout the Year',
      avg_rating: 4.88,
      review_count: 320,
      created_at: new Date()
    },
    {
      id: 8,
      title: 'Meenakshi Amman Temple',
      slug: 'meenakshi-amman-temple',
      category: 'temple',
      description: 'A revered temple in Madurai devoted to Goddess Meenakshi, celebrated for its towering gopurams, sculpted corridors, and spiritual grandeur.',
      location_name: 'Madurai City',
      district: 'Madurai',
      state: 'tamilnadu',
      latitude: 9.9190,
      longitude: 78.1198,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Tower_of_Meenakshi_amman_temple.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Tower_of_Meenakshi_amman_temple.jpg?width=1280"]',
      opening_hours: '5:00 AM - 12:30 PM, 4:00 PM - 9:30 PM',
      entry_fee: 0.00,
      best_time: 'Throughout the Year',
      avg_rating: 4.96,
      review_count: 520,
      created_at: new Date()
    },
    {
      id: 9,
      title: 'Marina Beach',
      slug: 'marina-beach',
      category: 'beach',
      description: 'A sweeping coastline in Chennai with golden sands, sea breeze, street food, morning walks, and one of the longest urban beaches in the world.',
      location_name: 'Marina Beach Road, Chennai',
      district: 'Chennai',
      state: 'tamilnadu',
      latitude: 13.0500,
      longitude: 80.2824,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Marina_Beach%2C_Chennai.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Marina_Beach%2C_Chennai.jpg?width=1280"]',
      opening_hours: 'Open all day',
      entry_fee: 0.00,
      best_time: 'November to February',
      avg_rating: 4.75,
      review_count: 410,
      created_at: new Date()
    },
    {
      id: 10,
      title: 'Fort St. George',
      slug: 'fort-st-george',
      category: 'heritage',
      description: 'A historic colonial fort in Chennai that preserves the city’s early British-era legacy through military architecture, museums, and heritage walks.',
      location_name: 'George Town, Chennai',
      district: 'Chennai',
      state: 'tamilnadu',
      latitude: 13.0856,
      longitude: 80.2875,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Fort_St._George%2C_Chennai.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Fort_St._George%2C_Chennai.jpg?width=1280"]',
      opening_hours: '9:00 AM - 5:00 PM',
      entry_fee: 25.00,
      best_time: 'October to March',
      avg_rating: 4.62,
      review_count: 180,
      created_at: new Date()
    },
    {
      id: 11,
      title: 'Kapaleeshwarar Temple',
      slug: 'kapaleeshwarar-temple',
      category: 'temple',
      description: 'A beautiful Dravidian temple in Mylapore dedicated to Lord Shiva, renowned for its ornate gopurams, sculptures, and cultural atmosphere.',
      location_name: 'Mylapore, Chennai',
      district: 'Chennai',
      state: 'tamilnadu',
      latitude: 13.0344,
      longitude: 80.2686,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chennai_Kapaleeshwarar_Temple.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Chennai_Kapaleeshwarar_Temple.jpg?width=1280"]',
      opening_hours: '5:30 AM - 9:00 PM',
      entry_fee: 0.00,
      best_time: 'Throughout the Year',
      avg_rating: 4.90,
      review_count: 360,
      created_at: new Date()
    },
    {
      id: 12,
      title: 'Shore Temple',
      slug: 'shore-temple',
      category: 'heritage',
      description: 'A UNESCO-listed seaside shrine in Mahabalipuram with elegant stone carvings and awe-inspiring views of the Bay of Bengal.',
      location_name: 'Mahabalipuram Coastal Zone',
      district: 'Chengalpattu',
      state: 'tamilnadu',
      latitude: 12.6189,
      longitude: 80.1931,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mahabalipuram_Shore_Temple%2C_Tamil_Nadu.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Mahabalipuram_Shore_Temple%2C_Tamil_Nadu.jpg?width=1280"]',
      opening_hours: '6:00 AM - 6:00 PM',
      entry_fee: 40.00,
      best_time: 'November to February',
      avg_rating: 4.88,
      review_count: 540,
      created_at: new Date()
    },
    {
      id: 13,
      title: 'Pancha Rathas',
      slug: 'pancha-rathas',
      category: 'heritage',
      description: 'A remarkable collection of monolithic rock-cut structures at Mahabalipuram, each resembling a chariot and reflecting the artistry of the Pallava era.',
      location_name: 'Mahabalipuram Heritage Site',
      district: 'Chengalpattu',
      state: 'tamilnadu',
      latitude: 12.6183,
      longitude: 80.1958,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mahabalipuram%2C_Pancha_Rathas%2C_Visitors%2C_India.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Mahabalipuram%2C_Pancha_Rathas%2C_Visitors%2C_India.jpg?width=1280"]',
      opening_hours: '6:00 AM - 6:00 PM',
      entry_fee: 40.00,
      best_time: 'November to February',
      avg_rating: 4.84,
      review_count: 390,
      created_at: new Date()
    },
    {
      id: 14,
      title: 'Brihadisvara Temple',
      slug: 'brihadisvara-temple',
      category: 'temple',
      description: 'A towering Chola-era temple in Thanjavur known for its immense vimana, intricate sculptures, and magnificent architecture.',
      location_name: 'Thanjavur City',
      district: 'Thanjavur',
      state: 'tamilnadu',
      latitude: 10.7828,
      longitude: 79.1328,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Brihadeeswara_Temple_-_Thanjavur.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Brihadeeswara_Temple_-_Thanjavur.jpg?width=1280"]',
      opening_hours: '6:00 AM - 9:00 PM',
      entry_fee: 25.00,
      best_time: 'October to March',
      avg_rating: 4.93,
      review_count: 610,
      created_at: new Date()
    },
    {
      id: 15,
      title: 'Ramanathaswamy Temple',
      slug: 'ramanathaswamy-temple',
      category: 'temple',
      description: 'One of the most sacred pilgrimage sites in South India, famous for its striking corridors, sacred tanks, and deep connection to the Ramayana.',
      location_name: 'Rameswaram Island',
      district: 'Ramanathapuram',
      state: 'tamilnadu',
      latitude: 9.2876,
      longitude: 79.3129,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ramanathaswamy_Temple.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Ramanathaswamy_Temple.jpg?width=1280"]',
      opening_hours: '5:00 AM - 9:00 PM',
      entry_fee: 0.00,
      best_time: 'October to April',
      avg_rating: 4.95,
      review_count: 680,
      created_at: new Date()
    },
    {
      id: 16,
      title: 'Pamban Bridge',
      slug: 'pamban-bridge',
      category: 'roadtrip',
      description: 'A historic railway bridge connecting the mainland to Rameswaram, celebrated for its engineering beauty and dramatic sea views.',
      location_name: 'Pamban Rail Bridge',
      district: 'Ramanathapuram',
      state: 'tamilnadu',
      latitude: 9.2779,
      longitude: 79.1980,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pamban_Bridge.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Pamban_Bridge.jpg?width=1280"]',
      opening_hours: 'Accessible throughout the day',
      entry_fee: 0.00,
      best_time: 'October to March',
      avg_rating: 4.71,
      review_count: 230,
      created_at: new Date()
    },
    {
      id: 17,
      title: 'Ooty Lake',
      slug: 'ooty-lake',
      category: 'hillstation',
      description: 'A shimmering mountain lake in the Nilgiris, offering boating, scenic walks, and a cool climate that makes Ooty a classic hill-station retreat.',
      location_name: 'Ooty Town',
      district: 'Nilgiris',
      state: 'tamilnadu',
      latitude: 11.4064,
      longitude: 76.6932,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ooty_Lake%2C_Ooty.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Ooty_Lake%2C_Ooty.jpg?width=1280"]',
      opening_hours: '9:00 AM - 6:00 PM',
      entry_fee: 30.00,
      best_time: 'April to June and September to November',
      avg_rating: 4.82,
      review_count: 420,
      created_at: new Date()
    },
    {
      id: 18,
      title: 'Doddabetta Peak',
      slug: 'doddabetta-peak',
      category: 'nature',
      description: 'The highest mountain peak in the Nilgiris, offering panoramic views of tea gardens, valleys, and the misty mountain skyline.',
      location_name: 'Ooty Hills, Nilgiris',
      district: 'Nilgiris',
      state: 'tamilnadu',
      latitude: 11.4134,
      longitude: 76.7427,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Doddabetta_peak.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Doddabetta_peak.jpg?width=1280"]',
      opening_hours: '8:00 AM - 5:00 PM',
      entry_fee: 20.00,
      best_time: 'April to June and September to November',
      avg_rating: 4.78,
      review_count: 310,
      created_at: new Date()
    },
    {
      id: 19,
      title: 'Kodaikanal Lake',
      slug: 'kodaikanal-lake',
      category: 'hillstation',
      description: 'A tranquil lake surrounded by cliffs and pine trees, perfect for boating, leisurely strolls, and cool mountain evenings.',
      location_name: 'Kodaikanal Town',
      district: 'Dindigul',
      state: 'tamilnadu',
      latitude: 10.2381,
      longitude: 77.4891,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kodaikanal_Lake.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Kodaikanal_Lake.jpg?width=1280"]',
      opening_hours: '6:00 AM - 6:00 PM',
      entry_fee: 20.00,
      best_time: 'April to June and October to January',
      avg_rating: 4.80,
      review_count: 340,
      created_at: new Date()
    },
    {
      id: 20,
      title: 'Kanyakumari Beach',
      slug: 'kanyakumari-beach',
      category: 'beach',
      description: 'Where the Arabian Sea, Bay of Bengal, and Indian Ocean meet, Kanyakumari Beach offers spectacular sunrise and sunset views along with a vibrant spiritual aura.',
      location_name: 'Kanyakumari Town',
      district: 'Kanyakumari',
      state: 'tamilnadu',
      latitude: 8.0883,
      longitude: 77.5385,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kanyakumari_beach.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Kanyakumari_beach.jpg?width=1280"]',
      opening_hours: 'Open all day',
      entry_fee: 0.00,
      best_time: 'September to March',
      avg_rating: 4.84,
      review_count: 470,
      created_at: new Date()
    },
    {
      id: 21,
      title: 'Vivekananda Rock Memorial',
      slug: 'vivekananda-rock-memorial',
      category: 'heritage',
      description: 'A prominent memorial and tourist attraction on a rocky island near Kanyakumari, associated with Swami Vivekananda and celebrated for its coastal setting.',
      location_name: 'Kanyakumari Island',
      district: 'Kanyakumari',
      state: 'tamilnadu',
      latitude: 8.0819,
      longitude: 77.5511,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vivekananda_Rock_Memorial%2C_Kanyakumari%2C_India_2.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Vivekananda_Rock_Memorial%2C_Kanyakumari%2C_India_2.jpg?width=1280"]',
      opening_hours: '8:00 AM - 4:30 PM',
      entry_fee: 40.00,
      best_time: 'September to March',
      avg_rating: 4.86,
      review_count: 430,
      created_at: new Date()
    },
    {
      id: 22,
      title: 'Yercaud Lake',
      slug: 'yercaud-lake',
      category: 'hillstation',
      description: 'A scenic lake in the Shevaroy Hills offering boating, relaxing walks, and cool weather with a peaceful hillside atmosphere.',
      location_name: 'Yercaud, Salem',
      district: 'Salem',
      state: 'tamilnadu',
      latitude: 11.7754,
      longitude: 78.2079,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Yercaud_Lake.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Yercaud_Lake.jpg?width=1280"]',
      opening_hours: '8:00 AM - 6:00 PM',
      entry_fee: 15.00,
      best_time: 'October to June',
      avg_rating: 4.73,
      review_count: 190,
      created_at: new Date()
    },
    {
      id: 23,
      title: 'Rockfort Temple',
      slug: 'rockfort-temple',
      category: 'temple',
      description: 'An iconic hill-top temple in Tiruchirappalli built on a massive rock outcrop, combining spiritual significance with panoramic views.',
      location_name: 'Tiruchirappalli City',
      district: 'Tiruchirappalli',
      state: 'tamilnadu',
      latitude: 10.8269,
      longitude: 78.6968,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sculpture_of_Ucchi_Pillayar_Temple%2C_Rockfort%2C_Trichy%2C_Tamil_Nadu%2C_India.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Sculpture_of_Ucchi_Pillayar_Temple%2C_Rockfort%2C_Trichy%2C_Tamil_Nadu%2C_India.jpg?width=1280"]',
      opening_hours: '6:00 AM - 9:00 PM',
      entry_fee: 0.00,
      best_time: 'October to March',
      avg_rating: 4.81,
      review_count: 260,
      created_at: new Date()
    },
    {
      id: 24,
      title: 'Vellore Fort',
      slug: 'vellore-fort',
      category: 'heritage',
      description: 'A historic fortress in Vellore with layered architecture, scenic surroundings, and a strong connection to the region’s military past.',
      location_name: 'Vellore Town',
      district: 'Vellore',
      state: 'tamilnadu',
      latitude: 12.9221,
      longitude: 79.1330,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vellore_Fort_and_Jalakandeswarar_temple_%2810%29.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Vellore_Fort_and_Jalakandeswarar_temple_%2810%29.jpg?width=1280"]',
      opening_hours: '9:00 AM - 5:00 PM',
      entry_fee: 20.00,
      best_time: 'October to March',
      avg_rating: 4.63,
      review_count: 160,
      created_at: new Date()
    },
    {
      id: 25,
      title: 'Hogenakkal Falls',
      slug: 'hogenakkal-falls',
      category: 'waterfall',
      description: 'Known as the Niagara of India, Hogenakkal is a breathtaking waterfall on the Kaveri River with powerful cascades, coracle boat rides, and scenic rocky gorges.',
      location_name: 'Hogenakkal, Dharmapuri',
      district: 'Dharmapuri',
      state: 'tamilnadu',
      latitude: 12.1025,
      longitude: 77.7919,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hogenakkal_Falls_%289032106667%29.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Hogenakkal_Falls_%289032106667%29.jpg?width=1280"]',
      opening_hours: '8:00 AM - 5:30 PM',
      entry_fee: 30.00,
      best_time: 'October to February',
      avg_rating: 4.82,
      review_count: 520,
      created_at: new Date()
    },
    {
      id: 26,
      title: 'Mudumalai Wildlife Sanctuary',
      slug: 'mudumalai-wildlife-sanctuary',
      category: 'wildlife',
      description: 'A premier wildlife sanctuary in the Nilgiri Biosphere Reserve, home to elephants, tigers, leopards, gaurs, and over 300 bird species in lush tropical forests.',
      location_name: 'Mudumalai, Nilgiris',
      district: 'Nilgiris',
      state: 'tamilnadu',
      latitude: 11.5652,
      longitude: 76.5263,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Elephant_Female_and_Calf_Mudumalai_Mar21_DSC01384.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Elephant_Female_and_Calf_Mudumalai_Mar21_DSC01384.jpg?width=1280"]',
      opening_hours: '6:00 AM - 9:00 AM, 4:00 PM - 6:00 PM',
      entry_fee: 150.00,
      best_time: 'October to May',
      avg_rating: 4.79,
      review_count: 410,
      created_at: new Date()
    },
    {
      id: 27,
      title: 'Anamalai Tiger Reserve',
      slug: 'anamalai-tiger-reserve',
      category: 'wildlife',
      description: 'One of the largest tiger reserves in Tamil Nadu spanning the Anamalai Hills, offering rich biodiversity, scenic drives through shola forests, and magnificent wildlife viewing.',
      location_name: 'Topslip, Pollachi',
      district: 'Coimbatore',
      state: 'tamilnadu',
      latitude: 10.4044,
      longitude: 76.9882,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Anamalai_Tiger_Reserve_Pollachi_116.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Anamalai_Tiger_Reserve_Pollachi_116.jpg?width=1280"]',
      opening_hours: '7:00 AM - 6:00 PM',
      entry_fee: 100.00,
      best_time: 'November to June',
      avg_rating: 4.75,
      review_count: 340,
      created_at: new Date()
    },
    {
      id: 28,
      title: 'Dhanushkodi',
      slug: 'dhanushkodi',
      category: 'beach',
      description: 'A hauntingly beautiful ghost town at the tip of Rameswaram island, where the Bay of Bengal meets the Indian Ocean — offering desolate beaches, ruins, and a raw spiritual atmosphere.',
      location_name: 'Dhanushkodi, Rameswaram',
      district: 'Ramanathapuram',
      state: 'tamilnadu',
      latitude: 9.1632,
      longitude: 79.4239,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dhanushkodi_-_The_Ghost_town.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Dhanushkodi_-_The_Ghost_town.jpg?width=1280"]',
      opening_hours: 'Open all day',
      entry_fee: 0.00,
      best_time: 'October to March',
      avg_rating: 4.70,
      review_count: 390,
      created_at: new Date()
    },
    {
      id: 29,
      title: 'Pichavaram Mangrove Forest',
      slug: 'pichavaram-mangrove-forest',
      category: 'nature',
      description: 'One of the world\'s largest mangrove forests, offering magical boat rides through narrow waterways between dense green mangrove trees — a paradise for nature lovers and birdwatchers.',
      location_name: 'Pichavaram, Cuddalore',
      district: 'Cuddalore',
      state: 'tamilnadu',
      latitude: 11.4234,
      longitude: 79.7812,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Boating_in_Pichawaram.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Boating_in_Pichawaram.jpg?width=1280"]',
      opening_hours: '7:00 AM - 5:30 PM',
      entry_fee: 50.00,
      best_time: 'October to March',
      avg_rating: 4.68,
      review_count: 280,
      created_at: new Date()
    },
    {
      id: 30,
      title: 'Adiyogi Shiva Statue',
      slug: 'adiyogi-shiva-statue',
      category: 'heritage',
      description: 'The world\'s largest bust sculpture — a 112-foot tall Adiyogi Shiva statue at Isha Yoga Center in Coimbatore, symbolizing yoga and spiritual transformation.',
      location_name: 'Isha Yoga Center, Coimbatore',
      district: 'Coimbatore',
      state: 'tamilnadu',
      latitude: 11.0308,
      longitude: 76.9303,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Adiyogi_Shiva_steel_burst_2018.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Adiyogi_Shiva_steel_burst_2018.jpg?width=1280"]',
      opening_hours: '6:00 AM - 8:00 PM',
      entry_fee: 0.00,
      best_time: 'Throughout the Year',
      avg_rating: 4.86,
      review_count: 610,
      created_at: new Date()
    },
    {
      id: 31,
      title: 'Sriranganathaswamy Temple',
      slug: 'sriranganathaswamy-temple',
      category: 'temple',
      description: 'The largest functioning Hindu temple complex in the world, located on the sacred island of Srirangam, dedicated to Lord Ranganatha with 21 magnificent gopurams.',
      location_name: 'Srirangam, Tiruchirappalli',
      district: 'Tiruchirappalli',
      state: 'tamilnadu',
      latitude: 10.8602,
      longitude: 78.6891,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Srirangam_temple_pic_by_SM_01.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Srirangam_temple_pic_by_SM_01.jpg?width=1280"]',
      opening_hours: '6:00 AM - 1:00 PM, 3:15 PM - 8:45 PM',
      entry_fee: 0.00,
      best_time: 'Throughout the Year',
      avg_rating: 4.91,
      review_count: 730,
      created_at: new Date()
    },
    {
      id: 32,
      title: 'Chidambaram Nataraja Temple',
      slug: 'chidambaram-nataraja-temple',
      category: 'temple',
      description: 'An ancient and sacred Shaivite temple dedicated to Lord Nataraja (Shiva as the Cosmic Dancer), famous for its grand Dravidian gopurams and Chidambaram Rahasyam.',
      location_name: 'Chidambaram Town',
      district: 'Cuddalore',
      state: 'tamilnadu',
      latitude: 11.3997,
      longitude: 79.6937,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Thillai_Nataraja_Temple_%28Chidambaram_Nataraja_Temple%29.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Thillai_Nataraja_Temple_%28Chidambaram_Nataraja_Temple%29.jpg?width=1280"]',
      opening_hours: '6:00 AM - 12:00 PM, 4:30 PM - 10:00 PM',
      entry_fee: 0.00,
      best_time: 'November to March',
      avg_rating: 4.85,
      review_count: 480,
      created_at: new Date()
    },
    {
      id: 33,
      title: 'Palani Murugan Temple',
      slug: 'palani-murugan-temple',
      category: 'temple',
      description: 'One of the six abodes of Lord Murugan perched on a rocky hill, attracting millions of pilgrims each year — especially during Thaipusam, with a ropeway offering panoramic valley views.',
      location_name: 'Palani Hill, Dindigul',
      district: 'Dindigul',
      state: 'tamilnadu',
      latitude: 10.4508,
      longitude: 77.5208,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Palani_Murugan_Hill_Temple.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Palani_Murugan_Hill_Temple.jpg?width=1280"]',
      opening_hours: '6:00 AM - 9:00 PM',
      entry_fee: 0.00,
      best_time: 'Throughout the Year',
      avg_rating: 4.88,
      review_count: 560,
      created_at: new Date()
    },
    {
      id: 34,
      title: 'Courtallam Waterfalls',
      slug: 'courtallam-waterfalls',
      category: 'waterfall',
      description: 'Known as the Spa of South India, Courtallam\'s nine waterfalls are surrounded by lush tropical forests in the Western Ghats, famous for their medicinal herbal-rich water.',
      location_name: 'Courtallam, Tenkasi',
      district: 'Tenkasi',
      state: 'tamilnadu',
      latitude: 8.9379,
      longitude: 77.2746,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Courtallam_%28Kutralam%29_Falls_-_Tenkasi_02.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Courtallam_%28Kutralam%29_Falls_-_Tenkasi_02.jpg?width=1280"]',
      opening_hours: '6:00 AM - 6:00 PM',
      entry_fee: 0.00,
      best_time: 'June to September (Monsoon Season)',
      avg_rating: 4.72,
      review_count: 450,
      created_at: new Date()
    },
    {
      id: 35,
      title: 'Coonoor Tea Gardens',
      slug: 'coonoor-tea-gardens',
      category: 'hillstation',
      description: 'The second largest hill station in the Nilgiris, famous for its lush Nilgiri tea estates, the historic Nilgiri Mountain Railway, Sim\'s Park, and mesmerizing misty valley views.',
      location_name: 'Coonoor, Nilgiris',
      district: 'Nilgiris',
      state: 'tamilnadu',
      latitude: 11.3530,
      longitude: 76.7959,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Tea_estates_at_Hubbathalai_near_Coonoor%2C_Nilgiris.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Tea_estates_at_Hubbathalai_near_Coonoor%2C_Nilgiris.jpg?width=1280"]',
      opening_hours: 'Open all day',
      entry_fee: 0.00,
      best_time: 'April to June and September to November',
      avg_rating: 4.77,
      review_count: 380,
      created_at: new Date()
    },
    {
      id: 36,
      title: 'Gingee Fort',
      slug: 'gingee-fort',
      category: 'heritage',
      description: 'Called the Troy of the East, Gingee Fort is a spectacular hill fortress complex with three citadels spread across three hills, featuring palace ruins, granaries, and panoramic views.',
      location_name: 'Gingee, Villupuram',
      district: 'Villupuram',
      state: 'tamilnadu',
      latitude: 12.2499,
      longitude: 79.4166,
      image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Gingee_Fort_panorama.jpg?width=1280',
      gallery: '["https://commons.wikimedia.org/wiki/Special:FilePath/Gingee_Fort_panorama.jpg?width=1280"]',
      opening_hours: '9:00 AM - 5:30 PM',
      entry_fee: 25.00,
      best_time: 'October to March',
      avg_rating: 4.65,
      review_count: 295,
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
      if (
        rows.length === 0 &&
        sql.trim().toLowerCase().includes('from destinations') &&
        sql.trim().toLowerCase().includes('where id = ?')
      ) {
        return queryMemory(sql, params);
      }
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
    if (lowerSql.includes('from destinations') && lowerSql.includes('state = ?')) {
      const selectedState = params[0];
      return [memoryStore.destinations.filter(d => d.state === selectedState)];
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
      const userBookings = memoryStore.bookings
        .filter(b => b.user_id == params[0])
        .map(b => {
          const dest = memoryStore.destinations.find(d => 
            d.id == b.destination_id || 
            d.slug == b.destination_id ||
            (d.title && String(b.destination_id).toLowerCase().includes(d.slug)) ||
            (d.title && d.title.toLowerCase().includes(String(b.destination_id).toLowerCase()))
          ) || {};
          return {
            ...b,
            destination_title: b.destination_title || dest.title || b.title,
            destination_image: b.destination_image || dest.image_url || 'https://commons.wikimedia.org/wiki/Special:FilePath/Tower_of_Meenakshi_amman_temple.jpg?width=1280',
            location_name: b.location_name || dest.location_name || dest.district || 'Tamil Nadu'
          };
        });
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
      state: params[5] || 'jharkhand',
      latitude: parseFloat(params[6]),
      longitude: parseFloat(params[7]),
      image_url: params[8],
      gallery: params[9] || '[]',
      opening_hours: params[10] || '8:00 AM - 5:00 PM',
      entry_fee: parseFloat(params[11] || 0),
      best_time: params[12] || 'Oct-Mar',
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
    const dest = memoryStore.destinations.find(d => 
      d.id == params[1] || 
      d.slug == params[1] || 
      (d.title && String(params[1]).toLowerCase().includes(d.slug)) ||
      (d.title && d.title.toLowerCase().includes(String(params[1]).toLowerCase()))
    );
    const newBooking = {
      id: memoryStore.bookings.length + 1,
      user_id: params[0],
      destination_id: dest ? dest.id : params[1],
      type: params[2],
      title: params[3],
      booking_date: params[4],
      guests: params[5],
      total_price: params[6],
      status: 'confirmed',
      special_requests: params[7] || '',
      destination_title: dest ? dest.title : (params[3] || 'Tamil Nadu Tour'),
      destination_image: dest ? dest.image_url : 'https://commons.wikimedia.org/wiki/Special:FilePath/Tower_of_Meenakshi_amman_temple.jpg?width=1280',
      location_name: dest ? dest.location_name : 'Tamil Nadu',
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
