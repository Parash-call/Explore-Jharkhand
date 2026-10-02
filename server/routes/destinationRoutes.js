const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');
const publicAdminMiddleware = require('../middleware/publicAdmin');
const upload = require('../middleware/upload');

router.get('/', destinationController.getAllDestinations);
router.get('/:id', destinationController.getDestinationById);
router.post('/', publicAdminMiddleware, upload.single('image'), destinationController.createDestination);
router.put('/:id', publicAdminMiddleware, destinationController.updateDestination);
router.delete('/:id', publicAdminMiddleware, destinationController.deleteDestination);

module.exports = router;
