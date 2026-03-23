import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const StarNightRegistrations = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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

    const handleNavigate = (id) => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user?.role) {
            console.error("User role not found");
            return;
        }

        navigate(`/${user.role}/get-concert-registration/${id}`);
    };


    useEffect(() => {
        fetchData();
    }, [page]);



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
            <div className="search">
                <span><input type="text" className="uid" /></span>
                <span><input type="text" className="uid" /></span>
            </div>

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
                                <td className="p-2">{(page - 1) * 50 + index + 1}</td>

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
                                        onClick={() => handleNavigate(item._id)}
                                        className="bg-green-600 text-white px-2 py-1 rounded"
                                    >
                                        Get Details
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