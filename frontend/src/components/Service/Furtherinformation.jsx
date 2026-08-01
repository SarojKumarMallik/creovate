import React from "react";
import { Headphones } from "lucide-react";

const Furtherinformation = () => {
  return (
    <section className="w-full py-10 px-4 md:px-8">
      <div className="relative overflow-hidden rounded-[32px] bg-[#031B4E] min-h-[320px]">

        {/* 3D Glow Effects */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-10 right-1/3 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl" />

        {/* Wave Shapes */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1440 320"
            className="w-full opacity-20"
            fill="none"
          >
            <path
              d="M0,192L60,181.3C120,171,240,149,360,144C480,139,600,149,720,181.3C840,213,960,267,1080,261.3C1200,256,1320,192,1380,160L1440,128"
              stroke="#3B82F6"
              strokeWidth="3"
            />
            <path
              d="M0,240L80,224C160,208,320,176,480,181.3C640,187,800,229,960,240C1120,251,1280,229,1360,218.7L1440,208"
              stroke="#60A5FA"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 px-8 md:px-16 py-14">
          
          {/* Left Side */}
          <div className="flex items-start gap-6 max-w-3xl">

            

            <div>
              <h2 className="text-white text-4xl md:text-6xl font-extrabold leading-tight">
                To make requests for
                <br />
                further information,
                <br />
                contact us
              </h2>

              <p className="mt-6 text-white/60 text-lg max-w-lg">
                Our team is ready to answer your questions and provide
                additional details about our services and solutions.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="relative">
            
            {/* Glass Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl px-10 py-8 text-center shadow-2xl">

              <div className="flex justify-center mb-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-50" />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                    <Headphones
                      size={40}
                      className="text-white"
                      strokeWidth={2}
                    />
                  </div>
                </div>
              </div>

              <p className="text-white/70 text-lg mb-3">
                Call Us For Any Inquiry
              </p>

              <a
                href="tel:9827373867"
                className="block text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent"
              >
                +91 98273 73867
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Line */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />
      </div>
    </section>
  );
};

export default Furtherinformation;