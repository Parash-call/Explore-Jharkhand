import React, { useState, useEffect } from 'react';
import { 
  FiShield, FiUsers, FiMapPin, FiMessageSquare, 
  FiBriefcase, FiPlus, FiTrash2, FiEdit2, FiCheckCircle, FiX 
} from 'react-icons/fi';
import API from '../services/api';
import { useNotification } from '../context/NotificationContext';

const AdminDashboard = () => {
  const { triggerNotification } = useNotification();

  const [stats, setStats] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('destinations'); // 'destinations' or 'users'
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New Destination Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'waterfall',
    description: '',
    location_name: '',
    district: 'Ranchi',
    latitude: 23.3441,
    longitude: 85.3096,
    image_url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hundru_Falls%2C_Jharkhand%2C_India.jpg?width=1280',
    entry_fee: 20,
    opening_hours: '8:00 AM - 5:00 PM',
    best_time: 'October to March'
  });

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [statsRes, destRes, usersRes] = await Promise.all([
        API.get('/admin/stats'),
        API.get('/destinations?state=jharkhand'),
        API.get('/admin/users')
      ]);

      if (statsRes.success) setStats(statsRes.stats);
      if (destRes.success) setDestinations(destRes.destinations);
      if (usersRes.success) setUsers(usersRes.users);
    } catch (err) {
      console.error(err);
      triggerNotification({ title: 'Error', message: 'Failed to fetch admin telemetry.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleDeleteDestination = async (id) => {
    if (!window.confirm('Are you sure you want to delete this destination from MySQL?')) return;
    try {
      const res = await API.delete(`/destinations/${id}`);
      if (res.success) {
        triggerNotification({ title: 'Deleted', message: 'Destination removed successfully.', type: 'success' });
        fetchAdminData();
      }
    } catch (err) {
      triggerNotification({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user account permanently?')) return;
    try {
      const res = await API.delete(`/admin/users/${id}`);
      if (res.success) {
        triggerNotification({ title: 'User Deleted', message: 'User account removed.', type: 'success' });
        fetchAdminData();
      }
    } catch (err) {
      triggerNotification({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  const handleCreateDestination = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/destinations', formData);
      if (res.success) {
        triggerNotification({ title: 'Success', message: 'New destination added to portal!', type: 'success' });
        setAddModalOpen(false);
        fetchAdminData();
      }
    } catch (err) {
      triggerNotification({ title: 'Error', message: err.message, type: 'error' });
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-pulse space-y-4">
        <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-500">
            Administrator Command Portal
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5 flex items-center gap-2">
            <FiShield className="text-amber-500" /> Explore Jharkhand Admin Portal
          </h1>
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-emerald-600 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-2 hover:scale-105 transition"
        >
          <FiPlus className="text-lg" /> Add New Destination
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        
        <div className="p-5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center text-2xl font-bold">
            <FiUsers />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-semibold block">Total Users</span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{stats?.totalUsers || 0}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-2xl font-bold">
            <FiMapPin />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-semibold block">Destinations</span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{stats?.totalDestinations || 0}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-2xl font-bold">
            <FiMessageSquare />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-semibold block">Reviews</span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{stats?.totalReviews || 0}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center text-2xl font-bold">
            <FiBriefcase />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 font-semibold block">Bookings</span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{stats?.totalBookings || 0}</span>
          </div>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('destinations')}
          className={`pb-3 px-4 font-bold text-sm border-b-2 transition ${
            activeTab === 'destinations'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-slate-500'
          }`}
        >
          Manage Destinations ({destinations.length})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 px-4 font-bold text-sm border-b-2 transition ${
            activeTab === 'users'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-slate-500'
          }`}
        >
          Registered Users ({users.length})
        </button>
      </div>

      {/* Destinations Table View */}
      {activeTab === 'destinations' && (
        <div className="rounded-2xl glass-card overflow-x-auto border border-slate-200 dark:border-slate-800 shadow-xl">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white uppercase font-bold text-[10px]">
              <tr>
                <th className="p-4">Destination Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">District</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Entry Fee</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {destinations.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                  <td className="p-4 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <img src={d.image_url} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <span>{d.title}</span>
                  </td>
                  <td className="p-4 uppercase">{d.category}</td>
                  <td className="p-4">{d.district}</td>
                  <td className="p-4 font-bold text-amber-500">⭐ {parseFloat(d.avg_rating || 4.5).toFixed(1)}</td>
                  <td className="p-4">₹{d.entry_fee}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleDeleteDestination(d.id)}
                      className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                      title="Delete Destination"
                    >
                      <FiTrash2 className="text-base" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Users Table View */}
      {activeTab === 'users' && (
        <div className="rounded-2xl glass-card overflow-x-auto border border-slate-200 dark:border-slate-800 shadow-xl">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white uppercase font-bold text-[10px]">
              <tr>
                <th className="p-4">User Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{u.name}</td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      u.role === 'admin' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-600'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4">{new Date(u.created_at).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 transition"
                      title="Delete User"
                    >
                      <FiTrash2 className="text-base" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Destination Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-xl glass-card rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600"
            >
              <FiX className="text-xl" />
            </button>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-4">Add Destination to Portal</h3>

            <form onSubmit={handleCreateDestination} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="waterfall">Waterfall</option>
                    <option value="wildlife">Wildlife</option>
                    <option value="temple">Temple</option>
                    <option value="festival">Festival</option>
                    <option value="food">Local Food</option>
                    <option value="adventure">Adventure</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">District</label>
                  <input
                    type="text"
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Location Name</label>
                <input
                  type="text"
                  required
                  value={formData.location_name}
                  onChange={(e) => setFormData({ ...formData, location_name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Latitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    required
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Longitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    required
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Description</label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition"
              >
                Save Destination to MySQL
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
