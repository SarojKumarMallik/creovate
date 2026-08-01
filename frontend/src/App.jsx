import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Player } from "@lottiefiles/react-lottie-player";

import loaderAnimation from "./assets/lottie/loader.json";
import Footer from "./components/Footer";
import Floatingcontact from "./components/Floatingcontact/Floatingcontact.jsx";

// Components
import Navbar from "./components/Navbar/Navbar";
import Contact from "./components/Contact";
import Home from "./components/Home";
import About from "./components/About";
import Service from "./components/Service";
import Blog from "./components/Blog";
import Career from "./components/Career";
import Singleblog from "./components/Blog/Singleblog.jsx";
import ContactCTA from "./components/Home/ContactCTA";
import Webdev from "./components/Webdev.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <Player
          autoplay
          loop
          src={loaderAnimation}
          style={{ height: "150px", width: "150px" }}
        />
      </div>
    );
  }

  return (
    <Router>
     
      

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/career" element={<Career />} />
        <Route path="/blog/:slug" element={<Singleblog />} />
        <Route path="/service/web-development" element={<Webdev/>} />
      </Routes>

      {/* <ContactCTA /> */}
      <Footer />
      <Floatingcontact />
    </Router>
  );
}

export default App;