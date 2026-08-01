// FAQSection.jsx - FAQ Component
import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What web development services do you offer?",
      answer: "We offer custom website development, e-commerce solutions, CMS integration, web applications, API development, and website maintenance services."
    },
    {
      question: "How long does it take to build a website?",
      answer: "A basic website takes 2-4 weeks, while complex e-commerce or web applications may take 8-12 weeks depending on project requirements."
    },
    {
      question: "Do you offer responsive and mobile-friendly websites?",
      answer: "Yes, all our websites are fully responsive and mobile-first, ensuring perfect performance across all devices and screen sizes."
    },
    {
      question: "What technologies do you use for web development?",
      answer: "We use modern technologies including React.js, Next.js, Node.js, MongoDB, MySQL, PHP, Laravel, and WordPress based on your project needs."
    },
    {
      question: "Do you provide website maintenance and support?",
      answer: "Yes, we offer comprehensive maintenance including security updates, performance optimization, content updates, and 24/7 technical support."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="text-left mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-orange-200"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-orange-50/50 transition-colors duration-300 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-base md:text-lg font-semibold text-gray-900 cursor-pointer">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 cursor-pointer">
                  {activeIndex === index ? (
                    <FaMinus className="text-orange-500" />
                  ) : (
                    <FaPlus className="text-orange-500" />
                  )}
                </span>
              </button>
              
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  activeIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;