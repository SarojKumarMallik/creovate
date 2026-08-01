"use client";

import { motion } from "framer-motion";
import { FaReact, FaNodeJs , FaApple ,FaFigma , FaSketch} from "react-icons/fa";
import { SiMongodb, SiExpress, SiFlutter, SiAndroid, SiFirebase } from "react-icons/si";
import { SiOpenai, SiZapier } from "react-icons/si";
import { FaRobot, FaWhatsapp } from "react-icons/fa";

export default function ServicesSection() {
  return (
    <section className="w-full bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-20 flex flex-col items-center font-sans overflow-x-hidden overflow-y-visible min-w-0">
     {/* Top Heading & Paragraph */}


      {/* ========= New Split Section ========= */}
<div className="mt-12 sm:mt-16 md:mt-20 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center min-w-0">
  {/* Left Content */}
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="space-y-4 sm:space-y-5 md:space-y-6 order-2 lg:order-1 min-w-0"
  >
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 break-words">
      Website Development Services
    </h2>

    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="w-16 sm:w-20 h-[2px] bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 origin-left flex-shrink-0"
    ></motion.div>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
      className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed break-words"
    >
      At{" "}
      <span className="font-semibold text-gray-900">
        Creovate Technologies
      </span>
      , we deliver custom web development solutions that help businesses
      establish a powerful online presence. Our expert developers build
      responsive, SEO-friendly, fast-loading, and scalable websites using
      modern technologies like React.js, Node.js, Express.js, and MongoDB.
      From corporate websites and eCommerce platforms to custom web
      applications, we create secure and user-focused digital experiences
      that drive traffic, generate leads, and support long-term business
      growth.
    </motion.p>

    {/* MERN Logos with Text */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { staggerChildren: 0.2 },
        },
      }}
      viewport={{ once: true }}
      className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 pt-2 sm:pt-3 md:pt-4 min-w-0"
    >
      {[
        { Icon: SiMongodb, color: "text-green-600", label: "MongoDB" },
        { Icon: SiExpress, color: "text-gray-700", label: "Express" },
        { Icon: FaReact, color: "text-sky-500", label: "React" },
        { Icon: FaNodeJs, color: "text-green-500", label: "Node.js" },
      ].map(({ Icon, color, label }, index) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-1.5 sm:gap-2 cursor-pointer flex-shrink-0"
        >
          <Icon className={`text-2xl sm:text-3xl ${color} flex-shrink-0`} />
          <span className="text-sm sm:text-lg font-medium text-gray-800 whitespace-nowrap">
            {label}
          </span>
        </motion.div>
      ))}
    </motion.div>
<motion.a
  href="/service"
  whileHover={{
    scale: 1.05,
    backgroundColor: "#f97316",
    color: "#fff",
  }}
  whileTap={{ scale: 0.95 }}
  className="mt-4 sm:mt-6 inline-block px-5 sm:px-6 py-2.5 sm:py-3 border border-orange-400 text-orange-500 font-medium rounded-md hover:shadow-lg transition cursor-pointer text-sm sm:text-base whitespace-nowrap"
>
  Explore Solutions
