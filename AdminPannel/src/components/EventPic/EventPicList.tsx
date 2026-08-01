import React from "react";
import { getImageUrl } from "../../api/api";

interface Props{
  list:any[];
  onEdit:(item:any)=>void;
  onDelete:(id:string)=>void;
}

const EventPicList:React.FC<Props> = ({list,onEdit,onDelete}) => {
  return (
    <div className="tsk-event-list">
      
      <div className="tsk-card-header">
        <h3>Event Photo List</h3>
      </div>

      <div className="tsk-event-head">
        <div>Sl No</div>
        <div>Image</div>
        <div>Action</div>
      </div>

      <div className="tsk-event-scroll">
        {list.map((item,index)=>(
          <div key={item._id} className="tsk-event-row">
            
            <div className="tsk-slno">
              {index + 1}
            </div>

            <div className="tsk-image-cell">
              {item.image ? (
                <img 
                  src={getImageUrl(item.image)} 
                  alt="event" 
                />
              ) : (
                <div style={{width:60,height:60,background:"#eee"}} />
              )}
            </div>

            <div className="tsk-event-actions">
              <button 
                className="tsk-edit-btn" 
                onClick={()=>onEdit(item)}
              >
                Edit
              </button>

              <button 
                className="tsk-delete-btn" 
                onClick={()=>onDelete(item._id)}
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPicList;