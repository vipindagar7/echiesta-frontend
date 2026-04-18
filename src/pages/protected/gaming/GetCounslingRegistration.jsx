import React, { useEffect, useState } from "react";
import axios from "axios";

const GetCounslingRegistration = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState([]);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/admin/getCounsilingRegistrations`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setData(res.data.data || []);
        } catch (error) {
            console.error("Error fetching data:", error);

            // 🔐 handle expired token
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
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
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Counsling Registrations</h2>

                <input
                    type="text"
                    placeholder="Search by name or contact..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border px-3 py-2 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-xs uppercase">
                        <tr>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Father Name</th>
                            <th className="p-3 border">Father Contact</th>
                            <th className="p-3 border">Contact</th>
                            <th className="p-3 border">Alt Contact</th>
                            <th className="p-3 border">Program</th>
                            <th className="p-3 border">Address</th>
                            <th className="p-3 border">Counsellor</th>
                            <th className="p-3 border">Entrance Test</th>
                            <th className="p-3 border">Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan="10" className="text-center p-4">
                                    No Data Found
                                </td>
                            </tr>
                        ) : (
                            data.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                    <td className="p-2 border">{item.name}</td>
                                    <td className="p-2 border">{item.fatherName}</td>
                                    <td className="p-2 border">{item.fatherContact}</td>
                                    <td className="p-2 border">{item.contact}</td>
                                    <td className="p-2 border">
                                        {item.altContact || "-"}
                                    </td>
                                    <td className="p-2 border">{item.program}</td>
                                    <td className="p-2 border">
                                        {item.permanant_address}
                                    </td>
                                    <td className="p-2 border">
                                        {item.counslerName}
                                    </td>
                                    <td className="p-2 border">
                                        {item.entranceTest}
                                    </td>
                                    <td className="p-2 border">
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