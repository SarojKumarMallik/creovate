// src/components/Footer.jsx
import React from "react";
import { motion } from "framer-motion";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt,
  FaArrowRight,
  FaPaperPlane,
  FaClock,
  FaAward,
  FaShieldAlt,
  FaChevronRight
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20">
      
      {/* Collaboration Section - Ultra Premium Design */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mb-12 z-30"
      >
        <div className="relative bg-gradient-to-br from-orange-500 via-orange-400 to-orange-600 rounded-3xl shadow-2xl shadow-orange-500/30 overflow-hidden">
          
          {/* Premium Background Decorations */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
          
          {/* Animated Dots Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 sm:p-10 md:p-12 lg:p-14">
            
            {/* Left Side - Text */}
            <div className="space-y-4 text-white">
              
              <motion.h2 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
              >
                Want to collaborate <br />
                <span className="text-white/90">with us?</span>
              </motion.h2>
              
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-3 pt-2"
              >
                <div className="flex items-center gap-3 text-white/90 hover:text-white transition-colors group">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <MdEmail className="w-5 h-5" />
                  </div>
                  <a href="mailto:creovatetechnologies@gmail.com" className="text-base sm:text-lg font-medium hover:underline">
                    creovatetechnologies@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-white/90 hover:text-white transition-colors group">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <BsFillTelephoneFill className="w-5 h-5" />
                  </div>
                  <a href="tel:+919827373867" className="text-base sm:text-lg font-medium hover:underline">
                    +91 9827373867
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right Side - CTA Button & Stats */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-start lg:items-end justify-center gap-6"
            >
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05, boxShadow: "0 30px 60px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-white text-orange-600 font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden inline-flex items-center gap-3 text-base sm:text-lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Let's Connect Now
                  <FaPaperPlane className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-50 to-white"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Footer Content - Premium White Design */}
      <div className="relative bg-gradient-to-b from-gray-50 to-white pt-24 pb-8 shadow-xl">
        
        {/* Decorative Top Element */}
        <div className="absolute -top-0.5 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
        <div className="absolute -top-0.5 left-1/4 right-1/4 h-1 bg-orange-500 blur-sm" />
        
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 xl:gap-12">
            
            {/* Column 1 - Logo & About */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl blur-xl opacity-20" />
                <div className="relative bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-3 inline-block shadow-lg border border-orange-100">
                  <img
                    src="/assets/images/creovate_new.png"
                    alt="Creovate Logo"
                    className="h-12 sm:h-14 w-auto"
                  />
                </div>
              </div>
              
              <p className="text-black/80 text-sm leading-relaxed">
                Creovate Technologies builds modern, scalable websites and apps
                tailored for your business growth.
              </p>
              
              <div className="flex space-x-3 pt-2">
                {[
                  { icon: FaFacebookF, href: "https://www.facebook.com/profile.php?id=61578990689435", label: "Facebook", color: "hover:text-[#1877F2]" },
                  { icon: FaInstagram, href: "https://instagram.com/creovatetechnologies", label: "Instagram", color: "hover:text-[#E4405F]" },
                  { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/creovate-technologies-022201378/", label: "LinkedIn", color: "hover:text-[#0A66C2]" },
                  { icon: MdEmail, href: "mailto:creovatetechnologies@gmail.com", label: "Email", color: "hover:text-[#EA4335]" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 flex items-center justify-center text-black/60 ${social.color} hover:border-orange-300 hover:shadow-lg transition-all duration-300`}
                  >
                    <social.icon className="w-4.5 h-4.5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Column 2 - Our Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-bold text-black mb-5 tracking-wider uppercase flex items-center gap-2">
                <span className="w-1 h-5 bg-orange-500 rounded-full" />
                Our Services
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Web Development", href: "/service/web-development" },
                  { name: "CRM Software", href: "/services/crm-software" },
                  { name: "E-Commerce Solutions", href: "/services/ecommerce" },
                  { name: "UI & UX Design", href: "/services/ui-ux" },
                  { name: "Search Engine Optimization", href: "/services/seo" },
                  { name: "Digital Marketing", href: "/services/digital-marketing" },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <a 
                      href={item.href} 
                      className="group flex items-center gap-2 text-black/70 hover:text-orange-500 transition-all duration-300"
                    >
                      <FaChevronRight className="w-3.5 h-3.5 text-orange-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                      <span className="text-sm group-hover:translate-x-0.5 transition-transform">
                        {item.name}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3 - Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-bold text-black mb-5 tracking-wider uppercase flex items-center gap-2">
                <span className="w-1 h-5 bg-orange-500 rounded-full" />
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Home", href: "/" },
                  { name: "About Us", href: "/about" },
                  { name: "Career", href: "/career" },
                  { name: "Blog", href: "/blog" },
                  { name: "Contact Us", href: "/contact" },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <a 
                      href={item.href} 
                      className="group flex items-center gap-2 text-black/70 hover:text-orange-500 transition-all duration-300"
                    >
                      <FaChevronRight className="w-3.5 h-3.5 text-orange-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                      <span className="text-sm group-hover:translate-x-0.5 transition-transform">
                        {item.name}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Column 4 - Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-bold text-black mb-5 tracking-wider uppercase flex items-center gap-2">
                <span className="w-1 h-5 bg-orange-500 rounded-full" />
                Get in Touch
              </h3>
              <div className="space-y-4">
                {[
                  { icon: MdEmail, text: "creovatetechnologies@gmail.com", href: "mailto:creovatetechnologies@gmail.com", label: "Email" },
                  { icon: BsFillTelephoneFill, text: "+91 9827373867", href: "tel:+919827373867", label: "Phone" },
                  { icon: MdLocationOn, text: "Bhubaneswar, Odisha, India", href: null, label: "Location" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-4 h-4 text-orange-500" />
                    </div>
                    {item.href ? (
                      <a 
                        href={item.href} 
                        className="text-black/70 hover:text-orange-500 transition-colors text-sm break-all group-hover:translate-x-0.5 transition-transform"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-black/70 text-sm">
                        {item.text}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom Line - Premium with Black Text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="relative mt-12 pt-8"
          >
            {/* Decorative Line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent" />
            <div className="absolute -top-0.5 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-orange-400/0 via-orange-500 to-orange-400/0" />
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Copyright text - Black */}
              <p className="text-black/70 text-center sm:text-left text-base sm:text-lg">
                © {currentYear} <a href="/" className="font-semibold text-black hover:text-orange-500 transition-colors">Creovate Technologies</a>. 
                <span className="hidden sm:inline"> All rights reserved.</span>
              </p>
              
              {/* Footer links - Black */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base">
                {[
                  { name: "Privacy Policy", href: "#" },
                  { name: "Terms of Service", href: "#" },
                  { name: "Sitemap", href: "#" },
                ].map((item, index) => (
                  <React.Fragment key={index}>
                    <a 
                      href={item.href} 
                      className="text-black/50 hover:text-orange-500 transition-colors"
                    >
                      {item.name}
                    </a>
                    {index < 2 && (
                      <span className="w-px h-4 bg-black/20 hidden sm:block" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}