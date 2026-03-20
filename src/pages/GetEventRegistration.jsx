import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const GetEventRegistration = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                `${API_URL}/api/events/event-registrations`,
                { withCredentials: true }
            );

            setData(res.data.data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getRegistrationDetails = (id) => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) return;

        if (user.role === "admin") {
            navigate(`/admin/event-registration-details/${id}`);
        } else {
            navigate(`/user/event-registration-details/${id}`);
        }
    };

    // 🔄 Loader
    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="animate-spin h-10 w-10 border-t-2 border-blue-600 rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="p-6">

            <h2 className="text-2xl font-bold mb-4">
                Event Registrations
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-xl shadow">

                    <thead className="bg-gray-200">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>College</th>
                            <th>Events</th>
                            <th>Total Fee</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item._id} className="text-center border-t">

                                {/* Serial */}
                                <td>{index + 1}</td>

                                {/* Student Info */}
                                <td>{item.student?.name}</td>
                                <td>{item.student?.email}</td>
                                <td>{item.student?.phone}</td>
                                <td>{item.student?.college}</td>

                                {/* Events */}
                                <td className="text-left">
                                    {item.events.map((event, i) => (
                                        <div key={i} className="border-b py-1">

                                            <p className="font-semibold">
                                                {event.eventName}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                {event.type} | {event.category}
                                            </p>

                                            {/* Members */}
                                            {event.members?.length > 0 && (
                                                <p className="text-xs text-gray-600">
                                                    Members:{" "}
                                                    {event.members.map((m) => m.name).join(", ")}
                                                </p>
                                            )}

                                        </div>
                                    ))}
                                </td>

                                {/* Fee */}
                                <td>₹{item.totalFee}</td>

                                {/* Payment Status */}
                                <td>
                                    <span
                                        className={`px-2 py-1 rounded text-white text-sm ${item.paymentStatus === "paid"
                                            ? "bg-green-600"
                                            : item.paymentStatus === "pending"
                                                ? "bg-yellow-500"
                                                : "bg-red-600"
                                            }`}
                                    >
                                        {item.paymentStatus}
                                    </span>
                                </td>

                                {/* Action */}
                                <td>
                                    <button
                                        onClick={() => getRegistrationDetails(item._id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Get Details
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* Empty state */}
            {data.length === 0 && (
                <p className="text-center mt-4 text-gray-500">
                    No registrations found
                </p>
            )}

        </div>
    );
};

export default GetEventRegistration;