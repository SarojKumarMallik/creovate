import React, { useState } from "react";
import "./PreviewInternship.css";
import { FiGrid, FiList, FiMapPin, FiCalendar } from "react-icons/fi";

interface Internship {
  id: string;
  title: string;
  department: string;
  location: string;
  duration: string;
  type: string;
  description: string;
  startDate: string;
}

const dummyData: Internship[] = [
  {
    id: "ADV-100231",
    title: "Frontend Developer Intern",
    department: "IT Department",
    location: "Mumbai",
    duration: "3 Months",
    type: "Stipend",
    description: "Work with React, TypeScript and modern UI systems.",
    startDate: "01-07-2026",
  },
  {
    id: "ADV-100232",
    title: "Marketing Intern",
    department: "Marketing",
    location: "Delhi",
    duration: "6 Months",
    type: "Free of Cost",
    description: "Assist in digital marketing campaigns and SEO.",
    startDate: "15-07-2026",
  },

  {
    id: "ADV-100232",
    title: "Marketing Intern",
    department: "Marketing",
    location: "Delhi",
    duration: "6 Months",
    type: "Free of Cost",
    description: "Assist in digital marketing campaigns and SEO.",
    startDate: "15-07-2026",
  },

  {
    id: "ADV-100232",
    title: "Marketing Intern",
    department: "Marketing",
    location: "Delhi",
    duration: "6 Months",
    type: "Free of Cost",
    description: "Assist in digital marketing campaigns and SEO.",
    startDate: "15-07-2026",
  },
];

const PreviewInternship: React.FC = () => {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="ip-container">
      {/* Header */}
      <div className="ip-header">
        <h2>Internship Listings</h2>

        <div className="ip-view-toggle">
          <button
            className={view === "grid" ? "active" : ""}
            onClick={() => setView("grid")}
          >
            <FiGrid />
          </button>
          <button
            className={view === "list" ? "active" : ""}
            onClick={() => setView("list")}
          >
            <FiList />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className={view === "grid" ? "ip-grid" : "ip-list"}>
        {dummyData.map((item) => (
          <div key={item.id} className="ip-card">
            <div className="ip-card-header">
              <h3>{item.title}</h3>
              <span className="ip-badge">{item.type}</span>
            </div>

            <p className="ip-description">{item.description}</p>

            <div className="ip-meta">
              <span>
                <FiMapPin /> {item.location}
              </span>
              <span>
                <FiCalendar /> {item.startDate}
              </span>
            </div>

            <div className="ip-footer">
              <span>{item.department}</span>
              <span>{item.duration}</span>
            </div>

            <button className="ip-apply-btn">Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewInternship;