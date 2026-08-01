import React, { useState, useEffect } from "react";
import "./InstructorPage.css";

interface InstructorPageInstructor {
  id: number;
  name: string;
  designation: string;
  rating: number;
  about: string;
}

const ITEMS_PER_PAGE = 4;

const InstructorPage: React.FC = () => {
  const [form, setForm] = useState<Omit<InstructorPageInstructor, "id">>({
    name: "",
    designation: "",
    rating: 0,
    about: "",
  });

  const [data, setData] = useState<InstructorPageInstructor[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "rating" ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.designation.trim()) return;

    if (editId !== null) {
      setData((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, ...form } : item
        )
      );
      setEditId(null);
    } else {
      const newItem: InstructorPageInstructor = {
        id: Date.now(),
        ...form,
      };
      setData((prev) => [...prev, newItem]);
    }

    setForm({
      name: "",
      designation: "",
      rating: 0,
      about: "",
    });
  };

  const handleEdit = (id: number) => {
    const selected = data.find((item) => item.id === id);
    if (!selected) return;

    setForm({
      name: selected.name,
      designation: selected.designation,
      rating: selected.rating,
      about: selected.about,
    });
    setEditId(id);
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [data, totalPages]);

  return (
    <div className="InstructorPage_container">
      {/* FORM */}
   <div className="InstructorPage_formSection">
  <h2 className="InstructorPage_heading">Main Instructor Form</h2>

  <form onSubmit={handleSubmit} className="InstructorPage_form">

    {/* Name Full Width */}
    <div className="InstructorPage_field">
      <label>Instructor Name</label>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Enter instructor name"
      />
    </div>

    {/* Designation + Rating Row */}
    <div className="InstructorPage_twoColumn">
      <div className="InstructorPage_field">
        <label>Designation</label>
        <input
          name="designation"
          value={form.designation}
          onChange={handleChange}
          placeholder="Enter designation"
        />
      </div>

      <div className="InstructorPage_field">
        <label>Rating</label>
        <input
          type="number"
          name="rating"
          value={form.rating}
          onChange={handleChange}
          min="1"
          max="5"
          placeholder="1 - 5"
        />
      </div>
    </div>

    {/* About Instructor - FULL WIDTH */}
    <div className="InstructorPage_field">
      <label>About Instructor</label>
      <textarea
        name="about"
        value={form.about}
        onChange={handleChange}
        placeholder="Write detailed description about instructor..."
      />
    </div>

    {/* Instructor Image */}
    <div className="InstructorPage_field">
      <label>Instructor Image</label>
      <input type="file" />
    </div>

    {/* Social Links - One Row */}
    <div className="InstructorPage_threeColumn">
      <div className="InstructorPage_field">
        <label>Facebook</label>
        <input placeholder="Facebook profile link" />
      </div>

      <div className="InstructorPage_field">
        <label>Instagram</label>
        <input placeholder="Instagram profile link" />
      </div>

      <div className="InstructorPage_field">
        <label>LinkedIn</label>
        <input placeholder="LinkedIn profile link" />
      </div>
    </div>

    {/* Button */}
    <div className="InstructorPage_buttonWrapper">
      <button type="submit" className="InstructorPage_primaryBtn">
        {editId !== null ? "Update Instructor" : "Submit"}
      </button>
    </div>

  </form>
</div>

      {/* TABLE */}
      <div className="InstructorPage_tableSection">
        <h2 className="InstructorPage_heading">Instructor List</h2>

        <div className="InstructorPage_tableWrapper">
          <table className="InstructorPage_table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Designation</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.designation}</td>
                    <td>{item.rating}</td>
                    <td>
                      <div className="InstructorPage_actionGroup">
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="InstructorPage_editBtn"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="InstructorPage_deleteBtn"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="InstructorPage_empty">
                    No Instructor Added
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="InstructorPage_pagination">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) => Math.max(prev - 1, 1))
              }
              className="InstructorPage_pageBtn"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`InstructorPage_pageBtn ${
                  currentPage === index + 1
                    ? "InstructorPage_activePage"
                    : ""
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, totalPages)
                )
              }
              className="InstructorPage_pageBtn"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorPage;