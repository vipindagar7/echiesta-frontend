import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        formData
        // ❌ removed withCredentials (not needed anymore)
      );

      // ✅ Store user safely
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ FIX: store token WITHOUT JSON.stringify
      localStorage.setItem("token", res.data.token);

      // ✅ Redirect based on role
      const role = res.data.user.role;

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "user") {
        navigate("/user");
      } else if (role === "gamer") {
        navigate("/gamer")
      } else {
        navigate("/scanner");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl w-[350px] space-y-4 shadow-lg"
      >
        <h2 className="text-white text-2xl text-center font-semibold">
          Login
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        {/* Button */}
        <button
          disabled={loading}
          className={`w-full py-2 rounded text-white font-medium transition ${loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}