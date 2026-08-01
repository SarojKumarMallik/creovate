// src/components/StatsCounter.jsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaProjectDiagram, FaSmile, FaUsers, FaBoxOpen } from "react-icons/fa";

export default function StatsCounter() {
  const stats = [
    { value: 43, label: "Projects Finished", icon: <FaProjectDiagram />, iconColor: "#FF6347" },
    { value: 25, label: "Happy Clients", icon: <FaSmile />, iconColor: "#32CD32" },
    { value: 11, label: "Team Members", icon: <FaUsers />, iconColor: "#1E90FF" },
    { value: 2, label: "Products", icon: <FaBoxOpen />, iconColor: "#FFD700" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 2000; // total animation time in ms
    const intervalTime = 10; // update every 20ms
    const steps = duration / intervalTime;
    const increments = stats.map(stat => stat.value / steps);

    let step = 0;

    const interval = setInterval(() => {
      step++;
      setCounts(prev =>
        prev.map((count, i) => Math.min(count + increments[i], stats[i].value))
      );

      if (step >= steps) clearInterval(interval);
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full py-24 bg-blue-50 text-gray-800 overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: i * 0.3, type: "spring", stiffness: 120 }}
            className="relative bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center group overflow-hidden cursor-pointer"
          >
            <div className="text-5xl mb-4" style={{ color: stat.iconColor }}>
              {stat.icon}
            </div>

            <motion.h2
              className="text-5xl font-extrabold drop-shadow-md tracking-wide font-[Poppins]"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
            >
              {Math.floor(counts[i])}+
            </motion.h2>

            <p className="mt-3 text-lg text-center tracking-wide font-[Montserrat]">
              {stat.label}
            </p>

            <motion.div
              className="absolute inset-0 bg-white/10 rounded-2xl blur-2xl opacity-30 pointer-events-none"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
