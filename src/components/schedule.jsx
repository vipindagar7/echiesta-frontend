import React from "react";
import schedule from "../data/schedule";
import "../index.css";

export default function Schedule() {
  return (
    <section id="schedule" className="py-20 px-6 bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-5xl md:text-7xl font-bold text-center mb-14 story-script-regular">
          The Fest Lineup
        </h2>

        {/* DAY 1 */}
        <div className="mb-16 overflow-x-auto">
          <h3 className="text-3xl font-semibold mb-6 text-center text-red-400">
            Day 1 - 27th March
          </h3>

          <table className="w-full border border-white/20 rounded-lg overflow-hidden">
            <thead className="bg-white/10">
              <tr className="text-left text-gray-300">
                <th className="p-4">Time</th>
                <th className="p-4">Event</th>
                <th className="p-4">Category</th>
                <th className="p-4">Venue</th>
              </tr>
            </thead>

            <tbody>
              {schedule.day1.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-4 text-purple-400 font-semibold">
                    {item.time}
                  </td>

                  <td className="p-4 text-gray-200 font-medium">
                    {item.event}
                  </td>

                  <td className="p-4 text-gray-400">
                    {item.category}
                  </td>

                  <td className="p-4 text-gray-500">
                    {item.venue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* DAY 2 */}
        <div className="overflow-x-auto">
          <h3 className="text-3xl font-semibold mb-6 text-center text-blue-400">
            Day 2 - 28th March
          </h3>

          <table className="w-full border border-white/20 rounded-lg overflow-hidden">
            <thead className="bg-white/10">
              <tr className="text-left text-gray-300">
                <th className="p-4">Time</th>
                <th className="p-4">Event</th>
                <th className="p-4">Category</th>
                <th className="p-4">Venue</th>
              </tr>
            </thead>

            <tbody>
              {schedule.day2.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-4 text-purple-400 font-semibold">
                    {item.time}
                  </td>

                  <td className="p-4 text-gray-200 font-medium">
                    {item.event}
                  </td>

                  <td className="p-4 text-gray-400">
                    {item.category}
                  </td>

                  <td className="p-4 text-gray-500">
                    {item.venue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}