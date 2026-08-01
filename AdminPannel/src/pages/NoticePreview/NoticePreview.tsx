import React, { useEffect, useState } from "react";
import { FiGrid, FiList } from "react-icons/fi";
import axios from "axios";
import "./NoticePreview.css";

export interface NoticePreviewType {
  _id: string;
  noticeNumber: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image?: string;
}

interface Props {
  notices?: NoticePreviewType[];
}

const API = "http://localhost:5000/api/notices";

/* fallback */
const dummy: NoticePreviewType[] = [
  {
    _id: "1",
    noticeNumber: "N001",
    title: "Holiday Notice",
    description: "School will remain closed tomorrow.",
    date: "2026-02-10",
    category: "Holiday",
    image: "https://picsum.photos/400/300",
  },
];

const NoticePreview: React.FC<Props> = ({ notices }) => {

  const [view, setView] = useState<"grid" | "list">("grid");
  const [data,setData] = useState<NoticePreviewType[]>([]);

  useEffect(()=>{

    fetchNotices();

  },[]);


  const fetchNotices = async()=>{

    try{

      const res = await axios.get(`${API}/all`);

      setData(res.data);

    }catch(err){

      console.log(err);

    }

  };

  const noticeData = notices && notices.length ? notices : data.length ? data : dummy;

  return (
    <div className="adminNoticePreview-root">

      {/* HEADER */}

      <div className="adminNoticePreview-header">

        <h2 className="adminNoticePreview-title">
          Notice Preview
        </h2>

        <div className="adminNoticePreview-viewToggle">

          <button
            className={view === "grid" ? "active" : ""}
            onClick={() => setView("grid")}
          >
            <FiGrid />
          </button>

          <button
            className={view === "list" ? "active" : ""}
            onClick={() => setView("list")}
          >
            <FiList />
          </button>

        </div>

      </div>

      {/* SCROLL AREA */}

      <div className="adminNoticePreview-scrollArea">

        {/* GRID VIEW */}

        {view === "grid" && (

          <div className="adminNoticePreview-grid">

            {noticeData.map((n) => (

              <div key={n._id} className="adminNoticePreview-card">

                {n.image && (

                  <img
                    src={`http://localhost:5000/uploads/notices/${n.image}`}
                    className="adminNoticePreview-image"
                  />

                )}

                <div className="adminNoticePreview-content">

                  <h3>{n.title}</h3>

                  <p className="adminNoticePreview-desc">
                    {n.description}
                  </p>

                  <div className="adminNoticePreview-meta">

                    <span>{n.date}</span>

                    <span>{n.category}</span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

        {/* LIST VIEW */}

        {view === "list" && (

          <div className="adminNoticePreview-tableWrapper">

            <table className="adminNoticePreview-table">

              <thead>

                <tr>

                  <th>No</th>
                  <th>Image</th>
                  <th>Number</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Category</th>

                </tr>

              </thead>

              <tbody>

                {noticeData.map((n, i) => (

                  <tr key={n._id}>

                    <td>{i + 1}</td>

                    <td>

                      {n.image && (

                        <img
                          src={`http://localhost:5000/uploads/notices/${n.image}`}
                          className="adminNoticePreview-tableImg"
                        />

                      )}

                    </td>

                    <td>{n.noticeNumber}</td>

                    <td>{n.title}</td>

                    <td className="adminNoticePreview-tableDesc">
                      {n.description}
                    </td>

                    <td>{n.date}</td>

                    <td>{n.category}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default NoticePreview;