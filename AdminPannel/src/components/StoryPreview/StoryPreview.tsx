import React, { useState } from "react";
import {
  Edit3,
  Trash2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import "./StoryPreview.css";

interface Story {
  id: number;
  title: string;
  description: string;
  category: string;
  blogImage?: string;
  authorName: string;
  authorImage?: string;
  aboutAuthor: string;
  mainQuote: string;
  tags: string[];
  location: string;
  email: string;
  features: string[];
  published: boolean;
}

const StoryPreview: React.FC = () => {

  const [stories,setStories] = useState<Story[]>([
    {
      id:1,
      title:"Journey from Student to Software Engineer",
      description:"Example description",
      category:"Career",
      blogImage:"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600",
      authorName:"Ravi Kumar",
      authorImage:"",
      aboutAuthor:"",
      mainQuote:"",
      tags:["Career"],
      location:"Bangalore",
      email:"ravi@example.com",
      features:["Mentorship"],
      published:true
    }
  ]);

  const handleDelete = (id:number)=>{
    setStories(prev=>prev.filter(s=>s.id!==id));
  };

  const togglePublish = (id:number)=>{
    setStories(prev =>
      prev.map(s=>s.id===id ? {...s,published:!s.published} : s)
    );
  };

  return (
    <div className="StoryPreview-container">

      <div className="story-table-wrapper">

        <h3>All Stories Preview</h3>

        <div className="story-table-scroll">

          <table className="story-table">

            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {stories.map(s=>(
                <tr key={s.id}>

                  <td>
                    {s.blogImage &&
                      <img src={s.blogImage} className="table-img" alt=""/>
                    }
                  </td>

                  <td>{s.title}</td>
                  <td>{s.authorName}</td>
                  <td>{s.category}</td>
                  <td>{s.location}</td>

                  <td>
                    <span className={s.published ? "status-active":"status-inactive"}>
                      {s.published ? "Published" : "Draft"}
                    </span>
                  </td>

                  <td className="action-cell">
                    <button onClick={()=>togglePublish(s.id)}>
                      {s.published ? <XCircle size={16}/> : <CheckCircle2 size={16}/>}
                    </button>

                    <button>
                      <Edit3 size={16}/>
                    </button>

                    <button onClick={()=>handleDelete(s.id)}>
                      <Trash2 size={16}/>
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
};

export default StoryPreview;
