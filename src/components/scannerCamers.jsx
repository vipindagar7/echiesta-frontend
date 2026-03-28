import React, { useState, useRef } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const ScannerCamera = () => {
    const navigate = useNavigate();

    const [results, setResults] = useState([]);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [showScanner, setShowScanner] = useState(false); // ✅ toggle camera

    const scannedRef = useRef(false);

    // 🔊 Beep sound
    const playBeep = () => {
        const audio = new Audio(
            "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
        );
        audio.play();
    };

    // 📷 Handle Scan
    const handleScan = (result) => {
        if (result?.[0]?.rawValue && !scannedRef.current) {
            scannedRef.current = true;

            const id = result[0].rawValue;

            playBeep();

            // 📳 vibrate (mobile)
            if (navigator.vibrate) {
                navigator.vibrate(200);
            }

            // ❌ close camera after scan
            setShowScanner(false);

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
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const data = res.data.data;

            if (!data || data.length === 0) {
                alert("User not found");
                return;
            }

            setResults(Array.isArray(data) ? data : [data]);
        } catch (err) {
            alert(err.response?.data?.message || "Search failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full p-4">

            {/* ✅ Scan Button */}
            {!showScanner && (
                <button
                    onClick={() => {
                        setShowScanner(true);
                        scannedRef.current = false;
                    }}
                    className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white"
                >
                    📷 Start Scan
                </button>
            )}

            {/* 📷 Scanner */}
            {showScanner && (
                <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-xl border border-green-500 relative">

                    <Scanner
                        onScan={handleScan}
                        constraints={{ facingMode: "environment" }}
                    />

                    {/* Scan Frame */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-48 h-48 border-2 border-green-400 rounded-lg animate-pulse"></div>
                    </div>

                    {/* ❌ Stop Button */}
                    <button
                        onClick={() => setShowScanner(false)}
                        className="absolute top-2 right-2 bg-red-600 px-2 py-1 rounded text-white text-sm"
                    >
                        ❌ Stop
                    </button>
                </div>
            )}

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

            {/* 📊 Results */}
            {results.length > 0 && (
                <div className="mt-6 overflow-x-auto w-full max-w-3xl">
                    <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">

                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Phone</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {results.map((user) => (
                                <tr
                                    key={user._id}
                                    className="text-center border-b border-gray-600"
                                >
                                    <td className="px-4 py-2">{user.name}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2">{user.phone}</td>

                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() =>
                                                navigate(`/scanner/ticket/${user._id}`)
                                            }
                                            className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                                        >
                                            View Ticket
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            )}
        </div>
    );
};

export default ScannerCamera;