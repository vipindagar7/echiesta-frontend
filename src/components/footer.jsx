import { Instagram, Facebook, Linkedin, Mail } from "lucide-react";
import logo from "../assets/eitLogoWhite.png";
import React from "react";
import { navItems } from "../data/navbarMenu";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 border-t border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

        {/* Logo + About */}
        <div>
          <img src={logo} alt="EIT Logo" className="h-10 mb-4" />

          <p className="text-sm text-gray-400">
            EIT Cultural Techno-Fest is a celebration of music, innovation,
            dance, creativity and student talent.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}><a href={item.link} className="hover:text-purple-400 transition">{item.name}</a></li>
            ))}
          </ul>
        </div>

        {/* Registration */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Registration
          </h3>

          <ul className="space-y-2">
            <li>
              <p>
                <a href="/register-events" className="hover:text-purple-400 transition">
                Register for Events
              </a>
              </p>
              <p>
                <a href="/star-night-register" className="hover:text-purple-400 transition">
                Register for concert
              </a>
              </p>
            </li>

          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Contact
          </h3>

          <p className="text-sm text-gray-400">
            EIT College Campus
          </p>

          <p className="text-sm text-gray-400">
            Haryana, India
          </p>

          <p className="text-sm text-gray-400 mt-2">
            eichiesta@eitfaridabad.co.in
          </p>

          {/* Social icons */}
          <div className="flex space-x-4 mt-5">

            <a className="hover:text-purple-400 transition">
              <Instagram size={20} />
            </a>

            <a className="hover:text-purple-400 transition">
              <Facebook size={20} />
            </a>

            <a className="hover:text-purple-400 transition">
              <Linkedin size={20} />
            </a>

            <a className="hover:text-purple-400 transition">
              <Mail size={20} />
            </a>

          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} EIT Cultural Fest. All rights reserved.
      </div>

    </footer>
  );
}