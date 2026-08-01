import React, { useState, useEffect } from "react";
import {
  Edit3,
  Trash2,
  Upload,
  CheckCircle2,
  XCircle,
  Save,
  X,
  Moon,
  Sun,
} from "lucide-react";
import API, { getImageUrl } from "../../api/api";
import "./CreateNew.css";

interface Category {
  _id: string;
  name: string;
  type: "Top" | "Normal";
  icon: string | null;
  published: boolean;
}

const CreateNew: React.FC = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] =
    useState<"Top" | "Normal">("Normal");
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedCategory, setEditedCategory] = useState<Category | null>(null);
  const [editIconFile, setEditIconFile] = useState<File | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  /* ================= THEME ================= */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  /* ================= FETCH ================= */
  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================= ICON UPLOAD ================= */
  const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      setIconPreview(URL.createObjectURL(file));
    }
  };

  /* ================= ADD ================= */
  const handleAddCategory = async () => {
    if (!categoryName.trim()) return;

    try {
      const formData = new FormData();
      formData.append("name", categoryName);
      formData.append("type", categoryType);
      if (iconFile) formData.append("icon", iconFile);

      await API.post("/categories", formData);

      setCategoryName("");
      setIconFile(null);
      setIconPreview(null);

      fetchCategories();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error creating category");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await API.delete(`/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  };

  /* ================= TOGGLE ================= */
 const togglePublish = async (id: string) => {
  try {
    const res = await API.patch(`/categories/toggle/${id}`);

    setCategories((prev) =>
      prev.map((cat) =>
        cat._id === id ? res.data.category : cat
      )
    );
  } catch (err) {
    console.error("TOGGLE ERROR:", err);
  }
};

  /* ================= EDIT ================= */
  const handleEdit = (category: Category) => {
    setEditingId(category._id);
    setEditedCategory({ ...category });
  };

  const handleSave = async () => {
    if (!editedCategory) return;

    try {
      const formData = new FormData();
      formData.append("name", editedCategory.name);
      formData.append("type", editedCategory.type);
      formData.append(
        "published",
        editedCategory.published.toString()
      );
      if (editIconFile) formData.append("icon", editIconFile);

      await API.put(`/categories/${editedCategory._id}`, formData);

      setEditingId(null);
      setEditedCategory(null);
      setEditIconFile(null);

      fetchCategories();
    } catch (err) {
      console.error("UPDATE ERROR:", err);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedCategory(null);
  };

  const handleEditIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editedCategory) {
      setEditIconFile(file);
      setEditedCategory({
        ...editedCategory,
        icon: URL.createObjectURL(file),
      });
    }
  };

  return (
    <div className="create-category-container">
      <div className="theme-toggle">
        <button onClick={toggleTheme} className="theme-btn">
          {theme === "light" ? (
            <>
              <Moon size={18} />
              Dark Mode
            </>
          ) : (
            <>
              <Sun size={18} />
              Light Mode
            </>
          )}
        </button>
      </div>

      {/* Left Panel */}
      <div className="create-category-card">
        <h2>Create New Category</h2>

        <div className="upload-section">
          <label htmlFor="iconUpload" className="upload-box">
            {iconPreview ? (
              <img src={iconPreview} alt="icon" className="uploaded-icon" />
            ) : (
              <>
                <Upload size={22} />
                <span>Upload Icon</span>
              </>
            )}
          </label>
          <input
            type="file"
            id="iconUpload"
            accept="image/*"
            onChange={handleIconUpload}
            hidden
          />
        </div>

        <input
          type="text"
          placeholder="Enter category name"
          className="category-input"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        <div className="type-selector">
          <label>
            <input
              type="radio"
              value="Top"
              checked={categoryType === "Top"}
              onChange={() => setCategoryType("Top")}
            />
            Top Category
          </label>
          <label>
            <input
              type="radio"
              value="Normal"
              checked={categoryType === "Normal"}
              onChange={() => setCategoryType("Normal")}
            />
            Normal
          </label>
        </div>

        <button className="add-btn" onClick={handleAddCategory}>
          Add Category
        </button>
      </div>

      {/* Right Panel */}
      <div className="category-list">
        <h3>All Categories</h3>
        {categories.length === 0 ? (
          <p className="empty-msg">No categories yet. Add one!</p>
        ) : (
          <div className="category-table">
            <div className="category-header">
              <span>Icon</span>
              <span>Name</span>
              <span>Type</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            {categories.map((cat) =>
              editingId === cat._id && editedCategory ? (
                <div className="category-row editing" key={cat._id}>
                  <div className="category-icon">
                    <label
                      htmlFor={`editIcon-${cat._id}`}
                      className="icon-label"
                    >
                      {editedCategory.icon ? (
                        <img
                          src={
                            editedCategory.icon.startsWith("blob:")
                              ? editedCategory.icon
                              : getImageUrl(editedCategory.icon || "")
                          }
                          alt="icon"
                          className="uploaded-icon"
                        />
                      ) : (
                        <Upload size={18} />
                      )}
                    </label>
                    <input
                      type="file"
                      id={`editIcon-${cat._id}`}
                      accept="image/*"
                      onChange={handleEditIcon}
                      hidden
                    />
                  </div>
                  <input
                    type="text"
                    className="edit-input"
                    value={editedCategory.name}
                    onChange={(e) =>
                      setEditedCategory({
                        ...editedCategory,
                        name: e.target.value,
                      })
                    }
                  />
                  <select
                    className="edit-select"
                    value={editedCategory.type}
                    onChange={(e) =>
                      setEditedCategory({
                        ...editedCategory,
                        type: e.target.value as "Top" | "Normal",
                      })
                    }
                  >
                    <option value="Top">Top</option>
                    <option value="Normal">Normal</option>
                  </select>
                  <span
                    className="status"
                    onClick={() => togglePublish(cat._id)}
                  >
                    {cat.published ? (
                      <>
                        <CheckCircle2 color="#16a34a" />
                        Published
                      </>
                    ) : (
                      <>
                        <XCircle color="#dc2626" />
                        Unpublished
                      </>
                    )}
                  </span>
                  <div className="actions">
                    <button className="save-btn" onClick={handleSave}>
                      <Save size={18} />
                    </button>
                    <button className="cancel-btn" onClick={handleCancel}>
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className={`category-row ${
                    cat.published ? "published" : "unpublished"
                  }`}
                  key={cat._id}
                >
                  <div className="category-icon">
                    {cat.icon ? (
                      <img
                        src={getImageUrl(cat.icon)}
                        alt="category icon"
                      />
                    ) : (
                      <Upload size={18} />
                    )}
                  </div>
                  <span>{cat.name}</span>
                  <span>{cat.type}</span>
                  <span
                    className="status"
                    onClick={() => togglePublish(cat._id)}
                  >
                    {cat.published ? (
                      <>
                        <CheckCircle2 color="#16a34a" />
                        Published
                      </>
                    ) : (
                      <>
                        <XCircle color="#dc2626" />
                        Unpublished
                      </>
                    )}
                  </span>
                  <div className="actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(cat)}
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(cat._id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateNew;