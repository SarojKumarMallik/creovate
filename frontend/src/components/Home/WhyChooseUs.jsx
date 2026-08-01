"use client";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  AiOutlineCloudServer,
  AiOutlineCode,
} from "react-icons/ai";
import {
  MdSupportAgent,
} from "react-icons/md";
import { FaBrain, FaRocket, FaShieldAlt } from "react-icons/fa";
import { FaChartLine, FaUsers, FaCrown } from "react-icons/fa";

export default function WhyChooseUs() {
  const features = [
    {
      title: "AI-Powered Solutions",
      desc: "Leverage cutting-edge artificial intelligence and machine learning algorithms to automate processes, gain insights, and drive intelligent decision-making for your business.",
      icon: <FaBrain className="w-12 h-12" />,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Modern Web Development",
      desc: "Build blazing-fast, responsive websites and web applications using React, Next.js, and modern frameworks that deliver exceptional user experiences.",
      icon: <AiOutlineCode className="w-12 h-12" />,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Scalable Architecture",
      desc: "Enterprise-grade solutions built to scale seamlessly as your business grows, handling increased traffic and data without compromising performance.",
      icon: <AiOutlineCloudServer className="w-12 h-12" />,
      gradient: "from-green-500 to-teal-500",
    },
    {
      title: "Enterprise Security",
      desc: "Bank-level security protocols, data encryption, and regular security audits to protect your valuable business and customer data from threats.",
      icon: <FaShieldAlt className="w-12 h-12" />,
      gradient: "from-red-500 to-orange-500",
    },
    {
      title: "Lightning Fast Performance",
      desc: "Optimized code, CDN integration, and advanced caching strategies ensuring sub-second load times and smooth user experiences across all devices.",
      icon: <FaRocket className="w-12 h-12" />,
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      title: "24/7 Expert Support",
      desc: "Round-the-clock technical support from our team of experts, ensuring minimal downtime and rapid resolution of any issues that may arise.",
      icon: <MdSupportAgent className="w-12 h-12" />,
      gradient: "from-indigo-500 to-purple-500",
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Delivered", icon: <FaChartLine />, delay: 0.1 },
    { number: "98%", label: "Client Satisfaction", icon: <FaUsers />, delay: 0.2 },
    { number: "50+", label: "Expert Developers", icon: <FaCrown />, delay: 0.3 },
    { number: "24/7", label: "Support Available", icon: <MdSupportAgent />, delay: 0.4 }
  ];

  // Refs for scroll-triggered animations
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);

  // UseInView hooks with different thresholds for better UX
  const isSectionInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.2 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.2 });
  const isFeaturesInView = useInView(featuresRef, { once: false, amount: 0.1 });
  const isCtaInView = useInView(ctaRef, { once: false, amount: 0.2 });

  // Animation controls
  const headerControls = useAnimation();
  const statsControls = useAnimation();
  const featuresControls = useAnimation();
  const ctaControls = useAnimation();
  const backgroundControls = useAnimation();

  // Handle scroll animations with delays for both up and down scrolling
  useEffect(() => {
    if (isHeaderInView) {
      headerControls.start("visible");
    } else {
      headerControls.start("hidden");
    }
  }, [isHeaderInView, headerControls]);

  useEffect(() => {
    if (isStatsInView) {
      statsControls.start("visible");
    } else {
      statsControls.start("hidden");
    }
  }, [isStatsInView, statsControls]);

  useEffect(() => {
    if (isFeaturesInView) {
      featuresControls.start("visible");
    } else {
      featuresControls.start("hidden");
    }
  }, [isFeaturesInView, featuresControls]);

  useEffect(() => {
    if (isCtaInView) {
      ctaControls.start("visible");
    } else {
      ctaControls.start("hidden");
    }
  }, [isCtaInView, ctaControls]);

  useEffect(() => {
    if (isSectionInView) {
      backgroundControls.start("animate");
    } else {
      backgroundControls.start("initial");
    }
  }, [isSectionInView, backgroundControls]);

  // Animation variants with different delays for scroll up/down
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const fadeInDown = {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: custom * 0.1
      }
    })
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const zoomIn = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        delay: 0.1
      }
    }
  };

  // Background animation variants
  const backgroundVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.8, delay: 0.1 }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-14 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50"
    >
      {/* Animated Background Elements with scroll-based animation */}
      <motion.div
        variants={backgroundVariants}
        initial="initial"
        animate={backgroundControls}
        className="absolute inset-0 overflow-hidden"
      >
        <motion.div
          animate={isSectionInView ? {
            x: [0, 40, -30, 0],
            y: [0, -60, 30, 0],
            scale: [1, 1.15, 0.85, 1],
          } : {}}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          animate={isSectionInView ? {
            x: [0, -40, 30, 0],
            y: [0, 60, -30, 0],
            scale: [1, 0.85, 1.15, 1],
          } : {}}
          transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          animate={isSectionInView ? {
            x: [0, 30, -40, 0],
            y: [0, -40, 50, 0],
            scale: [1, 1.2, 0.8, 1],
          } : {}}
          transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
