const { query } = require('../config/db');

exports.getUserBookings = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const [bookings] = await query(
      `SELECT b.*, d.title as destination_title, d.image_url as destination_image, d.location_name 
       FROM bookings b 
       JOIN destinations d ON b.destination_id = d.id 
       WHERE b.user_id = ? 
       ORDER BY b.created_at DESC`,
      [userId]
    );

    res.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    next(error);
  }
};

exports.createBooking = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { destination_id, type, title, booking_date, guests, total_price, special_requests } = req.body;

    if (!destination_id || !type || !booking_date || !total_price) {
      return res.status(400).json({ success: false, message: 'Missing required booking parameters.' });
    }

    const bookingTitle = title || (type === 'guide' ? 'Local Tourism Guide Service' : 'Authentic Tribal Homestay Stay');

    const [result] = await query(
      `INSERT INTO bookings (user_id, destination_id, type, title, booking_date, guests, total_price, status, special_requests) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 'confirmed', ?)`,
      [userId, destination_id, type, bookingTitle, booking_date, guests || 1, total_price, special_requests || null]
    );

    // Save notification
    const notifMsg = `Your ${type === 'guide' ? 'Guide' : 'Homestay'} booking (${bookingTitle}) is confirmed for ${booking_date}.`;
    await query(
      'INSERT INTO notifications (user_id, title, message, type) VALUES (?, ?, ?, ?)',
      [userId, 'Booking Confirmed!', notifMsg, 'booking']
    );

    // Emit Socket.IO event
    const io = req.app.get('io');
    if (io) {
      io.emit('booking_confirmed', {
        user_id: userId,
        booking_id: result.insertId,
        message: notifMsg
      });
    }

    res.status(201).json({
      success: true,
      message: 'Booking confirmed successfully!',
      bookingId: result.insertId
    });
  } catch (error) {
    next(error);
  }
};

exports.cancelBooking = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const [result] = await query(
      'UPDATE bookings SET status = ? WHERE id = ? AND user_id = ?',
      ['cancelled', id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Booking not found or already cancelled.' });
    }

    res.json({ success: true, message: 'Booking cancelled successfully.' });
  } catch (error) {
    next(error);
  }
};
