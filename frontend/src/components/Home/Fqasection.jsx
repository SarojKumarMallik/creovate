import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What services does Creovate Technologies provide?",
    answer:
      "We offer Website Development, Mobile App Development, UI/UX Design, AI Chatbot Integration, Business Automation, SEO Services, Digital Marketing, and Custom Software Development solutions for startups, businesses, and enterprises.",
  },
  {
    question: "How much does it cost to develop a website?",
    answer:
      "Website development costs depend on project requirements, design complexity, features, integrations, and timelines. We provide customized solutions and free consultations to help you choose the best option for your business.",
  },
  {
    question: "Do you develop Android and iOS mobile applications?",
    answer:
      "Yes. We develop high-performance Android and iOS applications using modern technologies like Flutter and Firebase, ensuring seamless experiences across all devices and platforms.",
  },
  {
    question: "Can you integrate AI chatbots and business automation tools?",
    answer:
      "Absolutely. We build AI-powered chatbots, WhatsApp automation systems, customer support assistants, and workflow automation solutions that improve efficiency, generate leads, and enhance customer engagement.",
  },
  {
    question: "Why choose Creovate Technologies for your digital projects?",
    answer:
      "Our team combines technical expertise, creativity, and industry best practices to deliver scalable, secure, and growth-focused digital solutions. We prioritize quality, transparency, and long-term client success.",
  },
];

const Fqasection = () => {
  const [active, setActive] = useState(0);

  const toggleFAQ = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="py-14 bg-gradient-to-b from-white via-orange-50/20 to-orange-50/40">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-orange-500 font-semibold tracking-widest uppercase text-lg mb-3">
            Frequently Asked Questions
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Everything You Need to <span className="text-orange-500">Know</span>
          </h2>

          
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className={`overflow-hidden rounded-3xl border backdrop-blur-sm transition-all duration-300 ${
                active === index
                  ? "border-orange-400 bg-gradient-to-r from-orange-50 to-white shadow-2xl shadow-orange-100"
                  : "border-gray-200 bg-white hover:border-orange-300 hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 md:p-7 text-left cursor-pointer"
              >
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>

                <motion.div
                  animate={{ rotate: active === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-6 h-6 text-orange-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {active === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 md:px-7 pb-6 border-t border-orange-100">
                      <p className="pt-5 text-gray-600 leading-relaxed text-base md:text-lg">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default Fqasection;