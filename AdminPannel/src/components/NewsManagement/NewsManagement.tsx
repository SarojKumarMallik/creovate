import React, { ChangeEvent, FormEvent, useState } from "react";
import "./NewsManagement.css";

interface NewsItem {
  id: number;
  newsUrl: string;
  title: string;
  description: string;
  date: string;
  author: string;
  photoName: string;
  photoUrl: string;
}

const NewsManagement: React.FC = () => {
  const [newsUrl, setNewsUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [newsPhoto, setNewsPhoto] = useState<File | null>(null);

  // STORE ALL NEWS RECORDS
  const [newsList, setNewsList] = useState<NewsItem[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewsPhoto(file);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newsUrl || !title || !description || !date || !author || !newsPhoto) {
      alert("Please fill all fields.");
      return;
    }

    const newNews: NewsItem = {
      id: Date.now(),
      newsUrl,
      title,
      description,
      date,
      author,
      photoName: newsPhoto.name,
      photoUrl: URL.createObjectURL(newsPhoto),
    };

    setNewsList((prev) => [...prev, newNews]);

    // RESET FORM
    setNewsUrl("");
    setTitle("");
    setDescription("");
    setDate("");
    setAuthor("");
    setNewsPhoto(null);

    alert("News Posted!");
  };

  const handleDelete = (id: number) => {
    setNewsList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="news-admin-layout">

      {/* LEFT — FORM */}
      <div className="news-admin-form-card">
        <div className="news-admin-header">
          <h2>News Management</h2>
          <p>Publish and manage online news content</p>
        </div>

        <form className="news-admin-form" onSubmit={handleSubmit}>

          <div className="news-field-group">
            <label htmlFor="newsUrl">News Paper URL</label>
            <input
              id="newsUrl"
              type="url"
              placeholder="https://example.com/news"
              value={newsUrl}
              onChange={(e) => setNewsUrl(e.target.value)}
            />
          </div>

          <div className="news-field-group">
            <label htmlFor="newsTitle">Title of Photo</label>
            <input
              id="newsTitle"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="news-field-group">
            <label htmlFor="newsDesc">Description of Photo</label>
            <textarea
              id="newsDesc"
              placeholder="Write description..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="news-field-group">
            <label htmlFor="newsDate">Date of the News</label>
            <input
              id="newsDate"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="news-field-group">
            <label htmlFor="newsAuthor">Author</label>
            <input
              id="newsAuthor"
              type="text"
              placeholder="Author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="news-field-group">
            <label htmlFor="newsPhoto">Upload Photo of News</label>
            <input
              id="newsPhoto"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" className="news-post-btn">
            Post News
          </button>
        </form>
      </div>

      {/* RIGHT — RECORD TABLE */}
      <div className="news-admin-table-card">
        <h3>News Records</h3>

        <div className="news-table-scroll-wrap">
          <table className="news-live-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Image</th>
                <th>Title</th>
                <th>URL</th>
                <th>Description</th>
                <th>Date</th>
                <th>Author</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {newsList.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center" }}>
                    No news posted yet
                  </td>
                </tr>
              ) : (
                newsList.map((news, index) => (
                  <tr key={news.id}>
                    <td>{index + 1}</td>

                    <td>
                      <img
                        src={news.photoUrl}
                        alt={news.title}
                        className="news-thumb"
                      />
                    </td>

                    <td>{news.title}</td>
                    <td>
                      <a href={news.newsUrl} target="_blank" rel="noreferrer">
                        Link
                      </a>
                    </td>
                    <td>{news.description}</td>
                    <td>{news.date}</td>
                    <td>{news.author}</td>

                    <td className="news-action-area">
                      <button className="news-btn news-edit">Edit</button>
                      <button
                        className="news-btn news-delete"
                        onClick={() => handleDelete(news.id)}
                      >
                        Delete
                      </button>
                      <button className="news-btn news-post">Post</button>
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

export default NewsManagement;
