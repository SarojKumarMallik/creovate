import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Users, Book, Mail, Grid, List } from "lucide-react";
import "./ManageInstructor.css";

interface Instructor {
  _id: string;
  name: string;
  role: string;
  email: string;
  mobile?: string;
  courses?: number;
  students?: number;
  avatar?: string;
}

const ManageInstructor = () => {

  const [view, setView] = useState<"grid" | "list">("grid");
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [search, setSearch] = useState("");

  const API = "http://localhost:5000/api/instructors";

  /* ================= FETCH DATA ================= */

  const fetchInstructors = async () => {
    try {

      const res = await axios.get(API);

      setInstructors(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchInstructors();

  }, []);

  /* ================= SEARCH FILTER ================= */

  const filtered = instructors.filter((ins) =>
    ins.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="manage-wrapper">

      <h1 className="page-title">Manage Instructors</h1>

      {/* ================= TOP BAR ================= */}

      <div className="top-bar">

        <div className="search-box">
          <Search size={18} />
          <input
            placeholder="Search instructor..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div>

        <div className="view-buttons">

          <button
            className={view === "grid" ? "active" : ""}
            onClick={() => setView("grid")}
          >
            <Grid size={18}/>
          </button>

          <button
            className={view === "list" ? "active" : ""}
            onClick={() => setView("list")}
          >
            <List size={18}/>
          </button>

        </div>

      </div>

      {/* ================= GRID VIEW ================= */}

      {view === "grid" && (

        <div className="grid-view">

          {filtered.map((ins) => (

            <div className="instructor-card" key={ins._id}>

              <div className="card-header">

                <img
                  src={`http://localhost:5000/uploads/${ins.avatar}`}
                  alt=""
                  className="avatar"
                />

                <div>
                  <h3>{ins.name}</h3>
                  <p>{ins.role}</p>
                </div>

              </div>

              

              <div className="card-footer">

                <Mail size={16}/>
                <span>{ins.email}</span>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* ================= LIST VIEW ================= */}

      {view === "list" && (

        <table className="list-table">

          <thead>

            <tr>
              <th>Instructor</th>
              <th>Role</th>
              <th>Email</th>
              <th>Mobile</th>
            </tr>

          </thead>

          <tbody>

            {filtered.map((ins) => (

              <tr key={ins._id}>

                <td className="list-instructor">

                  <img
                    src={`http://localhost:5000/uploads/${ins.avatar}`}
                    className="avatar"
                    alt=""
                  />

                  <span>{ins.name}</span>

                </td>

                <td>{ins.role}</td>
                <td>{ins.email}</td>
                <td>{ins.mobile}</td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
};

export default ManageInstructor;