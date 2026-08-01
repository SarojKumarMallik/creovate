import React, { useState } from "react";
import "./DashboardProject.css";
import {
  FiSearch,
  FiChevronDown,
  FiEdit2,
  FiTrash2,
  FiMoreVertical,
} from "react-icons/fi";

import user1 from "../../Asserts/User-1.webp";
import user2 from "../../Asserts/User-2.webp";
import user3 from "../../Asserts/User-3.webp";
import user4 from "../../Asserts/User-4.webp";

const DashboardProject: React.FC = () => {
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);

  const projects = [
    {
      id: 1,
      name: "Home Page",
      start: "01 Apr 2023",
      due: "14-04-2023",
      members: [user1, user2, user3],
      extra: "+2",
      status: "In Progress",
    },
    {
      id: 2,
      name: "Landing Design",
      start: "02 Apr 2023",
      due: "20-04-2023",
      members: [user2, user3, user4],
      extra: "",
      status: "In Progress",
    },
    {
      id: 3,
      name: "New Template Design",
      start: "10 Apr 2023",
      due: "29-05-2023",
      members: [user1, user4],
      extra: "",
      status: "Pending",
    },
    {
      id: 4,
      name: "HR Management Template Design",
      start: "01 May 2023",
      due: "18-04-2023",
      members: [user1, user2],
      extra: "+5",
      status: "In Progress",
    },
    {
      id: 5,
      name: "Designing New Template",
      start: "20 May 2023",
      due: "11-04-2023",
      members: [user3, user4],
      extra: "+3",
      status: "Completed",
    },
    {
      id: 6,
      name: "Documentation Project",
      start: "21 May 2023",
      due: "18-04-2023",
      members: [user1, user2, user3, user4],
      extra: "",
      status: "In Progress",
    },
  ];

  return (
    <div className="proj-summary-wrapper">
      <div className="proj-summary-card">

        {/* Header */}
        <div className="proj-summary-header">
          <h3>Projects Summary</h3>

          <div className="proj-summary-actions">

            {/* Search */}
            <div className="proj-search-box">
              <FiSearch />
              <input placeholder="Search Here" />
            </div>

            {/* Sort */}
            <div className="proj-sort-wrapper">
              <button
                className="proj-sort-btn"
                onClick={() => setSortOpen(!sortOpen)}
              >
                Sort By <FiChevronDown />
              </button>

              {sortOpen && (
                <div className="proj-sort-menu">
                  <div>New</div>
                  <div>Popular</div>
                  <div>Relevant</div>
                </div>
              )}
            </div>

            {/* 3 Dots Filter */}
            <div className="proj-filter-wrapper">
              <FiMoreVertical onClick={() => setFilterOpen(!filterOpen)} />
              {filterOpen && (
                <div className="proj-filter-menu">
                  <div>All</div>
                  <div>In Progress</div>
                  <div>Pending</div>
                  <div>Completed</div>
                </div>
              )}
            </div>

          </div>
        </div>

        <div className="proj-divider"></div>

        {/* Table */}
        <div className="proj-table-wrapper">
          <table className="proj-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Project Name</th>
                <th>Start Date</th>
                <th>Due Date</th>
                <th>Team Members</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.start}</td>
                  <td>{item.due}</td>

                  <td>
                    <div className="proj-avatar-group">
                      {item.members.map((img, i) => (
                        <img key={i} src={img} alt="" />
                      ))}
                      {item.extra && (
                        <span className="proj-avatar-extra">
                          {item.extra}
                        </span>
                      )}
                    </div>
                  </td>

                  <td>
                    <span className={`proj-status ${item.status.replace(" ","-")}`}>
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <div className="proj-action-btns">
                      <button className="proj-edit-btn">
                        <FiEdit2 />
                      </button>
                      <button className="proj-delete-btn">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="proj-footer">
          <span>Showing 6 Entries →</span>

          <div className="proj-pagination">
            <button>Prev</button>
            <button
              className={page === 1 ? "active" : ""}
              onClick={() => setPage(1)}
            >
              1
            </button>
            <button
              className={page === 2 ? "active" : ""}
              onClick={() => setPage(2)}
            >
              2
            </button>
            <button>Next</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardProject;
