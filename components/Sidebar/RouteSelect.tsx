"use client";

import React from "react";
import Link from "next/link";
import { MdPayment } from "react-icons/md";
import { usePathname } from "next/navigation";
import { IoNotifications, IoSettingsSharp } from "react-icons/io5";
import { FaChartLine, FaLock, FaPuzzlePiece, FaSearchengin, FaUsers } from "react-icons/fa6";


export const RouteSelect = () => {
  const pathname = usePathname();

  const routes = [
    { href: "/dashboard", title: "Dashboard", Icon: FaChartLine },
    { href: "/components", title: "Components", Icon: FaPuzzlePiece },
    { href: "/search-insights", title: "Search Insights", Icon: FaSearchengin },
    { href: "/users", title: "Users", Icon: FaUsers },
    { href: "/payments", title: "Payments", Icon: MdPayment },
  ];

  const settings = [
    { href: "/settings/general", title: "General", Icon: IoSettingsSharp },
    { href: "/settings/notifications", title: "Notifications", Icon: IoNotifications },
    { href: "/settings/security", title: "Security", Icon: FaLock },
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
              // selected={pathname === route.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Route = ({
  // selected,
  Icon,
  title,
  href,
}: {
  // selected: boolean;
  Icon: any;
  title: string;
  href: string;
}) => {
  const pathname = usePathname();
  const selected = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`group flex items-center justify-start gap-2 w-full cursor-pointer rounded px-2 py-1.5 text-sm transition
        ${selected 
          ? "bg-[#8F33CC] text-white" 
          : "hover:bg-[#B799E0] hover:text-white"
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
  );
};



