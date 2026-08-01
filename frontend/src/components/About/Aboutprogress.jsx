import React, { useEffect, useRef } from 'react';
import { MapPin, TrendingUp, Globe, Rocket, Zap, Award, CheckCircle, Sparkles, Star } from 'lucide-react';

const Aboutprogress = () => {
  const milestones = [
  {
    year: "2024",
    title: "Foundation of Creovate Technologies",
    description:
      "Creovate Technologies was established in Bhubaneswar, Odisha with a vision to help businesses grow through website development, digital marketing, SEO, and custom software solutions. We successfully delivered our first business websites and digital transformation projects for local startups and SMEs.",
    icon: MapPin,
    color: "from-orange-400 to-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    gradient: "orange",
    achievements: [
      "Company Founded",
      "10+ Projects Delivered",
      "Local Business Clients",
    ],
  },

  {
    year: "2025",
    title: "Technology & Service Expansion",
    description:
      "Expanded our expertise beyond websites into mobile application development, MERN stack solutions, UI/UX design, AI chatbot integration, business automation, and custom software development. We started serving clients across multiple industries throughout India.",
    icon: TrendingUp,
    color: "from-orange-500 to-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    gradient: "orange",
    achievements: [
      "AI Chatbot Solutions",
      "Mobile App Development",
      "50+ Successful Projects",
    ],
  },

  {
    year: "2026",
    title: "Digital Growth & Automation",
    description:
      "Focused on delivering advanced business automation systems, AI-powered customer support solutions, SEO-driven growth strategies, and scalable web applications. Our solutions helped businesses improve efficiency, generate quality leads, and strengthen their digital presence.",
    icon: Rocket,
    color: "from-orange-500 to-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    gradient: "orange",
    achievements: [
      "Business Automation",
      "SEO Growth Solutions",
      "Enterprise Applications",
    ],
  },

  {
    year: "2026 - Present",
    title: "Growing Across India",
    description:
      "Today, Creovate Technologies continues to serve startups, businesses, and enterprises with website development, mobile applications, AI chatbot integration, SEO services, digital marketing, and custom software development solutions. Our mission remains focused on innovation, quality, and measurable business growth.",
    icon: Globe,
    color: "from-orange-500 to-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    gradient: "orange",
    achievements: [
      "Pan India Clients",
      "AI & Automation Experts",
      "Long-Term Partnerships",
    ],
  },
];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.timeline-card');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-white via-gray-50 to-white py-16 md:py-20 lg:py-24 overflow-hidden">
     

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with 3D Text Effect */}
        <div className="text-center mb-12 md:mb-16 transform perspective-1000">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-600 rounded-full px-5 py-2 shadow-xl mb-5 transform hover:scale-105 transition-transform duration-300">
           
            <span className="text-white text-sm font-semibold tracking-wide">OUR JOURNEY</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 transform hover:translate-z-10 transition-transform duration-500">
            The Path of{" "}
            <span className="bg-gradient-to-r from-orange-600 via-orange-600 to-orange-600 bg-clip-text text-transparent relative inline-block">
              Our Progress
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-orange-600 to-orange-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore the key technological epochs that define our corporate evolution
          </p>
          
        </div>

        {/* 3D Timeline */}
        <div className="relative">
          {/* Vertical Line with 3D Effect */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-orange-500 via-orange-500 to-orange-500 h-full rounded-full hidden md:block shadow-lg"></div>
          
          {/* Glowing Nodes on Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-1/4 w-3 h-3 bg-orange-500 rounded-full hidden md:block shadow-lg shadow-orange-400 animate-pulse"></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 w-3 h-3 bg-orange-500 rounded-full hidden md:block shadow-lg shadow-orange-400 animate-pulse delay-300"></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-1/4 w-3 h-3 bg-orange-500 rounded-full hidden md:block shadow-lg shadow-orange-400 animate-pulse delay-700"></div>

          {/* Milestones */}
          {milestones.map((milestone, index) => (
            <div key={index} className={`relative flex flex-col md:flex-row items-center mb-12 md:mb-16 last:mb-0 timeline-card opacity-0 transition-all duration-700 ease-out ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}>
              
              {/* 3D Timeline Node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10 hidden md:flex">
                <div className="relative group">
                  <div className={`w-14 h-14 bg-gradient-to-br ${milestone.color} rounded-2xl flex items-center justify-center shadow-2xl transform rotate-45 group-hover:rotate-90 transition-all duration-500 group-hover:scale-110`}>
                    <milestone.icon className="w-6 h-6 text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                  </div>
                  {/* 3D Shadow */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${milestone.color} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10`}></div>
                </div>
              </div>

              {/* Mobile Timeline Node */}
              <div className="md:hidden flex justify-center mb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${milestone.color} rounded-2xl flex items-center justify-center shadow-2xl transform transition-transform duration-300 hover:scale-110`}>
                  <milestone.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content Cards with 3D Hover Effect */}
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} transform perspective-1000`}>
                <div className={`group bg-white rounded-2xl p-5 md:p-6 border-2 ${milestone.borderColor} shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:rotate-x-2 cursor-pointer relative overflow-hidden`}>
                  {/* Animated Gradient Border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {/* Year Badge with 3D */}
                  <div className={`inline-flex items-center gap-2 ${milestone.bgColor} rounded-full px-4 py-1.5 mb-4 transform group-hover:scale-105 transition-transform duration-300 shadow-md`}>
                    <Star className="w-3 h-3 text-yellow-500 animate-pulse" />
                    <span className={`text-xs font-bold bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent`}>
                      {milestone.year}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 group-hover:bg-clip-text transition-all duration-300">
                    {milestone.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
                    {milestone.description}
                  </p>

                  

                  {/* Interactive Button */}
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
                      <div className="flex items-center gap-2">
                        <Award className="w-3 h-3" />
                        <span>Key Milestone Achieved</span>
                      </div>
                      <div className="transform group-hover:translate-x-1 transition-transform duration-300">
                        <Zap className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Empty spacer for alignment */}
              <div className="hidden md:block w-5/12"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA with 3D Effect */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600 to-orange-600 rounded-full px-6 py-3 shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer group">
           
            <span className="text-white font-semibold text-sm tracking-wide">Continuing our journey of excellence...</span>
            <Award className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .timeline-card {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-visible {
          opacity: 1 !important;
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(-10px); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-10px) translateX(15px); }
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 3s ease-in-out infinite;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .hover\\:rotate-x-2:hover {
          transform: rotateX(2deg);
        }
        
        .hover\\:translate-z-10:hover {
          transform: translateZ(10px);
        }
      `}</style>
    </div>
  );
};

export default Aboutprogress;