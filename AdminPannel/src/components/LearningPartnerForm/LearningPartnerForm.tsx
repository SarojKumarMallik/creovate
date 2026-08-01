import React, { useState, useEffect } from "react";
import { getImageUrl } from "../../api/api";

interface PartnerType{
  _id?: string;
  image:string | null;
}

interface Props{
  onSubmit:(file:File | null)=>void;
  editItem:PartnerType | null;
}

const LearningPartnerForm:React.FC<Props> = ({onSubmit,editItem})=>{

  const [file,setFile] = useState<File | null>(null);
  const [preview,setPreview] = useState<string | null>(null);

  useEffect(()=>{
    if(editItem?.image){
      setPreview(getImageUrl(editItem.image));
    }
  },[editItem]);

  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault();
    onSubmit(file);
    setFile(null);
    setPreview(null);
  };

  return(
    <form className="tsk-partner-form" onSubmit={handleSubmit}>
      <div className="tsk-partner-header">
        <h3>Upload Learning Partner</h3>
      </div>

      <label className="tsk-partner-upload">
        <input
          type="file"
          onChange={(e)=>{
            if(e.target.files){
              const selectedFile = e.target.files[0];
              setFile(selectedFile);
              setPreview(URL.createObjectURL(selectedFile));
            }
          }}
        />
        <span>Select Partner Logo</span>
      </label>

      {preview && (
        <div className="tsk-partner-preview">
          <img src={preview} alt="preview"/>
        </div>
      )}

      <button className="tsk-partner-btn">
        {editItem ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default LearningPartnerForm;