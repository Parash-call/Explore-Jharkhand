const express = require('express');
const router = express.Router();
const placesController = require('../controllers/placesController');

router.get('/nearby', placesController.getNearbyPlaces);
router.get('/route', placesController.calculateRouteDistance);

module.exports = router;