</motion.a>
  </motion.div>

  {/* Right Illustration */}
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.3 }}
    viewport={{ once: true }}
    className="flex justify-center order-1 lg:order-2 min-w-0"
  >
    <motion.img
      src="/assets/video/web.png"
      alt="Website Development Services"
      initial={{ scale: 0.9 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="max-w-full w-3/4 sm:w-2/3 lg:w-full h-auto"
    />
  </motion.div>
</div>




     {/* ========= New Split Section ========= */}
<div className="mt-12 sm:mt-16 md:mt-20 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center min-w-0">
  {/* left Illustration */}
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.3 }}
    viewport={{ once: true }}
    className="flex justify-center order-1 lg:order-1 min-w-0"
  >
    <motion.img
      src="/assets/video/ai.webp"
      alt="AI Chatbot & Business Automation"
      initial={{ scale: 0.9 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="max-w-full w-3/4 sm:w-2/3 lg:w-full h-auto"
    />
  </motion.div>

  {/* Right Content */}
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="space-y-4 sm:space-y-5 md:space-y-6 order-2 lg:order-2 min-w-0"
  >
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 break-words">
      AI Chatbot & Business Automation
    </h2>

    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="w-16 sm:w-20 h-[2px] bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 origin-left flex-shrink-0"
    ></motion.div>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
      className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed break-words"
    >
      Transform customer engagement with AI-powered chatbot solutions and
      intelligent business automation. At Creovate Technologies, we develop
      smart AI assistants for websites, WhatsApp, and customer support systems
      that automate conversations, capture leads, provide instant responses,
      and streamline business operations. Our solutions help businesses improve
      efficiency, reduce manual work, and deliver exceptional customer
      experiences 24/7.
    </motion.p>

    {/* Technology Icons */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { staggerChildren: 0.2 },
        },
      }}
      viewport={{ once: true }}
      className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 pt-2 sm:pt-3 md:pt-4 min-w-0"
    >
      {[
        { Icon: SiOpenai, color: "text-[#10A37F]", label: "OpenAI" },
        { Icon: FaRobot, color: "text-[#3B82F6]", label: "AI Chatbot" },
        { Icon: FaWhatsapp, color: "text-[#25D366]", label: "WhatsApp API" },
        { Icon: SiZapier, color: "text-[#FF4F00]", label: "Automation" },
      ].map(({ Icon, color, label }, index) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-1.5 sm:gap-2 cursor-pointer flex-shrink-0"
        >
          <Icon className={`text-2xl sm:text-3xl ${color} flex-shrink-0`} />
          <span className="text-sm sm:text-lg font-medium text-gray-800 whitespace-nowrap">
            {label}
          </span>
        </motion.div>
      ))}
    </motion.div>

   <motion.a
  href="/service"
  whileHover={{
    scale: 1.05,
    backgroundColor: "#f97316",
    color: "#fff",
  }}
  whileTap={{ scale: 0.95 }}
  className="mt-4 sm:mt-6 inline-block px-5 sm:px-6 py-2.5 sm:py-3 border border-orange-400 text-orange-500 font-medium rounded-md hover:shadow-lg transition cursor-pointer text-sm sm:text-base whitespace-nowrap"
>
  Explore Solutions
</motion.a>
  </motion.div>
</div>


 {/* ========= New Split Section ========= */}
