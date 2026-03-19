import React from "react";
import { useNavigate } from "react-router-dom";
import poster1 from "../assets/poster1.jpeg";
import poster2 from "../assets/poster2.jpeg";
import poster3 from "../assets/poster3.jpeg";
import poster4 from "../assets/poster4.png";
import poster5 from "../assets/poster5.png";
import poster6 from "../assets/poster6.png";
import poster7 from "../assets/poster7.png";
import poster8 from "../assets/poster8.png";
import poster9 from "../assets/poster9.jpg";
import poster10 from "../assets/poster10.jpeg";
import poster11 from "../assets/poster11.jpg";
import poster12 from "../assets/poster12.jpg";

const events = [
  { title: "Raso Vaisa", image: poster1 },
  { title: "IKS Expo", image: poster2 },
  { title: "Rhythm and Riffs", image: poster3 },
  { title: "Cultural Events", image: poster4 },
  { title: "Creating Canvas", image: poster5 },
  { title: "Runway of Knowledge", image: poster6 },
  { title: "Technical Event", image: poster7 },
  { title: "Literary Event", image: poster8 },
  { title: "Curtain Call", image: poster9 },
  { title: "Cultural Event", image: poster10 },
  { title: "Rythem and Movement", image: poster11 },
  { title: "FasionScape", image: poster12 },
];

const EventPoster = () => {
  const navigate = useNavigate();

  return (
    <div id="events" className="min-h-screen bg-[#0a0a0a] text-white px-4 md:px-6 py-14">
      
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-wide">
        Explore Events
      </h2>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
        {events.map((event, index) => (
          <div key={index} className="relative group">
            
            {/* 🔥 Gradient Glow */}
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-red-600 via-purple-600 to-pink-600 opacity-20 blur-lg group-hover:opacity-50 transition duration-500"></div>

            {/* Card */}
            <div className="relative bg-[#111] rounded-xl overflow-hidden">
              
              {/* ✅ SHORTER RATIO */}
              <div className="aspect-[3/4] w-full">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col items-center justify-center text-center px-3">
                
                <h3 className="text-sm md:text-base font-semibold mb-3">
                  {event.title}
                </h3>

                <button
                  onClick={() => navigate("/register-events")}
                  className="px-4 py-1.5 text-sm rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-red-600 hover:border-red-600 transition"
                >
                  Register
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPoster;