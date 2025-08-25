"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { CustomPagination } from "../TablePagination";

const statusColors: Record<string, string> = {
  Active: "#DCFCE7", // green
  Inactive: "#FECACA", // red
  Pending: "#FEF9C3", // yellow
};

const planColors: Record<string, string> = {
  Pro: "#F3E8FF",
  Free: "#F3F4F6",
  Platinum: "#DBEAFE", // light blue
  Enterprise: "#FEF3C7", // light amber
};

const UsersDataTable = () => {
  const data = [
    { name: "Diana Prince", email: "diana@example.com", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC3bMUJdXSf3Vg7Arichsw-E54euJmvnZWCw&s", plan: "Platinum", status: "Active", lastActivity: "Aug 16, 2025", copies: 98 },
    { name: "Ethan Hunt", email: "ethan@example.com", avatar: "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/08/tom-cruise-as-ethan-hunt-in-mission-impossible-dead-reckoning.png", plan: "Pro", status: "Inactive", lastActivity: "Aug 15, 2025", copies: 64 },
    { name: "Fiona Gallagher", email: "fiona@example.com", avatar: "https://static.tvmaze.com/uploads/images/medium_portrait/133/332780.jpg", plan: "Free", status: "Active", lastActivity: "Aug 14, 2025", copies: 320 },
    { name: "George Clooney", email: "george@example.com", avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/George_Clooney_2016.jpg/250px-George_Clooney_2016.jpg", plan: "Enterprise", status: "Pending", lastActivity: "Aug 13, 2025", copies: 452 },
    { name: "Hannah Montana", email: "hannah@example.com", avatar: "https://media.gettyimages.com/id/468982943/photo/hannah-montana-its-my-party-and-ill-lie-if-i-want-to-after-lilly-in-disguise-as-hannahs-friend.jpg?s=612x612&w=gi&k=20&c=JGZwTACvqKLGbqBc4MFnKLns23A75UBxwqy5J-wCaAo=", plan: "Platinum", status: "Inactive", lastActivity: "Aug 12, 2025", copies: 72 },
    { name: "Ian Somerhalder", email: "ian@example.com", avatar: "https://media.themoviedb.org/t/p/w500/x0pfPTV0ryFmhz4fju3Depx4NLp.jpg", plan: "Pro", status: "Active", lastActivity: "Aug 11, 2025", copies: 187 },
    { name: "Julia Roberts", email: "julia@example.com", avatar: "https://m.media-amazon.com/images/M/MV5BMTQzNjU3MDczN15BMl5BanBnXkFtZTYwNzY2Njc4._V1_.jpg", plan: "Free", status: "Active", lastActivity: "Aug 10, 2025", copies: 540 },
    { name: "Alice Johnson", email: "alice@example.com", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRykC860OqCcZnilczCGFzG41zHEpOuxP1fYA&s", plan: "Pro", status: "Active", lastActivity: "Aug 20, 2025", copies: 234 },
    { name: "Bob Smith", email: "bob@example.com", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQijAiHaVg49FFnAigoGjwrHhJp3W3mb8zKrA&s", plan: "Free", status: "Inactive", lastActivity: "Aug 18, 2025", copies: 45 },
    { name: "Charlie Brown", email: "charlie@example.com", avatar: "https://poets.org/sites/default/files/images/biographies/CharlieSmith_NewBioImage.jpg", plan: "Enterprise", status: "Pending", lastActivity: "Aug 17, 2025", copies: 512 },
  ];

  // 🔹 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // 🔹 Row selection
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<boolean[]>(new Array(data.length).fill(false));

  const handleSelectAll = (checked: boolean) => {
    setSelectedAll(checked);
    setSelectedRows(new Array(data.length).fill(checked));
  };

  const handleRowSelect = (index: number, checked: boolean) => {
    const updated = [...selectedRows];
    updated[index] = checked;
    setSelectedRows(updated);
    setSelectedAll(updated.every(Boolean));
  };

  return (
    <Card className="bg-white shadow-none rounded w-full py-0">
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-[#F9FAFB]">
            <TableRow>
              <TableHead className="w-[56px]">
                <Checkbox
                  checked={selectedAll}
                  onCheckedChange={(val: any) => handleSelectAll(!!val)}
                />
              </TableHead>
              <TableHead className="text-[#6B7280] text-[12px]">User</TableHead>
              <TableHead className="text-[#6B7280] text-[12px]">Plan</TableHead>
              <TableHead className="text-[#6B7280] text-[12px]">Status</TableHead>
              <TableHead className="text-[#6B7280] text-[12px]">Last Activity</TableHead>
              <TableHead className="text-[#6B7280] text-[12px]">Copies</TableHead>
              <TableHead className="text-[#6B7280] text-[12px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((row, i) => (
              <TableRow key={i} className="h-[60px]">
                <TableCell className="w-12">
                  <Checkbox
                    checked={selectedRows[i]}
                    onCheckedChange={(val: any) => handleRowSelect(i, !!val)}
                  />
                </TableCell>

                {/* User */}
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Image
                      src={row.avatar}
                      alt={row.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium text-[#1F2937] text-[14px]">{row.name}</span>
                      <span className="text-[12px] text-[#6B7280]">{row.email}</span>
                    </div>
                  </div>
                </TableCell>

                {/* Plan */}
                <TableCell>
                  <span
                    className="px-2 py-1 rounded text-[12px] font-medium"
                    style={{ backgroundColor: planColors[row.plan] || "#E5E7EB" }}
                  >
                    {row.plan}
                  </span>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <span
                    className="px-2 py-1 rounded text-[12px] font-medium"
                    style={{ backgroundColor: statusColors[row.status] || "#E5E7EB" }}
                  >
                    {row.status}
                  </span>
                </TableCell>

                <TableCell className="text-[#6B7280] text-[12px]">{row.lastActivity}</TableCell>
                <TableCell className="text-[#111827] text-[12px] font-semibold">{row.copies}</TableCell>

                {/* Actions */}
                <TableCell className="text-[12px] p-0">
                  <div className="flex gap-3 h-[60px]">
                    <Link href="#" className="flex items-center h-full px-3 text-[#0EA5E9] hover:underline">
                      View Invoice
                    </Link>
                    <Link
                      href="#"
                      className={clsx(
                        "flex items-center h-full px-3 hover:underline",
                        row.status === "Active" ? "text-red-500" : "text-green-500"
                      )}
                    >
                      {row.status === "Active" ? "Revoke Access" : "Grant Access"}
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex justify-end p-4">
          <CustomPagination page={currentPage} setPage={setCurrentPage} totalPages={totalPages} />
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersDataTable;
