import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function TopBar() {
  const socialLinks = [
    { icon: <FaFacebookF />, link: "#" },
    { icon: <FaXTwitter />, link: "#" },
    { icon: <FaYoutube />, link: "#" },
    { icon: <FaLinkedinIn />, link: "#" },
    { icon: <FaInstagram />, link: "#" },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-orange-900 via-orange-700 to-orange-500 text-white">
      {/* Animated Background Effects */}
      <div className="absolute -top-16 -left-16 w-56 h-56 bg-orange-400/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-orange-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-600/10 rounded-full blur-2xl"></div>

      {/* Bottom Premium Border */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-300/60 to-transparent"></div>

      <div className="max-w-[1300px] mx-auto px-4 md:px-6 lg:px-8 py-1.5">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2">
          
          

          {/* Contact Section - Compact */}
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 lg:gap-4 text-xs">
            <a
              href="tel:9827373867"
              className="group flex items-center gap-1.5 transition-all duration-300"
            >
              <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-orange-500 group-hover:scale-110 group-hover:shadow-lg">
                <FaPhoneAlt size={11} className="transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span className="text-white/90 group-hover:text-orange-300 transition-colors duration-300 font-medium text-[11px] md:text-xs">
                +91 9827373867
              </span>
            </a>

            <a
              href="mailto:creovatetechnologies@gmail.com"
              className="group flex items-center gap-1.5 transition-all duration-300"
            >
              <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-orange-500 group-hover:scale-110 group-hover:shadow-lg">
                <FaEnvelope size={11} className="transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span className="text-white/90 group-hover:text-orange-300 transition-colors duration-300 font-medium text-[11px] md:text-xs">
                creovatetechnologies@gmail.com
              </span>
            </a>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Nexus+Esplanade,+Bhubaneswar"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 transition-all duration-300"
            >
              <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-orange-500 group-hover:scale-110 group-hover:shadow-lg">
                <FaMapMarkerAlt size={11} className="transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span className="text-white/90 group-hover:text-orange-300 transition-colors duration-300 font-medium text-[11px] md:text-xs whitespace-nowrap">
                Nexus Esplanade, Bhubaneswar
              </span>
            </a>
          </div>

          {/* Social Icons - Compact */}
          <div className="flex items-center gap-1.5">
            {socialLinks.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-7 h-7
                  rounded-lg
                  bg-white/10
                  backdrop-blur-xl
                  border border-white/20
                  flex items-center justify-center
                  text-white
                  transition-all duration-300
                  hover:bg-orange-500
                  hover:border-orange-400
                  hover:-translate-y-0.5
                  hover:scale-110
                  hover:shadow-[0_5px_15px_rgba(249,115,22,0.4)]
                  group
                "
              >
                <span className="transition-transform duration-300 group-hover:scale-110 text-xs">
                  {item.icon}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}