import React, { useState } from "react";
import "./DashboardSheudle.css";
import { FiClock, FiChevronDown, FiMoreVertical } from "react-icons/fi";

import member1 from "../../Asserts/User-1.webp";
import member2 from "../../Asserts/User-2.webp";
import member3 from "../../Asserts/User-3.webp";
import member4 from "../../Asserts/User-4.webp";
import member5 from "../../Asserts/User-1.webp";

const monthsList = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const weekDates = [
  { date: 9, day: "Sun" },
  { date: 10, day: "Mon" },
  { date: 11, day: "Tue" },
  { date: 12, day: "Wed" },
  { date: 13, day: "Thu" },
  { date: 14, day: "Fri" },
  { date: 15, day: "Sat" },
];

const scheduleData: any = {
  9: [
    { title: "Meeting with client", sub: "Video conference", time: "09:00 - 12:00", color: "#22c55e" },
    { title: "Lunch with team members", sub: "Dolores Ait Labore Sit", time: "12:00 - 13:20", color: "#8b5cf6" },
    { title: "Meeting With Client Yuhan Sev", sub: "Golden Park", time: "16:00 - 17:20", color: "#f59e0b" },
    { title: "Create New Registration Page", sub: "2UA Project", time: "18:15 - 19:00", color: "#3b82f6" },
  ],
  10: [
    { title: "UI Design Discussion", sub: "Zoom Call", time: "10:00 - 11:30", color: "#ef4444" },
    { title: "Backend API Review", sub: "Office Room 2", time: "14:00 - 15:00", color: "#06b6d4" },
  ],
  11: [
    { title: "Marketing Strategy Meet", sub: "Google Meet", time: "11:00 - 12:00", color: "#10b981" },
    { title: "Client Call", sub: "Conference Room A", time: "15:00 - 16:00", color: "#6366f1" },
  ],
  12: [
    { title: "Sprint Planning", sub: "Scrum Board", time: "09:30 - 10:30", color: "#f97316" },
    { title: "Database Optimization", sub: "Tech Team", time: "13:00 - 14:30", color: "#14b8a6" },
  ],
  13: [
    { title: "Code Review", sub: "GitHub Review", time: "10:00 - 11:00", color: "#ec4899" },
    { title: "Design Feedback", sub: "UI Team", time: "16:00 - 17:00", color: "#0ea5e9" },
  ],
  14: [
    { title: "Testing Deployment", sub: "Server Testing", time: "12:00 - 13:00", color: "#8b5cf6" },
    { title: "Product Demo", sub: "Client Meeting", time: "15:00 - 16:30", color: "#22c55e" },
  ],
  15: [
    { title: "Team Outing", sub: "City Park", time: "17:00 - 19:00", color: "#ef4444" },
    { title: "Weekly Wrap-up", sub: "Office Hall", time: "19:30 - 20:00", color: "#3b82f6" },
  ],
};


const DashboardSheudle: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState("May");
  const [monthDropdown, setMonthDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(9);
  const [teamDropdown, setTeamDropdown] = useState(false);

  const teamMembers = [
    {
      id: "01",
      name: "Richard Dom",
      email: "richarddom1116@demo.com",
      role: "Team Leader",
      memberId: "#HTC098701",
      tasks: 135,
      image: member1,
    },
    {
      id: "02",
      name: "Jennifer Tab",
      email: "jenny258@demo.com",
      role: "Project Manager",
      memberId: "#HTC098702",
      tasks: 105,
      image: member2,
    },
    {
      id: "03",
      name: "Nikki Jey",
      email: "nikki1141@demo.com",
      role: "UI Developer",
      memberId: "#HTC098703",
      tasks: 100,
      image: member3,
    },
    {
      id: "04",
      name: "Arifa Zed",
      email: "arifaZ@demo.com",
      role: "Web Developer",
      memberId: "#HTC098704",
      tasks: 55,
      image: member4,
    },
    {
      id: "05",
      name: "Xiong Yu",
      email: "xingzing444@demo.com",
      role: "Team Member",
      memberId: "#HTC098705",
      tasks: 65,
      image: member5,
    },
  ];

  return (
    <div className="dash-main-wrapper">
      <div className="dash-grid-layout">

        {/* Project Status */}
        <div className="dash-card">
        <div className="dash-card-header">
  <h3 className="dash-card-heading">Project Status</h3>
</div>
<div className="dash-card-divider"></div>

          <div className="dash-project-list">
            {[
              ["Wordpress Template","25%","progress"],
              ["Blog Page","60%","pending"],
              ["E commerce Blog","75%","progress"],
              ["E-mail Templates","100%","finished"],
              ["Business Website","100%","finished"],
              ["Admin Templates","90%","progress"],
              ["Beauty Templates","50%","pending"],
              ["Authentication Pages","59%","progress"],
              ["Landing Pages","100%","finished"],
            ].map((item,index)=>(
              <div key={index} className="dash-project-item">
                <span>{item[0]}</span>
                <div className="dash-project-right">
                  <span>{item[1]}</span>
                  <span className={`dash-status ${item[2]}`}>
                    {item[2]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Schedule */}
        <div className="dash-card">
          <div className="dash-card-header">
            <h3>Upcoming Schedule</h3>
            
            <div className="dash-month-wrapper">
              <button
                onClick={() => setMonthDropdown(!monthDropdown)}
                className="dash-month-btn"
              >
                {selectedMonth} <FiChevronDown />
              </button>

              {monthDropdown && (
                <div className="dash-month-menu">
                  {monthsList.map((month) => (
                    <div
                      key={month}
                      onClick={() => {
                        setSelectedMonth(month);
                        setMonthDropdown(false);
                      }}
                    >
                      {month}
                    </div>
                  ))}
                </div>
              )}
              <span className="dash-year">2023</span>
            </div>
          </div>

          {/* Dates */}
          <div className="dash-date-row">
            {weekDates.map((item) => (
              <div
                key={item.date}
                className={`dash-date-item ${
                  selectedDate === item.date ? "active" : ""
                }`}
                onClick={() => setSelectedDate(item.date)}
              >
                <span>{item.date.toString().padStart(2, "0")}</span>
                <small>{item.day}</small>
              </div>
            ))}
          </div>

          {/* Events */}
          <div className="dash-event-box">
            {scheduleData[selectedDate]?.map((event:any, index:number)=>(
              <div key={index} className="dash-event-item">
                <div
                  className="dash-left-line"
                  style={{ backgroundColor: event.color }}
                />
                <div className="dash-event-content">
                  <div>
                    <h4>{event.title}</h4>
                    <p>{event.sub}</p>
                  </div>
                  <span><FiClock /> {event.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div className="dash-card">
          <div className="dash-card-header">
            <h3>Team Members</h3>
            <div className="dash-team-dropdown">
              <FiMoreVertical onClick={()=>setTeamDropdown(!teamDropdown)} />
              {teamDropdown && (
                <div className="dash-team-menu">
                  <div>Today</div>
                  <div>This Week</div>
                  <div>Last Week</div>
                </div>
              )}
            </div>
          </div>

          <div className="dash-table-wrapper">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>Member</th>
                  <th>Role</th>
                  <th>Member Id</th>
                  <th>Tasks</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member)=>(
                  <tr key={member.id}>
                    <td>{member.id}</td>
                    <td className="dash-member-cell">
                      <img src={member.image} alt="" />
                      <div>
                        <p>{member.name}</p>
                        <span>{member.email}</span>
                      </div>
                    </td>
                    <td>{member.role}</td>
                    <td>{member.memberId}</td>
                    <td>{member.tasks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardSheudle;
