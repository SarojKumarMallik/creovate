import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Lucide Icons
import {
  FolderPlusIcon,
  TrophyIcon,
  MessageSquareIcon,
} from "lucide-react";

// React Icons (Heroicons)
import {
  HiOutlineViewGrid as GridIcon,
  HiOutlineUserCircle as UserCircleIcon,
  HiOutlineBookOpen as BookOpenIcon,
  HiOutlineUsers as UsersIcon,
  HiOutlineClipboardList as ClipboardListIcon,
  HiOutlineCreditCard as CreditCardIcon,
  HiOutlineChat as ChatIcon,
  HiOutlineChartBar as ChartBarIcon,
  HiOutlineBell as BellIcon,
  HiOutlinePhotograph as PhotographIcon,
  HiOutlineCog as CogIcon,
  HiOutlineDotsHorizontal as HorizontaLDots,
  HiChevronDown as ChevronDownIcon,
  HiOutlineBriefcase as BriefcaseIcon,
  HiOutlineDocumentText as BlogIcon,
  HiOutlineCollection as CategoryIcon,
} from "react-icons/hi";

import { useSidebar } from "../context/SidebarContext";
import companylogo from "../Asserts/creovate_new.png";

// Types
interface SubItem {
  name: string;
  path: string;
}

interface NavItem {
  icon: JSX.Element;
  name: string;
  path?: string;
  subItems?: SubItem[];
}

interface OpenSubmenuState {
  index: number;
}

const navItems: NavItem[] = [
  { icon: <GridIcon />, name: "Dashboard", path: "/" },
  { icon: <BlogIcon />, name: "Blog Management", path: "/create-blog" },
  { icon: <CategoryIcon />, name: "Category Management", path: "/create-category" },

  
  // {
  //   icon: <BookOpenIcon />,
  //   name: "Blog Management",
  //   subItems: [
  //     { name: "Blog Posting", path: "/create-blog" },
  //     { name: "Create Category", path: "/create-category" },
  //   ],
  // },

  

  
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<OpenSubmenuState | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<number, number>>({});
  const subMenuRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const sidebarRef = useRef<HTMLDivElement>(null);

  const isActive = useCallback(
    (path: string): boolean => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let matched = false;
    navItems.forEach((nav, index) => {
      nav.subItems?.forEach((sub) => {
        if (isActive(sub.path)) {
          setOpenSubmenu({ index });
          matched = true;
        }
      });
    });
    if (!matched) setOpenSubmenu(null);
  }, [location.pathname, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = openSubmenu.index;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number): void => {
    setOpenSubmenu((prev) => (prev?.index === index ? null : { index }));
  };

  return (
    <aside
      ref={sidebarRef}
      className={`fixed top-16 lg:top-0 left-0 px-5 
      h-[calc(100vh-64px)] lg:h-screen 
      overflow-hidden z-50 
      bg-[#1e293b]
      border-r border-[#334155]
      text-[#cbd5e1]
      transition-all duration-300
      ${isExpanded || isMobileOpen || isHovered ? "w-[320px]" : "w-[95px]"}
      ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
    >
      <div
        className={`py-5 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          <div className="bg-white rounded-lg p-2 shadow-sm">
            <img
              src={companylogo}
              alt="Company Logo"
              width={isExpanded || isHovered || isMobileOpen ? 150 : 32}
              height={isExpanded || isHovered || isMobileOpen ? 40 : 32}
              className="object-contain"
            />
          </div>
        </Link>
      </div>

      {/* MENU CONTAINER WITH SCROLL - HIDDEN SCROLLBAR */}
      <div 
        className="flex flex-col h-[calc(100%-80px)] overflow-y-auto overflow-x-hidden pr-2 duration-300
        scrollbar-hide
        [-ms-overflow-style:none]
        [scrollbar-width:none]"
      >
        <nav className="pb-6">
          <h2
            className={`mb-4 text-xs uppercase text-[#64748b] flex leading-[20px] sticky top-0 bg-[#1e293b] z-10 py-2
            ${!isExpanded && !isHovered ? "lg:justify-center" : ""}`}
          >
            {isExpanded || isHovered || isMobileOpen ? (
              "Main Menu"
            ) : (
              <HorizontaLDots className="size-6 text-[#94a3b8]" />
            )}
          </h2>

          <ul className="flex flex-col gap-4">
            {navItems.map((nav, index) => (
              <li key={nav.name + index}>
                {nav.subItems ? (
                  <button
                    onClick={() => handleSubmenuToggle(index)}
                    className={`menu-item group cursor-pointer w-full text-left ${
                      openSubmenu?.index === index
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    } ${!isExpanded && !isHovered ? "lg:justify-center" : ""}`}
                  >
                    <span className="menu-item-icon-size">{nav.icon}</span>

                    {(isExpanded || isHovered || isMobileOpen) && (
                      <>
                        <span className="menu-item-text whitespace-nowrap overflow-hidden text-ellipsis">
                          {nav.name}
                        </span>
                        <ChevronDownIcon
                          className={`ml-auto w-5 h-5 transition-all flex-shrink-0 ${
                            openSubmenu?.index === index ? "rotate-180" : ""
                          }`}
                        />
                      </>
                    )}
                  </button>
                ) : (
                  nav.path && (
                    <Link
                      to={nav.path}
                      className={`menu-item group ${
                        isActive(nav.path)
                          ? "menu-item-active"
                          : "menu-item-inactive"
                      }`}
                    >
                      <span className="menu-item-icon-size">{nav.icon}</span>
                      {(isExpanded || isHovered || isMobileOpen) && (
                        <span className="menu-item-text whitespace-nowrap overflow-hidden text-ellipsis">
                          {nav.name}
                        </span>
                      )}
                    </Link>
                  )
                )}

                {nav.subItems &&
                  (isExpanded || isHovered || isMobileOpen) && (
                    <div
                      ref={(el) => {
                        subMenuRefs.current[index] = el;
                      }}
                      className="overflow-hidden transition-all duration-300"
                      style={{
                        height:
                          openSubmenu?.index === index
                            ? `${subMenuHeight[index] || 'auto'}px`
                            : "0px",
                      }}
                    >
                      <ul className="mt-2 space-y-1 ml-9">
                        {nav.subItems.map((sub) => (
                          <li key={sub.path}>
                            <Link
                              to={sub.path}
                              className={`menu-dropdown-item ${
                                isActive(sub.path)
                                  ? "menu-dropdown-item-active"
                                  : "menu-dropdown-item-inactive"
                              }`}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Custom Styles - Hidden Scrollbar */}
      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 10px;
          transition: all 0.2s ease;
          width: 100%;
          text-decoration: none;
          color: #cbd5e1;
          font-size: 14px;
          font-weight: 500;
        }

        .menu-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
        }

        .menu-item-active {
          background: rgba(59, 130, 246, 0.15);
          color: #60a5fa;
        }

        .menu-item-inactive {
          color: #94a3b8;
        }

        .menu-item-icon-size {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          flex-shrink: 0;
        }

        .menu-item-text {
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .menu-dropdown-item {
          display: block;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 13px;
          color: #94a3b8;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .menu-dropdown-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #e2e8f0;
        }

        .menu-dropdown-item-active {
          color: #60a5fa;
          background: rgba(59, 130, 246, 0.1);
        }

        .menu-dropdown-item-inactive {
          color: #94a3b8;
        }
      `}</style>
    </aside>
  );
};

export default AppSidebar;