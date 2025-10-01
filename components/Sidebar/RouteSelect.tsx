"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { MdPayment } from "react-icons/md";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { IoNotifications, IoSettingsSharp } from "react-icons/io5";
import { FaChartLine, FaLock, FaPuzzlePiece, FaSearchengin, FaUsers } from "react-icons/fa6";


export const RouteSelect = () => {
  const pathname = usePathname();

  const routes = [
    { href: "/dashboard", title: "Dashboard", Icon: FaChartLine },
    // { href: "/components", title: "Components", Icon: FaPuzzlePiece },
    // { href: "/search-insights", title: "Search Insights", Icon: FaSearchengin },
    // { href: "/users", title: "Users", Icon: FaUsers },
    // { href: "/payments", title: "Payments", Icon: MdPayment },
  ];

  const settings = [
    // { href: "/settings/general", title: "General", Icon: IoSettingsSharp },
    // { href: "/settings/notifications", title: "Notifications", Icon: IoNotifications },
    { 
      href: "/settings/security", 
      title: "Security", 
      Icon: FaLock,
      children: [
        { href: "/settings/security/devices", title: "Manage Devices" },
        { href: "/settings/security/recent-logins", title: "Login History" },
        { href: "/settings/security/change-password", title: "Change password" },
      ],
    },
  ];

  return (
    <div className="px-4 space-y-10">
      {/* Main Section */}
      <div>
        <h3 className="text-[12px] font-semibold text-[#6B7280] capitalize mb-2 mt-4 px-2">
          Main
        </h3>
        <div className="space-y-1">
          {routes.map((route, i) => (
            <Route
              key={i}
              href={route.href}
              title={route.title}
              Icon={route.Icon}
              // selected={pathname === route.href}
            />
          ))}
        </div>
      </div>

      {/* Settings Section */}
      <div>
        <h3 className="text-[12px] font-semibold text-[#6B7280] capitalize mb-2 px-2">
          Settings
        </h3>
        <div className="space-y-1">
          {settings.map((route, i) => (
            <Route
              key={i}
              href={route.href}
              title={route.title}
              Icon={route.Icon}
              children={route.children}
              // selected={pathname === route.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Route = ({
  Icon,
  title,
  href,
  children,
}: {
  Icon?: any;
  title: string;
  href: string;
  children?: { href: string; title: string }[];
}) => {
  const pathname = usePathname();
  const selected = pathname.startsWith(href);
  const [open, setOpen] = useState(false);

  const hasChildren = children && children.length > 0;

  return (
    <div>
      {hasChildren ? (
        <button
          onClick={() => hasChildren && setOpen((prev) => !prev)}
          className={`group flex items-center justify-between w-full cursor-pointer rounded px-2 py-1.5 text-sm transition
            ${selected 
              ? "bg-[#000000] text-white" 
              : "hover:bg-[#00000080] hover:text-white"
            }`}
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4" />}
            <span className="text-[14px] font-medium">{title}</span>
          </div>

          {hasChildren && (
            <ChevronRight
              className={`h-4 w-4 transition-transform duration-200 ${
                open ? "rotate-90" : ""
              }`}
            />
          )}
        </button>
      ) : (
        <Link
          href={href}
          className={`group flex items-center justify-start gap-2 w-full cursor-pointer rounded px-2 py-1.5 text-sm transition
            ${selected 
              ? "bg-[#000000] text-white" 
              : "hover:bg-[#00000080] hover:text-white"
            }`}
        >
          <Icon className="w-5 h-5">
            <path
              className={`transition-colors ${selected ? "!fill-white" : "group-hover:!fill-white"}`}
              fill="#fff"
            />
          </Icon>
          <span className="text-[14px] font-medium">{title}</span>
        </Link>
      )}

      {/* Nested links */}
      {hasChildren && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"
          } ml-6 space-y-1`}
        >
          {children.map((child, i) => {
            const isChildSelected = pathname === child.href;
            return (
              <Link
                key={i}
                href={child.href}
                className={`block rounded px-2 py-1.5 text-sm transition
                  ${isChildSelected 
                    ? "text-[#8F33CC]"
                    : "hover:text-[#8F33CC]"
                  }`}
              >
                {child.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Route;

// "use client";

// import React from "react";
// import Link from "next/link";
// import { MdPayment } from "react-icons/md";
// import { usePathname } from "next/navigation";
// import { IoNotifications, IoSettingsSharp } from "react-icons/io5";
// import { FaChartLine, FaLock, FaPuzzlePiece, FaSearchengin, FaUsers } from "react-icons/fa6";


// export const RouteSelect = () => {
//   const pathname = usePathname();

//   const routes = [
//     { href: "/dashboard", title: "Dashboard", Icon: FaChartLine },
//     { href: "/components", title: "Components", Icon: FaPuzzlePiece },
//     { href: "/search-insights", title: "Search Insights", Icon: FaSearchengin },
//     { href: "/users", title: "Users", Icon: FaUsers },
//     { href: "/payments", title: "Payments", Icon: MdPayment },
//   ];

//   const settings = [
//     { href: "/settings/general", title: "General", Icon: IoSettingsSharp },
//     { href: "/settings/notifications", title: "Notifications", Icon: IoNotifications },
//     { href: "/settings/security", title: "Security", Icon: FaLock },
//   ];

//   return (
//     <div className="px-4 space-y-10">
//       {/* Main Section */}
//       <div>
//         <h3 className="text-[12px] font-semibold text-[#6B7280] capitalize mb-2 mt-4 px-2">
//           Main
//         </h3>
//         <div className="space-y-1">
//           {routes.map((route, i) => (
//             <Route
//               key={i}
//               href={route.href}
//               title={route.title}
//               Icon={route.Icon}
//               // selected={pathname === route.href}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Settings Section */}
//       <div>
//         <h3 className="text-[12px] font-semibold text-[#6B7280] capitalize mb-2 px-2">
//           Settings
//         </h3>
//         <div className="space-y-1">
//           {settings.map((route, i) => (
//             <Route
//               key={i}
//               href={route.href}
//               title={route.title}
//               Icon={route.Icon}
//               // selected={pathname === route.href}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const Route = ({
//   // selected,
//   Icon,
//   title,
//   href,
// }: {
//   // selected: boolean;
//   Icon: any;
//   title: string;
//   href: string;
// }) => {
//   const pathname = usePathname();
//   const selected = pathname.startsWith(href);

//   return (
//     <Link
//       href={href}
//       className={`group flex items-center justify-start gap-2 w-full cursor-pointer rounded px-2 py-1.5 text-sm transition
//         ${selected 
//           ? "bg-[#8F33CC] text-white" 
//           : "hover:bg-[#B799E0] hover:text-white"
//         }`}
//     >
//       <Icon className="w-5 h-5">
//         <path
//           className={`transition-colors ${selected ? "!fill-white" : "group-hover:!fill-white"}`}
//           fill="#fff"
//         />
//       </Icon>
//       <span className="text-[14px] font-medium">{title}</span>
//     </Link>
//   );
// };







