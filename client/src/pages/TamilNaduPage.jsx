import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiMapPin, FiStar, FiCompass, FiArrowRight, FiSearch, FiMap } from 'react-icons/fi';
import { tamilNaduDestinations, tamilNaduCategories, tamilNaduHeroSlides, tamilNaduStats } from '../data/tamilNaduDestinations';
import SkeletonLoader from '../components/SkeletonLoader';

const categoryIcons = {
  all: '✨',
  hills: '🌄',
  beaches: '🏖️',
  temples: '🛕',
  waterfalls: '💧',
  wildlife: '🦌',
  heritage: '🏛️',
};

const TamilNaduPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedHotspot, setSelectedHotspot] = useState('Madurai');

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % tamilNaduHeroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const filteredDestinations = useMemo(() => {
    if (selectedCategory === 'all') return tamilNaduDestinations;
    return tamilNaduDestinations.filter((destination) => destination.category === selectedCategory);
  }, [selectedCategory]);

  const hotspotData = {
    Chennai: { title: 'Chennai', subtitle: 'Marina Beach, Fort St. George, Kapaleeshwarar Temple, and coastal energy.' },
    Madurai: { title: 'Madurai', subtitle: 'Meenakshi Amman Temple, historic corridors, and cultural legacy.' },
    Coimbatore: { title: 'Coimbatore', subtitle: 'Adiyogi Shiva, Anamalai Tiger Reserve, and Western Ghats.' },
    Ooty: { title: 'Ooty & Nilgiris', subtitle: 'Tea estates, Mudumalai wildlife, Coonoor, and misty mountain air.' },
    Kanyakumari: { title: 'Kanyakumari', subtitle: 'Meeting point of three seas, Vivekananda Rock, and sunrise panoramas.' },
    Thanjavur: { title: 'Thanjavur', subtitle: 'Brihadeeswarar Temple, Chola architecture, and royal heritage.' },
  };

  const featuredHotspots = [
    { name: 'Chennai', left: '80%', top: '20%' },
    { name: 'Ooty', left: '22%', top: '44%' },
    { name: 'Coimbatore', left: '32%', top: '54%' },
    { name: 'Thanjavur', left: '68%', top: '56%' },
    { name: 'Madurai', left: '48%', top: '70%' },
    { name: 'Kanyakumari', left: '44%', top: '90%' },
  ];

  return (
    <div className="bg-[#fbf7f4] text-slate-800 dark:bg-slate-950 dark:text-slate-100 min-h-screen">
      {/* Hero Banner */}
      <section className="relative overflow-hidden min-h-[620px]">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{
            backgroundImage: `linear-gradient(120deg, rgba(46, 13, 24, 0.85), rgba(74, 15, 29, 0.55)), url(${tamilNaduHeroSlides[activeSlide] || tamilNaduHeroSlides[0]})`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#f2c770]/40 bg-[#4a0f1d]/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#fce9ba] backdrop-blur-sm">
              <FiCompass className="text-base text-[#f2c770]" />
              Tamil Nadu Tourism Experience
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-white">
              Explore Tamil Nadu - <span className="text-[#f2c770]">Where Heritage Meets Nature</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base sm:text-lg text-[#f6e1bf] leading-relaxed">
              Discover ancient Dravidian temples, misty Nilgiri hill stations, sun-drenched coastal beaches, pristine waterfalls, and rich cultural heritage across Tamil Nadu.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start gap-3">
              <Link
                to="/destinations?state=tamilnadu"
                className="inline-flex items-center gap-2 rounded-full bg-[#f2c770] px-6 py-3 font-bold text-[#2d0d17] shadow-lg shadow-[#f2c770]/30 transition hover:-translate-y-0.5 hover:bg-[#e0b457]"
              >
                Explore Destinations
                <FiArrowRight />
              </Link>
              <Link
                to="/planner"
                className="inline-flex items-center gap-2 rounded-full border border-[#f2c770]/40 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Plan a Trip
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tamilNaduStats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-[#e8d5be] bg-white p-5 shadow-lg shadow-[#4a0f1d]/10 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="text-2xl font-black text-[#7d2d3c] dark:text-[#f2c770]">{stat.value}</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-600 dark:text-slate-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8 text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#7d2d3c] dark:text-[#f2c770]">Tamil Nadu Experiences</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Discover by Category</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {tamilNaduCategories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={`group rounded-2xl border p-4 text-center transition-all ${
                selectedCategory === category.id
                  ? 'border-[#7d2d3c] bg-[#7d2d3c] text-white shadow-lg shadow-[#7d2d3c]/20'
                  : 'border-[#eadac1] bg-white hover:border-[#7d2d3c] hover:bg-[#fff5f0] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-[#f2c770]'
              }`}
            >
              <div className="text-2xl">{categoryIcons[category.id] || '✨'}</div>
              <div className="mt-2 text-xs font-bold">{category.label}</div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#7d2d3c] dark:text-[#f2c770]">Top Attractions</p>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">Tamil Nadu Highlights</h3>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[#d9c8a9] bg-white px-3 py-2 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            <FiSearch className="text-[#7d2d3c] dark:text-[#f2c770]" />
            {filteredDestinations.length} destinations found
          </div>
        </div>

        {loading ? (
          <SkeletonLoader count={6} />
        ) : filteredDestinations.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#d9c8a9] bg-white py-16 text-center dark:border-slate-800 dark:bg-slate-900">
            <FiMapPin className="mx-auto text-4xl text-[#7d2d3c] dark:text-[#f2c770]" />
            <h4 className="mt-4 text-xl font-black text-slate-900 dark:text-white">No destinations match this filter</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Try another category to explore more of Tamil Nadu.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.03, 0.3), duration: 0.3 }}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-3xl border border-[#eadac1] bg-white shadow-lg shadow-[#7d2d3c]/5 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.imageAlt || destination.title}
                    loading="lazy"
                    className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12070d]/75 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-[#f2c770] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#2d0d17]">
                    {destination.category}
                  </span>
                  <button
                    type="button"
                    className="absolute right-4 top-4 rounded-full bg-white/80 p-2 text-[#7d2d3c] shadow-md backdrop-blur-sm transition hover:scale-105"
                    aria-label={`Save ${destination.title}`}
                  >
                    <FiHeart className="text-lg" />
                  </button>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7d2d3c] dark:text-[#f2c770]">
                    <FiMapPin />
                    {destination.district || destination.location}
                  </div>

                  <h4 className="mt-2 text-xl font-black text-slate-900 dark:text-white line-clamp-1">{destination.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2">{destination.shortDescription}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#7d2d3c] dark:text-[#f2c770]">
                      <FiStar className="fill-current" />
                      {destination.rating}
                    </div>
                    <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">{destination.entryFee}</div>
                  </div>

                  <Link
                    to={`/tamil-nadu/${destination.slug}`}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#7d2d3c] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#5b1a2d]"
                  >
                    Explore Details
                    <FiArrowRight />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Hotspots Map View */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-[30px] border border-[#eadac1] bg-white p-6 sm:p-8 shadow-lg shadow-[#7d2d3c]/5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#7d2d3c] dark:text-[#f2c770]">Interactive Guide</p>
              <h3 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Tamil Nadu at a Glance</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Tap key hubs across Tamil Nadu to discover temple trails, hill stations, wildlife reserves, and scenic coastal getaways.
              </p>
            </div>

            <div className="w-full max-w-lg">
              <div className="relative h-72 rounded-[28px] border border-[#eadac1] bg-[radial-gradient(circle_at_top,_rgba(242,199,112,0.28),_rgba(125,45,60,0.15)_40%,_rgba(46,13,24,0.3)_100%)] overflow-hidden dark:border-slate-800">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:36px_36px]" />
                {featuredHotspots.map((spot) => (
                  <button
                    key={spot.name}
                    type="button"
                    onClick={() => setSelectedHotspot(spot.name)}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] transition ${
                      selectedHotspot === spot.name
                        ? 'border-[#f2c770] bg-[#f2c770] text-[#2d0d17] shadow-lg shadow-[#f2c770]/25'
                        : 'border-white/50 bg-[#4a0f1d]/70 text-white hover:bg-[#7d2d3c]'
                    }`}
                    style={{ left: spot.left, top: spot.top }}
                  >
                    {spot.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-[#eadac1] bg-[#fdf8f4] p-5 dark:border-slate-800 dark:bg-slate-950/50">
            <div className="flex items-center gap-2 text-[#7d2d3c] dark:text-[#f2c770]">
              <FiMap className="text-lg" />
              <span className="text-xs font-black uppercase tracking-[0.12em]">Featured Region</span>
            </div>
            <h4 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">{selectedHotspot}</h4>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{hotspotData[selectedHotspot]?.subtitle || 'Explore more routes and heritage trails across Tamil Nadu.'}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TamilNaduPage;
