import { Helmet } from "react-helmet-async";
import Hero from "./Home/Hero";
import WhyChooseUs from "./Home/WhyChooseUs";
import ServicesSection from "./Home/ServicesSection";
import TechStack from "./Home/TechStack";
import StatsCounter from "./Home/StatsCounter";
import Testimonial from "./Home/Testimonial";
import Fqasection from "./Home/Fqasection";

export default function Home() {
  return (
    <>
     <Helmet>
  {/* Primary SEO */}
  <title>
    Website Development, AI Chatbot & Digital Marketing Company in Bhubaneswar | Creovate Technologies
  </title>

  <meta
    name="description"
    content="Creovate Technologies is a leading Website Development Company in Bhubaneswar providing Web Development, Mobile App Development, AI Chatbot Integration, Business Automation, SEO Services, Digital Marketing, Branding, and Custom Software Development solutions."
  />

  <meta
    name="keywords"
    content="Website Development Company Bhubaneswar, Web Development Company Odisha, AI Chatbot Development, Business Automation, Mobile App Development, SEO Services Bhubaneswar, Digital Marketing Company Odisha, MERN Stack Development, Custom Software Development, Web Design Company Bhubaneswar, Branding Agency Odisha, Creovate Technologies"
  />

  <meta
    name="author"
    content="Creovate Technologies"
  />

  <meta
    name="robots"
    content="index, follow"
  />

  <link
    rel="canonical"
    href="https://creovatetechnologies.in/"
  />

  {/* Open Graph */}
  <meta
    property="og:type"
    content="website"
  />

  <meta
    property="og:site_name"
    content="Creovate Technologies"
  />

  <meta
    property="og:title"
    content="Website Development, AI Chatbot & Digital Marketing Company in Bhubaneswar | Creovate Technologies"
  />

  <meta
    property="og:description"
    content="Grow your business with custom websites, mobile apps, AI chatbot integration, SEO services, digital marketing, branding, and business automation solutions from Creovate Technologies."
  />

  <meta
    property="og:url"
    content="https://creovatetechnologies.in/"
  />

  <meta
    property="og:image"
    content="https://creovatetechnologies.in/assets/images/creovate_new.png"
  />

  <meta
    property="og:image:alt"
    content="Creovate Technologies"
  />

  <meta
    property="og:locale"
    content="en_IN"
  />

  {/* Twitter */}
  <meta
    name="twitter:card"
    content="summary_large_image"
  />

  <meta
    name="twitter:title"
    content="Website Development, AI Chatbot & Digital Marketing Company in Bhubaneswar | Creovate Technologies"
  />

  <meta
    name="twitter:description"
    content="Website Development, Mobile App Development, AI Chatbot Integration, SEO Services, Digital Marketing, Branding, and Custom Software Solutions."
  />

  <meta
    name="twitter:image"
    content="https://creovatetechnologies.in/assets/images/creovate_new.png"
  />

  {/* Website Schema */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Creovate Technologies",
      alternateName: "Creovate",
      url: "https://creovatetechnologies.in/"
    })}
  </script>

  {/* Organization Schema */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Creovate Technologies",
      url: "https://creovatetechnologies.in/",
      logo: "https://creovatetechnologies.in/assets/images/creovate_new.png",
      description:
        "Creovate Technologies is a leading Website Development and Digital Marketing Company in Bhubaneswar offering Web Development, Mobile App Development, AI Chatbot Integration, Business Automation, SEO Services, Branding, and Custom Software Development.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bhubaneswar",
        addressRegion: "Odisha",
        postalCode: "751001",
        addressCountry: "IN"
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-9827373867",
        contactType: "Customer Support",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Odia"]
      },
      sameAs: [
        "https://www.facebook.com/",
        "https://www.instagram.com/",
        "https://www.linkedin.com/"
      ]
    })}
  </script>
</Helmet>

      <div>
        <Hero />
        <WhyChooseUs />
        
        <ServicesSection />
        <Testimonial />
        <StatsCounter />
        <TechStack />
        <Fqasection/>
      </div>
    </>
  );
}