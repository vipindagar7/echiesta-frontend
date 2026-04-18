import React, { useEffect, useState } from "react";
import axios from "axios";

const GetCounslingRegistration = () => {
    const [data, setData] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    // 🔥 Fetch data
    const fetchData = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/admin/getCounsilingRegistrations`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setData(res.data.data);
            setFiltered(res.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 🔍 Search filter
    useEffect(() => {
        const result = data.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.contact.includes(search)
        );
        setFiltered(result);
    }, [search, data]);

    if (loading) {
        return <p className="text-center mt-10 text-gray-500">Loading...</p>;
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Gaming Registrations</h2>

                <input
                    type="text"
                    placeholder="Search by name or contact..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border px-3 py-2 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Contact</th>
                            <th className="p-3 text-left">Alt Contact</th>
                            <th className="p-3 text-left">Type</th>
                            <th className="p-3 text-left">Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center p-4 text-gray-500">
                                    No registrations found
                                </td>
                            </tr>
                        ) : (
                            filtered.map((item) => (
                                <tr
                                    key={item._id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="p-3">{item.name}</td>
                                    <td className="p-3">{item.contact}</td>
                                    <td className="p-3">{item.altContact || "-"}</td>
                                    <td className="p-3 capitalize">{item.type}</td>
                                    <td className="p-3">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GetCounslingRegistration;