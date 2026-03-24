import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const ScannerTicketCard = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState({
    fetch: true,
    checkIn: false,
  });
  const [error, setError] = useState("");

  //  Fetch Data
  const fetchData = async () => {
    try {
      setLoading((prev) => ({ ...prev, fetch: true }));

      const res = await axios.get(
        `${API_URL}/api/star-night/getRegistration/${id}`,
        { withCredentials: true }
      );

      setTicket(res.data.data);

    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch ticket");
    } finally {
      setLoading((prev) => ({ ...prev, fetch: false }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // Go back to scanner
  const handleGoToScan = () => {
    navigate("/scanner/scan");
  };

  // Check-in
  const handleCheckIn = async () => {
    try {
      setLoading((prev) => ({ ...prev, checkIn: true }));

      await axios.patch(
        `${API_URL}/api/star-night/checkin/${ticket._id}`,
        {},
        { withCredentials: true }
      );

      setTicket((prev) => ({
        ...prev,
        isCheckedIn: true,
        checkInTime: new Date().toISOString(),
      }));

    } catch (err) {
      alert(err.response?.data?.message || "Check-in failed");
    } finally {
      setLoading((prev) => ({ ...prev, checkIn: false }));
    }
  };

  //  Loading
  if (loading.fetch) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-900 text-white">
        Loading ticket...
      </div>
    );
  }
  //  Error
  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-900 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4">

      <div className="w-full max-w-md bg-gray-800 text-white p-6 rounded-2xl shadow-xl">

        <h2 className="text-2xl font-bold text-center mb-4">
           Concert Ticket
        </h2>

        {/* Status */}
        <div className="flex justify-center mb-4">
          <span
            className={`px-4 py-1 rounded-full text-sm ${
              ticket.isCheckedIn
                ? "bg-green-600 animate-pulse"
                : "bg-yellow-500"
            }`}
          >
            {ticket.isCheckedIn ? "Checked-in" : "Not Checked-in"}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm">
          <p><strong>Name:</strong> {ticket.name}</p>
          <p><strong>Email:</strong> {ticket.email}</p>
          <p><strong>Phone:</strong> {ticket.phone}</p>
          <p><strong>Institute:</strong> {ticket.institute}</p>
          <p><strong>Aadhar:</strong> {ticket.aadhar}</p>

          {ticket.checkInTime && (
            <p>
              <strong>Check-in Time:</strong>{" "}
              {new Date(ticket.checkInTime).toLocaleString()}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">

          {!ticket.isCheckedIn ? (
            <button
              onClick={handleCheckIn}
              disabled={loading.checkIn}
              className="bg-green-600 hover:bg-green-700 py-2 rounded-lg transition"
            >
              {loading.checkIn ? "Checking..." : "Check-in"}
            </button>
          ) : (
            <div className="text-center text-green-400 font-semibold">
              Already Checked-in
            </div>
          )}

          {/* 🔙 Back to Scanner */}
          <button
            onClick={handleGoToScan}
            className="bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition"
          >
            Scan Next Pass
          </button>

        </div>
      </div>
    </div>
  );
};

export default ScannerTicketCard;