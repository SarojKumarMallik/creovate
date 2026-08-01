// ServiceSidebar.jsx - Right Sidebar Component
import React from 'react';
import {
  FaArrowRight,
  FaCheckCircle,
  FaChartLine,
  FaShieldAlt,
  FaDatabase,
  FaRocket,
  FaPhoneAlt,
  FaRegClock,
  FaAward,
  FaUserGraduate,
  FaGlobe,
  FaMobileAlt,
  FaPalette,
  FaRobot,
  FaSearch,
  FaBullhorn,
  FaMicrochip,
  FaStar,
  FaHeadset,
  FaWhatsapp
} from "react-icons/fa";

const ServiceSidebar = () => {
  const services = [
    {
      name: "Website Development",
      icon: <FaGlobe className="text-orange-500 group-hover:text-white transition-colors duration-300" />,
      link: "#"
    },
    {
      name: "Mobile App Development",
      icon: <FaMobileAlt className="text-orange-500 group-hover:text-white transition-colors duration-300" />,
      link: "#"
    },
    {
      name: "UI/UX Design",
      icon: <FaPalette className="text-orange-500 group-hover:text-white transition-colors duration-300" />,
      link: "#"
    },
    {
      name: "AI Chatbot Integration",
      icon: <FaRobot className="text-orange-500 group-hover:text-white transition-colors duration-300" />,
      link: "#"
    },
    {
      name: "Business Automation",
      icon: <FaChartLine className="text-orange-500 group-hover:text-white transition-colors duration-300" />,
      link: "#"
    },
    {
      name: "SEO Services",
      icon: <FaSearch className="text-orange-500 group-hover:text-white transition-colors duration-300" />,
      link: "#"
    },
    {
      name: "Digital Marketing",
      icon: <FaBullhorn className="text-orange-500 group-hover:text-white transition-colors duration-300" />,
      link: "#"
    },
    {
      name: "Custom Software Development",
      icon: <FaMicrochip className="text-orange-500 group-hover:text-white transition-colors duration-300" />,
      link: "#"
    }
  ];

  const achievements = [
    {
  icon: <FaAward className="text-orange-500" />,
  label: "99%",
  detail: "Customer Satisfaction"
},
    { icon: <FaCheckCircle className="text-orange-500" />, label: "43+", detail: "Projects" },
    { icon: <FaUserGraduate className="text-orange-500" />, label: "10+", detail: "Experts" },
    { icon: <FaGlobe className="text-orange-500" />, label: "25+", detail: "Clients" },
  ];

  return (
    <div className="space-y-6">
      {/* Services List */}
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 sticky top-24 border border-gray-100 hover:shadow-3xl transition-all duration-500">
        {/* Premium Header */}
        <div className="relative mb-8">
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-100 to-orange-300 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-tr from-orange-200 to-orange-400 rounded-full opacity-20 blur-2xl"></div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1 h-12 bg-gradient-to-b from-orange-500 via-orange-400 to-orange-600 rounded-full"></div>
              <div>
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                  Our Services
                </h3>
                
              </div>
            </div>
            
          </div>
        </div>
        
        {/* Services List with Premium Styling */}
        <div className="space-y-1.5">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.link}
              className="group relative flex items-center gap-4 p-3.5 rounded-2xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 transition-all duration-500 cursor-pointer border border-transparent hover:border-orange-400 hover:shadow-xl hover:shadow-orange-200/30"
            >
              {/* Premium Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-400/0 to-orange-400/0 group-hover:from-orange-400/10 group-hover:via-orange-400/5 group-hover:to-orange-400/0 rounded-2xl transition-all duration-700"></div>
              
              {/* Animated Icon Container - Premium */}
              <div className="relative flex-shrink-0">
                <div className="p-3 bg-gradient-to-br from-orange-50 to-orange-100/70 rounded-2xl group-hover:bg-gradient-to-br group-hover:from-orange-600 group-hover:to-orange-700 transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-orange-500/30">
                  <span className="text-2xl group-hover:text-white transition-colors duration-300">
                    {service.icon}
                  </span>
                </div>
                
              </div>
              
              {/* Service Name - Premium Text */}
              <div className="flex-1 min-w-0">
                <span className="block text-gray-800 group-hover:text-white transition-colors duration-300 font-semibold text-sm md:text-base tracking-wide">
                  {service.name}
                </span>
              </div>
              
              {/* Premium Arrow with Animation */}
              <div className="flex-shrink-0 self-center">
                <div className="p-1.5 rounded-full bg-gray-50 group-hover:bg-white/20 transition-all duration-500">
                  <FaArrowRight className="text-gray-400 group-hover:text-white transition-all duration-500 group-hover:translate-x-1 text-xs" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Premium Divider */}
        <div className="my-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-dashed border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-white text-xs font-semibold text-gray-400 uppercase tracking-wider">Achievements</span>
          </div>
        </div>

        {/* Premium Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {achievements.map((item, index) => (
            <div 
              key={index}
              className="relative group bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-4 text-center hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100/70 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-200/30 cursor-default overflow-hidden"
            >
              {/* Premium Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              <div className="relative">
                <div className="flex items-center justify-center mb-1">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </span>
                </div>
                <div className="text-lg font-extrabold text-gray-900">
                  {item.label}
                </div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {item.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium CTA Section */}
        <div className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-8 text-center overflow-hidden group">
          {/* Premium Animated Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-400 rounded-full blur-3xl"></div>
          </div>
          
          {/* Premium Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-bounce"></div>
            <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce delay-300"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-bounce delay-700"></div>
          </div>
          
          {/* Content */}
          <div className="relative">
            <div className="mb-5">
              <div className="w-20 h-20 mx-auto bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6">
                <FaRocket className="text-5xl text-white group-hover:rotate-12 transition-transform duration-500" />
              </div>
            </div>
            
            <h4 className="text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight">
              Ready to Transform?
            </h4>
            <p className="text-orange-100 text-sm mb-6 max-w-xs mx-auto">
              Get premium solutions tailored to your business needs
            </p>
            
            <div className="space-y-3">
              <a
                href="#"
                className="inline-block w-full px-6 py-4 bg-white text-orange-600 font-bold rounded-2xl hover:bg-orange-50 transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-3xl hover:-translate-y-1 group-hover:shadow-white/20"
              >
                Get a Free Quote
              </a>
              
              <a
                href="/service"
                className="inline-block w-full px-6 py-3 text-white/90 font-semibold rounded-2xl border-2 border-white/30 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 backdrop-blur-sm"
              >
                Explore All Services →
              </a>
            </div>
          </div>
        </div>

        {/* Premium Quick Contact */}
        <div className="mt-6 bg-gradient-to-br from-gray-50 to-gray-100/70 rounded-2xl p-6 border border-gray-200 hover:border-orange-200 transition-all duration-500 group hover:shadow-xl hover:shadow-orange-200/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3.5 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl group-hover:scale-110 transition-transform duration-500">
              <FaHeadset className="text-orange-500 text-2xl" />
            </div>
            <div>
              <h4 className="text-lg font-extrabold text-gray-900">
                Need Expert Advice?
              </h4>
              <p className="text-gray-500 text-sm flex items-center gap-1">
            
                24/7 Premium Support
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <a
              href="tel:9827373867"
              className="flex items-center justify-center gap-3 w-full px-4 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 group-hover:shadow-orange-300/30"
            >
              <FaPhoneAlt size={18} className="group-hover:animate-pulse" />
              <span className="font-bold text-lg tracking-wide">+91 9827373867</span>
            </a>
            
            <a
              href="https://wa.me/919827373867"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
            >
              <FaWhatsapp size={18} />
              <span className="font-semibold">Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default ServiceSidebar;