const weatherService = require('../services/weatherService');

exports.getWeather = async (req, res, next) => {
  try {
    const { city, lat, lng } = req.query;
    const weatherData = await weatherService.getWeatherByCityOrCoords(city, lat, lng);
    res.json({ success: true, weather: weatherData });
  } catch (error) {
    next(error);
  }
};
