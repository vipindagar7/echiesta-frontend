import React from "react";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl mb-4">Admin Panel</h2>
        <button>Logout</button>
        <ul className="space-y-2">
          <li className="hover:text-blue-400 cursor-pointer"><a href="/admin">Dashboard</a></li>
          <li className="hover:text-blue-400 cursor-pointer"><a href="/admin/create-user">Create User</a></li>
          <li className="hover:text-blue-400 cursor-pointer"><a href="/admin/get-users">Get Users</a></li>
          <li className="hover:text-blue-400 cursor-pointer"><a href="/admin/get-concert-registration">Concert Registration</a></li>
          <li className="hover:text-blue-400 cursor-pointer"><a href="/admin/get-event-registration">Event Registration</a></li>
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