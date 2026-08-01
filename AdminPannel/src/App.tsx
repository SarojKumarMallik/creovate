// File: App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
// import { ScrollToTop } from "./components/common/ScrollToTop";

/* ================= AUTH PAGES ================= */
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";

/* ================= OTHER PAGES ================= */
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Blank from "./pages/Blank";

/* ================= CHARTS ================= */
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";

/* ================= TABLES & FORMS ================= */
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";

/* ================= DASHBOARD ================= */


/* ================= CATEGORY ================= */
import CreateNew from "./components/CreateNew/CreateNew";
import CategoryPreview from "./components/CategoryPreview/CategoryPreview";

/* ================= TESTIMONIAL ================= */
import PostTestimonial from "./components/PostTestimonial/PostTestimonial";
import TestimonialPreview from "./components/TestimonialPreview/TestimonialPreview";

/* ================= SUCCESS STORY ================= */
import CreateStory from "./components/CreateStory/CreateStory";
import StoryPreview from "./components/StoryPreview/StoryPreview";
import StoryPost from "./components/StoryPost/StoryPost";
import StoryPreeview from "./components/StoryPreeview/StoryPreeview";

/* ================= INSTRUCTOR ================= */
import ManageInstructors from "./components/ManageInstructors/ManageInstructors";
import TSKInstructorPage from "./pages/InstructorPage/InstructorPage";





/* ================= FEEDBACK ================= */
import UserFeedback from "./components/UserFeedback/UserFeedback";
import FeedbackOverview from "./components/FeedbackOverview/FeedbackOverview";

/* ================= OTHER ================= */
import EventPicturePage from "./pages/EventPicturePage/EventPicturePage";
import LearningPartner from "./pages/LearningPartner/LearningPartner";
import VideoManagement from "./components/VideoManagement/VideoManagement";
import PhotoManagement from "./components/PhotoManagement/PhotoManagement";
import OnlineMediaManagement from "./components/OnlineMediaManagement/OnlineMediaManagement";
import NewsManagement from "./components/NewsManagement/NewsManagement";


/*==============  Notice Management  ===============*/
import NoticeManagement from "./pages/NoticeManagement/NoticeManagement";
import Dashboard from "./pages/Dashboard/Dashboard";
import InstructorManagement from "./pages/InstructorManagement/InstructorManagment";
import CareerManagement from "./pages/CareerManagement/CareerManagement";
import PostNotice from "./pages/PostNotice/PostNotice";
import NoticePreview from "./pages/NoticePreview/NoticePreview";
import CareerList from "./pages/CareerManagement/CareerList";


import Internshipcreate from "./pages/Internship/Internshipcreate";
import Internshippreview from "./pages/Internshippreview/Internshippreview";
import AdminApplications from "./pages/AdminApplications/AdminApplications";
import Managestudent from "./pages/Managestudent/Managestudent";
import Manageinstructor from "./pages/Manageinstructor/Manageinstructor";
import Assigninstructor from "./pages/Assigninstructor/Assigninstructor";
import Createblog from "./pages/Blog/Createblog";
import Createcategory from "./pages/Blog/Createcategory";


export default function App() {
  return (
    <Router>
      {/* <ScrollToTop /> */}

      <Routes>
        {/* ================= MAIN LAYOUT ================= */}
        <Route path="/" element={<AppLayout />}>

          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* General */}
          <Route path="profile" element={<UserProfiles />} />
          <Route path="blank" element={<Blank />} />

          {/* Forms */}
          <Route path="form-elements" element={<FormElements />} />

          {/* Tables */}
          <Route path="basic-tables" element={<BasicTables />} />

          {/* Charts */}
          <Route path="line-chart" element={<LineChart />} />
          <Route path="bar-chart" element={<BarChart />} />

          <Route path="/instructor-management" element={<InstructorManagement />} />
          <Route path="/career-management" element={<CareerManagement />} />
          <Route path="/career-management-show" element={<CareerList />} />
         

          {/* ================= COURSE ================= */}
          
          <Route path="/create-blog" element={<Createblog />} />
          <Route path="/create-category" element={<Createcategory/>} />

          {/* Internship create */}
            <Route path="/internship/post" element={<Internshipcreate/>} />
            <Route path="/internship/preview" element={<Internshippreview/>} />
            <Route path="/assign-instructor" element={<Assigninstructor/>} />

          {/* Student  */}

           <Route path="/student-enroll" element={<AdminApplications/>} />
           <Route path="/student/manage" element={<Managestudent/>} />

          

          {/* ================= Video Management ================= */}
          <Route path="/gallery/videos" element={<VideoManagement/>}/>
           
           {/* ================= Photo Management ================= */}
          <Route path="/gallery/photos" element={<PhotoManagement/>}/>

          {/* ================= Online Media Management ================= */}
          <Route path="/gallery/online-media" element={<OnlineMediaManagement/>}/>

          {/* ================= News Management ================= */}
          <Route path="/gallery/news" element={<NewsManagement/>}/>

          {/* ================= CATEGORY ================= */}
          <Route path="category/create" element={<CreateNew />} />
          <Route path="category/preview" element={<CategoryPreview />} />

          {/* ================= INSTRUCTOR ================= */}
          <Route path="main-instructor" element={<TSKInstructorPage />} />
          <Route path="instructor/add" element={<ManageInstructors />} />
          <Route path="/instructor/manage" element={<Manageinstructor />} />

          {/* ================= EVENTS ================= */}
          <Route path="events/upload" element={<EventPicturePage />} />
          <Route path="learning-partners" element={<LearningPartner />} />

          {/* ================= TESTIMONIAL ================= */}
          <Route path="testimonial/add" element={<PostTestimonial />} />
          <Route path="testimonial/view" element={<TestimonialPreview />} />

          {/* ================= SUCCESS STORY ================= */}
          <Route path="success-story/create" element={<CreateStory />} />
          <Route path="success-story/review" element={<StoryPreview />} />
          <Route path="success-story/post" element={<StoryPost />} />
          <Route path="success-story/preview" element={<StoryPreeview />} />

          {/* ================= FEEDBACK ================= */}
          <Route path="feedback/add" element={<UserFeedback />} />
          <Route path="feedback/view" element={<FeedbackOverview />} />

          {/*====================Notice Management=======================*/}
          <Route path="/notice/Management" element={<NoticeManagement />} />

          <Route path="/admin/notices/post" element={<PostNotice />} />
          <Route path="/admin/notices/preview" element={<NoticePreview />} />

         


        </Route>

        {/* ================= AUTH (NO LAYOUT) ================= */}
        <Route path="/TailAdmin/signin" element={<SignIn />} />
        <Route path="/TailAdmin/signup" element={<SignUp />} />

        {/* ================= 404 ================= */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}