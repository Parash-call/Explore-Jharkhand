const { query } = require('../config/db');

exports.getWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const [wishlistItems] = await query(
      `SELECT d.*, w.id as wishlist_id, w.created_at as added_at 
       FROM wishlist w 
       JOIN destinations d ON w.destination_id = d.id 
       WHERE w.user_id = ? 
       ORDER BY w.created_at DESC`,
      [userId]
    );

    res.json({ success: true, count: wishlistItems.length, wishlist: wishlistItems });
  } catch (error) {
    next(error);
  }
};

exports.toggleWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { destination_id } = req.body;

    if (!destination_id) {
      return res.status(400).json({ success: false, message: 'Destination ID is required.' });
    }

    // Check if exists
    const [existing] = await query('SELECT * FROM wishlist WHERE user_id = ? AND destination_id = ?', [userId, destination_id]);

    if (existing.length > 0) {
      // Remove
      await query('DELETE FROM wishlist WHERE user_id = ? AND destination_id = ?', [userId, destination_id]);
      return res.json({ success: true, isWishlisted: false, message: 'Removed from wishlist.' });
    } else {
      // Add
      await query('INSERT INTO wishlist (user_id, destination_id) VALUES (?, ?)', [userId, destination_id]);
      return res.json({ success: true, isWishlisted: true, message: 'Added to wishlist!' });
    }
  } catch (error) {
    next(error);
  }
};
