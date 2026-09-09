const { query } = require('../config/db');

exports.getReviewsByDestination = async (req, res, next) => {
  try {
    const { destinationId } = req.params;
    const [reviews] = await query(
      `SELECT r.*, u.name as user_name, u.avatar_url 
       FROM reviews r 
       JOIN users u ON r.user_id = u.id 
       WHERE r.destination_id = ? 
       ORDER BY r.created_at DESC`,
      [destinationId]
    );

    res.json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    next(error);
  }
};

exports.addReview = async (req, res, next) => {
  try {
    const { destination_id, rating, comment } = req.body;
    const userId = req.user.id;

    if (!destination_id || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Destination ID, rating (1-5), and comment are required.' });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await query(
      'INSERT INTO reviews (user_id, destination_id, rating, comment, image_url) VALUES (?, ?, ?, ?, ?)',
      [userId, destination_id, rating, comment, imageUrl]
    );

    // Update destination avg_rating & review_count
    const [stats] = await query(
      'SELECT AVG(rating) as avgRating, COUNT(*) as cnt FROM reviews WHERE destination_id = ?',
      [destination_id]
    );

    if (stats.length > 0) {
      const avg = parseFloat(stats[0].avgRating || rating).toFixed(2);
      const cnt = stats[0].cnt || 1;
      await query('UPDATE destinations SET avg_rating = ?, review_count = ? WHERE id = ?', [avg, cnt, destination_id]);
    }

    // Emit Socket.IO notification if available
    const io = req.app.get('io');
    if (io) {
      io.emit('review_added', {
        destination_id,
        user_name: req.user.name,
        rating,
        comment
      });
    }

    res.status(201).json({
      success: true,
      message: 'Review posted successfully!',
      reviewId: result.insertId
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    // Check ownership or admin
    const [reviews] = await query('SELECT * FROM reviews WHERE id = ?', [id]);
    if (reviews.length === 0) {
      return res.status(404).json({ success: false, message: 'Review not found.' });
    }

    const review = reviews[0];
    if (review.user_id !== userId && userRole !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized to delete this review.' });
    }

    await query('DELETE FROM reviews WHERE id = ?', [id]);

    // Recalculate rating
    const [stats] = await query(
      'SELECT AVG(rating) as avgRating, COUNT(*) as cnt FROM reviews WHERE destination_id = ?',
      [review.destination_id]
    );
    const avg = stats[0]?.avgRating ? parseFloat(stats[0].avgRating).toFixed(2) : 4.50;
    const cnt = stats[0]?.cnt || 0;
    await query('UPDATE destinations SET avg_rating = ?, review_count = ? WHERE id = ?', [avg, cnt, review.destination_id]);

    res.json({ success: true, message: 'Review removed successfully.' });
  } catch (error) {
    next(error);
  }
};
