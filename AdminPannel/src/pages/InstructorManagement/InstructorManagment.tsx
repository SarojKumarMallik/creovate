import React, { useState, ChangeEvent, FormEvent } from "react";
import "./InstructorManagement.css";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

/* ================= TYPES ================= */
interface Instructor {
  image?: string;
  name: string;
  designation: string;
  about: string;
  social: string;
  mediaHandle: string;
  category: string;
}

const InstructorManagement: React.FC = () => {
  const [formData, setFormData] = useState<Instructor>({
    image: "",
    name: "",
    designation: "",
    about: "",
    social: "",
    mediaHandle: "",
    category: "",
  });

  const [preview, setPreview] = useState("");
  const [list, setList] = useState<Instructor[]>([]);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  /* ✅ PAGINATION STATES */
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const categories = [
    "Web Development",
    "Data Science",
    "UI/UX Design",
    "Cyber Security",
    "Cloud Computing",
  ];

  const socials = ["LinkedIn", "Twitter", "Facebook"];

  /* ================= INPUT ================= */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= IMAGE ================= */
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
    setFormData({ ...formData, image: url });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updated = [...list];
      updated[editIndex] = formData;
      setList(updated);
      setEditIndex(null);
    } else {
      setList([...list, formData]);
    }

    setFormData({
      image: "",
      name: "",
      designation: "",
      about: "",
      social: "",
      mediaHandle: "",
      category: "",
    });

    setPreview("");
  };

  /* ================= EDIT ================= */
  const handleEdit = (index: number) => {
    setFormData(list[index]);
    setPreview(list[index].image || "");
    setEditIndex(index);
    setOpenMenu(null);
  };

  /* ================= DELETE ================= */
  const handleDelete = (index: number) => {
    const updated = list.filter((_, i) => i !== index);
    setList(updated);
    setOpenMenu(null);
  };

  /* ================= PAGINATION LOGIC ================= */
  const totalPages = Math.ceil(list.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentRows = list.slice(indexOfFirstRow, indexOfLastRow);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="instMng-wrapper">
      {/* ================= FORM ================= */}
      <div className="instMng-formSection">
        <h2 className="instMng-title">Instructor Management</h2>

        <form className="instMng-form" onSubmit={handleSubmit}>
          <div className="instMng-field">
            <label>Upload Image</label>
            <input type="file" onChange={handleImage} />
            {preview && <img src={preview} className="instMng-preview" />}
          </div>

          <div className="instMng-row">
            <div className="instMng-field">
              <label>Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="instMng-field">
              <label>Designation</label>
              <input
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="instMng-row">
            <div className="instMng-field">
              <label>About Instructor</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
              />
            </div>

            <div className="instMng-field">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map((c, i) => (
                  <option key={i}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="instMng-row">
            <div className="instMng-field">
              <label>Social Platform</label>
              <select
                name="social"
                value={formData.social}
                onChange={handleChange}
              >
                <option value="">Select Social</option>
                {socials.map((s, i) => (
                  <option key={i}>{s}</option>
                ))}
              </select>
            </div>

            <div className="instMng-field">
              <label>Media Handle</label>
              <input
                name="mediaHandle"
                value={formData.mediaHandle}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="instMng-submitBtn">
            {editIndex !== null ? "Update Instructor" : "Add Instructor"}
          </button>
        </form>
      </div>

      {/* ================= TABLE ================= */}
      <div className="instMng-tableSection">
        <h2 className="instMng-title">Instructor List</h2>

        <div className="instMng-tableWrapper">
          <table className="instMng-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Category</th>
                <th>Social</th>
                <th>Media</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentRows.map((item, index) => {
                const realIndex = indexOfFirstRow + index;

                return (
                  <tr key={realIndex}>
                    <td>
                      {item.image && (
                        <img
                          src={item.image}
                          className="instMng-tableImg"
                        />
                      )}
                    </td>
                    <td>{item.name}</td>
                    <td>{item.designation}</td>
                    <td>{item.category}</td>
                    <td>{item.social}</td>
                    <td>{item.mediaHandle}</td>

                    <td className="instMng-actionCell">
                      <button
                        className="instMng-actionBtn"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === realIndex ? null : realIndex
                          )
                        }
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openMenu === realIndex && (
                        <div className="instMng-dropdown">
                          <button onClick={() => handleEdit(realIndex)}>
                            <Pencil size={16} /> Edit
                          </button>

                          <button
                            className="delete"
                            onClick={() => handleDelete(realIndex)}
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ================= PAGINATION ================= */}
        
<div className="instMng-pagination">

  {/* PREVIOUS */}
  <button
    className="instMng-pageBtn"
    onClick={() => goToPage(currentPage - 1)}
    disabled={currentPage === 1}
  >
    Previous
  </button>

  {/* PAGE NUMBERS */}
  {Array.from({ length: totalPages }, (_, index) => {
    const pageNumber = index + 1;

    return (
      <button
        key={pageNumber}
        className={`instMng-pageBtn ${
          currentPage === pageNumber ? "active" : ""
        }`}
        onClick={() => goToPage(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  })}

  {/* NEXT */}
  <button
    className="instMng-pageBtn"
    onClick={() => goToPage(currentPage + 1)}
    disabled={currentPage === totalPages || totalPages === 0}
  >
    Next
  </button>

</div>
      </div>
    </div>
  );
};

export default InstructorManagement;