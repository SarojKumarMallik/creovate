import React, { useEffect, useState } from "react";
import API from "../../api/api";
import LearningPartnerForm from "../../components/LearningPartnerForm/LearningPartnerForm";
import LearningPartnerList from "../../components/LearningPartnerForm/LearningPartnerList";
import "./LearningPartner.css";

export interface PartnerType{
  _id?: string;
  image:string | null;
}

const LearningPartner:React.FC = ()=>{

  const [data,setData] = useState<PartnerType[]>([]);
  const [editItem,setEditItem] = useState<PartnerType | null>(null);

  /* ================= FETCH ================= */
  const fetchPartners = async ()=>{
    try{
      const res = await API.get("/learning-partners");
      setData(res.data || []);
    }catch(err){
      console.error("FETCH ERROR:",err);
    }
  };

  useEffect(()=>{
    fetchPartners();
  },[]);

  /* ================= SAVE ================= */
  const savePartner = async (file: File | null)=>{
    if(!file && !editItem) return;

    const formData = new FormData();
    if(file) formData.append("image", file);

    try{
      if(editItem?._id){
        await API.put(`/learning-partners/${editItem._id}`, formData);
      }else{
        await API.post("/learning-partners", formData);
      }

      fetchPartners();
      setEditItem(null);

    }catch(err){
      console.error("SAVE ERROR:",err);
    }
  };

  /* ================= DELETE ================= */
  const deletePartner = async (id:string)=>{
    if(!window.confirm("Delete this partner?")) return;

    try{
      await API.delete(`/learning-partners/${id}`);
      fetchPartners();
    }catch(err){
      console.error("DELETE ERROR:",err);
    }
  };

  return(
    <div className="tsk-partner-wrapper">
      <div className="tsk-partner-grid">
        <LearningPartnerForm
          onSubmit={savePartner}
          editItem={editItem}
        />

        <LearningPartnerList
          list={data}
          onEdit={setEditItem}
          onDelete={deletePartner}
        />
      </div>
    </div>
  );
};

export default LearningPartner;