import React, { useState, useEffect } from "react";
import API, { getImageUrl } from "../../api/api";
import { Editor } from "@tinymce/tinymce-react";

interface CategoryType {
  _id: string;
  name: string;
  published: boolean;
}

interface FormDataType {
  title: string;
  description: string;
  image: File | null;
  category: string;
  author: string;
  authorEmail: string;
  designation: string;
  quotes: string;
  tags: string;
  blogTags: string[];
  features: string[];
  address: string;
  publishDate: string;
  publishStatus: string;
}

interface RecordType {
  _id: string;
  title: string;
  description: string;
  image?: string;
  category: string | { _id: string; name: string };
  author: string;
  authorEmail?: string;
  designation?: string;
  blogTags?: string[] | string;
  features?: string[] | string;
  publishDate?: string;
  publishStatus?: string;
}

export default function AddSuccessStory() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [records, setRecords] = useState<RecordType[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const [form, setForm] = useState<FormDataType>({
    title: "",
    description: "",
    image: null,
    category: "",
    author: "",
    authorEmail: "",
    designation: "",
    quotes: "",
    tags: "",
    blogTags: [],
    features: [],
    address: "",
    publishDate: new Date().toISOString().slice(0, 16),
    publishStatus: "Draft",
  });

  const [tagInput, setTagInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");

  /* ================= FETCH CATEGORIES ================= */
  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");

      const publishedCategories = res.data.filter(
        (cat: CategoryType) => cat.published === true,
      );

      setCategories(publishedCategories);
    } catch (err) {
      console.error("CATEGORY FETCH ERROR:", err);
    }
  };

  /* ================= FETCH STORIES ================= */
  const fetchStories = async () => {
    try {
      setLoading(true);
      const res = await API.get("/success-stories");
      setRecords(res.data || []);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
    fetchCategories();
  }, []);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setForm((prev) => ({ ...prev, image: file }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= FEATURES ================= */
  const addFeature = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && featureInput.trim()) {
      e.preventDefault();
      if (!form.features.includes(featureInput.trim())) {
        setForm((prev) => ({
          ...prev,
          features: [...prev.features, featureInput.trim()],
        }));
      }
      setFeatureInput("");
    }
  };

  const removeFeature = (index: number) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  /* ================= TAGS ================= */
  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!form.blogTags.includes(tagInput.trim())) {
        setForm((prev) => ({
          ...prev,
          blogTags: [...prev.blogTags, tagInput.trim()],
        }));
      }
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    setForm((prev) => ({
      ...prev,
      blogTags: prev.blogTags.filter((_, i) => i !== index),
    }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Required Fields
      formData.append("title", form.title.trim());
      if (!form.description || form.description === "<p><br></p>") {
        alert("Story content is required");
        return;
      }
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("author", form.author.trim());
      formData.append("authorEmail", form.authorEmail.trim());
      if (form.publishDate) {
        formData.append("publishDate", form.publishDate);
      }
      formData.append("publishStatus", form.publishStatus);

      // Optional Fields (ONLY append if exists)
      if (form.designation) formData.append("designation", form.designation);
      if (form.quotes) formData.append("quotes", form.quotes); // ✅ QUOTES FIX
      if (form.tags) formData.append("tags", form.tags);
      if (form.address) formData.append("address", form.address);

      // Arrays
      if (form.blogTags.length > 0) {
        formData.append("blogTags", JSON.stringify(form.blogTags));
      }

      if (form.features.length > 0) {
        formData.append("features", JSON.stringify(form.features));
      }

      // Image
      if (form.image) {
        formData.append("image", form.image);
      }

      if (editingId) {
        await API.put(`/success-stories/${editingId}`, formData);
      } else {
        await API.post("/success-stories", formData);
      }

      fetchStories();
      resetForm();
    } catch (err) {
      console.error("SUBMIT ERROR:", err);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (rec: RecordType) => {
    setForm({
      title: rec.title,
      description: rec.description,
      image: null,
      category:
        typeof rec.category === "object" ? rec.category._id : rec.category,
      author: rec.author,
      authorEmail: rec.authorEmail || "",
      designation: rec.designation || "",
      quotes: "",
      tags: "",
      blogTags:
        typeof rec.blogTags === "string"
          ? (() => {
              try {
                return JSON.parse(rec.blogTags);
              } catch {
                return [];
              }
            })()
          : rec.blogTags || [],
      features:
        typeof rec.features === "string"
          ? (() => {
              try {
                return JSON.parse(rec.features);
              } catch {
                return [];
              }
            })()
          : rec.features || [],
      address: "",
      publishDate: rec.publishDate
        ? rec.publishDate.slice(0, 16)
        : new Date().toISOString().slice(0, 16),
      publishStatus: rec.publishStatus || "Draft",
    });

    setEditingId(rec._id);
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this story?")) return;

    try {
      await API.delete(`/success-stories/${id}`);
      fetchStories();
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  };

  /* ================= RESET ================= */
  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      image: null,
      category: "",
      author: "",
      authorEmail: "",
      designation: "",
      quotes: "",
      tags: "",
      blogTags: [],
      features: [],
      address: "",
      publishDate: new Date().toISOString().slice(0, 16),
      publishStatus: "Draft",
    });
    setEditingId(null);
    setStep(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f4f6]">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-5 text-white">
        <h1 className="text-xl md:text-2xl font-semibold">
          {editingId ? "Edit Success Story" : "Add Success Story"}
        </h1>
      </div>

      {/* MAIN */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 md:p-6">
        {/* LEFT FORM */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border flex flex-col">
          <div className="border-b px-6 py-4 font-semibold text-lg">
            {editingId ? "Update Story" : "New Success Story"}
          </div>

          <div className="p-6 overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* ================= STEP 1 ================= */}
              {step === 1 && (
                <>
                  <div>
                    <label className="label">Story Title</label>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      className="input"
                      required
                    />
                  </div>

                  <div>
                    <label className="label">Author Name</label>
                    <input
                      type="text"
                      name="author"
                      value={form.author}
                      onChange={handleChange}
                      className="input"
                      required
                    />
                  </div>

                  <div>
                    <label className="label">Author Email</label>
                    <input
                      type="email"
                      name="authorEmail"
                      value={form.authorEmail}
                      onChange={handleChange}
                      className="input"
                      required
                    />
                  </div>

                  <div>
                    <label className="label">Author Designation</label>
                    <input
                      type="text"
                      name="designation"
                      value={form.designation}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="label">Author Quote</label>
                    <textarea
                      name="quotes"
                      value={form.quotes}
                      onChange={handleChange}
                      className="w-full p-4 border border-indigo-200 rounded-lg bg-indigo-50 italic text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      rows={3}
                      placeholder="“Success is not final, failure is not fatal — it is the courage to continue that counts.”"
                    />
                  </div>

                  <div>
                    <label className="label">Story Category</label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="input"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label">Publish Date & Time</label>
                    <input
                      type="datetime-local"
                      name="publishDate"
                      value={form.publishDate}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="label">Publish Status</label>
                    <select
                      name="publishStatus"
                      value={form.publishStatus}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label className="label">Upload Image</label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                      className="input"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                    >
                      Next →
                    </button>
                  </div>
                </>
              )}

              {/* ================= STEP 2 ================= */}
              {step === 2 && (
                <>
                  <div>
                    <label className="label">List Features</label>
                    <input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyDown={addFeature}
                      className="input"
                      placeholder="Type feature and press Enter"
                    />

                    <div className="feature-wrapper">
                      {form.features.map((feature, index) => (
                        <div key={index} className="feature-item">
                          <span>✔ {feature}</span>
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="label">Blog Tags</label>
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={addTag}
                      className="input"
                      placeholder="Type tag and press Enter"
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.blogTags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full flex items-center gap-2"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="text-red-500"
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="label">Story Content</label>

                    <Editor
                      apiKey="jeq7g2k84sqpi9364o8x9ptqf09aoesaq8jxmp49dl4sh57z"
                      value={form.description}
                      onEditorChange={(content) =>
                        setForm((prev) => ({ ...prev, description: content }))
                      }
                      init={{
                        height: 400,
                        menubar: false,
                        plugins: [
                          "anchor",
                          "autolink",
                          "charmap",
                          "codesample",
                          "emoticons",
                          "link",
                          "lists",
                          "media",
                          "searchreplace",
                          "table",
                          "visualblocks",
                          "wordcount",
                          "checklist",
                          "mediaembed",
                          "advtable",
                          "advcode",
                          "markdown",
                        ],
                        toolbar:
                          "undo redo | blocks | bold italic underline strikethrough | " +
                          "link media table | bullist numlist | align | removeformat",
                        branding: false,
                      }}
                    />
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-2 bg-gray-400 text-white rounded"
                    >
                      ← Previous
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                    >
                      {editingId ? "Update Story" : "Publish Success Story"}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white rounded-lg shadow-sm border flex flex-col">
          <div className="border-b px-6 py-4 font-semibold text-lg">
            Recent Success Stories
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {loading && <p className="text-sm text-gray-400">Loading...</p>}

            {!loading && records.length === 0 && (
              <p className="text-gray-500 text-sm">No recent success stories</p>
            )}

            {records.map((rec) => (
              <div key={rec._id} className="flex gap-3 border-b pb-3">
                {rec.image ? (
                  <img
                    src={getImageUrl(rec.image)}
                    alt={rec.title}
                    className="w-16 h-16 object-cover rounded-md shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-md shrink-0" />
                )}

                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{rec.title}</h3>
                  <p className="text-xs text-gray-500">
                    {typeof rec.category === "object"
                      ? rec.category.name
                      : rec.category}
                  </p>
                  <div className="flex gap-4 mt-1 text-xs">
                    <button
                      onClick={() => handleEdit(rec)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(rec._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .label {
          display:block;
          font-size:14px;
          font-weight:500;
          margin-bottom:6px;
          color:#374151;
        }

        .input {
          width:100%;
          padding:8px 12px;
          border-radius:6px;
          border:1px solid #d1d5db;
          background:#f9fafb;
        }

        .input:focus {
          outline:none;
          border-color:#6366f1;
          background:white;
          box-shadow:0 0 0 2px rgba(99,102,241,0.2);
        }
      `}</style>
    </div>
  );
}