<div className="mt-12 sm:mt-16 md:mt-20 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center min-w-0">
  {/* Left Content */}
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="space-y-4 sm:space-y-5 md:space-y-6 order-2 lg:order-1 min-w-0"
  >
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 break-words">
      UI/UX Design Services
    </h2>

    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="w-16 sm:w-20 h-[2px] bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 origin-left flex-shrink-0"
    ></motion.div>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
      className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed break-words"
    >
      Create exceptional digital experiences with our professional UI/UX
      design services. At{" "}
      <span className="font-semibold text-gray-900">
        Creovate Technologies
      </span>
      , we design intuitive, visually appealing, and user-centered interfaces
      that enhance engagement and improve conversions. From wireframes and
      prototypes to complete design systems, we craft seamless user journeys
      that help businesses deliver outstanding customer experiences across web
      and mobile platforms.
    </motion.p>

    {/* Design Tools */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { staggerChildren: 0.2 },
        },
      }}
      viewport={{ once: true }}
      className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 pt-2 sm:pt-3 md:pt-4 min-w-0"
    >
      {[
        { Icon: FaFigma, color: "text-pink-500", label: "Figma" },
        { Icon: FaSketch, color: "text-yellow-500", label: "Sketch" },
      ].map(({ Icon, color, label }, index) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-1.5 sm:gap-2 cursor-pointer flex-shrink-0"
        >
          <Icon className={`text-2xl sm:text-3xl ${color} flex-shrink-0`} />
          <span className="text-sm sm:text-lg font-medium text-gray-800 whitespace-nowrap">
            {label}
          </span>
        </motion.div>
      ))}
    </motion.div>

    {/* Button */}
    <motion.a
      href="/service"
      whileHover={{
        scale: 1.05,
        backgroundColor: "#f97316",
        color: "#fff",
      }}
      whileTap={{ scale: 0.95 }}
      className="mt-4 sm:mt-6 inline-block px-5 sm:px-6 py-2.5 sm:py-3 border border-orange-400 text-orange-500 font-medium rounded-md hover:shadow-lg transition cursor-pointer text-sm sm:text-base whitespace-nowrap"
    >
      Explore Solutions
    </motion.a>
  </motion.div>

  {/* Right Illustration */}
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.3 }}
    viewport={{ once: true }}
    className="flex justify-center order-1 lg:order-2 min-w-0"
  >
    <motion.img
      src="/assets/video/uiux.webp"
      alt="UI UX Design Services"
      initial={{ scale: 0.9 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="max-w-full w-3/4 sm:w-2/3 lg:w-full h-auto"
    />
  </motion.div>
</div>

    {/* ========= New Split Section ========= */}
<div className="mt-12 sm:mt-16 md:mt-20 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center min-w-0">
  {/* left Illustration */}
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.3 }}
    viewport={{ once: true }}
    className="flex justify-center order-1 lg:order-1 min-w-0"
  >
    <motion.img
      src="/assets/video/app.png"
      alt="Mobile App Development Services"
      initial={{ scale: 0.9 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="max-w-full w-3/4 sm:w-2/3 lg:w-full h-auto"
    />
  </motion.div>

  {/* Right Content */}
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="space-y-4 sm:space-y-5 md:space-y-6 order-2 lg:order-2 min-w-0"
  >
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 break-words">
      Mobile App Development Services
    </h2>

    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="w-16 sm:w-20 h-[2px] bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 origin-left flex-shrink-0"
    ></motion.div>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
      className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed break-words"
    >
      At{" "}
      <span className="font-semibold text-gray-900">
        Creovate Technologies
      </span>
      , we develop high-performance Android and iOS mobile applications that
      help businesses connect with customers, streamline operations, and drive
      growth. Using modern frameworks like Flutter and Firebase, we create
      scalable, secure, and feature-rich mobile apps with intuitive user
      experiences. From startup MVPs to enterprise-grade applications, our
      mobile solutions are designed to deliver exceptional performance across
      all devices and platforms.
    </motion.p>

    {/* Technologies */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { staggerChildren: 0.2 },
        },
      }}
      viewport={{ once: true }}
      className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 pt-2 sm:pt-3 md:pt-4 min-w-0"
    >
      {[
        { Icon: SiFlutter, color: "text-[#02569B]", label: "Flutter" },
        { Icon: SiAndroid, color: "text-[#3DDC84]", label: "Android" },
        { Icon: FaApple, color: "text-black", label: "iOS" },
        { Icon: SiFirebase, color: "text-[#FFCA28]", label: "Firebase" },
      ].map(({ Icon, color, label }, index) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-1.5 sm:gap-2 cursor-pointer flex-shrink-0"
        >
          <Icon className={`text-2xl sm:text-3xl ${color} flex-shrink-0`} />
          <span className="text-sm sm:text-lg font-medium text-gray-800 whitespace-nowrap">
            {label}
          </span>
        </motion.div>
      ))}
    </motion.div>

    {/* Button */}
    <motion.a
      href="/service"
      whileHover={{
        scale: 1.05,
        backgroundColor: "#f97316",
        color: "#fff",
      }}
      whileTap={{ scale: 0.95 }}
      className="mt-4 sm:mt-6 inline-block px-5 sm:px-6 py-2.5 sm:py-3 border border-orange-400 text-orange-500 font-medium rounded-md hover:shadow-lg transition cursor-pointer text-sm sm:text-base whitespace-nowrap"
    >
      Explore Solutions
    </motion.a>
  </motion.div>
</div>


      

      
    </section>
  );
}