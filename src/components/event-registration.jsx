import React, { useState } from "react";
import events from "../data/events";
import axios from "axios";
import paymentQR from "../assets/paymentQR.jpeg";
const API_URL = import.meta.env.VITE_API_URL;

export default function RegisterEvents() {
    const [loading, setLoading] = useState(false);
    const [paymentScreenshot, setPaymentScreenshot] = useState(null);
    const [selectedEvents, setSelectedEvents] = useState({});

    const [student, setStudent] = useState({
        name: "",
        email: "",
        phone: "",
        college: "",
        rollNumber: ""
    });

    const handleScreenshotUpload = (e) => {
        setPaymentScreenshot(e.target.files[0]);
    };

    const handleStudentChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    };

    const toggleEvent = (event) => {

        const updated = { ...selectedEvents };

        if (updated[event.name]) {
            delete updated[event.name];
        } else {

            updated[event.name] = {
                category: event.category,
                type: event.type,
                fee: event.fee,
                minMembers: event.minMembers,
                maxMembers: event.maxMembers,
                members: Array(event.minMembers).fill("")
            };

        }

        setSelectedEvents(updated);
    };

    const handleMemberChange = (eventName, index, value) => {

        const updated = { ...selectedEvents };
        updated[eventName].members[index] = value;

        setSelectedEvents(updated);
    };

    const addMember = (eventName) => {

        const updated = { ...selectedEvents };

        if (updated[eventName].members.length < updated[eventName].maxMembers) {
            updated[eventName].members.push("");
        }

        setSelectedEvents(updated);
    };

    const totalFee = Object.values(selectedEvents).reduce((sum, ev) => {

        if (ev.type === "Team") {
            return sum + (ev.fee * ev.members.length);
        }

        return sum + ev.fee;

    }, 0);

    const validateStudent = () => {

        if (!student.name ||
            !student.email ||
            !student.phone ||
            !student.college ||
            !student.rollNumber
        ) {
            alert("Please fill all student details");
            return false;
        }

        if (Object.keys(selectedEvents).length === 0) {
            alert("Please select at least one event");
            return false;
        }

        if (totalFee > 0 && !paymentScreenshot) {
            alert("Please upload payment screenshot for paid events");
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {

        if (!validateStudent()) return;
        setLoading(true);
        try {

            const eventsPayload = Object.entries(selectedEvents).map(
                ([eventName, event]) => ({
                    eventName,
                    category: event.category,
                    type: event.type,
                    feePerMember: event.fee,
                    members: event.members.map(name => ({ name }))
                })
            );

            const formData = new FormData();

            formData.append("student", JSON.stringify(student));
            formData.append("events", JSON.stringify(eventsPayload));

            if (paymentScreenshot) {
                formData.append("paymentScreenshot", paymentScreenshot);
            }

            const response = await axios.post(
                `${API_URL}/api/events/register`,
                formData
            );

            alert("Registration successful");
            console.log(response.data);

        } catch (error) {

            console.error(error);
            alert("Registration failed");

        } finally {

            setLoading(false);

        }

    };

    return (
        <div className="min-h-screen bg-black text-white p-10">

            <h1 className="text-4xl font-bold mb-10">
                Event Registration
            </h1>

            {/* Student Details */}

            <div className="grid md:grid-cols-2 gap-4 mb-10">

                <input name="name" placeholder="Full Name"
                    value={student.name}
                    onChange={handleStudentChange}
                    className="p-3 bg-gray-900 border border-gray-700 rounded"
                />

                <input name="email" placeholder="Email"
                    value={student.email}
                    onChange={handleStudentChange}
                    className="p-3 bg-gray-900 border border-gray-700 rounded"
                />

                <input name="phone" placeholder="Phone"
                    value={student.phone}
                    onChange={handleStudentChange}
                    className="p-3 bg-gray-900 border border-gray-700 rounded"
                />

                <input name="college" placeholder="College"
                    value={student.college}
                    onChange={handleStudentChange}
                    className="p-3 bg-gray-900 border border-gray-700 rounded"
                />

                <input name="rollNumber" placeholder="Roll Number"
                    value={student.rollNumber}
                    onChange={handleStudentChange}
                    className="p-3 bg-gray-900 border border-gray-700 rounded"
                />

            </div>

            {/* Events */}

            <div className="space-y-6">

                {events.map((event, index) => {

                    const isSelected = selectedEvents[event.name];

                    return (

                        <div key={index}
                            className="bg-gray-900 border border-gray-700 p-6 rounded-lg"
                        >

                            <label className="flex items-center gap-3">

                                <input
                                    type="checkbox"
                                    onChange={() => toggleEvent(event)}
                                />

                                <span className="text-lg font-semibold">
                                    {event.name}
                                </span>

                                <span className="text-sm text-gray-400">
                                    ({event.type})
                                </span>

                                <span className="ml-auto text-purple-400">
                                    ₹{event.fee} /- per member
                                </span>

                            </label>

                            {isSelected && event.type === "Team" && (

                                <div className="mt-4 space-y-2">

                                    {selectedEvents[event.name].members.map((m, i) => (

                                        <input
                                            key={i}
                                            placeholder={`Member ${i + 1}`}
                                            value={m}
                                            onChange={(e) =>
                                                handleMemberChange(event.name, i, e.target.value)
                                            }
                                            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
                                        />

                                    ))}

                                    <p className="text-green-400 text-sm mt-2">
                                        Subtotal: ₹{event.fee * selectedEvents[event.name].members.length}
                                    </p>

                                    {selectedEvents[event.name].members.length <
                                        event.maxMembers && (

                                            <button
                                                onClick={() => addMember(event.name)}
                                                className="text-purple-400 text-sm"
                                            >
                                                + Add Member
                                            </button>

                                        )}

                                </div>

                            )}

                        </div>

                    );

                })}

            </div>

            {/* Total Fee */}

            <div className="mt-10 text-xl">
                Total Fee: <span className="text-green-400">₹{totalFee}</span>
            </div>

            {/* Payment Section */}

            {totalFee > 0 && (
                <div className="mt-10 text-center">

                    <h2 className="text-2xl font-semibold mb-4">
                        Scan & Pay
                    </h2>

                    <img
                        src={paymentQR}
                        alt="UPI Payment QR"
                        className="mx-auto w-64 border border-gray-700 rounded-lg"
                    />

                    <p className="mt-4 text-gray-400">
                        After payment upload screenshot
                    </p>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleScreenshotUpload}
                        className="mt-4 mx-auto block"
                    />

                    {paymentScreenshot && (
                        <p className="text-green-400 mt-2">
                            Uploaded: {paymentScreenshot.name}
                        </p>
                    )}

                </div>
            )}

            <button
                onClick={handleSubmit}
                disabled={loading}
                className={`mt-10 px-8 py-3 rounded w-full flex items-center justify-center gap-2
    ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
            >

                {loading && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}

                {loading ? "Submitting..." : totalFee > 0 ? "Submit Registration" : "Register"}

            </button>

        </div>
    );
}