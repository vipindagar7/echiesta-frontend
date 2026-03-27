import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const EventRegistrationDetails = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [rejecting, setRejecting] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_URL}/api/events/event-registrations/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
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
  }, [id]);

  // VERIFY
  const handleVerify = async () => {
    const confirmVerify = window.confirm("Verify this payment?");
    if (!confirmVerify) return;

    try {
      setVerifying(true);

      await axios.patch(
        `${API_URL}/api/events/event-registrations-verify/${id}`,
        {},
        { withCredentials: true }
      );
      setData((prev) => ({
        ...prev,
        paymentStatus: "verified",
      }));

    } catch (error) {
      console.error(error);
    } finally {
      setVerifying(false);
    }
  };

  // REJECT
  const handleReject = async () => {
    const confirmReject = window.confirm("Reject this payment?");
    if (!confirmReject) return;

    try {
      setRejecting(true);

      await axios.patch(
        `${API_URL}/api/events/event-registrations-reject/${id}`,
        {},
        { withCredentials: true }
      );

      setData((prev) => ({
        ...prev,
        paymentStatus: "failed",
      }));

    } catch (error) {
      console.error(error);
    } finally {
      setRejecting(false);
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

  if (!data) {
    return <p className="text-center mt-5">No data found</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h2 className="text-2xl font-bold mb-4">
        Registration Details
      </h2>

      {/* Student Info */}
      <div className="bg-white p-4 rounded-xl shadow mb-4">
        <h3 className="font-semibold mb-2">Student Info</h3>

        <p><strong>Name:</strong> {data.student.name}</p>
        <p><strong>Email:</strong> {data.student.email}</p>
        <p><strong>Phone:</strong> {data.student.phone}</p>
        <p><strong>College:</strong> {data.student.college}</p>
        <p><strong>Roll No:</strong> {data.student.rollNumber}</p>
      </div>

      {/* Events */}
      <div className="bg-white p-4 rounded-xl shadow mb-4">
        <h3 className="font-semibold mb-2">Events</h3>

        {data.events.map((event, index) => (
          <div key={index} className="border-b py-2">

            <p className="font-semibold">{event.eventName}</p>

            <p className="text-sm text-gray-500">
              {event.type} | {event.category}
            </p>

            {event.members?.length > 0 && (
              <p className="text-sm">
                Members: {event.members.map((m) => m.name).join(", ")}
              </p>
            )}

            <p className="text-sm">
              Fee per member: ₹{event.feePerMember}
            </p>

          </div>
        ))}
      </div>

      {/* Payment */}
      <div className="bg-white p-4 rounded-xl shadow mb-4">
        <h3 className="font-semibold mb-2">Payment</h3>

        <p><strong>Total Fee:</strong> ₹{data.totalFee}</p>

        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded text-white ${data.paymentStatus === "verified"
                ? "bg-green-600"
                : data.paymentStatus === "pending"
                  ? "bg-yellow-500"
                  : "bg-red-600"
              }`}
          >
            {data.paymentStatus}
          </span>
        </p>
        <p><strong>Payment Checked By:</strong> {data.paymentCheckBy}</p>


        {data.paymentScreenshot && (
          <img
            src={data.paymentScreenshot}
            alt="payment"
            className="mt-2 w-60 rounded"
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">

        <button
          onClick={handleVerify}
          disabled={verifying || data.paymentStatus === "paid"}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {verifying
            ? "Verifying..."
            : data.paymentStatus === "verified"
              ? "Verified"
              : "Verify"}
        </button>

        <button
          onClick={handleReject}
          disabled={rejecting || data.paymentStatus === "failed"}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          {rejecting
            ? "Rejecting..."
            : data.paymentStatus === "failed"
              ? "Rejected"
              : "Reject"}
        </button>

      </div>
    </div>
  );
};

export default EventRegistrationDetails;