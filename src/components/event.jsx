import React from "react";
import events from "../data/events";
import { useNavigate } from "react-router-dom";

export default function EventCategories() {

    const navigate = useNavigate();

    /* Group events by category */
    const categories = {};

    events.forEach((event) => {
        if (!categories[event.category]) {
            categories[event.category] = [];
        }
        categories[event.category].push(event);
    });

    const categoryList = Object.entries(categories);

    return (
        <section id="events" className="py-20 px-6 bg-black text-white">

            <div className="max-w-7xl mx-auto">

                <h2 className="text-6xl font-bold text-center mb-14 story-script-regular">
                    Everything is 100% Worth Showing Up For
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {categoryList.map(([category, eventList], index) => (

                        <div
                            key={index}
                            className="bg-gray-900 border border-gray-700 p-6 rounded-xl hover:scale-105 transition"
                        >

                            {/* Category Title */}
                            <h3 className="text-xl font-semibold mb-4 text-purple-400">
                                {category}
                            </h3>

                            {/* Events */}
                            <ul className="space-y-3 text-gray-300 text-sm">

                                {eventList.map((event, i) => (
                                    <li key={i} className="border-b border-gray-700 pb-2">

                                        <p className="font-semibold text-white">
                                            {event.name}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            {event.type} • Members {event.minMembers}-{event.maxMembers}
                                        </p>

                                        <p className="text-sm text-gray-400">
                                            Fee: {event.fee === 0 ? "Free" : `₹${event.fee} per member`}
                                        </p>
                                    </li>
                                ))}

                            </ul>

                            {/* Register Button */}
                            <button
                                onClick={() => navigate("/register-events")}
                                className="mt-5 bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
                            >
                                Register
                            </button>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}