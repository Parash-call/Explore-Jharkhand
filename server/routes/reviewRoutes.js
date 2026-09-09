const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/destination/:destinationId', reviewController.getReviewsByDestination);
router.post('/', authMiddleware, upload.single('image'), reviewController.addReview);
router.delete('/:id', authMiddleware, reviewController.deleteReview);

module.exports = router;
