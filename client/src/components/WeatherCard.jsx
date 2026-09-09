import React, { useState, useEffect } from 'react';
import { FiCloudRain, FiWind, FiDroplet, FiSun, FiRefreshCw } from 'react-icons/fi';
import API from '../services/api';

const WeatherCard = ({ city = 'Ranchi' }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/weather?city=${encodeURIComponent(city)}`);
      if (res.success) {
        setWeather(res.weather);
      }
    } catch (err) {
      console.warn('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    // Auto refresh every 5 minutes
    const interval = setInterval(fetchWeather, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [city]);

  if (loading) {
    return (
      <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 animate-pulse space-y-4">
        <div className="h-6 w-32 bg-slate-300 dark:bg-slate-800 rounded"></div>
        <div className="h-10 w-24 bg-slate-300 dark:bg-slate-800 rounded"></div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="p-6 rounded-2xl glass-card border border-emerald-500/20 shadow-xl relative overflow-hidden bg-gradient-to-br from-emerald-900/10 via-transparent to-blue-900/10">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            {weather.isLiveApi ? 'Live OpenWeather' : 'Realtime Forecast'}
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">{weather.city}, JH</h3>
        </div>
        <button
          onClick={fetchWeather}
          className="p-2 rounded-xl text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
          title="Refresh Weather"
        >
          <FiRefreshCw className={`text-base ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Temp & Description */}
      <div className="mt-4 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{weather.temp}°</span>
            <span className="text-sm font-semibold text-slate-500">C</span>
          </div>
          <p className="text-xs font-medium text-slate-600 dark:text-slate-300 capitalize mt-1">
            {weather.description} • Feels like {weather.feels_like}°C
          </p>
        </div>
        <div className="text-4xl text-amber-500">
          <FiSun className="animate-spin-slow" />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800/80 text-center">
        <div className="p-2 rounded-xl bg-slate-100/50 dark:bg-slate-800/50">
          <FiDroplet className="mx-auto text-blue-500 text-base mb-1" />
          <span className="block text-[10px] text-slate-500 font-semibold">Humidity</span>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{weather.humidity}%</span>
        </div>

        <div className="p-2 rounded-xl bg-slate-100/50 dark:bg-slate-800/50">
          <FiWind className="mx-auto text-emerald-500 text-base mb-1" />
          <span className="block text-[10px] text-slate-500 font-semibold">Wind</span>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{weather.wind_speed} km/h</span>
        </div>

        <div className="p-2 rounded-xl bg-slate-100/50 dark:bg-slate-800/50">
          <FiCloudRain className="mx-auto text-indigo-500 text-base mb-1" />
          <span className="block text-[10px] text-slate-500 font-semibold">Rain Chance</span>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{weather.rain_chance}%</span>
        </div>
      </div>

      {/* Travel Advisory */}
      {weather.travel_advice && (
        <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs font-medium border border-emerald-500/20">
          💡 <strong>Travel Advisory:</strong> {weather.travel_advice}
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
