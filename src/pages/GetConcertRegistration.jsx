import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const StarNightRegistrations = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [checkingId, setCheckingId] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleCheckIn = async (id) => {
        const confirmCheck = window.confirm("Mark as checked-in?");
        if (!confirmCheck) return;

        try {
            setCheckingId(id);

            await axios.patch(
                `${API_URL}/api/admin/star-night/checkin/${id}`,
                {},
                { withCredentials: true }
            );

            // update UI
            setData((prev) =>
                prev.map((item) =>
                    item._id === id ? { ...item, checkedIn: true } : item
                )
            );

        } catch (error) {
            console.error(error);
        } finally {
            setCheckingId(null);
        }
    };
    const fetchData = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                `${API_URL}/api/star-night/getRegistrations?page=${page}&limit=50`,
                { withCredentials: true }
            );

            setData(res.data.data);
            setTotalPages(res.data.totalPages);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const deleteRegistration = async (id) => {
        const confirmDelete = window.confirm("Delete this registration?");
        if (!confirmDelete) return;

        try {
            setDeletingId(id);

            await axios.delete(
                `${API_URL}/api/admin/star-night/${id}`,
                { withCredentials: true }
            );

            setData((prev) => prev.filter((item) => item._id !== id));

        } catch (error) {
            console.error(error);
        } finally {
            setDeletingId(null);
        }
    };

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
                Star Night Registrations
            </h2>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-xl shadow">

                    <thead className="bg-gray-200">
                        <tr>
                            <th>#</th>
                            <th>UID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Institute</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item._id} className="text-center border-t">

                                {/* Serial Number */}
                                <td className="p-2">{(page - 1) * 10 + index + 1}</td>

                                {/* UID (short) */}
                                <td className="text-xs text-gray-600">
                                    {item._id}
                                </td>

                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>

                                {/* Check-in status */}
                                <td>
                                    {item.institute}
                                </td>

                                {/* Actions */}
                                <td className="flex gap-2 justify-center p-2">

                                    {/* Check-in Button */}
                                    <button
                                        onClick={() => handleCheckIn(item._id)}
                                        disabled={checkingId === item._id || item.checkedIn}
                                        className="bg-green-600 text-white px-2 py-1 rounded"
                                    >
                                        {checkingId === item._id
                                            ? "Checking..."
                                            : item.checkedIn
                                                ? "Done"
                                                : "Check In"}
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => deleteRegistration(item._id)}
                                        disabled={deletingId === item._id}
                                        className="bg-red-600 text-white px-2 py-1 rounded"
                                    >
                                        {deletingId === item._id ? "Deleting..." : "Delete"}
                                    </button>

                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-4">

                <button
                    onClick={() => setPage((p) => p - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-300 rounded"
                >
                    Prev
                </button>

                <span className="font-semibold">
                    Page {page} of {totalPages}
                </span>

                <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded"
                >
                    Next
                </button>

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

export default StarNightRegistrations;