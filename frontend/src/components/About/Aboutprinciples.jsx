import React from 'react';
import { Target, Eye, Handshake, Rocket, Shield, Globe, Zap, Award } from 'lucide-react';

const Aboutprinciples = () => {
  return (
    <div className="relative bg-white py-13 md:py-17 lg:py-20 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#1E3A8A" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2 border border-blue-200 mb-4">
            <Rocket className="w-4 h-4 text-blue-700" />
            <span className="text-blue-700 text-sm font-semibold">PURPOSE & DIRECTION</span>
          </div>
         <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
  Our Guiding <span className="bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">Principles</span>
</h2>
          <div className="w-20 h-1 bg-blue-900 mx-auto rounded-full"></div>
        </div>

        {/* Three Main Columns - Mission, Vision, Promise */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {/* Mission Card */}
          <div className="group relative bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Target className="w-7 h-7 text-white" />
              </div>
            </div>
            
            <div className="text-center mt-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <div className="w-12 h-0.5 bg-blue-900 mx-auto mb-4"></div>
              <p className="text-gray-600 leading-relaxed">
                To empower businesses with innovative, results-driven digital solutions—fostering sustainable 
                growth and digital transformation across all scales and geographies.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="group relative bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-7 h-7 text-blue-900" />
              </div>
            </div>
            
            <div className="text-center mt-6">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Our Vision</h3>
              <div className="w-12 h-0.5 bg-white mx-auto mb-4"></div>
              <p className="text-blue-100 leading-relaxed">
                To be the most trusted boutique digital technology partner globally, recognized for unparalleled 
                client success, ethical practices, and technological mastery.
              </p>
            </div>
          </div>

          {/* Promise Card */}
          <div className="group relative bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Handshake className="w-7 h-7 text-white" />
              </div>
            </div>
            
            <div className="text-center mt-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Our Promise</h3>
              <div className="w-12 h-0.5 bg-blue-900 mx-auto mb-4"></div>
              <p className="text-gray-600 leading-relaxed">
                Every project, every client, every deliverable—executed with precision, transparency, and an 
                unwavering commitment to measurable ROI and lasting relationships.
              </p>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Aboutprinciples;