import React from "react";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white px-6 overflow-hidden">

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Glow background */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/30 blur-[200px] rounded-full top-20 left-10"></div>
      <div className="absolute w-[500px] h-[500px] bg-pink-600/30 blur-[200px] rounded-full bottom-10 right-10"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl">

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent tracking-wide">
          ECHIESTA
        </h1>

        {/* Year */}
        <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2 tracking-widest">
          2K26
        </div>

        {/* Subtitle */}
        <h3 className="text-lg md:text-xl font-semibold text-gray-200 mb-6 tracking-wider">
          TECHNO • CULTURAL FEST
        </h3>

        {/* Description */}
        <p className="text-md md:text-lg text-gray-300 mb-10">
          A celebration of talent, music, dance, drama, fashion and creativity.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">

          <a
            href="#events"
            className="px-7 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:scale-105 transition shadow-lg"
          >
            Explore Events
          </a>

          <a
            href="/register-events"
            className="px-7 py-3 border border-pink-500 text-pink-400 rounded-lg hover:bg-pink-600 hover:text-white transition"
          >
            Register Now
          </a>

        </div>

      </div>

    </section>
  );
}