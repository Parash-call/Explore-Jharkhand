import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiHeart,
  FiMapPin,
  FiNavigation,
  FiStar,
  FiSun,
  FiCompass,
} from 'react-icons/fi';
import { tamilNaduDestinations } from '../data/tamilNaduDestinations';
import BookingModal from '../components/BookingModal';

const TamilNaduDetailPage = () => {
  const { slug } = useParams();
  const [selectedGallery, setSelectedGallery] = useState(0);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const destination = useMemo(
    () => tamilNaduDestinations.find((item) => item.slug === slug || item.id === slug),
    [slug]
  );

  const bookingDestination = useMemo(() => {
    if (!destination) return null;
    return {
      id: destination.id || destination.slug,
      title: destination.title,
      image_url: destination.image || (Array.isArray(destination.gallery) ? destination.gallery[0] : ''),
      location_name: destination.location || destination.district,
      district: destination.district || destination.location,
      entry_fee: destination.entryFee || 0
    };
  }, [destination]);

  if (!destination) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="rounded-3xl border border-dashed border-[#d9c8a9] bg-white p-10 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7d2d3c] dark:text-[#f2c770]">Destination unavailable</p>
          <h2 className="mt-4 text-3xl font-black text-slate-900 dark:text-white">This Tamil Nadu destination is not available.</h2>
          <Link
            to="/tamil-nadu"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#7d2d3c] px-5 py-3 text-sm font-bold text-white hover:bg-[#5b1a2d]"
          >
            <FiArrowLeft />
            Back to Tamil Nadu
          </Link>
        </div>
      </div>
    );
  }

  const galleryList = Array.isArray(destination.gallery) && destination.gallery.length > 0
    ? destination.gallery
    : [destination.image];

  const nearbyPlaces = [
    'Heritage Walk',
    'Sunrise Point',
    'Local Food Street',
    'Viewpoint Trail',
    'Cultural Plaza',
    'Scenic Drive',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
      <Link
        to="/tamil-nadu"
        className="inline-flex items-center gap-2 rounded-full border border-[#d9c8a9] bg-white px-4 py-2 text-sm font-bold text-[#5f1f2d] transition hover:border-[#7d2d3c] dark:border-slate-800 dark:bg-slate-900 dark:text-[#f2c770]"
      >
        <FiArrowLeft />
        Back to Tamil Nadu
      </Link>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="overflow-hidden rounded-[28px] border border-[#eadac1] bg-white shadow-xl shadow-[#7d2d3c]/10 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="relative h-[420px] md:h-[520px]">
              <img
                src={galleryList[selectedGallery] || destination.image}
                alt={destination.imageAlt || destination.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12070d]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#f2c770] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#2d0d17]">
                  {destination.category}
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white backdrop-blur-md">
                  {destination.district || destination.location}
                </span>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#7d2d3c] dark:text-[#f2c770]">
                    <FiMapPin />
                    {destination.location || destination.district}
                  </div>
                  <h1 className="mt-2 text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">{destination.title}</h1>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-full border border-[#d9c8a9] bg-white p-3 text-[#7d2d3c] transition hover:bg-[#fff0dc] dark:border-slate-800 dark:bg-slate-950 dark:text-[#f2c770]"
                    aria-label={`Save ${destination.title}`}
                  >
                    <FiHeart className="text-lg" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(true)}
                    className="rounded-full bg-[#7d2d3c] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#7d2d3c]/20 transition hover:bg-[#5d1d2d] active:scale-95"
                  >
                    Book Guided Trip / Stay
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[{
                  label: 'Rating', value: `${destination.rating || 4.8} / 5`, icon: FiStar,
                }, {
                  label: 'Best time', value: destination.bestTime || destination.bestTimeToVisit || 'October to March', icon: FiCalendar,
                }, {
                  label: 'Entry fee', value: destination.entryFee || 'Free', icon: FiDollarSign,
                }, {
                  label: 'Hours', value: destination.timings || 'Open all day', icon: FiClock,
                }].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="rounded-2xl border border-[#eadac1] bg-[#fffdfb] p-3 dark:border-slate-800 dark:bg-slate-950/50">
                    <div className="flex items-center gap-2 text-[#7d2d3c] dark:text-[#f2c770]">
                      <Icon className="text-base" />
                      <span className="text-[10px] font-black uppercase tracking-[0.12em]">{label}</span>
                    </div>
                    <div className="mt-2 text-sm font-bold text-slate-800 dark:text-slate-200">{value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Overview</h2>
                <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">{destination.description || destination.shortDescription}</p>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-[#eadac1] bg-[#fffaf3] p-5 dark:border-slate-800 dark:bg-slate-950/60">
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Must-do activities</h3>
                  <ul className="mt-4 space-y-3">
                    {(destination.activities || destination.attractions || ['Sightseeing', 'Photography', 'Heritage walk']).map((activity) => (
                      <li key={activity} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-[#f2c770]" />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-[#eadac1] bg-[#fffaf3] p-5 dark:border-slate-800 dark:bg-slate-950/60">
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">How to reach</h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{destination.howToReach || 'Easily reachable by road and rail across Tamil Nadu network.'}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {galleryList.length > 1 && (
            <div className="mt-8 rounded-[28px] border border-[#eadac1] bg-white p-5 shadow-xl shadow-[#7d2d3c]/10 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2 text-[#7d2d3c] dark:text-[#f2c770]">
                <FiCompass className="text-lg" />
                <span className="text-xs font-black uppercase tracking-[0.16em]">Gallery</span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {galleryList.map((image, index) => (
                  <button
                    key={image + index}
                    type="button"
                    onClick={() => setSelectedGallery(index)}
                    className={`overflow-hidden rounded-2xl border transition ${
                      index === selectedGallery
                        ? 'border-[#7d2d3c] ring-2 ring-[#f2c770]/70'
                        : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${destination.imageAlt || destination.title} ${index + 1}`}
                      loading="lazy"
                      className="h-28 w-full object-cover transition hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-8">
          
          {/* Instant Booking Card */}
          <div className="rounded-[28px] border border-[#eadac1] bg-white p-6 shadow-xl shadow-[#7d2d3c]/10 dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#7d2d3c] dark:text-[#f2c770]">Experience Package</span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Heritage Tour & Guide</h3>
              </div>
              <span className="rounded-full bg-[#f2c770] px-3 py-1 text-xs font-black text-[#2d0d17]">From ₹800</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Book certified Tamil Nadu cultural guides and authentic coastal & hill homestays with instant reservation confirmation.
            </p>
            <button
              type="button"
              onClick={() => setBookingModalOpen(true)}
              className="w-full rounded-2xl bg-[#7d2d3c] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#7d2d3c]/25 transition hover:bg-[#5d1d2d] active:scale-95"
            >
              Book Guide / Homestay Now
            </button>
          </div>

          <div className="rounded-[28px] border border-[#eadac1] bg-white p-5 shadow-xl shadow-[#7d2d3c]/10 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-[#7d2d3c] dark:text-[#f2c770]">
              <FiSun className="text-lg" />
              <span className="text-xs font-black uppercase tracking-[0.16em]">Weather Snapshot</span>
            </div>
            <div className="mt-5 rounded-2xl bg-gradient-to-br from-[#fff0d8] to-[#f6e7ca] p-4 dark:from-slate-800 dark:to-slate-900">
              <div className="text-4xl font-black text-[#2d0d17] dark:text-white">28°C</div>
              <div className="mt-1 text-sm font-semibold text-[#5f1f2d] dark:text-[#f2c770]">Pleasant weather with clear skies</div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#eadac1] bg-white p-5 shadow-xl shadow-[#7d2d3c]/10 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-[#7d2d3c] dark:text-[#f2c770]">
              <FiNavigation className="text-lg" />
              <span className="text-xs font-black uppercase tracking-[0.16em]">Nearby Places</span>
            </div>
            <div className="mt-5 space-y-3">
              {nearbyPlaces.map((place) => (
                <div key={place} className="flex items-center justify-between rounded-2xl border border-[#eadac1] bg-[#fffdfb] px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200">
                  <span>{place}</span>
                  <span className="text-[#7d2d3c] dark:text-[#f2c770]">3 km</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingDestination && (
        <BookingModal
          destination={bookingDestination}
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TamilNaduDetailPage;
