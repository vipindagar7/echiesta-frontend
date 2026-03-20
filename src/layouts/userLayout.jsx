import React from "react";
import { Outlet } from "react-router-dom";

export default function userLayout() {
    return (
        <div className="min-h-screen flex">

            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white p-5">
                <h2 className="text-xl mb-4">user Panel</h2>
                <ul className="space-y-2">
                    <li className="hover:text-blue-400 cursor-pointer"><a href="/user">Dashboard</a></li>
                    <li className="hover:text-blue-400 cursor-pointer"><a href="/user/get-concert-registration">Concert Registration</a></li>
                    <li className="hover:text-blue-400 cursor-pointer"><a href="/user/get-event-registration">Event Registration</a></li>
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