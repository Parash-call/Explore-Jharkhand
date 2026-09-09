const { query } = require('../config/db');

exports.getAllDestinations = async (req, res, next) => {
  try {
    const { category, district, search, sort } = req.query;
    let sql = 'SELECT * FROM destinations WHERE 1=1';
    const params = [];

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
    res.json({ success: true, count: destinations.length, destinations });
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

    const destination = destinations[0];
    
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

    const img = req.file ? `/uploads/${req.file.filename}` : (image_url || 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1000&q=80');

    const slug = title.toLowerCase().replace(/[^a-z0-9]/g, '-');

    const [result] = await query(
      `INSERT INTO destinations 
       (title, slug, category, description, location_name, district, latitude, longitude, image_url, opening_hours, entry_fee, best_time)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, slug, category, description, location_name, district, latitude, longitude, img, opening_hours || '8:00 AM - 5:00 PM', entry_fee || 0, best_time || 'October to March']
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
