import React from "react";
import "./Floatingcontact.css";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";

const Floatingcontact = () => {
  // Creovate Technologies Contact Information
  const whatsappNumber = "919827373867";
  const callNumber = "+919827373867";
  const instagramUsername = "creovatetechnologies";
  const facebookUsername = "creovatetechnologies";
  const linkedinUsername = "creovate-technologies";
  const emailAddress = "creovatetechnologies@gmail.com";

  // WhatsApp Message
  const whatsappMessage =
    "Hello! I am interested in your services. Please guide me.";

  // Email Content
  const emailSubject = "Inquiry about Services";
  const emailBody =
    "Hello, I would like to get more information about your services.";

  const socialItems = [
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      className: "whatsapp",
      href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`,
      target: "_blank",
      rel: "noopener noreferrer",
    },
    
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      className: "linkedin",
      href: "https://www.linkedin.com/in/creovate-technologies-022201378",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      className: "instagram",
      href: `https://instagram.com/${instagramUsername}`,
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      name: "Facebook",
      icon: FaFacebookF,
      className: "facebook",
      href: "https://www.facebook.com/profile.php?id=61578990689435",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  ];

  return (
    <div className="floating-container">
      <div className="floating-stack">
        {socialItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            target={item.target}
            rel={item.rel}
            className={`floating-btn ${item.className}`}
            style={{ "--order": index }}
          >
            <span className="btn-text">{item.name}</span>
            <span className="btn-icon">
              <item.icon />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Floatingcontact;