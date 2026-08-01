import React from "react";
import { ArrowUpRight } from "lucide-react";

const hiringSteps = [
  {
    number: "01",
    title: "Application Review",
    description:
      "We carefully evaluate your resume, technical skills, and professional background.",
  },
  {
    number: "02",
    title: "Initial Interview",
    description:
      "A friendly discussion to understand your goals, communication, and experience.",
  },
  {
    number: "03",
    title: "Technical Assessment",
    description:
      "Demonstrate your problem-solving skills through practical tasks and evaluations.",
  },
  {
    number: "04",
    title: "Final Interview & Offer",
    description:
      "Meet our leadership team and discuss your future growth at Creovate Technologies.",
  },
];

const Howwehire = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-block px-6 py-2 rounded-full bg-orange-100 text-[#FF6B00] text-sm font-semibold uppercase tracking-[4px]">
            How We Hire
          </span>

          <h2 className="mt-6 text-4xl md:text-6xl font-bold text-[#0B1B52]">
            Transparent & Structured
           
            Hiring Process
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-gray-600 text-lg">
            Our recruitment process is designed to ensure a smooth,
            transparent, and candidate-friendly experience from application
            to onboarding.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">

          {/* Connector Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-[#FF6B00] via-[#2563EB] to-[#FF6B00]" />

          <div className="space-y-10">
            {hiringSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                } flex-col gap-6`}
              >
                {/* Card */}
                <div className="w-full md:w-[45%]">
                  <div className="group relative bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">

                    {/* Top Gradient */}
                    <div className="absolute top-0 left-0 w-full h-1 rounded-t-3xl bg-gradient-to-r from-[#FF6B00] via-[#2563EB] to-[#00A3FF]" />

                    <h3 className="text-2xl font-bold text-[#0B1B52] mb-3">
                      {step.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Circle */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#2563EB] flex items-center justify-center text-white font-bold text-xl shadow-xl">
                  {step.number}
                </div>

                {/* Empty Side */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            ))}
          </div>
        </div>

     
      </div>
    </section>
  );
};

export default Howwehire;