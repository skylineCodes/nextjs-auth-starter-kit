"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { FiMoreVertical } from "react-icons/fi";

const Account = () => {
  const router = useRouter();
  
  const handleLogout = async (logoutAll: boolean = false) => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(logoutAll),
      });

      if (res.status === 200) {
        // ⏩ Redirect user to login page
        router.push("/login");
      } else {
        console.error("Logout failed", await res.text());
        toast.error('Logout failed. Please try again.');
      }
    } catch (err) {
      console.log('err', err);
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="flex items-center sticky bottom-0 top-[calc(100vh_-_48px_-_16px)] h-12 border-t px-2 pt-4 border-stone-300 justify-between text-xs w-full">
      {/* DropdownMenu with full username/avatar as trigger */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center space-x-3 cursor-pointer">
              <Image
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC3bMUJdXSf3Vg7Arichsw-E54euJmvnZWCw&s"
                }
                alt={"Admin"}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="font-medium text-[#1F2937] text-[14px]">
                  {"Brian Snow"}
                </span>
                <span className="text-[12px] text-[#6B7280]">{"Admin"}</span>
              </div>
            </div>
            <button className="flex items-center gap-1 focus:outline-none cursor-pointer">
              <FiMoreVertical className="text-gray-600" size={18} />
            </button>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuSeparator />
          {/* Logout options */}
          <DropdownMenuItem className="cursor-pointer" onClick={() => handleLogout(false)}>
            Logout (this session)
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => handleLogout(true)}>
            Logout (all sessions)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Account;
