import React, { FormEvent, useState } from "react";
import "./VideoManagement.css";

interface VideoItem {
  id: number;
  title: string;
  videoUrl: string;
}

const VideoManagement: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");

  const [videos, setVideos] = useState<VideoItem[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !videoUrl) {
      alert("Please enter title and video URL.");
      return;
    }

    const newVideo: VideoItem = {
      id: Date.now(),
      title,
      videoUrl,
    };

    setVideos((prev) => [...prev, newVideo]);

    setTitle("");
    setVideoUrl("");

    alert("Video Published!");
  };

  const handleDelete = (id: number) => {
    setVideos((prev) => prev.filter((video) => video.id !== id));
  };

  return (
    <div className="video-admin-wrapper">

      {/* LEFT — FORM */}
      <div className="video-admin-card">
        <div className="video-admin-header">
          <h2>Video Management</h2>
          <p>Upload and publish videos using URL</p>
        </div>

        <form className="video-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="videoUrl">Video URL</label>
            <input
              id="videoUrl"
              type="url"
              placeholder="Paste video URL (YouTube / MP4 / CDN)"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="videoTitle">Video Title</label>
            <input
              id="videoTitle"
              type="text"
              placeholder="Enter video title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <button type="submit" className="publish-btn">
            Publish Video
          </button>
        </form>
      </div>

      {/* RIGHT — TABLE */}
      <div className="video-preview-card">
        <h3>Uploaded Videos</h3>

        <div className="table-scroll">
          <table className="Video-preview-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Video Title</th>
                <th>Video URL</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {videos.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center" }}>
                    No videos uploaded yet
                  </td>
                </tr>
              ) : (
                videos.map((video, index) => (
                  <tr key={video.id}>
                    <td>{index + 1}</td> {/* SERIAL NUMBER */}
                    <td>{video.title}</td>
                    <td>
                      <a href={video.videoUrl} target="_blank" rel="noreferrer">
                        View Video
                      </a>
                    </td>
                    <td className="action-buttons">
                      <button className="btn edit">Edit</button>
                      <button
                        className="btn delete"
                        onClick={() => handleDelete(video.id)}
                      >
                        Delete
                      </button>
                      <button className="btn publish">Publish</button>
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

export default VideoManagement;
