"use client";
import { Helmet } from "react-helmet-async";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Breadcrumb from "./Breadcrumb"; // ✅ Import Breadcrumb
import Footer from "./Footer"; // ✅ Import Breadcrumb
import { motion } from "framer-motion";
import contact from '../assets/contact.webp';


export default function Contact() {
  return (

    <>
    
  <Helmet>
    <title>Contact Us | Creovate Technologies</title>

    <meta
      name="description"
      content="Get in touch with Creovate Technologies for web development, mobile app development, MERN stack solutions, UI/UX design, and custom software development services."
    />

    <meta
      name="keywords"
      content="Contact Creovate Technologies, Software Company Bhubaneswar, Web Development Company, Mobile App Development, MERN Stack Development, IT Services Odisha"
    />

    <link
      rel="canonical"
      href="https://creovatetechnologies.in/contact"
    />

    {/* Open Graph */}
    <meta
      property="og:title"
      content="Contact Us | Creovate Technologies"
    />

    <meta
      property="og:description"
      content="Contact Creovate Technologies for professional software development and digital solutions."
    />

    <meta
      property="og:url"
      content="https://creovatetechnologies.in/contact"
    />

    <meta property="og:type" content="website" />

    {/* Schema */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Us",
          url: "https://creovatetechnologies.in/contact",
          description:
            "Contact Creovate Technologies for software development services.",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-9827373867",
            contactType: "customer support",
            email: "creovatetechnologies@gmail.com",
          },
        }),
      }}
    />
  </Helmet>

  {/* Existing Contact Page JSX */}    

    <div className="min-h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Breadcrumb */}
      {/* Breadcrumb */}
              <Breadcrumb
  title="Contact Us"
  bgImage={contact}
  paths={[
    { name: "Home", link: "/" },
    { name: "Contact Us", link: "/about" },
  ]}
/>

      {/* Contact Section */}
<section className="relative max-w-7xl w-full mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
  
  {/* Left Side - Info */}
  <motion.div
    initial={{ opacity: 0, x: -60 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="space-y-8"
  >
    <h2 className="text-4xl font-extrabold text-[#0B1B52] mb-6 leading-tight">
      Let’s{" "}
      <span className="bg-gradient-to-r from-[#FF6B00] to-[#2563EB] bg-clip-text text-transparent">
        Connect
      </span>
    </h2>

    <p className="text-gray-600 text-lg">
      Have questions, suggestions, or need assistance? Our team is just a
      click away. Reach out and let’s make something amazing happen together.
    </p>

    <div className="grid gap-6">

      {/* Phone */}
      <motion.div
        whileHover={{ scale: 1.03, y: -3 }}
        className="flex items-center gap-4 bg-white border border-slate-100 p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
      >
        <Phone className="text-[#FF6B00] w-8 h-8" />
        <div>
          
          <p className="font-semibold text-[#0B1B52]">
            +91 9827373867
          </p>
        </div>
      </motion.div>

      {/* Email */}
      <motion.div
        whileHover={{ scale: 1.03, y: -3 }}
        className="flex items-center gap-4 bg-white border border-slate-100 p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
      >
        <Mail className="text-[#FF6B00] w-8 h-8" />
        <div>
          
          <p className="font-semibold text-[#0B1B52] break-all">
            creovatetechnologies@gmail.com
          </p>
        </div>
      </motion.div>

      {/* Address */}
      <motion.div
        whileHover={{ scale: 1.03, y: -3 }}
        className="flex items-center gap-4 bg-white border border-slate-100 p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
      >
        <MapPin className="text-[#FF6B00] w-8 h-8" />
        <div>
          
          <p className="font-semibold text-[#0B1B52]">
            Nexus Esplanade, Bhubaneswar
          </p>
        </div>
      </motion.div>

    </div>
  </motion.div>

  {/* Right Side - Form */}
  <motion.div
    initial={{ opacity: 0, x: 60 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="relative"
  >
    {/* Gradient Background Glow */}
    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-100 via-white to-orange-100 rounded-3xl blur-2xl"></div>

    <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-2xl">
      <h3 className="text-2xl font-bold text-[#0B1B52] mb-6">
        Send us a Message
      </h3>

      <form className="space-y-5">

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Name
          </label>

          <input
            type="text"
            placeholder="Your Name"
            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Message
          </label>

          <textarea
            rows="4"
            placeholder="Write your message..."
            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition"
          ></textarea>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0B1B52] via-[#2563EB] to-[#FF6B00] text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
        >
          <Send className="w-5 h-5" />
          Send Message
        </motion.button>

      </form>
    </div>
  </motion.div>
</section>

      

     
    </div>
    </>
    
  );
}
