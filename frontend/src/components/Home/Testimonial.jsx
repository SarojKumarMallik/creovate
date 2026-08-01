// src/components/AutoSlideTestimonial.jsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import male from "../../assets/male.png";
import female from "../../assets/female.png";

export default function AutoSlideTestimonial() {
const testimonials = [
  {
    name: "Amit Pattnaik",
    role: "Director, Bhubaneswar Travels",
    message:
      "Creovate Technologies completely redesigned our website and improved the overall user experience. We started receiving more inquiries within weeks of launch. The team was professional and easy to work with throughout the project.",
    avatar: male,
  },
  {
    name: "Priyanka Das",
    role: "Founder, Odisha Craft Hub",
    message:
      "We wanted a modern eCommerce platform for our handicraft business and Creovate delivered exactly what we envisioned. Their attention to detail and support after launch was impressive.",
    avatar: female,
  },
  {
    name: "Sanjay Mohanty",
    role: "Managing Partner, SM Associates",
    message:
      "The team developed our business website and optimized it for search engines. The website looks professional, loads fast, and has helped us generate quality leads consistently.",
    avatar: male,
  },
  {
    name: "Rashmi Sahoo",
    role: "Owner, Urban Boutique",
    message:
      "From design to deployment, everything was handled smoothly. The mobile-friendly website and SEO improvements have significantly increased our online visibility.",
    avatar: female,
  },
  {
    name: "Debasis Nayak",
    role: "CEO, Nexa Solutions",
    message:
      "Creovate Technologies built a custom web application for our business operations. Their technical expertise, communication, and timely delivery exceeded our expectations.",
    avatar: male,
  },
  {
    name: "Sasmita Behera",
    role: "Marketing Head, GreenLeaf Healthcare",
    message:
      "The AI chatbot integration and website optimization provided by Creovate have improved customer engagement and reduced response time. We are extremely satisfied with the results.",
    avatar: female,
  },
];

  const [current, setCurrent] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(2);
  const length = testimonials.length;

  // Update items per slide based on screen size
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1);
      } else {
        setItemsPerSlide(2);
      }
    };

    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  // Auto-slide effect
  useEffect(() => {
    const totalSlides = Math.ceil(length / itemsPerSlide);
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, [length, itemsPerSlide]);

  // Get current slide items
  const getCurrentItems = () => {
    const startIndex = current * itemsPerSlide;
    const endIndex = startIndex + itemsPerSlide;
    return testimonials.slice(startIndex, endIndex);
  };

  const totalSlides = Math.ceil(length / itemsPerSlide);

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-purple-50 to-pink-50 overflow-x-hidden overflow-y-visible min-w-0">
      <div className="max-w-7xl mx-auto text-center mb-8 sm:mb-10 md:mb-12 min-w-0">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight break-words">
          What Our <span className="text-orange-500">Clients Say</span>
        </h2>
        <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base break-words px-2">
          Trusted by businesses across Odisha and India for web development, mobile apps,
          UI/UX design, AI solutions, and digital transformation services.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 min-w-0"
          >
            {getCurrentItems().map((testimonial, idx) => (
              <div
                key={idx}
                className="relative bg-white/30 backdrop-blur-md border border-purple-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl min-w-0"
              >
                {/* Quote background */}
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-purple-100 absolute top-4 sm:top-6 left-4 sm:left-6 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V17h5.17V11.17h.06L7.17 6zm10 0a5.17 5.17 0 0 0-5.17 5.17V17H17v-5.83h.06L17.17 6z" />
                </svg>

                {/* Avatar */}
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-4 border-purple-500 absolute -top-7 sm:-top-8 md:-top-10 left-1/2 transform -translate-x-1/2 shadow-lg"
                />

                {/* Message */}
                <p className="text-gray-800 italic mt-8 sm:mt-10 md:mt-12 text-center text-sm sm:text-base break-words">
                  "{testimonial.message}"
                </p>

                {/* Name and role */}
                <div className="mt-4 sm:mt-5 md:mt-6 text-center min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 break-words">
                    {testimonial.name}
                  </h3>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center mt-4 sm:mt-6 gap-1.5 sm:gap-2 flex-wrap">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <span
              key={idx}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all duration-300 ${
                idx === current ? "bg-purple-600 w-6 sm:w-8" : "bg-purple-200"
              }`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}