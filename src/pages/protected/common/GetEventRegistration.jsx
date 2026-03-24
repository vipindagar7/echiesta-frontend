import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const GetEventRegistration = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const LIMIT = 10;

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_URL}/api/events/event-registrations?page=${page}&limit=${LIMIT}`,
        { withCredentials: true }
      );

      setData(res.data.data);
      setTotalPages(res.data.totalPages || 1);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

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
    <div className="p-4 md:p-6">

      <h2 className="text-2xl font-bold mb-4">
        Event Registrations
      </h2>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-[900px] w-full bg-white">

          <thead className="bg-gray-200 text-sm">
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
              <tr key={item._id} className="text-center border-t text-sm">

                <td>{(page - 1) * LIMIT + index + 1}</td>

                <td>{item.student?.name}</td>
                <td>{item.student?.email}</td>
                <td>{item.student?.phone}</td>
                <td>{item.student?.college}</td>

                <td className="text-left px-2">
                  {item.events.map((event, i) => (
                    <div key={i} className="border-b py-1">

                      <p className="font-semibold">
                        {event.eventName}
                      </p>

                      <p className="text-xs text-gray-500">
                        {event.type} | {event.category}
                      </p>

                      {event.members?.length > 0 && (
                        <p className="text-xs text-gray-600">
                          Members:{" "}
                          {event.members.map((m) => m.name).join(", ")}
                        </p>
                      )}

                    </div>
                  ))}
                </td>

                <td>₹{item.totalFee}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      item.paymentStatus === "paid"
                        ? "bg-green-600"
                        : item.paymentStatus === "pending"
                        ? "bg-yellow-500"
                        : "bg-red-600"
                    }`}
                  >
                    {item.paymentStatus}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => getRegistrationDetails(item._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                  >
                    Details
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ❌ Empty */}
      {data.length === 0 && (
        <p className="text-center mt-4 text-gray-500">
          No registrations found
        </p>
      )}

      {/* 🔥 Pagination */}
      <div className="flex justify-center items-center gap-3 mt-6 flex-wrap">

        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>
    </div>
  );
};

export default GetEventRegistration;