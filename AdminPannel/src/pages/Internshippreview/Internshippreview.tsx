import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Internshippreview.css";

interface Internship {
  _id?: string;
  title: string;
  domain: string;
  description: string;
  duration: string;
  mode: string;
  skills: string;
  instructor: string;
  seats: string;
  startDate: string;
  endDate: string;
  fee: string;
  certificate: string;
  deadline: string;
  status?: boolean;
}

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Internshippreview: React.FC = () => {

  const [internships, setInternships] = useState<Internship[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const res = await axios.get(`${API}/internships`);
      setInternships(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ STATUS TOGGLE

  const toggleStatus = async (id?: string) => {

    if (!id) return;

    try {

      await axios.patch(`${API}/internships-toggle/${id}`);

      // Update UI instantly without reloading
      setInternships(prev =>
        prev.map(i =>
          i._id === id ? { ...i, status: !i.status } : i
        )
      );

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="preview-page">

      <h2 className="page-title">Available Internships</h2>

      {/* VIEW TOGGLE */}

      <div className="view-toggle">

        <button
          className={view === "grid" ? "active" : ""}
          onClick={() => setView("grid")}
        >
          Grid View
        </button>

        <button
          className={view === "list" ? "active" : ""}
          onClick={() => setView("list")}
        >
          List View
        </button>

      </div>

      {/* GRID VIEW */}

      {view === "grid" && (

        <div className="grid-container">

          {internships.map((intern) => (

            <div key={intern._id} className="internship-card">

              <h3>{intern.title}</h3>

              <p><strong>Domain:</strong> {intern.domain}</p>
              <p><strong>Instructor:</strong> {intern.instructor}</p>
              <p><strong>Mode:</strong> {intern.mode}</p>
              <p><strong>Duration:</strong> {intern.duration}</p>
              <p><strong>Fee:</strong> ₹{intern.fee}</p>

              {/* STATUS TOGGLE */}

              <div className="status-toggle">

                <label className="switch">

                  <input
                    type="checkbox"
                    checked={intern.status}
                    onChange={() => toggleStatus(intern._id)}
                  />

                  <span className="slider"></span>

                </label>

                <span className={intern.status ? "active-status" : "inactive-status"}>
                  {intern.status ? "Active" : "Inactive"}
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* LIST VIEW */}

      {view === "list" && (

        <div className="list-container">

          {internships.map((intern) => (

            <div key={intern._id} className="list-card">

              <div className="list-left">

                <h3>{intern.title}</h3>
                <p>{intern.description}</p>

              </div>

              <div className="list-right">

                <p><strong>Domain:</strong> {intern.domain}</p>
                <p><strong>Instructor:</strong> {intern.instructor}</p>
                <p><strong>Mode:</strong> {intern.mode}</p>
                <p><strong>Duration:</strong> {intern.duration}</p>

                {/* STATUS TOGGLE */}

                <div className="status-toggle">

                  <label className="switch">

                    <input
                      type="checkbox"
                      checked={intern.status}
                      onChange={() => toggleStatus(intern._id)}
                    />

                    <span className="slider"></span>

                  </label>

                  <span className={intern.status ? "active-status" : "inactive-status"}>
                    {intern.status ? "Active" : "Inactive"}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default Internshippreview;