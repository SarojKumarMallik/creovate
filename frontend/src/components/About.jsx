import React from 'react'
import Abouthero from './About/Abouthero'
import Breadcrumb from "./Breadcrumb"; // ✅ Import Breadcrumb
import Aboutprinciples from './About/Aboutprinciples';
import Aboutprogress from './About/Aboutprogress';
import Footer from "./Footer";
import Aboutcorevalues from './About/Aboutcorevalues';
import ContactCTA from "./Home/ContactCTA";
import aboutbred from "../assets/about-us.webp";
import { Helmet } from "react-helmet-async";
import Fqasection from './Home/Fqasection';


const About = () => {
  return (
    <>
    <Helmet>
  <title>
    About Creovate Technologies | Website Development & Digital Solutions Company in Bhubaneswar
  </title>

  <meta
    name="description"
    content="Learn about Creovate Technologies, a leading website development and digital solutions company in Bhubaneswar. We specialize in web development, mobile app development, AI chatbot integration, business automation, SEO services, digital marketing, and custom software development."
  />

  <meta
    name="keywords"
    content="About Creovate Technologies, Website Development Company Bhubaneswar, Software Development Company Odisha, AI Chatbot Development, Business Automation Services, Mobile App Development Company, SEO Services Bhubaneswar, Digital Marketing Company Odisha, Custom Software Development"
  />

  <meta name="author" content="Creovate Technologies" />

  <link
    rel="canonical"
    href="https://creovatetechnologies.in/about"
  />

  {/* Open Graph */}
  <meta
    property="og:title"
    content="About Creovate Technologies | Website Development & Digital Solutions Company"
  />

  <meta
    property="og:description"
    content="Discover the story, mission, vision, and values behind Creovate Technologies. We help businesses grow through web development, mobile apps, AI chatbot integration, SEO, digital marketing, and custom software solutions."
  />

  <meta
    property="og:url"
    content="https://creovatetechnologies.in/about"
  />

  <meta property="og:type" content="website" />

  <meta
    property="og:image"
    content="https://creovatetechnologies.in/assets/images/creovate_new.png"
  />

  {/* Twitter */}
  <meta
    name="twitter:card"
    content="summary_large_image"
  />

  <meta
    name="twitter:title"
    content="About Creovate Technologies"
  />

  <meta
    name="twitter:description"
    content="Learn about our journey, mission, vision, and expertise in website development, AI chatbot solutions, mobile apps, SEO, and digital marketing."
  />

  {/* Schema */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Creovate Technologies",
      url: "https://creovatetechnologies.in/about",
      description:
        "Creovate Technologies is a leading website development and digital solutions company in Bhubaneswar specializing in web development, mobile app development, AI chatbot integration, business automation, SEO services, digital marketing, and custom software development.",
      mainEntity: {
        "@type": "Organization",
        name: "Creovate Technologies",
        url: "https://creovatetechnologies.in",
        logo: "https://creovatetechnologies.in/assets/images/creovate_new.png",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bhubaneswar",
          addressRegion: "Odisha",
          addressCountry: "IN"
        }
      }
    })}
  </script>
</Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col overflow-hidden">
        {/* Breadcrumb */}
              <Breadcrumb
  title="About Us"
  bgImage={aboutbred}
  paths={[
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
  ]}
/>

              <Abouthero/>
              <Aboutprogress/>
              {/* <Aboutprinciples/> */}
              <Aboutcorevalues/>

              <Fqasection/>
               
              
      </div>
    
    </>
    
  )
}

export default About