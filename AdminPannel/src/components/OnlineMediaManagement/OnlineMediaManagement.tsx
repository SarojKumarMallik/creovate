import React, { FormEvent, useState } from "react";
import "./OnlineMediaManagement.css";

interface MediaItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const OnlineMediaManagement: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  // STORE ALL RECORDS
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !description || !imageUrl) {
      alert("Please fill all fields.");
      return;
    }

    const newMedia: MediaItem = {
      id: Date.now(),
      title,
      description,
      imageUrl,
    };

    setMediaList((prev) => [...prev, newMedia]);

    // RESET FORM
    setTitle("");
    setDescription("");
    setImageUrl("");

    alert("Online Media Posted!");
  };

  const handleDelete = (id: number) => {
    setMediaList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="online-media-layout">

      {/* LEFT SIDE — FORM */}
      <div className="online-media-form-card">
        <div className="online-media-header">
          <h2>Online Media Management</h2>
          <p>Upload and publish online media content using URL</p>
        </div>

        <form className="online-media-form" onSubmit={handleSubmit}>

          {/* IMAGE URL */}
          <div className="online-media-group">
            <label htmlFor="mediaUrl">Image URL</label>
            <input
              id="mediaUrl"
              type="url"
              placeholder="Paste image URL here..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          {/* TITLE */}
          <div className="online-media-group">
            <label htmlFor="mediaTitle">Title of Photo</label>
            <input
              id="mediaTitle"
              type="text"
              placeholder="Enter media title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* DESCRIPTION */}
          <div className="online-media-group">
            <label htmlFor="mediaDesc">Description of Photo</label>
            <textarea
              id="mediaDesc"
              placeholder="Write description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <button type="submit" className="online-media-post-btn">
            Post Media
          </button>
        </form>
      </div>

      {/* RIGHT SIDE — TABLE */}
      <div className="online-media-table-card">
        <h3>Uploaded Media</h3>

        <div className="online-media-table-scroll">
          <table className="online-media-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {mediaList.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    No media uploaded yet
                  </td>
                </tr>
              ) : (
                mediaList.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>

                    <td>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="media-thumb"
                      />
                    </td>

                    <td>{item.title}</td>
                    <td>{item.description}</td>

                    <td className="online-media-actions">
                      <button className="om-btn om-edit">Edit</button>
                      <button
                        className="om-btn om-delete"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                      <button className="om-btn om-post">Post</button>
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

export default OnlineMediaManagement;
