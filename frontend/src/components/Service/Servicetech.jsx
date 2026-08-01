import React from 'react';

const Servicetech = () => {
  // SVG Icon components with #2563EB color
  const ServerIcon = () => (
    <svg className="w-10 h-10 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  );

  const BulbIcon = () => (
    <svg className="w-10 h-10 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );

  const CloudIcon = () => (
    <svg className="w-10 h-10 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  );

  const CpuIcon = () => (
    <svg className="w-10 h-10 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  );

  const TrendingIcon = () => (
    <svg className="w-10 h-10 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );

  const ShieldIcon = () => (
    <svg className="w-10 h-10 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );

  const services = [
    {
      id: 1,
      title: "Website Development",
      icon: <ServerIcon />,
      description:
        "Build fast, responsive, SEO-friendly, and scalable websites that help businesses establish a strong online presence and generate quality leads.",
      gradient: "from-blue-500 to-cyan-500",
      iconBg: "from-blue-50 to-cyan-50",
      iconColor: "text-blue-600",
      hoverBg: "hover:from-blue-100 hover:to-cyan-100",
      borderColor: "hover:border-blue-300",
      textColor: "text-blue-600",
      hoverShadow: "hover:shadow-blue-100/50",
      link: "/service/web-development"
    },
    {
      id: 2,
      title: "Mobile App Development",
      icon: <CpuIcon />,
      description:
        "Develop powerful Android and iOS applications with modern technologies that deliver seamless user experiences across all devices.",
      gradient: "from-purple-500 to-pink-500",
      iconBg: "from-purple-50 to-pink-50",
      iconColor: "text-purple-600",
      hoverBg: "hover:from-purple-100 hover:to-pink-100",
      borderColor: "hover:border-purple-300",
      textColor: "text-purple-600",
      hoverShadow: "hover:shadow-purple-100/50",
      link: "#mobile-app-development"
    },
    {
      id: 3,
      title: "UI/UX Design",
      icon: <BulbIcon />,
      description:
        "Create visually stunning and user-centric designs that enhance customer engagement and improve conversion rates.",
      gradient: "from-emerald-500 to-teal-500",
      iconBg: "from-emerald-50 to-teal-50",
      iconColor: "text-emerald-600",
      hoverBg: "hover:from-emerald-100 hover:to-teal-100",
      borderColor: "hover:border-emerald-300",
      textColor: "text-emerald-600",
      hoverShadow: "hover:shadow-emerald-100/50",
      link: "#ui-ux-design"
    },
    {
      id: 4,
      title: "AI Chatbot Integration",
      icon: <CloudIcon />,
      description:
        "Implement intelligent AI chatbots that automate customer support, capture leads, and provide 24/7 assistance.",
      gradient: "from-orange-500 to-amber-500",
      iconBg: "from-orange-50 to-amber-50",
      iconColor: "text-orange-600",
      hoverBg: "hover:from-orange-100 hover:to-amber-100",
      borderColor: "hover:border-orange-300",
      textColor: "text-orange-600",
      hoverShadow: "hover:shadow-orange-100/50",
      link: "#ai-chatbot-integration"
    },
    {
      id: 5,
      title: "Business Automation",
      icon: <TrendingIcon />,
      description:
        "Automate repetitive tasks, streamline workflows, and improve operational efficiency using AI-powered automation solutions.",
      gradient: "from-rose-500 to-red-500",
      iconBg: "from-rose-50 to-red-50",
      iconColor: "text-rose-600",
      hoverBg: "hover:from-rose-100 hover:to-red-100",
      borderColor: "hover:border-rose-300",
      textColor: "text-rose-600",
      hoverShadow: "hover:shadow-rose-100/50",
      link: "#business-automation"
    },
    {
      id: 6,
      title: "SEO Services",
      icon: <ServerIcon />,
      description:
        "Improve your Google rankings, increase organic traffic, and attract potential customers with result-driven SEO strategies.",
      gradient: "from-indigo-500 to-violet-500",
      iconBg: "from-indigo-50 to-violet-50",
      iconColor: "text-indigo-600",
      hoverBg: "hover:from-indigo-100 hover:to-violet-100",
      borderColor: "hover:border-indigo-300",
      textColor: "text-indigo-600",
      hoverShadow: "hover:shadow-indigo-100/50",
      link: "#seo-services"
    },
    {
      id: 7,
      title: "Digital Marketing",
      icon: <ShieldIcon />,
      description:
        "Grow your brand online through strategic digital marketing campaigns, social media management, and content marketing.",
      gradient: "from-cyan-500 to-blue-500",
      iconBg: "from-cyan-50 to-blue-50",
      iconColor: "text-cyan-600",
      hoverBg: "hover:from-cyan-100 hover:to-blue-100",
      borderColor: "hover:border-cyan-300",
      textColor: "text-cyan-600",
      hoverShadow: "hover:shadow-cyan-100/50",
      link: "#digital-marketing"
    },
    {
      id: 8,
      title: "Custom Software Development",
      icon: <CpuIcon />,
      description:
        "Build secure, scalable, and tailored software solutions that address your unique business requirements and challenges.",
      gradient: "from-fuchsia-500 to-pink-500",
      iconBg: "from-fuchsia-50 to-pink-50",
      iconColor: "text-fuchsia-600",
      hoverBg: "hover:from-fuchsia-100 hover:to-pink-100",
      borderColor: "hover:border-fuchsia-300",
      textColor: "text-fuchsia-600",
      hoverShadow: "hover:shadow-fuchsia-100/50",
      link: "#custom-software-development"
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto">
        
        {/* What We Offer Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-indigo-300"></div>
            <span className="text-sm font-semibold text-orange-600 uppercase tracking-wider">
              Our Services
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-indigo-300"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-3">
            What We Offer
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Managed IT Services That Keep Teams Moving
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className={`bg-white rounded-3xl shadow-lg hover:shadow-2xl ${service.hoverShadow} transition-all duration-300 border border-slate-100/50 ${service.borderColor} p-8 flex flex-col items-start group relative overflow-hidden`}
            >
              {/* Top Gradient Bar - Multi-color gradient */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FF6B00] via-[#2563EB] to-[#00C2FF]" />
              
              {/* Gradient Glow Effect */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition duration-500`} />
              
              {/* Icon Container with #2563EB */}
              <div className={`p-4 bg-gradient-to-br ${service.iconBg} rounded-2xl ${service.hoverBg} transition-colors text-[#2563EB]`}>
                {service.icon}
              </div>
              <h3 className={`mt-5 text-xl font-bold text-slate-800 group-hover:bg-gradient-to-r ${service.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                {service.title}
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {service.description}
              </p>
              <div className="mt-5 pt-4 border-t border-slate-100 w-full">
                <a 
                  href={service.link}
                  className={`text-sm font-semibold text-[#0B1B52] uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all duration-300 hover:text-[#2563EB]`}
                >
                  Explore →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Servicetech;