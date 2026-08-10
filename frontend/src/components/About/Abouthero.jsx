import React, { useState } from 'react';
import { ArrowRight, Award, Users, Clock, Sparkles, Play, Star, TrendingUp, Zap, Shield, Globe, ChevronRight, Target, Eye, Handshake } from 'lucide-react';

const Abouthero = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const tabContent = {
    mission: {
      title: "Our Mission",
      icon: Target,
      content: "Our mission is to empower businesses with innovative digital solutions that drive growth, improve operational efficiency, and enhance customer experiences. Through website development, AI automation, mobile applications, and digital marketing strategies, we help organizations adapt, compete, and succeed in an ever-evolving digital landscape.",
      gradient: "from-orange-500 to-orange-500",
      bgGradient: "from-white-50 to-white-50",
      color: "blue"
    },
    vision: {
      title: "Our Vision",
      icon: Eye,
      content: "Our vision is to become a trusted global technology partner recognized for delivering high-quality software solutions, exceptional customer service, and transformative digital experiences. We strive to help businesses embrace innovation and unlock new opportunities through technology.",
      gradient: "from-orange-600 to-orange-500",
      bgGradient: "from-white-50 to-white-50",
      color: "indigo"
    },
    promise: {
      title: "Our Promise",
      icon: Handshake,
      content: "We are committed to delivering reliable, transparent, and result-oriented technology solutions. Every project is executed with a focus on quality, innovation, performance, and long-term business value, ensuring our clients achieve measurable success and sustainable growth.",
      gradient: "from-orange-600 to-orange-500",
      bgGradient: "from-white-50 to-white-50",
      color: "purple"
    }
  };

  const currentTab = tabContent[activeTab];

  return (
    <div className="relative bg-white overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#1E3A8A" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-8 lg:py-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Text Content */}
          <div className="space-y-6 md:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white-50 rounded-full px-4 py-2 ">
              
              <span className="text-orange-700 text-sm font-semibold">Welcome to Creovate Technologies</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              <span className="text-orange-500">About Creovate</span>
              <span className="block text-gray-800">Technologies</span>
              <span className="block text-sm text-gray-500 mt-2 font-normal">Leading Website Development, AI Chatbot & Digital Solutions Company in Bhubaneswar</span>
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-lg">
              Creovate Technologies is a leading website development and digital solutions company based in Bhubaneswar, Odisha. We help startups, small businesses, and enterprises build a strong digital presence through custom website development, mobile app development, AI chatbot integration, business automation, SEO services, digital marketing, and software development solutions.

Our mission is to deliver innovative, scalable, and result-driven technology solutions that help businesses improve efficiency, attract customers, and achieve sustainable growth in the digital world.
            </p>
            
         

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 pt-4">
              <div className="group bg-gradient-to-br from-gray-50 to-white p-3 md:p-4 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-200">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                    <Award className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                  </div>
                  <span className="text-xl md:text-2xl font-bold text-gray-900">43+</span>
                </div>
                <p className="text-xs md:text-sm text-gray-600">Projects Completed</p>
              </div>
              
              <div className="group bg-gradient-to-br from-gray-50 to-white p-3 md:p-4 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-200">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                    <Users className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                  </div>
                  <span className="text-xl md:text-2xl font-bold text-gray-900">25+</span>
                </div>
                <p className="text-xs md:text-sm text-gray-600">Expert Team</p>
              </div>
              
              <div className="group bg-gradient-to-br from-gray-50 to-white p-3 md:p-4 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-200">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                  </div>
                  <span className="text-xl md:text-2xl font-bold text-gray-900">99%</span>
                </div>
                <p className="text-xs md:text-sm text-gray-600">Client Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Elements with Tabs */}
          <div className="relative">
            {/* Main Card */}
            <div className="relative bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 flex gap-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
              </div>

              {/* Tabs Navigation */}
              <div className="flex gap-2 mb-6 md:mb-8 bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab('mission')}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 text-sm md:text-base font-medium ${
                    activeTab === 'mission'
                      ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Target className={`w-4 h-4 ${activeTab === 'mission' ? 'text-white' : 'text-gray-500'}`} />
                  Mission
                </button>
                <button
                  onClick={() => setActiveTab('vision')}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 text-sm md:text-base font-medium ${
                    activeTab === 'vision'
                      ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Eye className={`w-4 h-4 ${activeTab === 'vision' ? 'text-white' : 'text-gray-500'}`} />
                  Vision
                </button>
                <button
                  onClick={() => setActiveTab('promise')}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 text-sm md:text-base font-medium ${
                    activeTab === 'promise'
                      ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Handshake className={`w-4 h-4 ${activeTab === 'promise' ? 'text-white' : 'text-gray-500'}`} />
                  Promise
                </button>
              </div>

              {/* Tab Content */}
              <div className={`bg-gradient-to-r ${currentTab.bgGradient} rounded-2xl p-5 md:p-6 border border-${currentTab.color}-100 transition-all duration-300 animate-fadeIn`}>
                <div className="flex items-start gap-3 md:gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${currentTab.gradient} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <currentTab.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                      {currentTab.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      {currentTab.content}
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Sparkles className="w-3 h-3 text-orange-500" />
                        <span>Our commitment to excellence</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

             

              {/* Metrics */}
              <div className="space-y-4 mt-6 md:mt-8">
                <div>
                  <div className="flex justify-between text-xs md:text-sm mb-2">
                    <span className="text-gray-600">Growth Rate</span>
                    <span className="text-orange-500 font-semibold">+156%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-orange-500 rounded-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs md:text-sm mb-2">
                    <span className="text-gray-600">Client Retention</span>
                    <span className="text-orange-500 font-semibold">94%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-[94%] h-full bg-orange-500 rounded-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs md:text-sm mb-2">
                    <span className="text-gray-600">Project Success</span>
                    <span className="text-orange-500 font-semibold">99%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-[99%] h-full bg-orange-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 md:p-5 border border-blue-100 mt-6 md:mt-8">
                <div className="flex gap-1 mb-3">
                  <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                  <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                  <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                  <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                  <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                </div>
                <p className="text-gray-700 text-sm italic mb-3">
  "We believe technology should simplify business growth. Our goal is to deliver innovative, scalable, and result-driven digital solutions that help businesses succeed in a competitive digital world."
</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    SKM
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Soumya Ranjan</p>
                      <p className="text-xs text-gray-500">Founder & CEO, Creovate Technologies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Abouthero;