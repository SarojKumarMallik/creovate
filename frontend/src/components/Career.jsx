import React from "react";
import { Helmet } from "react-helmet-async";

import Breadcrumb from "./Breadcrumb";
import career from "../assets/career.webp";
import Joinourteam from "./Career/Joinourteam";
import Opennings from "./Career/Opennings";
import Howwehire from "./Career/Howwehire";

const Career = () => {
  return (
    <>
      <Helmet>
        <title>Careers | Creovate Technologies</title>

        <meta
          name="description"
          content="Explore exciting career opportunities at Creovate Technologies. Join our team of developers, designers, and innovators building cutting-edge digital solutions."
        />

        <meta
          name="keywords"
          content="Careers at Creovate Technologies, Software Developer Jobs, React Developer Jobs, MERN Stack Developer Jobs, IT Jobs Bhubaneswar, Web Developer Careers"
        />

        <link
          rel="canonical"
          href="https://creovatetechnologies.in/career"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Careers | Creovate Technologies"
        />

        <meta
          property="og:description"
          content="Join Creovate Technologies and build your career with innovative software development projects."
        />

        <meta
          property="og:url"
          content="https://creovatetechnologies.in/career"
        />

        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta
          name="twitter:title"
          content="Careers | Creovate Technologies"
        />

        <meta
          name="twitter:description"
          content="Discover career opportunities and become part of our growing technology team."
        />

        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Careers",
              url: "https://creovatetechnologies.in/career",
              description:
                "Career opportunities at Creovate Technologies.",
            }),
          }}
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col overflow-hidden">
        <Breadcrumb
          title="Career"
          bgImage={career}
          paths={[
            { name: "Home", link: "/" },
            { name: "Career", link: "/career" },
          ]}
        />

        <Joinourteam />
        <Opennings />
        <Howwehire />
      </div>
    </>
  );
};

export default Career;