import React from "react";
import sponsor1 from "../assets/sponsor1.jpeg";
import sponsor2 from "../assets/sponsor2.jpeg";
import sponsor3 from "../assets/sponsor3.jpeg";
import sponsor4 from "../assets/sponsor4.jpeg";
import sponsor5 from "../assets/sponsor5.jpeg";
import sponsor6 from "../assets/sponsor6.jpeg";
import sponsor7 from "../assets/sponsor7.jpeg";
import sponsor8 from "../assets/sponsor8.jpeg";
import sponsor9 from "../assets/sponsor9.jpeg";

const sponsors = [
  { name: "Pizza Hut", logo: sponsor1 },
  { name: "Giani Ice Cream", logo: sponsor2 },
  { name: "WJC", logo: sponsor3 },
  { name: "BSC", logo: sponsor4 },
  { name: "The Burger Club", logo: sponsor5 },
  { name: "Cornitos", logo: sponsor6 },
  { name: "Hindware", logo: sponsor7 },
  { name: "Swiss Beauty", logo: sponsor8 },
  { name: "Jaquar", logo: sponsor9 },
];

export default function Sponsor() {
  return (
    <div className="w-full py-16 px-6 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-14 tracking-wide">
        OUR PAST SPONSORS
      </h2>

      {/* Grid */}
      <div className="max-w-6xl align-center mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {sponsors.map((sponsor, index) => (
          <div
            key={index}
          >
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="h-14 object-contain mb-2"
            />
          </div>
        ))}
      </div>

    </div>
  );
}