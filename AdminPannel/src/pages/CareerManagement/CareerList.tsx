import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CareerList.css";

interface Career {
  _id?: string;
  designation: string;
  salary: string;
  experience: string;
  location: string;
  jobType: string;
  vacancy: number;
  skills: string;
  status: "published" | "unpublished";
}

const CareerList = () => {

  const [careers, setCareers] = useState<Career[]>([]);

  const API = "http://localhost:5000/api/career";

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {

      const res = await axios.get(`${API}/get-careers`);

      setCareers(res.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  /* ================= TOGGLE STATUS ================= */

  const togglePublish = async (id?: string) => {

    try {

      await axios.patch(`${API}/publish-career/${id}`);

      fetchCareers();

    } catch (error) {
      console.log(error);
    }

  };

  return (

    <div className="careerList-wrapper">

      <h2 className="careerList-title">Career Openings</h2>

      <div className="careerList-tableWrapper">

        <table className="careerList-table">

          <thead>

            <tr>
              <th>Designation</th>
              <th>Salary</th>
              <th>Experience</th>
              <th>Location</th>
              <th>Job Type</th>
              <th>Vacancy</th>
              <th>Skills</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {careers.map((item) => (

              <tr key={item._id}>

                <td>{item.designation}</td>
                <td>{item.salary}</td>
                <td>{item.experience}</td>
                <td>{item.location}</td>
                <td>{item.jobType}</td>
                <td>{item.vacancy}</td>
                <td>{item.skills}</td>

                <td>

                  <button
                    className={
                      item.status === "published"
                        ? "publishBtn"
                        : "unpublishBtn"
                    }
                    onClick={() => togglePublish(item._id)}
                  >
                    {item.status === "published"
                      ? "Published"
                      : "Unpublished"}
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
};

export default CareerList;