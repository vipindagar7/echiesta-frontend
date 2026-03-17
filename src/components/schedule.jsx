import React from 'react';
import schedule from '../data/schedule';


export default function Schedule() {
  return (
    <section id='schedule' className="py-20 px-6 bg-gray-950 text-white">

      <div className="max-w-4xl mx-auto">

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-14">
          Event Schedule
        </h2>

        <div className="space-y-6">

          {schedule.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center backdrop-blur-lg bg-white/10 border border-white/20 rounded-lg p-5"
            >

              <span className="text-purple-400 font-semibold">
                {item.time}
              </span>

              <span className="text-gray-200">
                {item.event}
              </span>

            </div>
          ))}

        </div>
      </div>

    </section>
  );
}