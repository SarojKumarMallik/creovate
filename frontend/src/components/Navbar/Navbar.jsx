import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import TopBar from "./TopBar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Services", link: "/service" },
    { name: "Career", link: "/career" },
    { name: "Blog", link: "/blogs" },
    { name: "Contact Us", link: "/contact" },
  ];

  return (
    <header className="w-full shadow-md sticky top-0 z-50 bg-white">
      {/* Top Contact Bar (hidden on mobile) */}
      <div className="hidden md:block">
        <TopBar />
      </div>

      {/* Main Navbar */}
      <div className="bg-white px-4 md:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src="/assets/images/creovate_new.png"
            alt="Logo"
            className="h-[70px] w-auto"
          />
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 text-base font-semibold text-gray-700">
          {menuItems.map((item, i) => (
            <li key={i}>
              <a
                href={item.link}
                className="hover:text-orange-500 transition text-lg"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Get Free Demo Button (Desktop) */}
        <a
          href="/demo"
          className="hidden md:inline-block px-6 py-3 text-lg font-bold text-white rounded-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:from-orange-600 hover:to-orange-700"
        >
          Get Free Demo
        </a>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 bg-white shadow-lg transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <img
            src="/assets/images/creovate_new.png"
            alt="Logo"
            className="h-[70px] w-auto"
          />
          <button onClick={() => setIsOpen(false)} className="text-gray-700">
            <FaTimes size={24} />
          </button>
        </div>

        <ul className="flex flex-col space-y-6 px-6 py-6 text-gray-700 text-base font-medium">
          {menuItems.map((item, i) => (
            <li key={i}>
              <a
                href={item.link}
                className="hover:text-orange-500 transition text-lg"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            </li>
          ))}

          {/* Mobile Button */}
          <li>
            <a
              href="/demo"
              className="block text-center px-6 py-3 text-lg font-bold text-white rounded-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:from-orange-600 hover:to-orange-700"
              onClick={() => setIsOpen(false)}
            >
              Get Free Demo
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}