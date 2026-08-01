import React from "react";
import { Helmet } from "react-helmet-async";

import Breadcrumb from "./Breadcrumb";
import blogbread from "../assets/blog.webp";
import Allblog from "./Blog/Allblog";

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog | Creovate Technologies</title>

        <meta
          name="description"
          content="Explore the latest insights, tutorials, industry trends, web development guides, software development tips, and technology updates from Creovate Technologies."
        />

        <meta
          name="keywords"
          content="Technology Blog, Web Development Blog, Software Development Blog, React JS Blog, MERN Stack Blog, Mobile App Development Blog, Creovate Technologies"
        />

        <link
          rel="canonical"
          href="https://creovatetechnologies.in/blogs"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Blog | Creovate Technologies"
        />

        <meta
          property="og:description"
          content="Read expert articles, tutorials, and technology insights from Creovate Technologies."
        />

        <meta
          property="og:url"
          content="https://creovatetechnologies.in/blogs"
        />

        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta
          name="twitter:title"
          content="Blog | Creovate Technologies"
        />

        <meta
          name="twitter:description"
          content="Latest technology insights, web development guides, and software engineering articles."
        />

        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              name: "Creovate Technologies Blog",
              url: "https://creovatetechnologies.in/blogs",
              description:
                "Technology articles, software development tutorials, and industry insights from Creovate Technologies.",
              publisher: {
                "@type": "Organization",
                name: "Creovate Technologies",
                url: "https://creovatetechnologies.in",
              },
            }),
          }}
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col overflow-hidden">
        <Breadcrumb
          title="Blog"
          bgImage={blogbread}
          paths={[
            { name: "Home", link: "/" },
            { name: "Blog", link: "/blogs" },
          ]}
        />

        <Allblog />
      </div>
    </>
  );
};

export default Blog;