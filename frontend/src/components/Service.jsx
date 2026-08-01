import React from "react";
import { Helmet } from "react-helmet-async";

import Breadcrumb from "./Breadcrumb";
import service from "../assets/service.webp";
import Servicetech from "./Service/Servicetech";
import Testimonial from "./Home/Testimonial";
import Furtherinformation from "./Service/Furtherinformation";
import Better from "./Service/Better";

const Service = () => {
  return (
    <>
      <Helmet>
        <title>
          Software Development Services | Creovate Technologies
        </title>

        <meta
          name="description"
          content="Explore our professional software development services including Web Development, Mobile App Development, MERN Stack Development, UI/UX Design, API Development, and Custom Software Solutions."
        />

        <meta
          name="keywords"
          content="Software Development Services, Web Development Services, Mobile App Development, MERN Stack Development, React JS Development, Node JS Development, UI UX Design, Custom Software Development"
        />

        <link
          rel="canonical"
          href="https://creovatetechnologies.in/service"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Software Development Services | Creovate Technologies"
        />

        <meta
          property="og:description"
          content="Professional Web Development, Mobile App Development, MERN Stack Solutions, and Custom Software Development Services."
        />

        <meta
          property="og:url"
          content="https://creovatetechnologies.in/service"
        />

        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta
          name="twitter:title"
          content="Software Development Services | Creovate Technologies"
        />

        <meta
          name="twitter:description"
          content="Professional software development services for startups, businesses, and enterprises."
        />

        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Software Development",
            provider: {
              "@type": "Organization",
              name: "Creovate Technologies",
              url: "https://creovatetechnologies.in",
            },
            description:
              "Web Development, Mobile App Development, MERN Stack Development, UI/UX Design, and Custom Software Solutions.",
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col overflow-hidden">
        <Breadcrumb
          title="Service"
          bgImage={service}
          paths={[
            { name: "Home", link: "/" },
            { name: "Service", link: "/service" },
          ]}
        />

        <Better />
        <Servicetech />
        <Furtherinformation />
        <Testimonial />
      </div>
    </>
  );
};

export default Service;