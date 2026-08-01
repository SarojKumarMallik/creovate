import React from "react";
import "./FeedbackOverview.css";
import { Edit, Trash2, Eye } from "lucide-react";

interface Feedback {
  id: number;
  studentName: string;
  courseName: string;
  rating: number;
}

const feedbackData: Feedback[] = [
  { id: 1, studentName: "Lori Stevens", courseName: "Building Scalable APIs with GraphQL", rating: 5 },
  { id: 2, studentName: "Carolyn Ortiz", courseName: "Graphic Design Masterclass", rating: 5 },
  { id: 3, studentName: "Dennis Barrett", courseName: "JavaScript: Full Understanding", rating: 4 },
  { id: 4, studentName: "Billy Vasquez", courseName: "Time Management Mastery: Do More, Stress Less", rating: 4 },
  { id: 5, studentName: "Jacqueline Miller", courseName: "The complete Digital Marketing Course - 8 Course in 1", rating: 4 },
  { id: 6, studentName: "Amanda Reed", courseName: "Microsoft Excel - Excel from Beginner to Advanced", rating: 4 },
  { id: 7, studentName: "Samuel Bishop", courseName: "Behavior, Psychology and Care Training", rating: 4 },
  { id: 8, studentName: "Louis Ferguson", courseName: "Create a Design System in Figma", rating: 4 },
];

const FeedbackOverview: React.FC = () => {
  return (
    <div className="feedback-overview">
      <h2>Reviews</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Course Name</th>
              <th>Rating</th>
              <th>Hide/Show</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {feedbackData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1 < 10 ? `0${index + 1}` : index + 1}</td>
                <td>{item.studentName}</td>
                <td>{item.courseName}</td>
                <td>
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className={`star ${star <= item.rating ? "filled" : ""}`}>★</span>
                  ))}
                </td>
                <td>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </td>
                <td className="action-icons">
                    <span title="Edit-icon">
    <Edit className="icon edit" />
  </span>
  <span title="Delete-icon">
    <Trash2 className="icon delete" />
  </span>
  <span title="View-icon">
    <Eye className="icon view" />
  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackOverview;
