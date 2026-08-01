import React, { useEffect, useState } from "react";
import "./PostNotice.css";
import axios from "axios";

interface NoticeType {
  _id: string;
  noticeNumber: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image?: string;
  isPublished?: boolean;
}

const itemsPerPage = 5;

const PostNotice: React.FC = () => {

  const API = "http://localhost:5000/api/notices";

  const [editingId,setEditingId] = useState<string | null>(null);

  const [form,setForm] = useState({
    noticeNumber:"",
    title:"",
    description:"",
    date:"",
    category:"",
    image:null as File | null
  });

  const [list,setList] = useState<NoticeType[]>([]);
  const [categories,setCategories] = useState<string[]>([]);
  const [page,setPage] = useState(1);

  useEffect(()=>{

    setCategories(["General","Exam","Holiday","Urgent","Event"]);

    fetchNotices();

  },[]);


  /* FETCH NOTICES */

  const fetchNotices = async()=>{

    try{

      const res = await axios.get(`${API}/all`);

      setList(res.data);

    }catch(err){

      console.log(err);

    }

  };


  /* INPUT CHANGE */

  const handleChange = (e:any)=>{

    const {name,value,type} = e.target;

    if(type === "file"){

      const file = e.target.files[0];

      setForm((p)=>({...p,image:file}));

      return;

    }

    setForm((p)=>({...p,[name]:value}));

  };


  /* CREATE OR UPDATE NOTICE */

  const handleSubmit = async(e:any)=>{

    e.preventDefault();

    try{

      if(editingId){

        /* UPDATE NOTICE */

        const updateData = {
          noticeNumber:form.noticeNumber,
          title:form.title,
          description:form.description,
          date:form.date,
          category:form.category
        };

        await axios.put(`${API}/update/${editingId}`,updateData);

      }else{

        /* CREATE NOTICE */

        const formData = new FormData();

        formData.append("noticeNumber",form.noticeNumber);
        formData.append("title",form.title);
        formData.append("description",form.description);
        formData.append("date",form.date);
        formData.append("category",form.category);

        if(form.image){
          formData.append("image",form.image);
        }

        await axios.post(`${API}/create`,formData);

      }

      /* RESET FORM */

      setEditingId(null);

      setForm({
        noticeNumber:"",
        title:"",
        description:"",
        date:"",
        category:"",
        image:null
      });

      fetchNotices();

    }catch(err){

      console.log(err);

    }

  };


  /* DELETE NOTICE */

  const handleDelete = async(id:string)=>{

    if(!window.confirm("Delete this notice?")) return;

    await axios.delete(`${API}/delete/${id}`);

    fetchNotices();

  };


  /* EDIT NOTICE */

  const handleEdit = (item:NoticeType)=>{

    setEditingId(item._id);

    setForm({

      noticeNumber:item.noticeNumber,
      title:item.title,
      description:item.description,
      date:item.date,
      category:item.category,
      image:null

    });

    window.scrollTo({top:0,behavior:"smooth"});

  };


  /* TOGGLE PUBLISH */

  const togglePublish = async(id:string)=>{

    await axios.put(`${API}/toggle/${id}`);

    fetchNotices();

  };


  /* PAGINATION */

  const start = (page - 1) * itemsPerPage;

  const currentData = list.slice(start,start + itemsPerPage);

  const totalPages = Math.ceil(list.length/itemsPerPage);


  return(

    <div className="noticepage-wrapper">

      {/* FORM */}

      <div className="noticepage-formPanel">

        <div className="noticepage-formHeader">
          {editingId ? "Edit Notice" : "Notice Post Form"}
        </div>

        <form className="noticepage-formBody" onSubmit={handleSubmit}>

          <div className="noticepage-field">

            <label>Notice Number</label>

            <input
              name="noticeNumber"
              value={form.noticeNumber}
              onChange={handleChange}
              required
            />

          </div>

          <div className="noticepage-row-2">

            <div className="noticepage-field">

              <label>Notice Title</label>

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />

            </div>

            <div className="noticepage-field">

              <label>Description</label>

              <input
                name="description"
                value={form.description}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          <div className="noticepage-row-2">

            <div className="noticepage-field">

              <label>Notice Date</label>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                onClick={(e:any)=>e.target.showPicker()}
                required
              />

            </div>

            <div className="noticepage-field">

              <label>Category</label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >

                <option value="">Select category</option>

                {categories.map((c,i)=>(
                  <option key={i}>{c}</option>
                ))}

              </select>

            </div>

          </div>

          <div className="noticepage-field">

            <label>Upload Image</label>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />

          </div>

          <button className="noticepage-submitBtn">

            {editingId ? "Update Notice" : "Submit Notice"}

          </button>

        </form>

      </div>


      {/* TABLE */}

      <div className="noticepage-tablePanel">

        <div className="noticepage-tableHeader">
          Notice List
        </div>

        <div className="noticepage-tableWrapper">

          <table className="noticepage-table">

            <thead>

              <tr>

                <th>No</th>
                <th>Number</th>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
                <th>Category</th>
                <th>Image</th>
                <th>Status</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {currentData.map((n,i)=>(

                <tr key={n._id}>

                  <td>{start + i + 1}</td>

                  <td>{n.noticeNumber}</td>

                  <td>{n.title}</td>

                  <td className="noticepage-descCell">{n.description}</td>

                  <td>{n.date}</td>

                  <td>{n.category}</td>

                  <td>

                    {n.image && (
                      <img
                        src={`http://localhost:5000/uploads/notices/${n.image}`}
                        className="noticepage-thumb"
                      />
                    )}

                  </td>

                  <td>

                    <button
                      onClick={()=>togglePublish(n._id)}
                    >
                      {n.isPublished ? "Published" : "Unpublished"}
                    </button>

                  </td>

                  <td>

                    <button
                      className="editBtn"
                      onClick={()=>handleEdit(n)}
                    >
                      Edit
                    </button>

                    <button
                      className="deleteBtn"
                      onClick={()=>handleDelete(n._id)}
                    >
                      Delete
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

export default PostNotice;