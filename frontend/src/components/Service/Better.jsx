import React from "react";
import {
  ShieldCheck,
  Globe,
  Package,
  BadgeDollarSign,
  Monitor,
  Rocket,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import service from '../../assets/service_hero.webp';

const features = [
  {
    icon: <ShieldCheck size={20} />,
    title: "Quality Comes First",
    description: "We ensure top-tier quality in every project we deliver",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: <Globe size={20} />,
    title: "Flexible Cooperation",
    description: "Adaptable engagement models to suit your needs",
    gradient: "from-purple-500 to-pink-400",
  },
  {
    icon: <Package size={20} />,
    title: "On-time Delivery",
    description: "Punctual delivery with zero compromise on quality",
    gradient: "from-green-500 to-emerald-400",
  },
  {
    icon: <BadgeDollarSign size={20} />,
    title: "Transparent Costs",
    description: "Clear pricing with no hidden charges or surprises",
    gradient: "from-orange-500 to-yellow-400",
  },
  {
    icon: <Monitor size={20} />,
    title: "Qualified Developers",
    description: "Handpicked experts with years of industry experience",
    gradient: "from-red-500 to-rose-400",
  },
  {
    icon: <Rocket size={20} />,
    title: "Quick Scale-Up",
    description: "Rapid team expansion to meet your project demands",
    gradient: "from-indigo-500 to-purple-400",
  },
];

const Better = () => {
  return (
    <section className="py-13 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Image with 3D Effect */}
<div className="relative perspective-1000">
  <div className="relative transform hover:rotate-y-6 transition-transform duration-700 ease-out">
    <img
      src={service}
      alt="Creovate Technologies Services"
      loading="lazy"
      decoding="async"
      width="800"
      height="550"
      className="w-full h-[550px] object-cover rounded-[30px] shadow-2xl relative z-10"
    />
  </div>
</div>

          {/* Right Content - New Design */}
          <div className="relative">
            {/* 3D Floating Element */}
            <div className="absolute -top-10 -right-10 w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="bg-gradient-to-r from-orange-500 to-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-lg shadow-pink-500/30 transform hover:scale-105 transition-all duration-300">
                Why Us
              </span>
              <span className="text-gray-600 font-medium flex items-center gap-2">
                Better
                <Sparkles className="w-4 h-4 text-yellow-500" />
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-[#091B5A] leading-tight mb-4">
              Why Our Services are
              <br />
              <span className="bg-gradient-to-r from-orange-600 to-orange-600 bg-clip-text text-transparent">
                Better Than Others?
              </span>
            </h2>
            
            <p className="text-gray-600 text-base mb-6 leading-relaxed">
              We combine innovation, expertise, and dedication to deliver 
              exceptional results that exceed expectations.
            </p>

            {/* New Card Design - Horizontal Layout */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-100 hover:border-transparent overflow-hidden"
                >
                  {/* Gradient Hover Background */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-xl`}></div>
                  
                  <div className="relative z-10 flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${item.gradient} flex items-center justify-center text-white shadow-md flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#091B5A] text-sm mb-1 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            
          </div>

        </div>
      </div>

      {/* Custom 3D CSS Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.2); }
          100% { transform: rotate(360deg) scale(1); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .hover\\:rotate-y-6:hover {
          transform: rotateY(6deg) rotateX(2deg);
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Better;