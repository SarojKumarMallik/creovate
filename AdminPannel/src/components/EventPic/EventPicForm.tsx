import React, { useState, useEffect } from "react";

interface Props{
  onSubmit:(file:File)=>void;
  editItem:any;
}

const EventPicForm:React.FC<Props> = ({onSubmit,editItem}) => {

  const [file,setFile] = useState<File | null>(null);
  const [preview,setPreview] = useState<string | null>(null);

  useEffect(()=>{
    if(editItem){
      setPreview(`http://localhost:5000/uploads/${editItem.image}`);
    }
  },[editItem]);

  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault();
    if(!file) return;
    onSubmit(file);
    setFile(null);
    setPreview(null);
  };

  return (
  <form className="tsk-event-form" onSubmit={handleSubmit}>

    <div className="tsk-card-header">
      <h3>Upload Event Photo</h3>
    </div>

    <label className="tsk-file-upload">
      <input
        type="file"
        onChange={(e)=>{
          if(e.target.files){
            const selected = e.target.files[0];
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
          }
        }}
      />
      <span>Select Event Image</span>
    </label>

    {preview && (
      <div className="tsk-preview">
        <img src={preview} alt="preview" />
      </div>
    )}

    <button className="tsk-event-btn">
      {editItem ? "Update" : "Submit"}
    </button>

  </form>
  );
};

export default EventPicForm;