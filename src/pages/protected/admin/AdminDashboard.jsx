import React, { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL
const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/admin/stats`,
        { withCredentials: true }
      );

      setStats(res.data);
    } catch (error) {
      console.error(
        error.response?.data?.message || "Error fetching stats"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-semibold">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <Card title="Total Event Registrations" value={stats.totalEventRegistrations} />
        <Card title="Total Concert Registrations" value={stats.totalConcertRegistrations} />
        <Card title="Checked-in (Concert)" value={stats.checkedInConcert} />
        <Card title="Pending Check-ins" value={stats.pendingConcert} />
        <Card title="Total Users" value={stats.totalUsers} />

        {/* Role Breakdown */}
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">User Roles</h2>
          <p className="text-gray-700">Admins: {stats.admins}</p>
          <p className="text-gray-700">Users: {stats.users}</p>
        </div>

      </div>
    </div>
  );
};

// Reusable Card Component
const Card = ({ title, value }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
      <h2 className="text-gray-600 text-sm">{title}</h2>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default AdminDashboard;