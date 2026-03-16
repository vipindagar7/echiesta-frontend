import React from "react";

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

        <iframe
          src="https://www.youtube.com/embed/X2k45p3IodA?autoplay=1&mute=1&loop=1&playlist=X2k45p3IodA&controls=0"
          title="Mobile Background Video"
          frameBorder="0"
          allow="autoplay; fullscreen"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />

      </div>


      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
    </div>
  );
}