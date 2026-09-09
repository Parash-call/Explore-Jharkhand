const placesService = require('../services/placesService');

exports.getNearbyPlaces = async (req, res, next) => {
  try {
    const { lat, lng, type } = req.query;
    if (!lat || !lng) {
      return res.status(400).json({ success: false, message: 'Latitude and Longitude parameters are required.' });
    }

    const places = await placesService.getNearbyPlaces(lat, lng, type || 'lodging');
    res.json({ success: true, count: places.length, places });
  } catch (error) {
    next(error);
  }
};

exports.calculateRouteDistance = async (req, res, next) => {
  try {
    const { originLat, originLng, destLat, destLng } = req.query;
    if (!originLat || !originLng || !destLat || !destLng) {
      return res.status(400).json({ success: false, message: 'Origin and Destination coordinates are required.' });
    }

    const routeData = await placesService.calculateDistanceAndRoute(originLat, originLng, destLat, destLng);
    res.json({ success: true, route: routeData });
  } catch (error) {
    next(error);
  }
};
