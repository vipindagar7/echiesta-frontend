import React from "react";
import mohitImg from "../assets/mohit.jpg";
export default function DJHeroSectionPro() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">

      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0a1f44] to-black"></div>

      {/* Animated Glow Layers */}
      <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-blue-500/30 blur-[140px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-pink-500/20 blur-[140px] rounded-full animate-pulse"></div>

      {/* Light Beam Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)] opacity-20"></div>

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 max-w-7xl w-full px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE */}
        <div className="space-y-8">

          {/* Tag */}
          <div className="inline-block px-4 py-1 border border-purple-500/40 rounded-full text-purple-500 text-xl tracking-[3px]">
            28 MARCH 2k26 • LIVE NIGHT
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.1]">
            Sing It Like “Tum Se Hi”
            <br />
            <span className="relative text-purple-500 text-4xl">
              Feel It Like Never Before
              <span className="absolute -bottom-2 left-0 w-full h-2 bg-yellow-400/30 blur-md"></span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-2xl m-0 p-0" >
            An Evening of Songs You Already Love
          </p>
          <p className="text-gray-400 text-2xl">
            A Night You Won’t Forget
          </p>

          <p className="text-gray-400 max-w-lg text-md">
            An artist whose music lives beyond playlists, <span className="text-purple-500 text-xl">Mohit Chauhan</span> delivers an experience that stays with you long after the night ends.          </p>

          {/* CTA */}
          <div className="flex gap-4 flex-wrap">
            <a href="./star-night-register" className="px-7 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl  hover:scale-105 transition text-ll">
              Register for Concert
            </a>

            <a href="./register-events" className="px-7 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:scale-105 transition text-ls">
              Register to Participate
            </a>

            {/* <a href="/#events" className="px-7 py-3 border border-white/20 rounded-xl hover:bg-white/10 backdrop-blur-md transition">
              Explore Events
            </a> */}
          </div>

          {/* Info Strip */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-400 pt-4">
            <div className="flex items-center gap-2 text-2xl">
              <span>Entry gate closes at 5:30 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Limited Seats Available</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (IMAGE + EFFECTS) */}
        <div className="relative flex justify-center items-center">

          {/* Circular Glow */}
          <div className="absolute w-[350px] h-[350px] bg-blue-500/40 blur-[120px] rounded-full"></div>

          {/* Rotating Ring */}
          <div className="absolute w-[320px] h-[320px] border border-white/10 rounded-full animate-spin-slow"></div>

          {/* Image */}
          <img
            src={mohitImg}
            alt="DJ"
            className="relative z-10 w-[300px] md:w-[380px] object-contain drop-shadow-[0_30px_80px_rgba(0,0,0,0.9)] hover:scale-105 transition duration-500"
          />

          {/* Floating Badge */}
          {/* <div className="absolute bottom-6 right-6 bg-gradient-to-r from-red-600 to-pink-600 px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
            Mohit Chauhan
          </div> */}
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
}