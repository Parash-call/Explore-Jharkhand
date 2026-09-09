import React from 'react';
import { Link } from 'react-router-dom';
import { FiCompass, FiMapPin, FiPhoneCall, FiMail, FiHeart } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-600/30">
                <FiCompass />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Explore Jharkhand</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Official Smart Tourism Platform for Jharkhand under SIH 2025 (Problem Code: SIH25032). Discover majestic waterfalls, wildlife sanctuaries, ancient temples, and vibrant tribal heritage.
            </p>
            <div className="flex items-center gap-3 text-xs text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Live Google Maps & OpenWeather Integrated
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/destinations" className="hover:text-emerald-400 transition">Destinations Directory</Link></li>
              <li><Link to="/map" className="hover:text-emerald-400 transition">Interactive Google Map</Link></li>
              <li><Link to="/planner" className="hover:text-emerald-400 transition">Smart Trip Planner</Link></li>
              <li><Link to="/weather" className="hover:text-emerald-400 transition">Live Weather Forecast</Link></li>
              <li><Link to="/wishlist" className="hover:text-emerald-400 transition">Saved Wishlist</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Destinations</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/destinations?category=waterfall" className="hover:text-emerald-400 transition">Waterfalls (Hundru, Dassam, Lodh)</Link></li>
              <li><Link to="/destinations?category=wildlife" className="hover:text-emerald-400 transition">Wildlife (Betla, Dalma)</Link></li>
              <li><Link to="/destinations?category=temple" className="hover:text-emerald-400 transition">Temples (Baidyanath Dham)</Link></li>
              <li><Link to="/destinations?category=festival" className="hover:text-emerald-400 transition">Festivals (Sarhul, Karma)</Link></li>
              <li><Link to="/destinations?category=food" className="hover:text-emerald-400 transition">Local Food (Dhuska, Rugra)</Link></li>
            </ul>
          </div>

          {/* Contact & Helpline */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Tourism Helpline</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-emerald-400 text-lg mt-0.5" />
                <span>Department of Tourism, Govt. of Jharkhand, Ranchi - 834001</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhoneCall className="text-emerald-400 text-lg" />
                <span>Toll-Free Helpline: 1800-345-6570</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-emerald-400 text-lg" />
                <span>support@explorejharkhand.gov.in</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2025-2026 Explore Jharkhand • Built for Smart India Hackathon (SIH25032)</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <FiHeart className="text-rose-500 fill-rose-500 text-sm mx-1" />
            <span>for Jharkhand Tourism</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
