import React, { useState, useEffect, useRef } from "react";
import "./Internshipcreate.css";
import axios from "axios";

interface Internship {
  _id?: string;
  title: string;
  domain: string;
  description: string;
  duration: string;
  mode: string;
  skills: string;
  instructor: string; // will store instructorId
  seats: string;
  startDate: string;
  endDate: string;
  fee: string;
  certificate: string;
  deadline: string;
}

interface Category {
  _id: string;
  name: string;
}

interface Instructor {
  _id: string;
  name: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API = `${API_URL}/internships`;
const CATEGORY_API = `${API_URL}/categories`;
const INSTRUCTOR_API = `${API_URL}/instructors`;

const Internshipcreate: React.FC = () => {

  const [internships, setInternships] = useState<Internship[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const deadlineRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Internship>({
    title: "",
    domain: "",
    description: "",
    duration: "",
    mode: "",
    skills: "",
    instructor: "",
    seats: "",
    startDate: "",
    endDate: "",
    fee: "",
    certificate: "",
    deadline: ""
  });

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    fetchInternships();
    fetchCategories();
    fetchInstructors();
  }, []);

  const fetchInternships = async () => {
    const res = await axios.get(API);
    setInternships(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get(CATEGORY_API);
    setCategories(res.data);
  };

  const fetchInstructors = async () => {
    const res = await axios.get(INSTRUCTOR_API);
    setInstructors(res.data);
  };

  /* ================= HANDLE INPUT ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (editingId) {

      await axios.put(`${API}/${editingId}`, formData);
      setEditingId(null);

    } else {

      await axios.post(API, formData);

    }

    fetchInternships();

    setFormData({
      title: "",
      domain: "",
      description: "",
      duration: "",
      mode: "",
      skills: "",
      instructor: "",
      seats: "",
      startDate: "",
      endDate: "",
      fee: "",
      certificate: "",
      deadline: ""
    });

  };

  /* ================= EDIT ================= */

  const handleEdit = (internship: Internship) => {

    setFormData(internship);
    setEditingId(internship._id || null);

  };

  /* ================= DELETE ================= */

  const handleDelete = async (id?: string) => {

    if (!id) return;

    await axios.delete(`${API}/${id}`);
    fetchInternships();

  };

  /* ================= GET INSTRUCTOR NAME ================= */

  const getInstructorName = (id: string) => {

    const instructor = instructors.find(i => i._id === id);

    return instructor ? instructor.name : "Unknown";

  };

  return (

    <div className="internship-page">

      {/* FORM */}

      <div className="internship-form-card">

        <h2>{editingId ? "Edit Internship" : "Create Internship"}</h2>

        <form onSubmit={handleSubmit} className="internship-form">

          <input
            type="text"
            name="title"
            placeholder="Enter Internship Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          {/* CATEGORY */}

          <select
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            required
          >

            <option value="">Select Category</option>

            {categories.map(cat => (

              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>

            ))}

          </select>

          <textarea
            name="description"
            placeholder="Enter Internship Description"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration (3 Months)"
            value={formData.duration}
            onChange={handleChange}
          />

          <select
            name="mode"
            value={formData.mode}
            onChange={handleChange}
          >
            <option value="">Select Mode</option>
            <option>Online</option>
            <option>Offline</option>
            <option>Hybrid</option>
          </select>

          <input
            type="text"
            name="skills"
            placeholder="Required Skills"
            value={formData.skills}
            onChange={handleChange}
          />

          {/* INSTRUCTOR */}

          <select
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            required
          >

            <option value="">Select Instructor</option>

            {instructors.map(ins => (

              <option key={ins._id} value={ins._id}>
                {ins.name}
              </option>

            ))}

          </select>

          <input
            type="number"
            name="seats"
            placeholder="Total Seats"
            value={formData.seats}
            onChange={handleChange}
          />

          <label>Start Date</label>

          <input
            ref={startDateRef}
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            onClick={() => startDateRef.current?.showPicker()}
          />

          <label>End Date</label>

          <input
            ref={endDateRef}
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            onClick={() => endDateRef.current?.showPicker()}
          />

          <input
            type="text"
            name="fee"
            placeholder="Internship Fee"
            value={formData.fee}
            onChange={handleChange}
          />

          <select
            name="certificate"
            value={formData.certificate}
            onChange={handleChange}
          >

            <option value="">Certificate Available?</option>
            <option>Yes</option>
            <option>No</option>

          </select>

          <label>Application Deadline</label>

          <input
            ref={deadlineRef}
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            onClick={() => deadlineRef.current?.showPicker()}
          />

          <button type="submit">

            {editingId ? "Update Internship" : "Add Internship"}

          </button>

        </form>

      </div>

      {/* TABLE */}

      <div className="internship-table-card">

        <h2>Internship List</h2>

        {internships.length === 0 ? (

          <p className="empty-text">No Internship Added</p>

        ) : (

          <table className="internship-table">

            <thead>
              <tr>
                <th>Title</th>
                <th>Domain</th>
                <th>Mode</th>
                <th>Instructor</th>
                <th>Seats</th>
                <th>Start</th>
                <th>End</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {internships.map((intern) => (

                <tr key={intern._id}>

                  <td>{intern.title}</td>
                  <td>{intern.domain}</td>
                  <td>{intern.mode}</td>
                  <td>{getInstructorName(intern.instructor)}</td>
                  <td>{intern.seats}</td>
                  <td>{intern.startDate}</td>
                  <td>{intern.endDate}</td>

                  <td className="action-btns">

                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(intern)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(intern._id)}
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

    </div>

  );

};

export default Internshipcreate;