import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false); // ✅ loading state

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // ✅ start loading
    setError(null);

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        formData,
        { withCredentials: true }
      );

      // store user
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", JSON.stringify(res.data.token));

      // redirect based on role
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else if (res.data.user.role === "user") {
        navigate("/user");
      } else {
        navigate("/scanner");
      }

    } catch (err) {
      setError(err.response?.data?.message);
      console.error(err.response?.data?.message);
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl w-[350px] space-y-4"
      >
        <h2 className="text-white text-2xl text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-gray-700 text-white"
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-gray-700 text-white"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          disabled={loading}
          className={`w-full py-2 rounded text-white transition ${
            loading
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