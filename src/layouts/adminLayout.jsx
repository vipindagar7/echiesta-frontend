import axios from "axios";
import React from "react";
import { Outlet } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

export default function AdminLayout() {
  async function handleLogout() {
    try {
      await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout API failed", err);
    } finally {

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/admin-login";
    }
  }
  return (
    <div className="min-h-screen flex">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl mb-4">Admin Panel</h2>
        <button className="bg-red-800 hover:bg-red-400 text-white p-1 rounded-xl" onClick={handleLogout}>Logout</button>
        <ul className="space-y-2">
          <li className="hover:text-blue-400 cursor-pointer"><a href="/admin">Dashboard</a></li>
          <li className="hover:text-blue-400 cursor-pointer"><a href="/admin/create-user">Create User</a></li>
          <li className="hover:text-blue-400 cursor-pointer"><a href="/admin/get-users">Get Users</a></li>
          <li className="hover:text-blue-400 cursor-pointer"><a href="/admin/get-concert-registration">Concert Registration</a></li>
          <li className="hover:text-blue-400 cursor-pointer"><a href="/admin/get-event-registration">Event Registration</a></li>
          <li className="hover:text-blue-400 cursor-pointer"><a href="/admin/getGamingRegistration">Gaming Registration</a></li>
          <li className="hover:text-blue-400 cursor-pointer"><a href="/admin/getCounslingRegistration">Counsling Registration</a></li>
        </ul>

      </div>


      {/* Main */}
      <div className="flex-1 bg-gray-100 p-6">
        <div className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
}