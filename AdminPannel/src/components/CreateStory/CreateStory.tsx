import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Edit3,
  Trash2,
  Upload,
  CheckCircle2,
  XCircle,
  Video,
  Save,
  SquarePlus, // ✅ fixed icon name
  MapPin,
  Mail,
} from "lucide-react";

import "./CreateStory.css";

interface Story {
  id: number;
  title: string;
  description: string;
  category: string;
  blogImage?: string | null;
  authorName: string;
  authorImage?: string | null;
  aboutAuthor: string;
  mainQuote: string;
  video?: string | null;
  tags: string[];
  location: string;
  email: string;
  features: string[];
  published: boolean;
}

const CreateStory: React.FC = () => {
  const [story, setStory] = useState<Omit<Story, "id" | "published">>({
    title: "",
    description: "",
    category: "",
    blogImage: null,
    authorName: "",
    authorImage: null,
    aboutAuthor: "",
    mainQuote: "",
    video: null,
    tags: [],
    location: "",
    email: "",
    features: [],
  });

  const [stories, setStories] = useState<Story[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, files } = target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () =>
        setStory((prev) => ({ ...prev, [name]: reader.result as string }));
      reader.readAsDataURL(files[0]);
    } else {
      setStory((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddTag = () => {
    const t = tagInput.trim();
    if (t && !story.tags.includes(t)) {
      setStory((prev) => ({ ...prev, tags: [...prev.tags, t] }));
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setStory((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const handleAddFeature = () => {
    const f = featureInput.trim();
    if (f) {
      setStory((prev) => ({ ...prev, features: [...prev.features, f] }));
      setFeatureInput("");
    }
  };

  const removeFeature = (feature: string) => {
    setStory((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!story.title.trim() || !story.description.trim()) {
      alert("Please fill all required fields!");
      return;
    }
    const newStory: Story = {
      id: Date.now(),
      ...story,
      published: false,
    };
    setStories((prev) => [newStory, ...prev]);
    setStory({
      title: "",
      description: "",
      category: "",
      blogImage: null,
      authorName: "",
      authorImage: null,
      aboutAuthor: "",
      mainQuote: "",
      video: null,
      tags: [],
      location: "",
      email: "",
      features: [],
    });
    setTagInput("");
    setFeatureInput("");
  };

  const handleDelete = (id: number) => {
    if (!confirm("Delete this story?")) return;
    setStories((prev) => prev.filter((s) => s.id !== id));
  };

  const togglePublish = (id: number) => {
    setStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, published: !s.published } : s))
    );
  };

  return (
    <div className="create-story-container">
      {/* Left Panel */}
      <div className="create-story-left">
        <h2>📝 Create New Success Story</h2>

        <form onSubmit={handleSubmit} className="create-story-form">
          <input
            type="text"
            name="title"
            placeholder="Story Title"
            value={story.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Story Description"
            value={story.description}
            onChange={handleChange}
            rows={3}
            required
          />

          <select
            name="category"
            value={story.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Career">Career</option>
            <option value="Education">Education</option>
            <option value="Travel">Travel</option>
            <option value="Client Review">Client Review</option>
          </select>

          <label className="file-upload">
            <Upload size={16} /> Upload Blog Image
            <input
              type="file"
              name="blogImage"
              accept="image/*"
              onChange={handleChange}
              hidden
            />
          </label>

          <input
            type="text"
            name="authorName"
            placeholder="Author Name"
            value={story.authorName}
            onChange={handleChange}
            required
          />

          <label className="file-upload">
            <Upload size={16} /> Upload Author Image
            <input
              type="file"
              name="authorImage"
              accept="image/*"
              onChange={handleChange}
              hidden
            />
          </label>

          <textarea
            name="aboutAuthor"
            placeholder="About Author"
            value={story.aboutAuthor}
            onChange={handleChange}
            rows={2}
          />

          <textarea
            name="mainQuote"
            placeholder="Main Quote"
            value={story.mainQuote}
            onChange={handleChange}
            rows={2}
          />

          <label className="file-upload">
            <Video size={16} /> Upload Video (optional)
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleChange}
              hidden
            />
          </label>

          <div className="tags-section">
            <input
              type="text"
              placeholder="Enter tag and press Add"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button type="button" className="add-tag-btn" onClick={handleAddTag}>
              Add Tag
            </button>
          </div>

          <div className="tags-list">
            {story.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag} <button onClick={() => removeTag(tag)}>×</button>
              </span>
            ))}
          </div>

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={story.location}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={story.email}
            onChange={handleChange}
          />

          <div className="feature-section">
            <input
              type="text"
              placeholder="Add a feature"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
            />
            <button
              type="button"
              className="add-feature-btn"
              onClick={handleAddFeature}
            >
              <SquarePlus size={16} /> Add
            </button>
          </div>

          <ul className="feature-list">
            {story.features.map((f) => (
              <li key={f}>
                {f} <button onClick={() => removeFeature(f)}>×</button>
              </li>
            ))}
          </ul>

          <button type="submit" className="publish-btn">
            <Save size={16} /> Publish Story
          </button>
        </form>
      </div>

      {/* Right Panel */}
      <div className="create-story-right">
        <h3>📚 All Stories</h3>
        {stories.length === 0 ? (
          <p className="empty-msg">No stories yet. Add one!</p>
        ) : (
          <div className="story-list">
            {stories.map((s) => (
              <article
                key={s.id}
                className={`story-card ${s.published ? "published" : "unpublished"}`}
              >
                <div className="story-left">
                  {s.blogImage ? (
                    <img src={s.blogImage} alt={s.title} className="story-image" />
                  ) : (
                    <div className="story-image placeholder">No Image</div>
                  )}
                </div>

                <div className="story-body">
                  <div className="story-headline">
                    <h4>{s.title}</h4>
                    <div className="story-meta">
                      <span className="meta-pill">{s.category}</span>
                      <span className="meta-dot">•</span>
                      <span className="meta-small">
                        <MapPin size={14} /> {s.location || "Unknown"}
                      </span>
                      <span className="meta-dot">•</span>
                      <span className="meta-small">
                        <Mail size={14} /> {s.email || "N/A"}
                      </span>
                    </div>
                  </div>

                  <p className="story-desc">{s.description}</p>

                  <div className="story-author">
                    {s.authorImage ? (
                      <img
                        src={s.authorImage}
                        alt={s.authorName}
                        className="author-avatar"
                      />
                    ) : (
                      <div className="author-avatar placeholder">A</div>
                    )}
                    <div className="author-info">
                      <strong>{s.authorName}</strong>
                      <p className="about-author">{s.aboutAuthor}</p>
                    </div>
                  </div>

                  {s.mainQuote && (
                    <blockquote className="main-quote">“{s.mainQuote}”</blockquote>
                  )}

                  {s.tags.length > 0 && (
                    <div className="card-tags">
                      {s.tags.map((t) => (
                        <span key={t} className="tag-pill">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {s.features.length > 0 && (
                    <ul className="card-features">
                      {s.features.map((f) => (
                        <li key={f}>• {f}</li>
                      ))}
                    </ul>
                  )}

                  {s.video && (
                    <div className="video-indicator">
                      <Video size={16} /> Video Attached
                    </div>
                  )}
                </div>

                <div className="story-actions">
                  <button className="publish-toggle" onClick={() => togglePublish(s.id)}>
                    {s.published ? (
                      <>
                        <CheckCircle2 size={16} /> Unpublish
                      </>
                    ) : (
                      <>
                        <XCircle size={16} /> Publish
                      </>
                    )}
                  </button>

                  <button className="edit" title="Edit (not implemented)">
                    <Edit3 size={16} /> Edit
                  </button>

                  <button className="delete" onClick={() => handleDelete(s.id)}>
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateStory;
