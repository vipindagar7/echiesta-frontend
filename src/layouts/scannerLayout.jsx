import React from "react";
import axios from "axios";
import { useNavigate, Outlet } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const ScannerLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout API failed", err);
    } finally {
      localStorage.clear();
      navigate("/admin-login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* 🔥 Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-gray-800 shadow-md">
        <h1 className="text-xl font-bold">🎫 Scanner Panel</h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* 🔥 Page Content via Outlet */}
      <div className="flex flex-col items-center p-6">
        <Outlet />
      </div>

    </div>
  );
};

export default ScannerLayout;