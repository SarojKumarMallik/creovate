// ServiceContent.jsx - Left Content Component
import React from 'react';
import { 
  FaCheckCircle, 
  FaLaptopCode, 
  FaMobileAlt, 
  FaShoppingCart, 
  FaPlug, 
  FaCloudUploadAlt, 
  FaShieldAlt, 
  FaRocket,
  FaSearch,
  FaPaintBrush,
  FaCode,
  FaServer,
  FaRocket as FaLaunch,
  FaArrowRight,
  FaReact,
  FaNodeJs,
  FaPhp,
  FaWordpress,
  FaAws,
  FaDocker,
  FaDatabase,
  FaGitAlt,
  FaStar,
  FaUsers,
  FaTrophy,
  FaClock
} from 'react-icons/fa';
import { 
  SiNextdotjs, 
  SiMongodb, 
  SiMysql, 
  SiJavascript, 
  SiTypescript, 
  SiLaravel, 
  SiGraphql,
  SiKubernetes,
  SiTailwindcss,
  SiFirebase
} from 'react-icons/si';
import webdev from "../../assets/web-dev.webp";

const ServiceContent = () => {
  const features = [
    {
      icon: <FaLaptopCode className="text-orange-500 group-hover:text-white text-2xl transition-colors duration-300" />,
      title: "Custom Web Development",
      desc: "Tailor-made solutions built with modern technologies to meet your specific business requirements."
    },
    {
      icon: <FaMobileAlt className="text-orange-500 group-hover:text-white text-2xl transition-colors duration-300" />,
      title: "Responsive & Mobile-First",
      desc: "Websites that look and perform perfectly across all devices and screen sizes."
    },
    {
      icon: <FaShoppingCart className="text-orange-500 group-hover:text-white text-2xl transition-colors duration-300" />,
      title: "E-Commerce Development",
      desc: "Feature-rich online stores with secure payment gateways and seamless shopping experiences."
    },
    {
      icon: <FaPlug className="text-orange-500 group-hover:text-white text-2xl transition-colors duration-300" />,
      title: "CMS Integration",
      desc: "User-friendly content management systems like WordPress, Drupal, and custom CMS."
    },
    {
      icon: <FaCloudUploadAlt className="text-orange-500 group-hover:text-white text-2xl transition-colors duration-300" />,
      title: "Web Application Development",
      desc: "Scalable web applications with advanced functionality and intuitive user interfaces."
    },
    {
      icon: <FaShieldAlt className="text-orange-500 group-hover:text-white text-2xl transition-colors duration-300" />,
      title: "Security & Performance",
      desc: "Secure, fast-loading websites with robust security measures and performance optimization."
    },
  ];

  const techIcons = [
    { icon: <FaReact className="text-4xl text-[#61DAFB]" />, name: "React.js" },
    { icon: <SiNextdotjs className="text-4xl text-black" />, name: "Next.js" },
    { icon: <FaNodeJs className="text-4xl text-[#339933]" />, name: "Node.js" },
    { icon: <SiMongodb className="text-4xl text-[#47A248]" />, name: "MongoDB" },
    { icon: <SiMysql className="text-4xl text-[#4479A1]" />, name: "MySQL" },
    { icon: <SiJavascript className="text-4xl text-[#F7DF1E]" />, name: "JavaScript" },
    
    { icon: <FaPhp className="text-4xl text-[#777BB4]" />, name: "PHP" },
   
    
    
    
    { icon: <SiTailwindcss className="text-4xl text-[#06B6D4]" />, name: "Tailwind CSS" },
   
  ];

  

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Research",
      description: "We analyze your business goals, target audience, and competitors to create a strategic roadmap.",
      icon: <FaSearch className="text-2xl" />
    },
    {
      step: "02",
      title: "UI/UX Design",
      description: "Our designers create intuitive wireframes and stunning visual designs for optimal user experience.",
      icon: <FaPaintBrush className="text-2xl" />
    },
    {
      step: "03",
      title: "Development",
      description: "Our developers build your website using cutting-edge technologies with clean, scalable code.",
      icon: <FaCode className="text-2xl" />
    },
    {
      step: "04",
      title: "Testing & QA",
      description: "Rigorous testing ensures your website is bug-free, secure, and performs flawlessly.",
      icon: <FaServer className="text-2xl" />
    },
    {
      step: "05",
      title: "Launch & Deployment",
      description: "We deploy your website with zero downtime and ensure smooth transition to production.",
      icon: <FaLaunch className="text-2xl" />
    }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        <div className="w-full h-72 md:h-96 lg:h-[420px] overflow-hidden relative">
          <img
            src={webdev}
            alt="Web Development Company Bhubaneswar"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
          
         
          
          <div className="absolute bottom-0 left-0 p-6 md:p-8 lg:p-12">
            <span className="inline-block px-5 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold rounded-full mb-4 shadow-lg animate-pulse">
              #1 Web Development Company in Bhubaneswar
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-3 leading-tight">
              Web Development Company <br />
              <span className="text-orange-400">Bhubaneswar</span>
            </h1>
            <p className="text-white/80 text-sm md:text-base max-w-2xl">
              Transform your business with innovative web solutions
            </p>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 md:p-8 lg:p-12">
        

        <div className="flex items-center gap-3 mb-6">
          <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
          <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">About Our Web Services</span>
        </div>
        
        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
          As a premier web development company in Bhubaneswar, <span className="text-orange-500 font-semibold">Creovate Technologies</span> delivers 
          innovative, scalable, and high-performance web solutions. Our expert team combines 
          technical excellence with creative design to build websites and applications that 
          drive business growth and enhance user engagement.
        </p>
        
        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
          We understand that every business has unique requirements. That's why we offer 
          custom web development services tailored to your specific needs. Whether you need 
          a corporate website, e-commerce platform, or complex web application, we have the 
          skills and experience to deliver exceptional results.
        </p>

        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-10">
          Our development process follows industry best practices with agile methodology, 
          ensuring timely delivery without compromising quality. We work closely with our 
          clients to understand their vision and translate it into a powerful digital presence 
          that stands out in today's competitive market.
        </p>

        {/* Features Grid */}
        <div className="mb-7">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            Our Web Development Services
          </h3>
         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-orange-200 hover:scale-[1.02]"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-orange-600 transition-all duration-500 flex-shrink-0 cursor-pointer shadow-md group-hover:shadow-lg group-hover:shadow-orange-300/30">
                    <div className="text-orange-500 group-hover:text-white transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Circle Infographic Process Section */}
        <div className="mb-12 bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 md:p-10">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-orange-300"></div>
              <span className="text-sm font-bold text-orange-500 uppercase tracking-wider">Our Process</span>
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-orange-300"></div>
            </div>
            <h3 className="text-2xl md:text-4xl font-bold text-gray-900">
              How We Build Your Website
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              A proven 5-step process to bring your vision to life
            </p>
          </div>

          {/* Circle Infographic */}
          <div className="relative max-w-4xl mx-auto">
            {/* Desktop Layout */}
            <div className="hidden md:block relative" style={{ height: '420px' }}>
              {/* Outer Circles */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 420">
                <circle 
                  cx="250" 
                  cy="210" 
                  r="180" 
                  fill="none" 
                  stroke="#FED7AA" 
                  strokeWidth="3"
                  strokeDasharray="10 10"
                  className="opacity-50"
                />
                <circle 
                  cx="250" 
                  cy="210" 
                  r="160" 
                  fill="none" 
                  stroke="#FED7AA" 
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                  className="opacity-30"
                />
              </svg>

              {/* Process Steps - Circular Layout */}
              {processSteps.map((step, index) => {
                const angle = (index / processSteps.length) * 360 - 90;
                const radius = 170;
                const centerX = 250;
                const centerY = 210;
                const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
                const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
                
                return (
                  <div 
                    key={index}
                    className="absolute group"
                    style={{
                      left: `${(x / 500) * 100}%`,
                      top: `${(y / 420) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                      width: '180px'
                    }}
                  >
                    <div className="flex flex-col items-center">
                      {/* Step Circle */}
                      <div className="relative">
                        {/* Connector Line */}
                        <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-gradient-to-r from-orange-200 to-orange-300 transform -translate-y-1/2 -translate-x-1/2"></div>
                        
                        {/* Main Circle */}
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-50 to-orange-100 border-4 border-orange-200 group-hover:border-orange-500 shadow-lg group-hover:shadow-2xl transition-all duration-500 flex items-center justify-center relative group-hover:scale-110 cursor-pointer">
                          {/* Pulse Ring */}
                          <div className="absolute inset-0 rounded-full bg-orange-400 opacity-0 group-hover:opacity-20 animate-ping"></div>
                          
                          {/* Icon */}
                          <div className="text-orange-500 group-hover:text-orange-600 transition-colors duration-300 text-2xl">
                            {step.icon}
                          </div>
                          
                          {/* Step Number */}
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                            {step.step}
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="mt-3 text-center max-w-[160px]">
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                          {step.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 hidden xl:block">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Center Hub */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-2xl flex items-center justify-center text-white text-center relative">
                  <div className="absolute inset-0 rounded-full bg-orange-400 opacity-20 animate-ping"></div>
                  <div className="relative">
                    <div className="text-2xl font-extrabold">5</div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider">Steps</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Process Cards */}
            <div className="md:hidden space-y-4">
              {processSteps.map((step, index) => (
                <div key={index} className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:border-orange-200 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-orange-500">{step.icon}</div>
                        <h4 className="font-bold text-gray-900">{step.title}</h4>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technologies Section with Icons */}
        <div className="mb-10">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-orange-300"></div>
              <span className="text-sm font-bold text-orange-500 uppercase tracking-wider">Tech Stack</span>
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-orange-300"></div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Technologies We Work With
            </h3>
            
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
            {techIcons.map((tech, index) => (
              <div 
                key={index}
                className="group flex flex-col items-center p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-orange-200 hover:scale-105 cursor-default"
              >
                <div className="group-hover:scale-110 transition-transform duration-500">
                  {tech.icon}
                </div>

                 <span className="text-xs font-medium text-gray-600 mt-2 group-hover:text-orange-600 transition-colors duration-300 text-center">
                  {tech.name}
                </span>
               
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
<div className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden mb-8">
  {/* Animated Background */}
  <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
  
  <div className="relative">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
        <FaRocket className="text-2xl text-white" />
      </div>
      <div>
        <h3 className="text-xl md:text-2xl font-bold">
          Why Choose Creovate Technologies?
        </h3>
        <p className="text-orange-100 text-xs mt-0.5">Excellence in every line of code</p>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <ul className="space-y-2">
        <li className="flex items-start gap-2.5 group cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-all duration-300">
          <div className="p-1 bg-white/20 rounded-full group-hover:scale-110 transition-transform duration-300 mt-0.5 flex-shrink-0">
            <FaCheckCircle className="text-white/80 text-sm" />
          </div>
          <span className="group-hover:translate-x-1 transition-transform duration-300 text-sm font-medium">Expert team of certified developers</span>
        </li>
        <li className="flex items-start gap-2.5 group cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-all duration-300">
          <div className="p-1 bg-white/20 rounded-full group-hover:scale-110 transition-transform duration-300 mt-0.5 flex-shrink-0">
            <FaCheckCircle className="text-white/80 text-sm" />
          </div>
          <span className="group-hover:translate-x-1 transition-transform duration-300 text-sm font-medium">43+ successful projects delivered</span>
        </li>
        <li className="flex items-start gap-2.5 group cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-all duration-300">
          <div className="p-1 bg-white/20 rounded-full group-hover:scale-110 transition-transform duration-300 mt-0.5 flex-shrink-0">
            <FaCheckCircle className="text-white/80 text-sm" />
          </div>
          <span className="group-hover:translate-x-1 transition-transform duration-300 text-sm font-medium">24/7 technical support and maintenance</span>
        </li>
      </ul>
      <ul className="space-y-2">
        <li className="flex items-start gap-2.5 group cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-all duration-300">
          <div className="p-1 bg-white/20 rounded-full group-hover:scale-110 transition-transform duration-300 mt-0.5 flex-shrink-0">
            <FaCheckCircle className="text-white/80 text-sm" />
          </div>
          <span className="group-hover:translate-x-1 transition-transform duration-300 text-sm font-medium">Competitive pricing with guaranteed quality</span>
        </li>
        <li className="flex items-start gap-2.5 group cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-all duration-300">
          <div className="p-1 bg-white/20 rounded-full group-hover:scale-110 transition-transform duration-300 mt-0.5 flex-shrink-0">
            <FaCheckCircle className="text-white/80 text-sm" />
          </div>
          <span className="group-hover:translate-x-1 transition-transform duration-300 text-sm font-medium">Agile development methodology</span>
        </li>
        <li className="flex items-start gap-2.5 group cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-all duration-300">
          <div className="p-1 bg-white/20 rounded-full group-hover:scale-110 transition-transform duration-300 mt-0.5 flex-shrink-0">
            <FaCheckCircle className="text-white/80 text-sm" />
          </div>
          <span className="group-hover:translate-x-1 transition-transform duration-300 text-sm font-medium">Modern tech stack & best practices</span>
        </li>
      </ul>
    </div>
  </div>
</div>

        
      </div>
    </div>
  );
};

export default ServiceContent;