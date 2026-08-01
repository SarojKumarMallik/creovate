import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useSidebar } from "../context/SidebarContext";

import NotificationDropdown from "../components/header/NotificationDropdown";
import UserDropdown from "../components/header/UserDropdown";
import Logo from "../Asserts/IIIT LOGO (2).png";

const AppHeader: React.FC = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    if (window.innerWidth >= 991) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1e293b]  text-white shadow-lg">
      <div className="flex items-center justify-between px-4 lg:px-8 py-3">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-4">

          {/* Sidebar Toggle */}
          <button
            onClick={handleToggle}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/20 transition"
          >
            {isMobileOpen ? (
              <span className="text-xl">✕</span>
            ) : (
              <span className="text-xl">☰</span>
            )}
          </button>

          {/* Logo (mobile only) */}
          <Link to="/" className="lg:hidden">
            <img src={Logo} alt="Logo" className="h-8 w-auto" />
          </Link>

          {/* SEARCH BAR (Desktop) */}
          <div className="hidden lg:block">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70">
                🔍
              </span>

              <input
                ref={inputRef}
                type="text"
                placeholder="Search for results..."
                className="h-11 w-[420px] rounded-full bg-white/20 backdrop-blur-md border border-white/30 py-2 pl-12 pr-14 text-sm text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/40"
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 rounded-md bg-white/20 px-2 py-1 text-xs border border-white/30">
                ⌘ K
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div
          className={`${
            isApplicationMenuOpen ? "flex" : "hidden"
          } items-center gap-5 lg:flex`}
        >
        
          <NotificationDropdown />
          <UserDropdown />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleApplicationMenu}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/20 transition"
        >
          ⋮
        </button>
      </div>
    </header>
  );
};

export default AppHeader;