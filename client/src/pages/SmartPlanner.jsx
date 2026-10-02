import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCalendar, FiDollarSign, FiMapPin, FiCompass, 
  FiCheckCircle, FiCheck, FiNavigation, FiBriefcase 
} from 'react-icons/fi';
import API from '../services/api';
import { useNotification } from '../context/NotificationContext';

const SmartPlanner = () => {
  const { triggerNotification } = useNotification();

  const [budget, setBudget] = useState(6000);
  const [days, setDays] = useState(3);
  const [startLocation, setStartLocation] = useState('Ranchi');
  const [interests, setInterests] = useState(['waterfall', 'wildlife', 'temple', 'adventure']);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState('');

  const availableInterests = [
    { id: 'waterfall', label: 'Waterfalls & Rivers', icon: '🌊' },
    { id: 'wildlife', label: 'Wildlife & Parks', icon: '🐅' },
    { id: 'temple', label: 'Temples & Heritage', icon: '🛕' },
    { id: 'festival', label: 'Festivals & Culture', icon: '🥁' },
    { id: 'food', label: 'Local Food & Cuisine', icon: '🍲' },
    { id: 'adventure', label: 'Hill Valleys & Boating', icon: '⛰️' },
    { id: 'beach', label: 'Beaches & Coastlines', icon: '🏖️' },
    { id: 'heritage', label: 'Historic Places', icon: '🏛️' },
    { id: 'hillstation', label: 'Hill Stations', icon: '🌄' },
    { id: 'nature', label: 'Nature & Scenic Views', icon: '🌿' },
    { id: 'culture', label: 'Culture & Lifestyle', icon: '🎭' },
    { id: 'family', label: 'Family-Friendly', icon: '👨‍👩‍👧‍👦' }
  ];

  const toggleInterest = (id) => {
    if (interests.includes(id)) {
      if (interests.length > 1) {
        setInterests(interests.filter(item => item !== id));
      }
    } else {
      setInterests([...interests, id]);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      setPlan(null);
      const res = await API.post('/planner/generate', {
        budget,
        days,
        startLocation,
        interests
      });

      if (res.success) {
        setPlan(res.data);
        triggerNotification({
          title: 'Smart Itinerary Generated! 🚀',
          message: `Created a customized ${days}-day plan tailored to your ₹${budget} budget.`,
          type: 'success'
        });
      }
    } catch (err) {
      setError(err.message || 'Unable to generate the itinerary. Please try again.');
      triggerNotification({ title: 'Error', message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Backend Algorithm Powered
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          Smart Travel Itinerary & Budget Generator
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          No fake static data. Our backend algorithm dynamically builds customized day-by-day travel plans, cost breakdowns, and weather packing checklists.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Form Inputs */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
          
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FiCompass className="text-emerald-600" /> Input Trip Preferences
          </h3>

          <form onSubmit={handleGenerate} className="space-y-5">
            
            {/* Budget */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Estimated Budget (INR)</label>
                <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">₹{budget}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="25000"
                step="500"
                value={budget}
                onChange={(e) => setBudget(parseInt(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            {/* Days */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Trip Duration (Days)
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 5, 7].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDays(d)}
                    className={`py-2 rounded-xl text-xs font-bold transition ${
                      days === d
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {d} {d === 1 ? 'Day' : 'Days'}
                  </button>
                ))}
              </div>
            </div>

            {/* Starting Location */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Starting City / District
              </label>
              <select
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="Ranchi">Ranchi (Capital)</option>
                <option value="Jamshedpur">Jamshedpur</option>
                <option value="Deoghar">Deoghar</option>
                <option value="Dhanbad">Dhanbad</option>
                <option value="Netarhat">Netarhat</option>
                <option value="Chennai">Chennai</option>
                <option value="Madurai">Madurai</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Ooty">Ooty</option>
                <option value="Kanyakumari">Kanyakumari</option>
              </select>
            </div>

            {/* Interests checklist */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Select Your Interests
              </label>
              <div className="grid grid-cols-2 gap-2">
                {availableInterests.map((item) => {
                  const selected = interests.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleInterest(item.id)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs font-bold transition ${
                        selected
                          ? 'border-emerald-600 bg-emerald-600/10 text-emerald-600 dark:text-emerald-400'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span>{item.icon}</span> {item.label}
                      </span>
                      {selected && <FiCheck className="text-base" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generate Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-blue-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 hover:scale-[1.02] transition disabled:opacity-50"
            >
              {loading ? 'Building Itinerary...' : 'Generate Smart Itinerary'}
            </button>

          </form>

        </div>

        {/* Right Output View */}
        <div className="lg:col-span-7">
          {error ? (
            <div className="min-h-[400px] flex flex-col items-center justify-center p-8 rounded-3xl border border-rose-300 bg-rose-50 text-center space-y-3 dark:border-rose-500/30 dark:bg-rose-950/20">
              <h3 className="text-xl font-bold text-rose-700 dark:text-rose-300">Itinerary generation failed</h3>
              <p className="text-sm text-rose-600 dark:text-rose-200">{error}</p>
              <button
                type="button"
                onClick={() => setError('')}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold"
              >
                Try Again
              </button>
            </div>
          ) : plan ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Summary Banner */}
              <div className="p-6 rounded-3xl glass-card border border-emerald-500/30 shadow-xl bg-gradient-to-br from-emerald-950/20 via-transparent to-blue-950/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-extrabold uppercase text-emerald-600">Smart Calculation Result</span>
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                      {plan.summary.totalDays} Days Travel Plan ({plan.summary.season})
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-sm">
                    ₹{plan.summary.totalBudget} Budget
                  </span>
                </div>

                {/* Budget Breakdown Pill */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                    <span className="text-[10px] text-slate-500 block">Stay</span>
                    <span className="font-bold text-emerald-600">₹{plan.summary.budgetBreakdown.accommodation}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                    <span className="text-[10px] text-slate-500 block">Food</span>
                    <span className="font-bold text-blue-600">₹{plan.summary.budgetBreakdown.foodAndDining}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                    <span className="text-[10px] text-slate-500 block">Transport</span>
                    <span className="font-bold text-amber-600">₹{plan.summary.budgetBreakdown.localTransport}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                    <span className="text-[10px] text-slate-500 block">Entry Fees</span>
                    <span className="font-bold text-purple-600">₹{plan.summary.budgetBreakdown.entryFees}</span>
                  </div>
                </div>
              </div>

              {/* Day-by-Day Itinerary */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Day-by-Day Itinerary</h4>
                {plan.itinerary.map((item) => (
                  <div key={item.day} className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">{item.theme}</h5>
                      <span className="text-xs font-bold text-slate-400">Est. Day Exp: ₹{item.estimatedDayExpense}</span>
                    </div>

                    <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                      <p>🌅 <strong>Morning:</strong> {item.morning}</p>
                      <p>☀️ <strong>Afternoon:</strong> {item.afternoon}</p>
                      <p>🌙 <strong>Evening:</strong> {item.evening}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Packing Advice */}
              <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FiBriefcase className="text-emerald-600" /> Seasonal Packing Suggestions
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {plan.packingSuggestions.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <FiCheckCircle className="text-emerald-600 text-sm shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 text-center space-y-3">
              <FiCompass className="text-5xl text-emerald-600 animate-pulse" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Configure Your Trip Parameters</h3>
              <p className="text-xs text-slate-500 max-w-sm">
                Adjust your budget, days, and interests on the left to generate your custom trip itinerary.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default SmartPlanner;
