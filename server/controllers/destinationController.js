const realJharkhandPhotos = {
  'hundru-falls': 'https://commons.wikimedia.org/wiki/Special:FilePath/Hundru_Falls%2C_Jharkhand%2C_India.jpg?width=1280',
  'dassam-falls': 'https://commons.wikimedia.org/wiki/Special:FilePath/Dassam_Falls%2C_Jharkhand%2C_India_01.jpg?width=1280',
  'betla-national-park': 'https://commons.wikimedia.org/wiki/Special:FilePath/Forest_in_Betla_National_Park_2025.jpg?width=1280',
  'baidyanath-temple-deoghar': 'https://commons.wikimedia.org/wiki/Special:FilePath/Baba_Baidyanath_Jyotirlinga_Temple.jpg?width=1280',
  'sarhul-festival': 'https://commons.wikimedia.org/wiki/Special:FilePath/Sarhul_Festival_Celebration_In_Central_University_Of_Jharkhand_%2CBrambe_Campus%2C_Ranchi.jpg?width=1280',
  'dhuska-rugra-food': 'https://commons.wikimedia.org/wiki/Special:FilePath/Dhuska-Jharkhand.jpg?width=1280',
  'patratu-valley': 'https://commons.wikimedia.org/wiki/Special:FilePath/Patratu_Valley_at_night.jpg?width=1280'
};

const applyRealJharkhandPhoto = (destination) => {
  const realPhoto = realJharkhandPhotos[destination.slug];

  if (!realPhoto) {
    return destination;
  }

  return {
    ...destination,
    image_url: realPhoto,
    gallery: JSON.stringify([realPhoto])
  };
};

const { query } = require('../config/db');

exports.getAllDestinations = async (req, res, next) => {
  try {
    const { category, district, search, sort, state } = req.query;
    const selectedState = state && ['jharkhand', 'tamilnadu'].includes(state) ? state : 'jharkhand';
    let sql = 'SELECT * FROM destinations WHERE 1=1 AND state = ?';
    const params = [selectedState];

    if (category && category !== 'all') {
      sql += ' AND category = ?';
      params.push(category);
    }

    if (district && district !== 'all') {
      sql += ' AND district = ?';
      params.push(district);
    }

    if (search) {
      sql += ' AND (title LIKE ? OR description LIKE ? OR location_name LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term);
    }

    if (sort === 'rating') {
      sql += ' ORDER BY avg_rating DESC';
    } else if (sort === 'price') {
      sql += ' ORDER BY entry_fee ASC';
    } else {
      sql += ' ORDER BY id ASC';
    }

    const [destinations] = await query(sql, params);
    res.json({
      success: true,
      count: destinations.length,
      destinations: destinations.map(applyRealJharkhandPhoto),
      state: selectedState
    });
  } catch (error) {
    next(error);
  }
};

exports.getDestinationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [destinations] = await query('SELECT * FROM destinations WHERE id = ?', [id]);
    
    if (destinations.length === 0) {
      return res.status(404).json({ success: false, message: 'Destination not found.' });
    }

    const destination = applyRealJharkhandPhoto(destinations[0]);
    
    // Fetch associated reviews
    const [reviews] = await query(
      'SELECT r.*, u.name as user_name, u.avatar_url FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.destination_id = ? ORDER BY r.created_at DESC',
      [id]
    );

    destination.reviews = reviews;
    res.json({ success: true, destination });
  } catch (error) {
    next(error);
  }
};

exports.createDestination = async (req, res, next) => {
  try {
    const {
      title,
      category,
      description,
      location_name,
      district,
      latitude,
      longitude,
      image_url,
      opening_hours,
      entry_fee,
      best_time
    } = req.body;

    if (!title || !category || !description || !location_name || !district || !latitude || !longitude) {
      return res.status(400).json({ success: false, message: 'Please fill in all required destination fields.' });
    }

    const img = req.file ? `/uploads/${req.file.filename}` : (image_url || 'https://commons.wikimedia.org/wiki/Special:FilePath/Hundru_Falls%2C_Jharkhand%2C_India.jpg?width=1280');

    const slug = title.toLowerCase().replace(/[^a-z0-9]/g, '-');

    const [result] = await query(
      `INSERT INTO destinations 
       (title, slug, category, description, location_name, district, latitude, longitude, image_url, opening_hours, entry_fee, best_time, state)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, slug, category, description, location_name, district, latitude, longitude, img, opening_hours || '8:00 AM - 5:00 PM', entry_fee || 0, best_time || 'October to March', 'jharkhand']
    );

    res.status(201).json({
      success: true,
      message: 'Destination added successfully!',
      destinationId: result.insertId
    });
  } catch (error) {
    next(error);
  }
};

exports.updateDestination = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, category, description, location_name, district, entry_fee } = req.body;

    const [result] = await query(
      'UPDATE destinations SET title = ?, category = ?, description = ?, location_name = ?, district = ?, entry_fee = ? WHERE id = ?',
      [title, category, description, location_name, district, entry_fee, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Destination not found for updating.' });
    }

    res.json({ success: true, message: 'Destination updated successfully!' });
  } catch (error) {
    next(error);
  }
};

exports.deleteDestination = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await query('DELETE FROM destinations WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Destination not found for deletion.' });
    }

    res.json({ success: true, message: 'Destination deleted successfully!' });
  } catch (error) {
    next(error);
  }
};
