const express = require('express');
const router = express.Router();
const plannerController = require('../controllers/plannerController');

router.post('/generate', plannerController.generateItinerary);

module.exports = router;
