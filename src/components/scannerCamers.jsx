import React, { useState, useRef } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const ScannerCamera = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const scannedRef = useRef(false); // 🔥 prevent multiple scans

    // 🔊 Beep sound
    const playBeep = () => {
        const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
        audio.play();
    };

    // 📷 QR Scan
    const handleScan = (result) => {
        if (result?.[0]?.rawValue && !scannedRef.current) {
            scannedRef.current = true;

            const id = result[0].rawValue;

            playBeep();

            // 📳 vibrate (mobile)
            if (navigator.vibrate) {
                navigator.vibrate(200);
            }

            navigate(`/scanner/ticket/${id}`);
        }
    };

    // 🔍 Search
    const handleSearch = async (type) => {
        try {
            const value = type === "email" ? email : phone;

            if (!value) return alert("Please enter value");

            setLoading(true);

            const res = await axios.get(
                `${API_URL}/api/star-night/search?${type}=${value}`,
                { withCredentials: true }
            );

            const id = res.data.data?._id;

            if (!id) {
                alert("User not found");
                return;
            }

            navigate(`/scanner/ticket/${id}`);

        } catch (err) {
            alert(err.response?.data?.message || "Search failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full">

            {/* 📷 Scanner */}
            <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-xl border border-green-500 relative">

                <Scanner
                    onScan={handleScan}
                    constraints={{ facingMode: "environment" }}
                />

                {/* Scan Frame */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-48 h-48 border-2 border-green-400 rounded-lg animate-pulse"></div>
                </div>

            </div>

            {/* 🔍 Search */}
            <div className="w-full max-w-sm bg-gray-800 p-5 rounded-xl text-white space-y-4 shadow-lg">

                <h3 className="text-center font-semibold text-lg">
                    🔍 Search User
                </h3>

                {/* Email */}
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    disabled={loading}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 outline-none"
                />

                <button
                    onClick={() => handleSearch("email")}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded transition"
                >
                    {loading ? "Searching..." : "Search by Email"}
                </button>

                {/* Phone */}
                <input
                    type="text"
                    placeholder="Enter Phone"
                    value={phone}
                    disabled={loading}
                    onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, ""))
                    }
                    className="w-full p-2 rounded bg-gray-700 outline-none"
                />

                <button
                    onClick={() => handleSearch("phone")}
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 py-2 rounded transition"
                >
                    {loading ? "Searching..." : "Search by Phone"}
                </button>

            </div>
        </div>
    );
};

export default ScannerCamera;