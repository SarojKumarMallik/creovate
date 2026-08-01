import React, { ChangeEvent, FormEvent, useState } from "react";
import "./PhotoManagement.css";

interface PhotoItem {
  id: number;
  title: string;
  category: string;
  fileName: string;
  type: string;
  imageUrl: string; // IMAGE PREVIEW
}

const PhotoManagement: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const [photos, setPhotos] = useState<PhotoItem[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPhotoFile(file);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !category || !photoFile) {
      alert("Please fill all fields.");
      return;
    }

    const newPhoto: PhotoItem = {
      id: Date.now(),
      title,
      category,
      fileName: photoFile.name,
      type: photoFile.type,
      imageUrl: URL.createObjectURL(photoFile),
    };

    setPhotos((prev) => [...prev, newPhoto]);

    // reset form
    setTitle("");
    setCategory("");
    setPhotoFile(null);

    alert("Photo Posted!");
  };

  const handleDelete = (id: number) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  return (
    <div className="photo-admin-wrapper">

      {/* LEFT — FORM */}
      <div className="photo-admin-card">
        <div className="photo-admin-header">
          <h2>Photo Management</h2>
          <p>Upload and publish photos for your platform</p>
        </div>

        <form className="photo-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="photoUpload">Upload Photo</label>
            <input
              id="photoUpload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="photoTitle">Photo Title</label>
            <input
              id="photoTitle"
              type="text"
              placeholder="Enter photo title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="photoCategory">Photo Category</label>
            <select
              id="photoCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="Events">Events</option>
              <option value="Workshop">Workshop</option>
              <option value="Campus">Campus</option>
              <option value="Achievements">Achievements</option>
            </select>
          </div>

          <button type="submit" className="post-btn">
            Post Photo
          </button>
        </form>
      </div>

      {/* RIGHT — TABLE */}
      <div className="photo-preview-card">
        <h3>Uploaded Photos</h3>

        <div className="table-scroll">
          <table className="Photo-preview-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Image</th>
                <th>Photo Title</th>
                <th>File Name</th>
                <th>Category</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {photos.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    No photos uploaded yet
                  </td>
                </tr>
              ) : (
                photos.map((photo, index) => (
                  <tr key={photo.id}>
                    <td>{index + 1}</td>

                    {/* IMAGE PREVIEW */}
                    <td>
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="table-photo"
                      />
                    </td>

                    <td>{photo.title}</td>
                    <td>{photo.fileName}</td>
                    <td>{photo.category}</td>
                    <td>{photo.type}</td>

                    <td className="action-buttons">
                      <button type="button" className="btn edit">
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn delete"
                        onClick={() => handleDelete(photo.id)}
                      >
                        Delete
                      </button>
                      <button type="button" className="btn post">
                        Post
                      </button>
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

export default PhotoManagement;
