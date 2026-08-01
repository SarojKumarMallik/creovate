import React, { ChangeEvent, FormEvent, useState } from "react";
import "./NoticeManagement.css";
import {
  FaEdit,
  FaSyncAlt,
  FaUpload,
  FaDownload,
} from "react-icons/fa";

interface NoticeData {
  id: number;
  title: string;
  number: string;
  date: string;
  description: string;
  author: string;
  designation: string;
  category: string;
  photoName: string;
}

const NoticeManagement: React.FC = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [designation, setDesignation] = useState("");
  const [category, setCategory] = useState("");

  const [notices, setNotices] = useState<NoticeData[]>([]);

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoto(e.target.files?.[0] || null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newNotice: NoticeData = {
      id: notices.length + 1,
      title,
      number,
      date,
      description,
      author,
      designation,
      category,
      photoName: photo?.name || "—",
    };

    setNotices([...notices, newNotice]);

    // reset
    setTitle("");
    setNumber("");
    setDate("");
    setDescription("");
    setAuthor("");
    setDesignation("");
    setCategory("");
    setPhoto(null);
  };

  return (
    <div className="notice-admin-wrapper">

      {/* TOP SECTION */}
      <div className="notice-top-layout">

        {/* LEFT FORM */}
        <div className="notice-form-card">
          <h2>Notice Management</h2>
          <p>Create and publish notices</p>

          <form onSubmit={handleSubmit} className="notice-form">

            <div className="notice-field">
              <label>Upload Notice Photo</label>
              <input type="file" accept="image/*" onChange={handlePhoto} />
            </div>

            <div className="notice-field">
              <label>Notice Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="notice-field">
              <label>Notice Number</label>
              <input value={number} onChange={(e) => setNumber(e.target.value)} />
            </div>

            <div className="notice-field">
              <label>Publish Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div className="notice-field">
              <label>Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="notice-field">
              <label>Provided Author (Name)</label>
              <input value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>

            <div className="notice-field">
              <label>Designation</label>
              <input
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
            </div>

            <div className="notice-field">
              <label>Notice Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select category</option>
                <option>Academic</option>
                <option>Exam</option>
                <option>Event</option>
                <option>General</option>
              </select>
            </div>

            <button className="notice-submit-btn">Post Notice</button>
          </form>
        </div>

        {/* RIGHT LIVE PREVIEW */}
        <div className="notice-preview-card">
          <h3>Live Preview</h3>

          <div className="notice-preview-box">
            <p><strong>Title:</strong> {title || "—"}</p>
            <p><strong>Number:</strong> {number || "—"}</p>
            <p><strong>Date:</strong> {date || "—"}</p>
            <p><strong>Description:</strong> {description || "—"}</p>
            <p><strong>Author:</strong> {author || "—"}</p>
            <p><strong>Designation:</strong> {designation || "—"}</p>
            <p><strong>Category:</strong> {category || "—"}</p>
            <p><strong>Photo:</strong> {photo?.name || "—"}</p>
          </div>
        </div>

      </div>

      {/* TABLE SECTION */}
      <div className="notice-table-card">
        <h3>Notice Records</h3>

        <div className="notice-table-scroll">
          <table className="notice-table">
            <thead>
              <tr>
                <th>SL No</th>
                <th>Title</th>
                <th>Number</th>
                <th>Date</th>
                <th>Author</th>
                <th>Designation</th>
                <th>Category</th>
                <th>Photo</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {notices.length === 0 ? (
                <tr>
                  <td colSpan={9}>No notices added yet</td>
                </tr>
              ) : (
                notices.map((n) => (
                  <tr key={n.id}>
                    <td>{n.id}</td>
                    <td>{n.title}</td>
                    <td>{n.number}</td>
                    <td>{n.date}</td>
                    <td>{n.author}</td>
                    <td>{n.designation}</td>
                    <td>{n.category}</td>
                    <td>{n.photoName}</td>
                    <td className="notice-actions">
                      <button><FaEdit /></button>
                      <button><FaSyncAlt /></button>
                      <button><FaUpload /></button>
                      <button><FaDownload /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default NoticeManagement;
