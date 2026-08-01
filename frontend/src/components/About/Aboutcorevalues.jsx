import React, { useState, useEffect, useRef } from 'react';
import { Shield, Users, Lightbulb, Globe, Sparkles, Heart, Target, Zap, Award, CheckCircle, TrendingUp, Star, Rocket, Code, Cpu, BarChart3, Handshake } from 'lucide-react';

const Aboutcorevalues = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const coreValues = [
    {
      title: "Quality-Driven Development",
      description:
        "We focus on delivering high-quality websites, mobile apps, AI solutions, and software products that are reliable, secure, and built for long-term success.",
      icon: Shield,
      gradient: "from-orange-500 to-orange-700",
      bgGradient: "from-orange-50 to-orange-100",
      color: "orange",
      stats: "Client Satisfaction",
      statValue: "98%",
      features: ["Quality Assurance", "Secure Solutions", "Performance Focused"],
      iconBg: "bg-orange-100"
    },
    {
      title: "Client Collaboration",
      description:
        "We believe in transparent communication and strong partnerships, working closely with clients to achieve their business goals.",
      icon: Handshake,
      gradient: "from-orange-500 to-orange-700",
      bgGradient: "from-orange-50 to-orange-100",
      color: "orange",
      stats: "Projects Delivered",
      statValue: "50+",
      features: ["Transparent Process", "Dedicated Support", "Long-Term Partnerships"],
      iconBg: "bg-orange-100"
    },
    {
      title: "Innovation & Technology",
      description:
        "By leveraging modern technologies, AI automation, cloud platforms, and scalable frameworks, we build future-ready digital solutions.",
      icon: Cpu,
      gradient: "from-orange-500 to-orange-700",
      bgGradient: "from-orange-50 to-orange-100",
      color: "orange",
      stats: "Technologies Used",
      statValue: "20+",
      features: ["AI Integration", "Modern Frameworks", "Business Automation"],
      iconBg: "bg-orange-100"
    },
    {
      title: "Growth-Focused Approach",
      description:
        "Our solutions are designed to increase visibility, generate quality leads, improve efficiency, and help businesses achieve sustainable growth.",
      icon: TrendingUp,
      gradient: "from-orange-500 to-orange-700",
      bgGradient: "from-orange-50 to-orange-100",
      color: "orange",
      stats: "Happy Clients",
      statValue: "25+",
      features: ["Business Growth", "Lead Generation", "ROI Focused"],
      iconBg: "bg-orange-100"
    }
  ];

  const getColorStyles = (color) => {
    const styles = {
      orange: {
        text: "text-orange-600",
        border: "border-orange-200",
        bg: "bg-orange-50",
        hover: "hover:border-orange-300",
        ring: "ring-orange-400",
        gradient: "from-orange-500 to-orange-600",
        dark: "orange-900",
        light: "orange-100"
      }
    };
    return styles[color] || styles.orange;
  };

  return (
    <div ref={sectionRef} className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 py-10 md:py-14 lg:py-17 overflow-hidden">
      
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-100/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500 rounded-full px-4 py-2 border border-orange-500 mb-4">
            <Rocket className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-semibold">PURPOSE & DIRECTION</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Guiding <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Principles</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            These core values define who we are, what we stand for, and how we deliver exceptional value to our clients.
          </p>
        </div>
            
        {/* Advanced Core Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-8">
          {coreValues.map((value, index) => {
            const styles = getColorStyles(value.color);
            
            return (
              <div
                key={index}
                className={`group relative transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* 3D Card Effect */}
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 cursor-pointer">
                  {/* Animated Border Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                  
                  {/* Card Content */}
                  <div className="relative bg-white rounded-3xl m-[2px] p-7 transition-all duration-500">
                    
                    {/* Icon Section */}
                    <div className="relative mb-6">
                      <div className={`w-20 h-20 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        <value.icon className="w-10 h-10 text-white" />
                      </div>
                      
                      {/* Glowing Effect */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-700 -z-10 blur-2xl`}></div>
                      
                      {/* Badge */}
                      <div className="absolute -top-2 -right-2">
                        <div className="relative">
                          <div className="absolute inset-0 bg-orange-400 rounded-full blur-md animate-pulse"></div>
                          <Award className="w-6 h-6 text-orange-500 fill-orange-400 relative" />
                        </div>
                      </div>
                    </div>

                    {/* Title with Gradient Hover */}
                    <h3 className={`text-2xl font-bold mb-4 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:${value.gradient} group-hover:bg-clip-text group-hover:text-transparent text-gray-800`}>
                      {value.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-5 text-sm">
                      {value.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 mb-6">
                      {value.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-gray-700 transition-colors">
                          <CheckCircle className={`w-3 h-3 ${styles.text}`} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stats Badge with Counter Animation */}
                    <div className={`inline-flex items-center gap-3 ${styles.bg} rounded-full px-4 py-2 border ${styles.border} group-hover:scale-105 transition-all duration-300 shadow-sm`}>
                      <Target className={`w-4 h-4 ${styles.text} animate-pulse`} />
                      <div className="flex items-baseline gap-1">
                        <span className={`text-base font-bold ${styles.text}`}>
                          {value.statValue}
                        </span>
                        <span className="text-xs text-gray-500">{value.stats}</span>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-r ${value.gradient} rounded-full opacity-0 group-hover:opacity-5 transition-opacity duration-700 -z-10`}></div>
                    <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-r ${value.gradient} rounded-full opacity-0 group-hover:opacity-5 transition-opacity duration-700 -z-10`}></div>
                  </div>
                </div>

                {/* Connection Line on Hover */}
                {hoveredIndex === index && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-px h-4 bg-gradient-to-b from-orange-500 to-transparent"></div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      <style jsx>{`
      
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          75% {
            transform: translateY(10px) translateX(-5px);
          }
        }
        
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }
        
        .bg-300\% {
          background-size: 300% 300%;
        }
        
        
        
        .grid > div {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes pulse-ring {
          0% {
            transform: scale(0.95);
            opacity: 0.7;
          }
          100% {
            transform: scale(1.05);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Aboutcorevalues;