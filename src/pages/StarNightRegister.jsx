import React, { useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
const API_URL = import.meta.env.VITE_API_URL;

export default function StarNightRegister() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        institute: "",
        aadhar: "",
    });

    const [loading, setLoading] = useState(false);
    const [qrData, setQrData] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    // Handle Input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(
                `${API_URL}/api/star-night/register`,
                formData
            );

            // send meaningful QR data
            setQrData(res.data.data._id || res.data._id);
        } catch (err) {
            if (err.response?.data?.message === "You have already registered for DJ Night") {
                setErrorMsg("⚠️ Email already registered");
            } else {
                setErrorMsg("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

// Download QR as PNG
const downloadQR = () => {
    const svg = document.getElementById("qr-code");
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);

    const img = new Image();
    const svgBlob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        URL.revokeObjectURL(url);

        const pngUrl = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = "star-night-ticket.png";
        link.click();
    };

    img.src = url;
};
    return (
        <section className="min-h-screen flex items-center justify-center bg-black px-4 text-white">

            <div className="w-full max-w-6xl grid md:grid-cols-2 bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.6)]">

                {/* LEFT PANEL */}
                <div className="p-8 bg-gradient-to-br from-blue-900/80 to-black flex flex-col justify-center">
                    <h2 className="text-4xl font-extrabold text-yellow-400 mb-4">
                        Star Night 🎧
                    </h2>
                    <p className="text-gray-300">
                        Secure your entry to the most electrifying night.
                    </p>

                    <div className="mt-6 space-y-2 text-sm text-gray-400">
                        <p>📅 28 March</p>
                        <p>⏰ 9:00 PM</p>
                        <p>📍 EIT Faridabad</p>
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="p-8">

                    {!qrData ? (
                        <>
                            <h3 className="text-2xl font-semibold mb-6">
                                Register Now
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">

                                <input
                                    name="name"
                                    placeholder="Full Name"
                                    required
                                    onChange={handleChange}
                                    className="input"
                                />

                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    required
                                    onChange={handleChange}
                                    className="input"
                                />

                                <input
                                    name="phone"
                                    placeholder="Phone Number"
                                    required
                                    onChange={handleChange}
                                    className="input"
                                />

                                <input
                                    name="institute"
                                    placeholder="Institute / College"
                                    required
                                    onChange={handleChange}
                                    className="input"
                                />

                                <input
                                    name="aadhar"
                                    placeholder="Aadhar Number"
                                    required
                                    onChange={handleChange}
                                    className="input"
                                />
                                {errorMsg && (
                                    <p className="text-red-400 text-sm">{errorMsg}</p>
                                )}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:scale-105 transition"
                                >
                                    {loading ? "Registering..." : "Register"}
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <h3 className="text-2xl text-center font-semibold mb-4">
                                🎉 You're In!
                            </h3>

                            <div className="flex justify-center mb-4">
                                <QRCode
                                    id="qr-code"
                                    value={JSON.stringify(qrData)}
                                    size={180}
                                    bgColor="#ffffff"
                                />
                            </div>

                            <button
                                onClick={downloadQR}
                                className="w-full py-3 bg-green-500 rounded-lg font-semibold hover:scale-105 transition"
                            >
                                Download Ticket QR
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Tailwind Utility Fix */}
            <style>
                {`
          .input {
            width: 100%;
            padding: 12px;
            border-radius: 8px;
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.2);
            outline: none;
          }
          .input:focus {
            border: 1px solid #facc15;
          }
        `}
            </style>
        </section>
    );
}