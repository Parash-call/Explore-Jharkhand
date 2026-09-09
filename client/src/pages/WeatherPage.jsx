import React, { useState } from 'react';
import { FiCloudRain, FiSun, FiMapPin } from 'react-icons/fi';
import WeatherCard from '../components/WeatherCard';

const WeatherPage = () => {
  const cities = ['Ranchi', 'Deoghar', 'Netarhat', 'Jamshedpur', 'Dhanbad', 'Palamu'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div>
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          OpenWeather API Live Integration
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
          Jharkhand Weather Dashboard & Travel Advisories
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Real-time weather monitoring across key tourism hubs for safe waterfall treks and safari planning.
        </p>
      </div>

      {/* Grid of Weather Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city) => (
          <WeatherCard key={city} city={city} />
        ))}
      </div>

    </div>
  );
};

export default WeatherPage;
