import React from "react";
import {
  Layers3,
  LayoutGrid,
  Database,
  ArrowUpRight,
  Clock3,
} from "lucide-react";

const openings = [
  {
    icon: <Layers3 size={40} />,
    title: "Frontend Developer",
    experience: "1-3 Years",
    description:
      "Build modern, responsive, and high-performance user interfaces for web applications.",
    skills: ["React.js", "Next.js", "Tailwind CSS", "JavaScript", "Redux"],
  },
  {
    icon: <LayoutGrid size={40} />,
    title: "Full Stack Developer",
    experience: "2-5 Years",
    description:
      "Develop scalable web applications and REST APIs using modern MERN stack technologies.",
    skills: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT"],
  },
  {
    icon: <Database size={40} />,
    title: "Database Engineer",
    experience: "2-4 Years",
    description:
      "Design, optimize and manage secure database systems for enterprise applications.",
    skills: ["MySQL", "MongoDB", "PostgreSQL", "Redis", "Performance"],
  },
];

const Opennings = () => {
  return (
    <section className="py-14 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Heading */}
        <div className="text-center mb-20">
          <span className="inline-block px-5 py-2 rounded-full bg-orange-100 text-[#FF6B00] font-semibold text-sm tracking-[3px] uppercase">
            We Are Hiring
          </span>

          <h2 className="mt-6 text-4xl md:text-6xl font-bold text-[#0B1B52]">
            Open Positions
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-gray-600 text-lg">
            Join our growing team and work on innovative projects with
            cutting-edge technologies.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {openings.map((job, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 hover:border-blue-500 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(37,99,235,0.12)]"
            >
              {/* Top Gradient */}
              <div className="h-2 bg-gradient-to-r from-[#FF6B00] via-[#2563EB] to-[#00C2FF]" />

              <div className="p-8">
                {/* Icon */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center text-[#2563EB] mb-6 group-hover:scale-110 transition duration-300">
                  {job.icon}
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold text-[#0B1B52] mb-4">
                  {job.title}
                </h3>

                {/* Experience */}
                <div className="flex items-center gap-2 mb-5 text-sm text-gray-500">
                  <Clock3 size={16} />
                  <span>{job.experience}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {job.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {job.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm rounded-full bg-slate-100 text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Apply Button */}
                <a
                  href={`mailto:creovatetechnologies@gmail.com?subject=Application for ${job.title}`}
                  className="group/btn inline-flex items-center gap-2 bg-[#0B1B52] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#FF6B00] transition-all duration-300"
                >
                  Apply Now

                  <ArrowUpRight
                    size={18}
                    className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
                  />
                </a>
              </div>

              {/* Hover Glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Opennings;