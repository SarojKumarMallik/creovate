import React from 'react'
import VideoManagement from '../../components/VideoManagement/VideoManagement';
import PhotoManagement from '../../components/PhotoManagement/PhotoManagement';
import OnlineMediaManagement from '../../components/OnlineMediaManagement/OnlineMediaManagement';
import NewsManagement from '../../components/NewsManagement/NewsManagement';

const GalleryManagement = () => {
  return (
    <div>
      <VideoManagement/>
      <PhotoManagement/>
      <OnlineMediaManagement/>
      <NewsManagement/>
    </div>
  )
}

export default GalleryManagement
