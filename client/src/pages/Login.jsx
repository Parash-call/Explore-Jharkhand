import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiCompass, FiShield, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const Login = () => {
  const { login } = useAuth();
  const { triggerNotification } = useNotification();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = await login(email, password);
      triggerNotification({
        title: 'Welcome Back! 👋',
        message: `Logged in successfully as ${user.name} (${user.role}).`,
        type: 'success'
      });
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      triggerNotification({ title: 'Authentication Failed', message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Demo Login Helper
  const handleQuickDemo = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-blue-700 mx-auto flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-emerald-600/30">
            <FiCompass />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Sign In to Your Account</h2>
          <p className="text-xs text-slate-500">Access saved wishlist, bookings, and interactive smart trip planner.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-3.5 text-slate-400 text-base" />
              <input
                type="email"
                required
                placeholder="aarav@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-3.5 text-slate-400 text-base" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 hover:scale-[1.02] transition disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Accounts Panel */}
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs space-y-2 border border-slate-200 dark:border-slate-800">
          <span className="font-bold text-slate-500 block text-[10px] uppercase">Quick Demo One-Click Login</span>
          <div className="flex gap-2">
            <button
              onClick={() => handleQuickDemo('aarav@gmail.com', 'password123')}
              className="flex-1 py-1.5 px-2 rounded-lg bg-emerald-600/10 text-emerald-600 font-bold hover:bg-emerald-600 hover:text-white transition flex items-center justify-center gap-1"
            >
              <FiUser /> Tourist Demo
            </button>
            <button
              onClick={() => handleQuickDemo('admin@jharkhand.gov.in', 'password123')}
              className="flex-1 py-1.5 px-2 rounded-lg bg-amber-500/10 text-amber-600 font-bold hover:bg-amber-500 hover:text-white transition flex items-center justify-center gap-1"
            >
              <FiShield /> Admin Demo
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-bold text-emerald-600 hover:underline">
            Register Here
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
