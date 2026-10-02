import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiCompass, FiMapPin, FiPhoneCall, FiMail, FiHeart } from 'react-icons/fi';

const Footer = () => {
  const location = useLocation();
  const isTamilNaduRoute = location.pathname.startsWith('/tamil-nadu');

  if (isTamilNaduRoute) {
    return (
      <footer className="bg-[#2d0d17] text-[#f5e8d3] pt-12 pb-10 border-t border-[#f2c770]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#f2c770]/15">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7d2d3c] to-[#d6a75d] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#7d2d3c]/30">
                  <FiCompass />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">Explore Tamil Nadu</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#e7d7c3]">
                Discover the cultural soul, temple heritage, hill stations, beaches, and wildlife journeys that make Tamil Nadu one of India’s most vibrant travel destinations.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Quick Links</h4>
              <ul className="space-y-2.5 text-sm text-[#f1dcb8]">
                <li><Link to="/tamil-nadu" className="hover:text-white transition">Tamil Nadu Home</Link></li>
                <li><Link to="/destinations?state=tamilnadu" className="hover:text-white transition">Destinations</Link></li>
                <li><Link to="/planner" className="hover:text-white transition">Trip Planner</Link></li>
                <li><Link to="/weather" className="hover:text-white transition">Weather</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Travel Helpline</h4>
              <ul className="space-y-3 text-sm text-[#f1dcb8]">
                <li className="flex items-start gap-3">
                  <FiMapPin className="text-[#f2c770] text-lg mt-0.5" />
                  <span>Tourism Department, Government of Tamil Nadu</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiPhoneCall className="text-[#f2c770] text-lg" />
                  <span>1800-425-4060</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiMail className="text-[#f2c770] text-lg" />
                  <span>tourism@tn.gov.in</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#e7d7c3]">
            <p>© 2025-2026 Explore Tamil Nadu • Heritage • Coast • Hills</p>
            <div className="flex items-center gap-1">
              <span>Crafted with</span>
              <FiHeart className="text-rose-400 fill-rose-400 text-sm mx-1" />
              <span>for Tamil Nadu Tourism</span>
            </div>
          </div>
        </div>
      </footer>
    );
  }

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
