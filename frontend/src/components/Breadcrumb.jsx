import { ChevronRight } from "lucide-react";

export default function Breadcrumb({
  paths,
  title = "",
  bgImage = "/assets/images/contact.webp",
}) {
  return (
    <nav className="relative w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 h-[250px] sm:h-[300px] md:h-[350px]"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.6) contrast(1.1)",
          transform: "scale(1.05)",
        }}
      />

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
  <svg
    className="block w-full h-32 md:h-40 lg:h-48"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    viewBox="0 0 1440 320"
    style={{ display: "block" }}
  >
    <path
      fill="#f9fafb"
      d="M0,224 C480,400 960,80 1440,256 L1440,320 L0,320 Z"
    />
  </svg>
</div>

      {/* Content */}
      <div className="relative z-10 h-[250px] sm:h-[300px] md:h-[350px] flex flex-col justify-center items-center px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 drop-shadow-lg mb-6 animate-gradient">
          {title}
        </h1>

        {paths?.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
            <ol className="flex flex-wrap justify-center items-center text-white text-sm md:text-base gap-2">
              {paths.map((path, idx) => (
                <li key={idx} className="flex items-center">
                  <a
                    href={path.link}
                    className="hover:text-yellow-300 transition-all duration-300"
                  >
                    {path.name}
                  </a>

                  {idx < paths.length - 1 && (
                    <ChevronRight className="mx-2 w-4 h-4 opacity-70" />
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </nav>
  );
}