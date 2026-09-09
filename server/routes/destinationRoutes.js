const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const upload = require('../middleware/upload');

router.get('/', destinationController.getAllDestinations);
router.get('/:id', destinationController.getDestinationById);
router.post('/', authMiddleware, adminMiddleware, upload.single('image'), destinationController.createDestination);
router.put('/:id', authMiddleware, adminMiddleware, destinationController.updateDestination);
router.delete('/:id', authMiddleware, adminMiddleware, destinationController.deleteDestination);

module.exports = router;
