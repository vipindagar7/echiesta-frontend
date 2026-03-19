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
  const facultyCoordinators = [
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
      className="py-20 px-6 bg-gradient-to-b from-gray-700 to-black text-white"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* Contact Section */}
        <div className="text-center mt-10">
          <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>

          <p className="text-gray-300 mb-2">
            📧 Email: <span className="text-white">echiesta@eitfaridabad.co.in</span>
          </p>

          <p className="text-gray-300">
            📍 Location: <span className="text-white">EIT Faridabad</span>
          </p>
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