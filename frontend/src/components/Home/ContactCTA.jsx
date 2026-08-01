// src/components/ContactCTA.jsx
"use client";

export default function ContactCTA() {
  return (
    <section className="w-full py-20 px-6 flex justify-center">
      <div className="relative w-full max-w-8xl rounded-2xl overflow-hidden bg-gradient-to-r from-[#FF7A00] via-[#FF7A00] via-[#FF7A00] to-[#FF7A00] p-12 text-center text-white shadow-2xl">
        
        {/* Optional background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),transparent)] pointer-events-none"></div>

        <p className="text-lg mb-4 font-medium">
          Want to collaborate with us?
        </p>

        <h2 className="text-3xl md:text-5xl font-bold mb-6 break-words">
          creovatetechnologies@gmail.com
        </h2>

        <button
          onClick={() => (window.location.href = "/contact")}
          className="cursor-pointer bg-white text-purple-700 font-semibold py-4 px-8 rounded-xl shadow-lg hover:bg-purple-700 hover:text-white transition-all duration-300 transform hover:scale-105"
        >
          Let's Connect
        </button>

      </div>
    </section>
  );
}