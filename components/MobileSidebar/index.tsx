"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MdHelp, MdMenu, MdPayment } from "react-icons/md";
import { IoNotifications, IoSettingsSharp } from "react-icons/io5";
import {
  FaChartLine,
  FaLock,
  FaPuzzlePiece,
  FaSearchengin,
  FaUsers,
} from "react-icons/fa6";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import UIButterLogo from "../../assets/images/uiButterLogo.png";
import Account from "../Sidebar/Account";
import Search from "../Sidebar/Search";

// Reusable Route component
const Route = ({
  selected,
  Icon,
  title,
  href,
}: {
  selected: boolean;
  Icon: any;
  title: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className={`group flex items-center justify-start gap-2 w-full cursor-pointer rounded px-2 py-1.5 text-sm transition
        ${
          selected
            ? "bg-[#8F33CC] text-white"
            : "hover:bg-[#B799E0] hover:text-white"
        }`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-[14px] font-medium">{title}</span>
    </Link>
  );
};

const MobileSidebar = () => {
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
    {
      href: "/settings/notifications",
      title: "Notifications",
      Icon: IoNotifications,
    },
    { href: "/settings/security", title: "Security", Icon: FaLock },
    { href: "/settings/help", title: "Help", Icon: MdHelp },
  ];

  return (
    <Sheet>
      {/* Trigger (hamburger menu) */}
      <SheetTrigger
        asChild
        className="absolute left-[4px] top-[4px] z-[99] inline-flex items-center justify-center p-2 text-gray-700 hover:bg-gray-200 rounded-md md:hidden ml-2 w-auto h-auto"
      >
        <button>
          <MdMenu size={28} />
        </button>
      </SheetTrigger>

      {/* Sidebar Drawer */}
      <SheetContent
        side="left"
        className="w-64 p-0 mb-4 flex flex-col overflow-y-auto scrollbar-hide"
      >
        {/* Logo/Header */}
        <SheetHeader className="border-b border-stone-300 px-4 py-2 flex items-center">
          <Link href="/">
            <Image
              src={UIButterLogo}
              alt="uiButter"
              className="w-[120px] h-auto"
            />
          </Link>
        </SheetHeader>

        {/* Mobile Search (only visible on mobile) */}
        <div className="px-4 mt-3 md:hidden">
          <Search placeholder="Search components..." />
        </div>

        {/* Navigation - scrollable & hidden scrollbar */}
        <div className="px-4 space-y-10 mt-4 pb-8 flex-1 overflow-y-auto scrollbar-hide">
          {/* Main Section */}
          <div>
            <h3 className="text-[12px] font-semibold text-[#6B7280] capitalize mb-2 px-2">
              Main
            </h3>
            <div className="space-y-1">
              {routes.map((route, i) => (
                <Route
                  key={i}
                  href={route.href}
                  title={route.title}
                  Icon={route.Icon}
                  selected={pathname === route.href}
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
                  selected={pathname === route.href}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Account sticky at bottom */}
        <div className="sticky bottom-0 mb-12 border-t border-stone-300 bg-white">
          <Account />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
