import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/eitLogoWhite.png";
import { HashLink } from "react-router-hash-link";
import { navItems } from "../data/navbarMenu";


export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-transparent border-b border-white/20">
            <div className="max-w-7xl mx-auto px-6">

                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <a href="/">
                        <img src={logo} alt="EIT Logo" className="h-8" />
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        {navItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.link}
                                className="text-purple-500 hover:scale-110 transition hover:underline hover:underline-offset-4"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Register Button */}
                    <a href="/register-events" className="hidden md:block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-full hover:scale-105 transition">
                        Register Event
                    </a>
                    <a href="/star-night-register" className="hidden md:block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-full hover:scale-105 transition">
                        Register DJ Night
                    </a>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-800 dark:text-white"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <X size={26} className="text-black" /> : <Menu size={26} className="text-black" />}
                    </button>
                </div>

            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden backdrop-blur-lg bg-white/20 dark:bg-black/20 border-t border-white/20">
                    <div className="flex flex-col items-center py-6 space-y-4">

                        {navItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.link}
                                className="text-purple-500 hover:scale-110 transition hover:underline hover:underline-offset-4"
                                onClick={() => setOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                        {/* register button */}
                          <a href="/register-events" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full">
                            Register Events
                        </a>
                        <a href="/star-night-register"   className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full">
                            Register Star Night
                        </a>
                      

                    </div>
                </div>
            )}
        </nav>
    );
}