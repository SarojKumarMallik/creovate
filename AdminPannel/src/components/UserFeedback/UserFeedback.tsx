import React, { useState, ChangeEvent, FormEvent } from "react";
import "./UserFeedback.css";
import { Star, Pencil, Trash2, Check } from "lucide-react";

interface Feedback {
  id: number;
  name: string;
  course: string;
  rating: number;
  image: string | null;
  isEditing?: boolean;
}

const UserFeedback: React.FC = () => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  // Handle image upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };

  // Add new feedback
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !course || rating === 0) {
      alert("Please fill all fields and select a rating!");
      return;
    }

    const newFeedback: Feedback = {
      id: feedbacks.length + 1,
      name,
      course,
      rating,
      image,
    };

    setFeedbacks([...feedbacks, newFeedback]);
    setName("");
    setCourse("");
    setRating(0);
    setImage(null);
  };

  // Edit feedback
  const handleEdit = (id: number) => {
    setFeedbacks(
      feedbacks.map((f) =>
        f.id === id ? { ...f, isEditing: true } : { ...f, isEditing: false }
      )
    );
  };

  // Update feedback without turning off editing
  const handleUpdate = (id: number, updatedData: Partial<Feedback>) => {
    setFeedbacks(
      feedbacks.map((f) => (f.id === id ? { ...f, ...updatedData } : f))
    );
  };

  // Save feedback (turn off editing)
  const handleSave = (id: number) => {
    setFeedbacks(
      feedbacks.map((f) => (f.id === id ? { ...f, isEditing: false } : f))
    );
  };

  // Delete feedback
  const handleDelete = (id: number) => {
    setFeedbacks(feedbacks.filter((f) => f.id !== id));
  };

  // Rating text (1 Star → 5 Stars)
  const getRatingText = (r: number) => `${r} Star${r > 1 ? "s" : ""}`;

  return (
    <div className="feedback-container">
      {/* LEFT SIDE FORM */}
      <div className="feedback-form">
        <h2>User Feedback</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Upload Profile Pic:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <div className="form-group">
            <label>Student Name:</label>
            <input
              type="text"
              placeholder="Enter student name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Course Name:</label>
            <input
              type="text"
              placeholder="Enter course name"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Rating:</label>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={28}
                  className={rating >= star ? "active" : ""}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>

          <button type="submit" className="post-btn">
            Post
          </button>
        </form>
      </div>

      {/* RIGHT SIDE TABLE */}
      <div className="feedback-table-container">
        <h2>Feedback Preview</h2>
        <div className="table-scroll">
          <table className="feedback-table">
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Profile</th>
                <th>Student Name</th>
                <th>Course</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.length > 0 ? (
                feedbacks.map((f) => (
                  <tr key={f.id}>
                    <td>{f.id}</td>
                    <td>
                      <img
                        src={
                          f.image ||
                          "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                        }
                        alt="profile"
                        className="table-img"
                      />
                    </td>

                    {/* Editable cells */}
                    <td>
                      {f.isEditing ? (
                        <input
                          type="text"
                          value={f.name}
                          onChange={(e) =>
                            handleUpdate(f.id, { name: e.target.value })
                          }
                        />
                      ) : (
                        f.name
                      )}
                    </td>

                    <td>
                      {f.isEditing ? (
                        <input
                          type="text"
                          value={f.course}
                          onChange={(e) =>
                            handleUpdate(f.id, { course: e.target.value })
                          }
                        />
                      ) : (
                        f.course
                      )}
                    </td>

                    <td>
                      {f.isEditing ? (
                        <select
                          value={f.rating}
                          onChange={(e) =>
                            handleUpdate(f.id, { rating: Number(e.target.value) })
                          }
                        >
                          {[1, 2, 3, 4, 5].map((r) => (
                            <option key={r} value={r}>
                              {getRatingText(r)}
                            </option>
                          ))}
                        </select>
                      ) : (
                        getRatingText(f.rating)
                      )}
                    </td>

                    <td className="actions">
                      {f.isEditing ? (
                        <span title="Save">
                          <Check
                            className="icon save"
                            onClick={() => handleSave(f.id)}
                          />
                        </span>
                      ) : (
                        <span title="Edit">
                          <Pencil
                            className="icon edit"
                            onClick={() => handleEdit(f.id)}
                          />
                        </span>
                      )}
                      <span title="Delete">
                        <Trash2
                          className="icon delete"
                          onClick={() => handleDelete(f.id)}
                        />
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="no-data">
                    No feedback submitted yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserFeedback;
