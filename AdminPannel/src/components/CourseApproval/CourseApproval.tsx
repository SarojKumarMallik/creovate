import React, { useState } from "react";
import "./CourseApproval.css";
import { FiCheckCircle, FiXCircle, FiEye } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

interface ApprovalCourse {
  id: number;
  thumbnail: string;
  title: string;
  instructor: string;
  designation: string;
  level: string;
  language: string;
  price: string;
  submittedDate: string;
  rating: number;
}

const approvalDummyData: ApprovalCourse[] = [
  {
    id: 1,
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    title: "React for Beginners",
    instructor: "Rahul Sharma",
    designation: "Frontend Developer",
    level: "Beginner",
    language: "English",
    price: "₹3,999",
    submittedDate: "20 Feb 2026",
    rating: 4,
  },
  {
    id: 2,
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    title: "Advanced Node.js",
    instructor: "Anjali Mehta",
    designation: "Backend Engineer",
    level: "Advanced",
    language: "Hindi",
    price: "₹5,499",
    submittedDate: "21 Feb 2026",
    rating: 5,
  },
  {
    id: 3,
    thumbnail:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    title: "UI/UX Masterclass",
    instructor: "Karan Verma",
    designation: "UI/UX Designer",
    level: "Intermediate",
    language: "English",
    price: "₹4,999",
    submittedDate: "22 Feb 2026",
    rating: 5,
  },
];

const CourseApproval: React.FC = () => {
  const [courses, setCourses] = useState(approvalDummyData);

  const handleApprove = (id: number) => {
    setCourses(prev => prev.filter(course => course.id !== id));
  };

  const handleReject = (id: number) => {
    setCourses(prev => prev.filter(course => course.id !== id));
  };

  return (
    <div className="approval-container">
      <div className="approval-header">
        <h2>Course Approval Queue</h2>
        <span>{courses.length} Courses Pending</span>
      </div>

      <div className="approval-grid">
        {courses.map(course => (
          <div key={course.id} className="approval-card">
            
            <img src={course.thumbnail} alt={course.title} />

            <div className="approval-content">
              <h3>{course.title}</h3>

              <div className="approval-instructor">
                <strong>{course.instructor}</strong>
                <small>{course.designation}</small>
              </div>

              <div className="approval-meta">
                <span>{course.level}</span>
                <span>{course.language}</span>
                <span>{course.price}</span>
              </div>

              <div className="approval-rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < course.rating ? "active-star" : ""}
                  />
                ))}
              </div>

              <p className="approval-date">
                Submitted on: {course.submittedDate}
              </p>

              <div className="approval-actions">
                <button className="view-btn">
                  <FiEye /> View
                </button>

                <button
                  className="approve-btn"
                  onClick={() => handleApprove(course.id)}
                >
                  <FiCheckCircle /> Approve
                </button>

                <button
                  className="reject-btn"
                  onClick={() => handleReject(course.id)}
                >
                  <FiXCircle /> Reject
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseApproval;