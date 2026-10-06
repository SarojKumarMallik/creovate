import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Studentenroll.css";

interface Student {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  college: string;
  course: string;
  branch: string;
  year: string;
  cgpa: string;
  domain: string;
  skills: string;
  github: string;
  status: string;
}

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Studentenroll = () => {

  const [students, setStudents] = useState<Student[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    college: "",
    course: "",
    branch: "",
    year: "",
    cgpa: "",
    domain: "",
    skills: "",
    github: "",
    status: "Active"
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);

  /* ================= FETCH STUDENTS ================= */

  useEffect(() => {

    fetchStudents();

  }, []);

  const fetchStudents = async () => {

    try {

      const res = await axios.get(`${API}/students`);

      setStudents(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  /* ================= HANDLE INPUT ================= */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };

  /* ================= FILE UPLOAD ================= */

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files) {

      setProfileImage(e.target.files[0]);

    }

  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files) {

      setResume(e.target.files[0]);

    }

  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, (formData as any)[key]);
      });

      if (profileImage) {
        data.append("profileImage", profileImage);
      }

      if (resume) {
        data.append("resume", resume);
      }

      await axios.post(`${API}/students`, data);

      fetchStudents();

      setFormData({
        name: "",
        email: "",
        phone: "",
        gender: "",
        dob: "",
        college: "",
        course: "",
        branch: "",
        year: "",
        cgpa: "",
        domain: "",
        skills: "",
        github: "",
        status: "Active"
      });

      setProfileImage(null);
      setResume(null);

    } catch (error) {

      console.log(error);

    }

  };

  /* ================= DELETE ================= */

  const handleDelete = async (id?: string) => {

    if (!id) return;

    try {

      await axios.delete(`${API}/students/${id}`);

      fetchStudents();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="student-page">

      {/* FORM */}

      <div className="student-form-card">

        <h2>Add Student</h2>

        <form onSubmit={handleSubmit} className="student-form">

          <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />

          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

          <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />

          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />

          <input type="file" onChange={handleProfileUpload} />

          <input name="college" placeholder="College Name" value={formData.college} onChange={handleChange} />

          <input name="course" placeholder="Course / Degree" value={formData.course} onChange={handleChange} />

          <input name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange} />

          <select name="year" value={formData.year} onChange={handleChange}>
            <option value="">Year</option>
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
          </select>

          <input name="cgpa" placeholder="CGPA" value={formData.cgpa} onChange={handleChange} />

          <select name="domain" value={formData.domain} onChange={handleChange}>
            <option value="">Preferred Domain</option>
            <option>Web Development</option>
            <option>Data Science</option>
            <option>AI / ML</option>
            <option>UI UX</option>
          </select>

          <input name="skills" placeholder="Skills" value={formData.skills} onChange={handleChange} />

          <input name="github" placeholder="GitHub Link" value={formData.github} onChange={handleChange} />

          <input type="file" onChange={handleResumeUpload} />

          <select name="status" value={formData.status} onChange={handleChange}>
            <option>Active</option>
            <option>Pending</option>
            <option>Blocked</option>
          </select>

          <button type="submit">Enroll Student</button>

        </form>

      </div>

      {/* TABLE */}

      <div className="student-table-card">

        <h2>Manage Students</h2>

        {students.length === 0 ? (

          <p className="empty-text">No Students Added</p>

        ) : (

          <table className="student-table">

            <thead>

              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Course</th>
                <th>College</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {students.map((student) => (

                <tr key={student._id}>

                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.course}</td>
                  <td>{student.college}</td>
                  <td>{student.status}</td>

                  <td>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(student._id)}
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

export default Studentenroll;