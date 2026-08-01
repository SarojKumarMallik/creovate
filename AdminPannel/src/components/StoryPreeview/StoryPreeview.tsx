import React, { useState, useEffect } from "react";
import {
  HiOutlineViewGrid,
  HiOutlineViewList,
} from "react-icons/hi";
import API, { getImageUrl } from "../../api/api";
import "./StoryPreeview.css";

/* ================= TYPES ================= */
interface Story {
  _id: string;
  title: string;
  category: string | { _id: string; name: string };
  description: string;
  author: string;
  designation?: string;
  quotes?: string;
  blogTags?: string[];
  address?: string;
  contact?: string;
  image?: string;
  publishStatus?: string;
}

const StoryPreeview: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");

  /* ================= FETCH STORIES ================= */
  const fetchStories = async () => {
    try {
      const res = await API.get("/success-stories");
      setStories(res.data || []);
    } catch (err) {
      console.error("FETCH STORY ERROR:", err);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this story?")) return;

    try {
      await API.delete(`/success-stories/${id}`);
      setStories((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  };

  /* ================= TOGGLE PUBLISH ================= */
  const handleTogglePublish = async (story: Story) => {
    try {
      const newStatus =
        story.publishStatus === "Published" ? "Draft" : "Published";

      const formData = new FormData();
      formData.append("publishStatus", newStatus);

      await API.put(`/success-stories/${story._id}`, formData);

      setStories((prev) =>
        prev.map((item) =>
          item._id === story._id
            ? { ...item, publishStatus: newStatus }
            : item
        )
      );
    } catch (err) {
      console.error("TOGGLE PUBLISH ERROR:", err);
    }
  };

  /* ================= SAFE DESCRIPTION PREVIEW ================= */
  const getShortDescription = (html: string) => {
    const plainText = html.replace(/<[^>]+>/g, "");
    return plainText.length > 150
      ? plainText.slice(0, 150) + "..."
      : plainText;
  };

  return (
    <div className="story-preview-container">
      <h1 className="page-title">STORY PREVIEW</h1>

      <div className="view-toggle">
        <HiOutlineViewGrid
          size={28}
          className={viewType === "grid" ? "active" : ""}
          onClick={() => setViewType("grid")}
        />
        <HiOutlineViewList
          size={28}
          className={viewType === "list" ? "active" : ""}
          onClick={() => setViewType("list")}
        />
      </div>

      {/* ================= GRID VIEW ================= */}
      {viewType === "grid" && (
        <div className="premium-grid">
          {stories.map((story) => (
            <div className="premium-card" key={story._id}>
              <div className="image-wrapper">
                <img
                  src={
                    story.image
                      ? getImageUrl(story.image)
                      : "/placeholder.png"
                  }
                  alt={story.title}
                />
              </div>

              <div className="card-body">
                <h3>{story.title}</h3>

                <p className="category">
                  {typeof story.category === "object"
                    ? story.category.name
                    : story.category}
                </p>

                <div className="description">
                  {getShortDescription(story.description)}
                </div>

                <div className="author-block">
                  <span>{story.author}</span>
                  {story.designation && (
                    <small>{story.designation}</small>
                  )}
                </div>

                <div className="tags">
                  {story.blogTags && story.blogTags.length > 0 ? (
                    story.blogTags.map((tag, index) => (
                      <span key={index} className="tag-chip">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="tag-chip">No Tags</span>
                  )}
                </div>

                <button
                  className={`publish-toggle-btn ${
                    story.publishStatus === "Published"
                      ? "published"
                      : "draft"
                  }`}
                  onClick={() => handleTogglePublish(story)}
                >
                  {story.publishStatus === "Published"
                    ? "Unpublish"
                    : "Publish"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= LIST VIEW ================= */}
      {viewType === "list" && (
        <div className="table-scroll-wrapper">
          <table className="premium-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Designation</th>
                <th>Tags</th>
                <th>Status</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {stories.map((story) => (
                <tr key={story._id}>
                  <td>
                    <img
                      src={
                        story.image
                          ? getImageUrl(story.image)
                          : "/placeholder.png"
                      }
                      alt={story.title}
                      className="table-img"
                    />
                  </td>
                  <td>{story.title}</td>
                  <td>
                    {typeof story.category === "object"
                      ? story.category.name
                      : story.category}
                  </td>
                  <td>{story.author}</td>
                  <td>{story.designation || "-"}</td>
                  <td>
                    {story.blogTags && story.blogTags.length > 0
                      ? story.blogTags.join(", ")
                      : "-"}
                  </td>
                  <td>
                    <button
                      className={`publish-toggle-btn ${
                        story.publishStatus === "Published"
                          ? "published"
                          : "draft"
                      }`}
                      onClick={() => handleTogglePublish(story)}
                    >
                      {story.publishStatus === "Published"
                        ? "Unpublish"
                        : "Publish"}
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete"
                      onClick={() => handleDelete(story._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StoryPreeview;