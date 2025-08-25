import Image from "next/image";
import React from "react";
import Link from "next/link";
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
import { FiMoreVertical } from "react-icons/fi";

const Account = () => {
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
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                  <DropdownMenuItem>Message</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>More...</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="https://github.com">GitHub</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Account;
