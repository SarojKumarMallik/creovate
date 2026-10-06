import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import "./ManageInstructors.css";

interface Instructor {
  _id?: string;
  name: string;
  role: string;
  mobile: string;
  email: string;
  address: string;
  avatar?: string;
}

interface Category {
  _id: string;
  name: string;
}

const ManageInstructors: React.FC = () => {

  const [formData, setFormData] = useState<Instructor>({
    name: "",
    role: "",
    mobile: "",
    email: "",
    address: "",
    avatar: ""
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const BASE_URL = import.meta.env.VITE_BASE_URL || (import.meta.env.VITE_API_URL?.startsWith('http') ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '') : '');
  const API = `${API_URL}/instructors`;
  const CATEGORY_API = `${API_URL}/categories`;

  /* ================= FETCH INSTRUCTORS ================= */

  const fetchInstructors = async () => {
    const res = await axios.get(API);
    setInstructors(res.data);
  };

  /* ================= FETCH CATEGORIES ================= */

  const fetchCategories = async () => {
    const res = await axios.get(CATEGORY_API);
    setCategories(res.data);
  };

  useEffect(() => {
    fetchInstructors();
    fetchCategories();
  }, []);

  /* ================= INPUT ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  /* ================= IMAGE ================= */

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);

    const url = URL.createObjectURL(file);
    setPreview(url);

  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("role", formData.role);
    data.append("mobile", formData.mobile);
    data.append("email", formData.email);
    data.append("address", formData.address);

    if (image) {
      data.append("avatar", image);
    }

    if (editId) {

      await axios.put(`${API}/${editId}`, data);

    } else {

      await axios.post(API, data);

    }

    fetchInstructors();

    setFormData({
      name: "",
      role: "",
      mobile: "",
      email: "",
      address: "",
      avatar: ""
    });

    setPreview("");
    setImage(null);
    setEditId(null);

  };

  /* ================= EDIT ================= */

  const handleEdit = (ins: Instructor) => {

    setFormData(ins);

    if (ins.avatar) {
      setPreview(`${BASE_URL}/uploads/${ins.avatar}`);
    }

    setEditId(ins._id || null);

  };

  /* ================= DELETE ================= */

  const handleDelete = async (id?: string) => {

    if (!id) return;

    await axios.delete(`${API}/${id}`);

    fetchInstructors();

  };

  return (

    <div className="page-wrapper">

      <h1 className="page-title">Instructor Management</h1>

      <div className="layout">

        {/* ================= FORM ================= */}

        <div className="form-section">

          <h2>Add Instructor</h2>

          <form onSubmit={handleSubmit} className="form">

            <input
              name="name"
              placeholder="Instructor Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            {/* ROLE FROM CATEGORY */}

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>

              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}

            </select>

            <input
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />

            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
            />

            {preview && (
              <img
                src={preview}
                className="preview-img"
                alt="preview"
              />
            )}

            <button className="submit-btn">
              {editId ? "Update Instructor" : "Add Instructor"}
            </button>

          </form>

        </div>

        {/* ================= TABLE ================= */}

        <div className="table-section">

          <h2>Instructor List</h2>

          <table className="instructor-table">

            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Role</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {instructors.map((ins) => (

                <tr key={ins._id}>

                  <td>
                    {ins.avatar && (
                      <img
                        src={`${BASE_URL}/uploads/${ins.avatar}`}
                        className="avatar"
                        alt=""
                      />
                    )}
                  </td>

                  <td>{ins.name}</td>
                  <td>{ins.role}</td>
                  <td>{ins.mobile}</td>
                  <td>{ins.email}</td>

                  <td className="action-cell">

                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(ins)}
                    >
                      <Pencil size={16}/>
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(ins._id)}
                    >
                      <Trash2 size={16}/>
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

};

export default ManageInstructors;