const plannerService = require('../services/plannerService');

exports.generateItinerary = async (req, res, next) => {
  try {
    const { budget, days, startLocation, interests } = req.body;

    if (!budget || !days) {
      return res.status(400).json({ success: false, message: 'Please provide both trip budget and duration (days).' });
    }

    const itineraryPlan = await plannerService.generateSmartItinerary({
      budget,
      days,
      startLocation,
      interests
    });

    res.json({
      success: true,
      data: itineraryPlan
    });
  } catch (error) {
    next(error);
  }
};
