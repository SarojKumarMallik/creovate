import React from "react";
import { getImageUrl } from "../../api/api";

interface PartnerType{
  _id?: string;
  image:string | null;
}

interface Props{
  list:PartnerType[] | any;   // allow unknown backend shape
  onEdit:(item:PartnerType)=>void;
  onDelete:(id:string)=>void;
}

const LearningPartnerList:React.FC<Props> = ({list,onEdit,onDelete})=>{

  // ✅ Ensure list is always an array
  const safeList: PartnerType[] = Array.isArray(list)
    ? list
    : Array.isArray(list?.data)
    ? list.data
    : [];

  return(
    <div className="tsk-partner-list">

      <div className="tsk-partner-header">
        <h3>Learning Partner List</h3>
      </div>

      <div className="tsk-partner-head">
        <div>Sl No</div>
        <div>Image</div>
        <div>Action</div>
      </div>

      <div className="tsk-partner-scroll">
        {safeList.length === 0 ? (
          <div className="tsk-partner-row">
            <div className="tsk-partner-slno">-</div>
            <div className="tsk-partner-image">No Data Found</div>
            <div className="tsk-partner-actions">-</div>
          </div>
        ) : (
          safeList.map((item,index)=>(
            <div key={item._id} className="tsk-partner-row">
              
              <div className="tsk-partner-slno">
                {index + 1}
              </div>

              <div className="tsk-partner-image">
                <img 
                  src={getImageUrl(item.image || "")}
                  alt="partner"
                />
              </div>

              <div className="tsk-partner-actions">
                <button 
                  className="tsk-partner-edit" 
                  onClick={()=>onEdit(item)}
                >
                  Edit
                </button>

                <button 
                  className="tsk-partner-delete" 
                  onClick={()=> item._id && onDelete(item._id)}
                >
                  Delete
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default LearningPartnerList;