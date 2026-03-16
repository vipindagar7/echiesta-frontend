import React from "react";

export default function Contact() {
  const coordinators = [
    {
      name: "Abhinav Sharma",
      phone: "9971713324",
    },
    {
      name: "Raghav",
      phone: "8130707852",
    },
    {
      name: "Shuddhi",
      phone: "9897988170",
    },
    {
      name: "Sapna",
      phone: "8595645795",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black text-white"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        
        {/* Info */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Contact Us
          </h2>

          <p className="text-gray-300 mb-6">
            Have questions about the fest? Reach out to us and we will
            get back to you soon.
          </p>

          <div className="space-y-4">
            <p>📍 EIT College Campus</p>
            <p>📧 echiesta@eitfaridabad.co.in</p>
            <p>📞 +91 9876543210</p>
          </div>
        </div>

        {/* Student Coordinators */}
        <div>
          <h3 className="text-2xl font-semibold mb-6">
            Student Coordinators
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            {coordinators.map((person, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-xl hover:bg-gray-700 transition"
              >
                <h4 className="text-lg font-semibold">{person.name}</h4>
                <p className="text-gray-300">📞 {person.phone}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}