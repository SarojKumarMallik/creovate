import React, { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import API, { getImageUrl } from "../../api/api";
import "./CategoryPreview.css";

interface Category {
  _id: string;
  name: string;
  type: "Top" | "Normal";
  icon: string | null;
  published: boolean;
}

const CategoryPreview: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================= TOGGLE ================= */
  const togglePublish = async (id: string) => {
    try {
      const res = await API.patch(`/categories/toggle/${id}`);

      const updatedCategory = res.data.category;

      setCategories((prev) =>
        prev.map((cat) =>
          cat._id === id ? updatedCategory : cat
        )
      );
    } catch (err) {
      console.error("TOGGLE ERROR:", err);
    }
  };

  return (
    <div className="category-preview-container">
      <h2 className="preview-title">Category Preview</h2>

      {loading ? (
        <p className="empty-msg">Loading categories...</p>
      ) : categories.length === 0 ? (
        <p className="empty-msg">No categories available.</p>
      ) : (
        <div className="preview-grid">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className={`preview-card ${
                cat.published ? "published" : "unpublished"
              }`}
            >
              <div className="icon-wrap">
                {cat.icon ? (
                  <img src={getImageUrl(cat.icon)} alt={cat.name} />
                ) : (
                  <div className="placeholder-icon">
                    {cat.name[0]}
                  </div>
                )}
              </div>

              <div className="card-info">
                <h3>{cat.name}</h3>
                <p className="type">{cat.type} Category</p>

                <div
                  className="status"
                  onClick={() => togglePublish(cat._id)}
                  style={{ cursor: "pointer" }}
                >
                  {cat.published ? (
                    <>
                      <CheckCircle2 color="#16a34a" />
                      <span>Published</span>
                    </>
                  ) : (
                    <>
                      <XCircle color="#dc2626" />
                      <span>Unpublished</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPreview;