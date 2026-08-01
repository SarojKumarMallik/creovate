import React, { useState, useEffect } from "react";
import EventPicForm from "../../components/EventPic/EventPicForm";
import EventPicList from "../../components/EventPic/EventPicList";
import API from "../../api/api";
import "./EventPicturePage.css";

export interface EventPicType{
  _id?: string;
  image: string | null;
}

const EventPicturePage:React.FC = () => {

  const [data,setData] = useState<EventPicType[]>([]);
  const [editItem,setEditItem] = useState<EventPicType | null>(null);

  /* ================= FETCH ================= */
  const fetchPics = async () => {
    try {
      const res = await API.get("/event-pics");
      setData(res.data);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    }
  };

  useEffect(()=>{
    fetchPics();
  },[]);

  /* ================= SAVE ================= */
  const savePic = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      if(editItem){
        await API.put(`/event-pics/${editItem._id}`, formData);
        setEditItem(null);
      } else {
        await API.post("/event-pics", formData);
      }

      fetchPics();

    } catch (err) {
      console.error("SAVE ERROR:", err);
    }
  };

  /* ================= DELETE ================= */
  const deletePic = async (id:string) => {
    try {
      await API.delete(`/event-pics/${id}`);
      fetchPics();
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  };

  return (
    <div className="tsk-event-wrapper">
      <div className="tsk-event-grid">
        <EventPicForm 
          onSubmit={savePic} 
          editItem={editItem}
        />
        <EventPicList 
          list={data} 
          onEdit={setEditItem} 
          onDelete={deletePic}
        />
      </div>
    </div>
  );
};

export default EventPicturePage;