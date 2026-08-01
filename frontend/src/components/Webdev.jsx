// Webdev.jsx - Main Component
import React from 'react';
import aboutbred from "../assets/about-us.webp";
import Breadcrumb from "./Breadcrumb";
import ServiceSidebar from './Webdev/ServiceSidebar';
import FAQSection from './Webdev/FAQSection';
import ServiceContent from './Webdev/ServiceContent';


const Webdev = () => {
  return (
    <>
      <Breadcrumb
        title="Web Development"
        bgImage={aboutbred}
        paths={[
          { name: "Home", link: "/" },
          { name: "Services", link: "/service" },
          { name: "Web Development", link: "/service/web-development" },
        ]}
      />

      {/* Main Content Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Left Content - Service Details */}
            <div className="lg:col-span-2">
              <ServiceContent />
              
            </div>

            {/* Right Sidebar - Services List */}
            <div className="lg:col-span-1">
              <ServiceSidebar/>
              <FAQSection />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Webdev;