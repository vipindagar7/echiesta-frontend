import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const TicketCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState({
        checkIn: false,
        checkOut: false,
        delete: false,
        fetch: false,
    });

    const [ticket, setTicket] = useState(null);

    const fetchData = async () => {
        try {
            setLoading((prev) => ({ ...prev, fetch: true }));

            const res = await axios.get(
                `${API_URL}/api/star-night/getRegistration/${id}`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            setTicket(res.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading((prev) => ({ ...prev, fetch: false }));
        }
    };

    const handleCheckIn = async () => {
        try {
            setLoading((prev) => ({ ...prev, checkIn: true }));

            await axios.patch(
                `${API_URL}/api/star-night/checkin/${ticket._id}`,
                {},
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            setTicket((prev) => ({ ...prev, isCheckedIn: true }));
        } catch (err) {
            alert(err.response?.data?.message || "Check-in failed");
        } finally {
            setLoading((prev) => ({ ...prev, checkIn: false }));
        }
    };

    const handleCheckOut = async () => {
        try {
            setLoading((prev) => ({ ...prev, checkOut: true }));

            await axios.patch(
                `${API_URL}/api/star-night/checkout/${ticket._id}`,
                {},
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            setTicket((prev) => ({ ...prev, isCheckedIn: false }));
        } catch (err) {
            alert(err.response?.data?.message || "Check-out failed");
        } finally {
            setLoading((prev) => ({ ...prev, checkOut: false }));
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Delete this registration?")) return;

        try {
            setLoading((prev) => ({ ...prev, delete: true }));

            await axios.delete(`${API_URL}/api/star-night/delete/${ticket._id}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            alert("Deleted successfully");
            navigate(-1);
        } catch (error) {
            alert(error.response?.data?.message || "Delete failed");
        } finally {
            setLoading((prev) => ({ ...prev, delete: false }));
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    if (loading.fetch) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                Loading ticket...
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">

            <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6 text-white">

                <h2 className="text-2xl font-bold text-center mb-4">
                    🎫 Concert Ticket
                </h2>

                {/* Status Badge */}
                <div className="flex justify-center mb-4">
                    <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold ${ticket?.isCheckedIn
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                            }`}
                    >
                        {ticket?.isCheckedIn ? "Checked-in" : "Not Checked-in"}
                    </span>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {ticket?.name}</p>
                    <p><strong>Email:</strong> {ticket?.email}</p>
                    <p><strong>Phone:</strong> {ticket?.phone}</p>
                    <p><strong>Institute:</strong> {ticket?.institute}</p>
                    <p><strong>Institute Type:</strong> {ticket?.instituteType}</p>
                    <p><strong>Aadhar:</strong> {ticket?.aadhar}</p>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex flex-col gap-3">

                    {!ticket?.isCheckedIn && (
                        <button
                            onClick={handleCheckIn}
                            disabled={loading.checkIn}
                            className="w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 transition"
                        >
                            {loading.checkIn ? "Checking..." : "✅ Check-in"}
                        </button>
                    )}

                    {ticket?.isCheckedIn && (
                        <button
                            onClick={handleCheckOut}
                            disabled={loading.checkOut}
                            className="w-full py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition"
                        >
                            {loading.checkOut ? "Processing..." : "🚪 Check-out"}
                        </button>
                    )}

                    <button
                        onClick={handleDelete}
                        disabled={loading.delete}
                        className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
                    >
                        {loading.delete ? "Deleting..." : "🗑 Delete"}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default TicketCard;