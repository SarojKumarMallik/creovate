import React from "react";
import { ArrowUpRight } from "lucide-react";

const Joinourteam = () => {
  return (
    <section className="bg-white py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}
          <div className="relative flex justify-center lg:justify-start min-h-[550px]">

            {/* Top Image */}
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&auto=format&fit=crop"
                alt="Team Meeting"
                className="w-full max-w-[520px] h-[340px] object-cover rounded-2xl shadow-xl"
              />
            </div>

            {/* Bottom Image */}
            <div className="absolute top-[200px] left-[100px] z-20 hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop"
                alt="Team Working"
                className="w-[430px] h-[320px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Right Side */}
          <div>
            <span className="uppercase tracking-[8px] text-[#FF6B00] text-sm font-semibold">
              Join Our Team
            </span>

            <h2 className="mt-6 text-[#0B1B52] text-4xl md:text-6xl font-bold leading-tight">
              Develop Your Skills
              <br />
              With Creovate
            </h2>

            <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-xl">
              Join our talented team and work on innovative web, mobile,
              software, and AI-powered solutions. Build your career with a
              company that values learning, creativity, and growth.
            </p>

            {/* Gmail Button */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=creovatetechnologies@gmail.com&su=Job%20Application%20-%20Creovate%20Technologies"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-3 border-2 border-[#0B1B52] text-[#0B1B52] px-8 py-4 rounded-lg font-semibold hover:bg-[#0B1B52] hover:text-white transition-all duration-300 cursor-pointer"
            >
              Send Your Application

              <ArrowUpRight
                size={18}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Joinourteam;