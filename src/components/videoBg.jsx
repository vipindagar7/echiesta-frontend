import React from "react";
import video from "../assets/mohit.mp4"
export default function VimeoBackground() {
  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Desktop Video */}
      <div className="absolute inset-0 hidden md:block">

        <iframe
          src="https://www.youtube.com/embed/SuiMcgFWN7s?start=12&autoplay=1&mute=1&loop=1&playlist=SuiMcgFWN7s&controls=0&showinfo=0&modestbranding=1"
          title="Desktop Background Video"
          frameBorder="0"
          allow="autoplay; fullscreen"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />

      </div>

      {/* Mobile Video */}
      <div className="absolute inset-0 block md:hidden">

        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
        >
          <source src="https://res.cloudinary.com/dpyco6kcx/video/upload/v1774450789/mohit_locb5k.mp4" type="video/mp4" />
        </video>

      </div>


      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
    </div>
  );
}