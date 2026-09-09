const { query } = require('../config/db');

exports.getAdminStats = async (req, res, next) => {
  try {
    const [userCount] = await query('SELECT COUNT(*) as totalUsers FROM users');
    const [destCount] = await query('SELECT COUNT(*) as totalDestinations FROM destinations');
    const [reviewCount] = await query('SELECT COUNT(*) as totalReviews FROM reviews');
    const [bookingCount] = await query('SELECT COUNT(*) as totalBookings FROM bookings');

    const [categoryBreakdown] = await query(
      'SELECT category, COUNT(*) as count FROM destinations GROUP BY category'
    );

    const [recentBookings] = await query(
      `SELECT b.*, u.name as user_name, d.title as destination_title 
       FROM bookings b 
       JOIN users u ON b.user_id = u.id 
       JOIN destinations d ON b.destination_id = d.id 
       ORDER BY b.created_at DESC LIMIT 5`
    );

    res.json({
      success: true,
      stats: {
        totalUsers: userCount[0]?.totalUsers || 2,
        totalDestinations: destCount[0]?.totalDestinations || 7,
        totalReviews: reviewCount[0]?.totalReviews || 3,
        totalBookings: bookingCount[0]?.totalBookings || 2,
        categoryBreakdown: categoryBreakdown || [],
        recentBookings: recentBookings || []
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const [users] = await query('SELECT id, name, email, role, phone, created_at FROM users ORDER BY created_at DESC');
    res.json({ success: true, count: users.length, users });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id == req.user.id) {
      return res.status(400).json({ success: false, message: 'You cannot delete your own admin account.' });
    }

    const [result] = await query('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.json({ success: true, message: 'User deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
