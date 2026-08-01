import React, { useState } from "react";
import {
  FaEllipsisV,
  FaDownload,
  FaShareAlt,
  FaTrash,
  FaChevronDown,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Area,
  ComposedChart,
  Bar,
} from "recharts";

import "./DashbordGraph.css";

import user1 from "../../Asserts/User-1.webp";
import user2 from "../../Asserts/User-2.webp";
import user3 from "../../Asserts/User-3.webp";

const chartData = [
  { name: "Sun", projects: 20, revenue: 10, tasks: 12 },
  { name: "Mon", projects: 28, revenue: 15, tasks: 20 },
  { name: "Tue", projects: 36, revenue: 17, tasks: 14 },
  { name: "Wed", projects: 34, revenue: 15, tasks: 19 },
  { name: "Thu", projects: 44, revenue: 12, tasks: 15 },
  { name: "Fri", projects: 42, revenue: 20, tasks: 18 },
  { name: "Sat", projects: 50, revenue: 28, tasks: 22 },
];

const DashbordGraph: React.FC = () => {
  const [analysisMenu, setAnalysisMenu] = useState(false);
  const [taskFilter, setTaskFilter] = useState("View All");
  const [taskMenu, setTaskMenu] = useState<number | null>(null);
  const [activityMenu, setActivityMenu] = useState(false);

  const tasks = [
    { title: "Designing a landing page", date: "10-04-22", checked: false },
    { title: "Fixing Responsive Issues", date: "07-04-22", checked: true },
    { title: "Fixing Bugs in project 2A2", date: "09-04-22", checked: false },
    { title: "Designing a landing page", date: "10-04-22", checked: false },
    { title: "Fixing Responsive Issues", date: "07-04-22", checked: true },
    { title: "Fixing Bugs in registration page", date: "09-04-22", checked: false },
  ];

  const activities = [
    {
      color: "purple",
      title: "Task Finished",
      desc: "Adam Berry finished task on AngularJS Template",
      date: "09 July 2021",
    },
    {
      color: "orange",
      title: "New Comment",
      desc: "Victoria commented on Project AngularJS Template",
      date: "05 July 2021",
    },
    {
      color: "green",
      title: "Task Overdue",
      desc: "Petey Cruiser finished Integrated Management",
      date: "29 June 2021",
    },
    {
      color: "purple",
      title: "Task Finished",
      desc: "Adam Berry finished task on AngularJS Template",
      date: "09 July 2021",
    },
    {
      color: "yellow",
      title: "Task Finished",
      desc: "Adam Berry finished task on Project Management",
      date: "09 July 2021",
    },
    {
      color: "blue",
      title: "New Comment",
      desc: "Victoria commented on Project AngularJS Template",
      date: "05 July 2021",
    },
  ];

  return (
    <div className="admindash-grid-wrapper">

      {/* ================= CARD 1 ================= */}
      <div className="admindash-card">
        <div className="admindash-card-header">
          <h3>Project Analysis</h3>
          <div className="admindash-menu-wrapper">
            <FaEllipsisV onClick={() => setAnalysisMenu(!analysisMenu)} />
            {analysisMenu && (
              <div className="admindash-dropdown">
                <div><FaShareAlt /> Share</div>
                <div><FaDownload /> Download</div>
                <div><FaTrash /> Delete</div>
              </div>
            )}
          </div>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="tasks" fill="#ede9fe" stroke="transparent" />
            <Bar dataKey="projects" fill="#7C3AED" radius={[6, 6, 0, 0]} />
            <Bar dataKey="revenue" fill="#F97316" radius={[6, 6, 0, 0]} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

    {/* ================= CARD 2 ================= */}
<div className="admindash-card">

  <div className="admindash-task-header">
    <h3>Ongoing Tasks</h3>

    <div className="admindash-filter-btn">
      {taskFilter}
      <FaChevronDown />
      <div className="admindash-filter-dropdown">
        <div onClick={() => setTaskFilter("Today")}>Today</div>
        <div onClick={() => setTaskFilter("This Week")}>This Week</div>
        <div onClick={() => setTaskFilter("Last Week")}>Last Week</div>
      </div>
    </div>
  </div>

  <div className="admindash-scroll-area">
    {tasks.map((task, index) => (
      <div key={index} className="admindash-task-row">

        {/* LEFT SIDE */}
        <div className="admindash-task-left">

          <input
            type="checkbox"
            defaultChecked={task.checked}
            className="admindash-checkbox"
          />

          <div className="admindash-task-content">

            <p className="admindash-task-title">{task.title}</p>

            <div className="admindash-task-bottom">

              {/* VERTICAL AVATARS */}
              <div className="admindash-vertical-users">
                <img src={user1} alt="" />
                <img src={user2} alt="" />
                <img src={user3} alt="" />
                {task.checked && (
                  <span className="admindash-plus-badge">+3</span>
                )}
              </div>

              <div className="admindash-task-date">
                ⏱ {task.date}
              </div>

            </div>

          </div>
        </div>

        {/* RIGHT 3 DOTS */}
        <FaEllipsisV className="admindash-task-menu" />

      </div>
    ))}
  </div>
</div>


      {/* ================= CARD 3 ================= */}
      <div className="admindash-card">
        <div className="admindash-card-header">
          <h3>Recent Activity</h3>
          <div className="admindash-menu-wrapper">
            <FaEllipsisV onClick={() => setActivityMenu(!activityMenu)} />
            {activityMenu && (
              <div className="admindash-dropdown">
                <div>Refresh</div>
                <div>Clear All</div>
              </div>
            )}
          </div>
        </div>

        <div className="admindash-scroll-area">
          {activities.map((item, index) => (
            <div key={index} className="admindash-activity-row">
              <span className={`admindash-dot ${item.color}`}></span>

              <div className="admindash-activity-content">
                <div className="admindash-activity-top">
                  <h4>{item.title}</h4>
                  <span>{item.date}</span>
                </div>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DashbordGraph;
