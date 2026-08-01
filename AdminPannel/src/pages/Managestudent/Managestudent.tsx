import React, { useEffect, useState } from "react";
import axios from "axios";

/* ================= TYPES ================= */

interface Internship {
  _id: string;
  title: string;
}

interface Student {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  college?: string;
  internshipId?: Internship;
  skills?: string;
  github?: string;
  linkedin?: string;
  coverLetter?: string;
  resume?: string;
  status?: "pending" | "approved" | "rejected";
}

/* ================= COMPONENT ================= */

const ManageStudent: React.FC = () => {

  const API = "http://localhost:5000/api";

  const [students, setStudents] = useState<Student[]>([]);
  const [filtered, setFiltered] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    skills: "",
    github: "",
    linkedin: "",
    coverLetter: "",
    status: "pending"
  });

  /* ================= FETCH ================= */

  const fetchStudents = async () => {

    try {

      setLoading(true);

      const res = await axios.get<Student[]>(`${API}/applications`);

      setStudents(res.data);
      setFiltered(res.data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchStudents();
  }, []);

  /* ================= SEARCH ================= */

  useEffect(() => {

    const data = students.filter((student) =>
      student.name?.toLowerCase().includes(search.toLowerCase()) ||
      student.email?.toLowerCase().includes(search.toLowerCase())
    );

    setFiltered(data);

  }, [search, students]);

  /* ================= DELETE ================= */

  const deleteStudent = async (id: string) => {

    const confirmDelete = window.confirm("Delete this student?");

    if (!confirmDelete) return;

    try {

      await axios.delete(`${API}/applications/${id}`);

      fetchStudents();

    } catch {

      alert("Delete failed");

    }

  };

  /* ================= OPEN EDIT ================= */

  const openEdit = (student: Student) => {

    setCurrentStudent(student);

    setFormData({
      name: student.name || "",
      email: student.email || "",
      phone: student.phone || "",
      college: student.college || "",
      skills: student.skills || "",
      github: student.github || "",
      linkedin: student.linkedin || "",
      coverLetter: student.coverLetter || "",
      status: student.status || "pending"
    });

    setEditModal(true);

  };

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };

  /* ================= UPDATE ================= */

  const updateStudent = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!currentStudent) return;

    try {

      await axios.put(
        `${API}/applications/${currentStudent._id}`,
        formData
      );

      setEditModal(false);

      fetchStudents();

    } catch {

      alert("Update failed");

    }

  };

  /* ================= UI ================= */

  return (

    <div style={container}>

      <div style={card}>

        <h2>Manage Students</h2>

        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchBox}
        />

        {loading ? (

          <p>Loading...</p>

        ) : (

          <table style={table}>

            <thead>

              <tr>

                <th style={th}>Name</th>
                <th style={th}>Email</th>
                <th style={th}>Phone</th>
                <th style={th}>College</th>
                <th style={th}>Skills</th>
                <th style={th}>Resume</th>
                <th style={th}>Status</th>
                <th style={th}>Action</th>

              </tr>

            </thead>

            <tbody>

              {filtered.map((student) => (

                <tr key={student._id}>

                  <td style={td}>{student.name}</td>
                  <td style={td}>{student.email}</td>
                  <td style={td}>{student.phone}</td>
                  <td style={td}>{student.college}</td>
                  <td style={td}>{student.skills}</td>

                  <td style={td}>
                    {student.resume ? (
                      <a
                        href={`http://localhost:5000/${student.resume}`}
                        target="_blank"
                        rel="noreferrer"
                        style={resumeBtn}
                      >
                        View
                      </a>
                    ) : "No Resume"}
                  </td>

                  <td style={td}>{student.status}</td>

                  <td style={td}>

                    <button
                      style={editBtn}
                      onClick={() => openEdit(student)}
                    >
                      Edit
                    </button>

                    <button
                      style={deleteBtn}
                      onClick={() => deleteStudent(student._id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

      {/* ================= EDIT MODAL ================= */}

      {editModal && (

        <div style={modalOverlay}>

          <div style={modal}>

            <h3>Edit Application</h3>

            <form onSubmit={updateStudent}>

              <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" style={input} />

              <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" style={input} />

              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" style={input} />

              <input name="college" value={formData.college} onChange={handleChange} placeholder="College" style={input} />

              <input name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills" style={input} />

              <input name="github" value={formData.github} onChange={handleChange} placeholder="Github" style={input} />

              <input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn" style={input} />

              <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} placeholder="Cover Letter" style={input} />

              <select name="status" value={formData.status} onChange={handleChange} style={input}>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              <div style={{ marginTop: "15px" }}>

                <button type="submit" style={saveBtn}>
                  Save
                </button>

                <button
                  type="button"
                  style={cancelBtn}
                  onClick={() => setEditModal(false)}
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );

};

/* ================= STYLES ================= */

const container: React.CSSProperties = { padding: "40px", background: "#f5f7fb", minHeight: "100vh" };
const card: React.CSSProperties = { background: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" };
const searchBox: React.CSSProperties = { padding: "8px", width: "250px", marginBottom: "20px", border: "1px solid #ddd", borderRadius: "5px" };
const table: React.CSSProperties = { width: "100%", borderCollapse: "collapse" };
const th: React.CSSProperties = { padding: "12px", background: "#007bff", color: "#fff" };
const td: React.CSSProperties = { padding: "12px", borderBottom: "1px solid #eee" };

const editBtn: React.CSSProperties = { background: "#ffc107", border: "none", padding: "6px 10px", marginRight: "5px", borderRadius: "4px", cursor: "pointer" };
const deleteBtn: React.CSSProperties = { background: "#dc3545", color: "#fff", border: "none", padding: "6px 10px", borderRadius: "4px", cursor: "pointer" };

const resumeBtn: React.CSSProperties = { background: "#007bff", color: "#fff", padding: "5px 10px", borderRadius: "4px", textDecoration: "none" };

const modalOverlay: React.CSSProperties = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center" };

const modal: React.CSSProperties = { background: "#fff",marginTop:"60px", padding: "10px", borderRadius: "10px", width: "800px" };

const input: React.CSSProperties = { width: "100%", padding: "8px", marginTop: "10px", border: "1px solid #ddd", borderRadius: "5px" };

const saveBtn: React.CSSProperties = { background: "#28a745", color: "#fff", border: "none", padding: "8px 12px", marginRight: "10px", borderRadius: "5px", cursor: "pointer" };

const cancelBtn: React.CSSProperties = { background: "#6c757d", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" };

export default ManageStudent;