import axios from "axios";
import React from "react";
const API_URL = import.meta.env.VITE_API_URL;

const ScannerLayout = () => {
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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-4 py-6">
        <button className="bg-red-800 hover:bg-red-400 text-white p-1 rounded-xl" onClick={handleLogout}>Logout</button>

      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">🎫 Event Check-in</h1>

      {/* Scanner Box */}
      <div className="w-full max-w-sm h-64 bg-black rounded-xl flex items-center justify-center relative overflow-hidden">

        {/* Placeholder Camera */}
        <p className="text-gray-400">Camera Preview</p>

        {/* Scan Frame */}
        <div className="absolute border-2 border-green-500 w-48 h-48 rounded-lg animate-pulse"></div>
      </div>

      {/* Info Card */}
      <div className="mt-6 w-full max-w-sm bg-gray-800 p-5 rounded-xl shadow-lg space-y-2">

        <h2 className="text-lg font-semibold text-center mb-2">
          User Details
        </h2>

        <p><strong>Name:</strong> ---</p>
        <p><strong>Email:</strong> ---</p>
        <p><strong>Phone:</strong> ---</p>

        <p>
          <strong>Status:</strong>{" "}
          <span className="text-yellow-400">Not Checked-in</span>
        </p>

        {/* Button */}
        <button
          className="w-full mt-3 bg-green-600 hover:bg-green-700 py-2 rounded-lg transition"
        >
          Check-in
        </button>
      </div>

      {/* Footer Hint */}
      <p className="text-gray-500 text-sm mt-6">
        Scan the QR code to fetch user details
      </p>

    </div>
  );
};

export default ScannerLayout;