<motion.div
  ref={headerRef}
  initial="hidden"
  animate={headerControls}
  variants={fadeInUp}
  className="text-center mb-16"
>
  <motion.p
    variants={fadeInDown}
    className="text-orange-500 font-semibold tracking-widest mb-3 uppercase text-lg md:text-xl"
  >
    Why Choose Us
  </motion.p>

  <motion.h2
    variants={fadeInUp}
    className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight"
  >
    Transforming Ideas Into{" "}
    <span className="text-orange-500">Digital Excellence</span>
  </motion.h2>

  
</motion.div>


        {/* Features Grid with scroll animation and staggered delays */}
        <motion.div
          ref={featuresRef}
          initial="hidden"
          animate={featuresControls}
          variants={staggerContainer}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={staggerItem}
              whileHover={{ y: -10 }}
              className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              {/* Gradient Border Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
                style={{ padding: '2px' }}
              >
                <div className="absolute inset-0 bg-white rounded-2xl"></div>
              </div>

              <div className="relative p-8">
                {/* Icon Container */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white shadow-lg`}
                >
                  {feature.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>

                {/* Learn More Link */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <a 
                    href="#" 
                    className="text-blue-600 font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all duration-300"
                    onClick={(e) => e.preventDefault()}
                  >
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section with scroll animation */}
<motion.div
  ref={ctaRef}
  initial="hidden"
  animate={ctaControls}
  variants={fadeInUp}
  className="mt-20 text-center"
>
  <motion.div
    variants={scaleUp}
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-10 md:p-12 shadow-2xl"
  >
    <motion.h3
      variants={fadeInDown}
      className="text-2xl md:text-3xl font-bold text-white mb-4"
    >
      Ready to Grow Your Business Online?
    </motion.h3>

    <motion.p
      variants={fadeInUp}
      className="text-blue-100 mb-8 max-w-3xl mx-auto"
    >
      Partner with Creovate Technologies for professional website
      development, SEO services, digital marketing, AI chatbot integration,
      and custom software solutions designed to increase your online
      visibility, automate customer interactions, generate quality leads,
      and accelerate business growth.
    </motion.p>

    <motion.div
      variants={staggerContainer}
      className="flex flex-wrap gap-4 justify-center"
    >
      <motion.a
        variants={fadeInLeft}
        whileHover={{ scale: 1.08, y: -3 }}
        whileTap={{ scale: 0.97 }}
        href="/contact"
        className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:shadow-lg transition-all duration-300 inline-block"
      >
        Get Free Consultation
      </motion.a>

      <motion.a
  variants={fadeInRight}
  whileHover={{ scale: 1.08, y: -3 }}
  whileTap={{ scale: 0.97 }}
  href="tel:9827373867"
  className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 inline-block"
>
  Talk to Our Experts
</motion.a>
    </motion.div>
  </motion.div>
</motion.div>
      </div>
    </section>
  );
}