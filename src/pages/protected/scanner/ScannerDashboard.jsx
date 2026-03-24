import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const ScannerDashboard = () => {
    const navigate = useNavigate();

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const res = await axios.get(
                `${API_URL}/api/user/stats`,
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

    // 🔄 Loader
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="animate-spin h-12 w-12 border-t-2 border-blue-500 rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4 md:p-6">

            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
                📊 Scanner Dashboard
            </h1>

            {/* 🔥 Scan Pass CTA */}
            <div className="mb-6 flex justify-center md:justify-end">
                <button
                    onClick={() => navigate("/scanner/scan")}
                    className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-xl font-semibold shadow-lg transition"
                >
                    🎫 Scan Passes
                </button>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                <Card
                    title="Total Event Registrations"
                    value={stats.totalEventRegistrations}
                    color="blue"
                />

                <Card
                    title="Total Concert Registrations"
                    value={stats.totalConcertRegistrations}
                    color="purple"
                />

                <Card
                    title="Checked-in (Concert)"
                    value={stats.checkedInConcert}
                    color="green"
                />

                <Card
                    title="Pending Check-ins"
                    value={stats.pendingConcert}
                    color="yellow"
                />

            </div>
        </div>
    );
};

// 🎯 Reusable Card
const Card = ({ title, value, color }) => {
    const colors = {
        blue: "from-blue-500/20 to-blue-700/20 border-blue-500",
        purple: "from-purple-500/20 to-purple-700/20 border-purple-500",
        green: "from-green-500/20 to-green-700/20 border-green-500",
        yellow: "from-yellow-500/20 to-yellow-700/20 border-yellow-500",
    };

    return (
        <div
            className={`bg-gradient-to-br ${colors[color]} border backdrop-blur-lg p-5 rounded-2xl shadow-lg hover:scale-105 transition duration-300`}
        >
            <h2 className="text-gray-300 text-sm">{title}</h2>
            <p className="text-3xl font-bold mt-3">{value}</p>
        </div>
    );
};

export default ScannerDashboard;