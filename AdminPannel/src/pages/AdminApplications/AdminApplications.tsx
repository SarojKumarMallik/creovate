import React, { useEffect, useState } from "react";
import axios from "axios";

/* ================= TYPES ================= */

interface Internship {
  _id: string;
  title: string;
}

interface Application {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  college?: string;
  internshipId?: Internship;
  resume?: string;
  status: "pending" | "approved" | "rejected";
}

/* ================= COMPONENT ================= */

const AdminApplications: React.FC = () => {

  const API = "http://localhost:5000/api";

  const [applications, setApplications] = useState<Application[]>([]);
  const [filtered, setFiltered] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [error, setError] = useState<string>("");

  /* ================= FETCH ================= */

  const fetchApplications = async () => {

    try {

      setLoading(true);
      setError("");

      const res = await axios.get<Application[]>(`${API}/applications`);

      setApplications(res.data);
      setFiltered(res.data);

    } catch (err) {

      setError("Failed to fetch applications");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchApplications();
  }, []);

  /* ================= SEARCH + FILTER ================= */

  useEffect(() => {

    let data = [...applications];

    if (search) {

      data = data.filter((app) =>
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.email.toLowerCase().includes(search.toLowerCase())
      );

    }

    if (statusFilter !== "all") {

      data = data.filter((app) => app.status === statusFilter);

    }

    setFiltered(data);

  }, [search, statusFilter, applications]);

  /* ================= APPROVE ================= */

  const approve = async (id: string) => {

    const confirm = window.confirm("Approve this application?");

    if (!confirm) return;

    try {

      await axios.put(`${API}/applications/approve/${id}`);

      fetchApplications();

    } catch {

      alert("Error approving application");

    }

  };

  /* ================= REJECT ================= */

  const reject = async (id: string) => {

    const confirm = window.confirm("Reject this application?");

    if (!confirm) return;

    try {

      await axios.put(`${API}/applications/reject/${id}`);

      fetchApplications();

    } catch {

      alert("Error rejecting application");

    }

  };

  /* ================= STATUS BADGE ================= */

  const getStatusBadge = (status: string) => {

    const base = {
      padding: "4px 10px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: 600
    };

    if (status === "approved")
      return { ...base, background: "#d4edda", color: "#155724" };

    if (status === "rejected")
      return { ...base, background: "#f8d7da", color: "#721c24" };

    return { ...base, background: "#fff3cd", color: "#856404" };

  };

  /* ================= UI ================= */

  return (

    <div style={container}>

      <div style={card}>

        <h2 style={{ marginBottom: "20px" }}>
          Internship Applications
        </h2>

        {/* SEARCH + FILTER */}

        <div style={controls}>

          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={searchInput}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={filterSelect}
          >

            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>

          </select>

        </div>

        {loading && <p>Loading applications...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && filtered.length === 0 && (
          <p>No applications found</p>
        )}

        {!loading && filtered.length > 0 && (

          <table style={table}>

            <thead>

              <tr>

                <th style={th}>Name</th>
                <th style={th}>Email</th>
                <th style={th}>Internship</th>
                <th style={th}>Status</th>
                <th style={th}>Resume</th>
                <th style={th}>Actions</th>

              </tr>

            </thead>

            <tbody>

              {filtered.map((app) => (

                <tr key={app._id}>

                  <td style={td}>{app.name}</td>

                  <td style={td}>{app.email}</td>

                  <td style={td}>
                    {app.internshipId?.title || "N/A"}
                  </td>

                  <td style={td}>
                    <span style={getStatusBadge(app.status)}>
                      {app.status}
                    </span>
                  </td>

                  <td style={td}>

                    {app.resume ? (

                      <a
                        href={`http://localhost:5000/${app.resume}`}
                        target="_blank"
                        rel="noreferrer"
                        style={resumeBtn}
                      >
                        View
                      </a>

                    ) : (
                      "No Resume"
                    )}

                  </td>

                  <td style={td}>

                    {app.status === "pending" && (

                      <>
                        <button
                          style={approveBtn}
                          onClick={() => approve(app._id)}
                        >
                          Approve
                        </button>

                        <button
                          style={rejectBtn}
                          onClick={() => reject(app._id)}
                        >
                          Reject
                        </button>
                      </>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>

  );

};

/* ================= STYLES ================= */

const container: React.CSSProperties = {
  padding: "40px",
  background: "#f5f7fb",
  minHeight: "100vh"
};

const card: React.CSSProperties = {
  background: "#fff",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
};

const controls: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px"
};

const searchInput: React.CSSProperties = {
  padding: "8px 10px",
  width: "250px",
  border: "1px solid #ddd",
  borderRadius: "5px"
};

const filterSelect: React.CSSProperties = {
  padding: "8px",
  border: "1px solid #ddd",
  borderRadius: "5px"
};

const table: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse"
};

const th: React.CSSProperties = {
  textAlign: "left",
  padding: "12px",
  background: "#007bff",
  borderBottom: "1px solid #ddd"
};

const td: React.CSSProperties = {
  padding: "12px",
  borderBottom: "1px solid #eee"
};

const approveBtn: React.CSSProperties = {
  background: "#28a745",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  marginRight: "5px",
  borderRadius: "4px",
  cursor: "pointer"
};

const rejectBtn: React.CSSProperties = {
  background: "#dc3545",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "4px",
  cursor: "pointer"
};

const resumeBtn: React.CSSProperties = {
  background: "#007bff",
  color: "#fff",
  padding: "5px 10px",
  borderRadius: "4px",
  textDecoration: "none"
};

export default AdminApplications;