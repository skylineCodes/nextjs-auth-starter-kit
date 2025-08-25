"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Image from "next/image";
import { useState } from "react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import CustomButton from "../CustomButton"
import { FaDownload } from "react-icons/fa6"
import { CustomPagination } from "../TablePagination"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const planStyles: Record<
  string,
  { bg: string; text: string }
> = {
  Pro: { bg: "#F3E8FF", text: "#9333EA" }, // purple-600
  Free: { bg: "#F3F4F6", text: "#374151" }, // gray-700
  Platinum: { bg: "#DBEAFE", text: "#1D4ED8" }, // blue-700
  Enterprise: { bg: "#FEF3C7", text: "#B45309" }, // amber-700
};

const statusColors: Record<string, { bg: string; text: string }> = {
  Active: { bg: "#DCFCE7", text: "#16A34A" },   // green
  Inactive: { bg: "#FECACA", text: "#DC2626" }, // red
  Pending: { bg: "#FEF9C3", text: "#CA8A04" },  // yellow
};

export function PaymentTabs() {
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

  const failedPayments = [
    {
      id: "FP-1001",
      name: "Diana Prince",
      email: "diana@example.com",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC3bMUJdXSf3Vg7Arichsw-E54euJmvnZWCw&s",
      plan: "Platinum",
      amount: "$99.00",
      method: "Credit Card",
      reason: "Card Declined",
      date: "Aug 20, 2025",
    },
    {
      id: "FP-1002",
      name: "Ethan Hunt",
      email: "ethan@example.com",
      avatar: "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/08/tom-cruise-as-ethan-hunt-in-mission-impossible-dead-reckoning.png",
      plan: "Pro",
      amount: "$49.00",
      method: "PayPal",
      reason: "Insufficient Funds",
      date: "Aug 19, 2025",
    },
    {
      id: "FP-1003",
      name: "Julia Roberts",
      email: "julia@example.com",
      avatar: "https://m.media-amazon.com/images/M/MV5BMTQzNjU3MDczN15BMl5BanBnXkFtZTYwNzY2Njc4._V1_.jpg",
      plan: "Free",
      amount: "$0.00",
      method: "Credit Card",
      reason: "N/A",
      date: "Aug 18, 2025",
    },
    {
      id: "FP-1004",
      name: "Bruce Wayne",
      email: "bruce@example.com",
      avatar: "https://upload.wikimedia.org/wikipedia/en/1/19/Bruce_Wayne_%28The_Dark_Knight_Trilogy%29.jpg",
      plan: "Enterprise",
      amount: "$299.00",
      method: "Bank Transfer",
      reason: "Transfer Failed",
      date: "Aug 17, 2025",
    },
    {
      id: "FP-1005",
      name: "Clark Kent",
      email: "clark@example.com",
      avatar: "https://upload.wikimedia.org/wikipedia/en/3/35/Supermanflying.png",
      plan: "Enterprise",
      amount: "$79.00",
      method: "Credit Card",
      reason: "Expired Card",
      date: "Aug 16, 2025",
    },
    {
      id: "FP-1006",
      name: "Natasha Romanoff",
      email: "natasha@example.com",
      avatar: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/marvel-studios-cinematic-universe/e/e1/Widow2-avengers.jpg",
      plan: "Pro",
      amount: "$39.00",
      method: "PayPal",
      reason: "Account Restricted",
      date: "Aug 15, 2025",
    },
    {
      id: "FP-1007",
      name: "Tony Stark",
      email: "tony@example.com",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Q4FLMXRjvHTeFippx9j0vnd1D_rzbu2OfA&s",
      plan: "Platinum",
      amount: "$99.00",
      method: "Crypto",
      reason: "Invalid Wallet",
      date: "Aug 14, 2025",
    },
    {
      id: "FP-1008",
      name: "Steve Rogers",
      email: "steve@example.com",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-JfyM99yP3Hz5PF5B6iP6z900WCUVFa3W2g&s",
      plan: "Pro",
      amount: "$49.00",
      method: "Credit Card",
      reason: "Insufficient Funds",
      date: "Aug 13, 2025",
    },
    {
      id: "FP-1009",
      name: "Wanda Maximoff",
      email: "wanda@example.com",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsSKl2pJ5AwJwX79Ajk4YlcT6Pj-04zN1xPQ&s",
      plan: "Platinum",
      amount: "$79.00",
      method: "Debit Card",
      reason: "Card Blocked",
      date: "Aug 12, 2025",
    },
    {
      id: "FP-1010",
      name: "Peter Parker",
      email: "peter@example.com",
      avatar: "https://i.redd.it/a165wzt085zb1.jpg",
      plan: "Free",
      amount: "$0.00",
      method: "N/A",
      reason: "N/A",
      date: "Aug 11, 2025",
    },
  ];

  const [page, setPage] = useState(1)
  const [refundPage, setRefundPage] = useState(1)
  const [failedPage, setFailedPage] = useState(1)

  const rowsPerPage = 5
  const totalPages = Math.ceil(data.length / rowsPerPage)
  const paginatedSubs = data.slice((page - 1) * rowsPerPage, page * rowsPerPage)
  const paginatedRefunds = data.slice((refundPage - 1) * rowsPerPage, refundPage * rowsPerPage)
  const paginatedFailed = failedPayments.slice((failedPage - 1) * rowsPerPage, failedPage * rowsPerPage)

  return (
    <div className="w-full">
      <Tabs defaultValue="subscriptions" className="w-full">
        {/* Tab Headers */}
        <TabsList className="h-[38px] bg-transparent px-4 py-2 gap-4 cursor-pointer">
          <TabsTrigger value="subscriptions" className="rounded-none shadow-none border-0 pb-4 cursor-pointer border-b-2 border-transparent text-gray-500 data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#7800C2] data-[state=active]:text-[#7800C2]">Subscriptions</TabsTrigger>
          <TabsTrigger value="refunds" className="rounded-none shadow-none border-0 pb-4 cursor-pointer border-b-2 border-transparent text-gray-500 data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#7800C2] data-[state=active]:text-[#7800C2]">Refund Issues</TabsTrigger>
          <TabsTrigger value="failed" className="rounded-none shadow-none border-0 pb-4 cursor-pointer border-b-2 border-transparent text-gray-500 data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#7800C2] data-[state=active]:text-[#7800C2]">Failed Payments</TabsTrigger>
        </TabsList>

        {/* Subscriptions Table */}
        <TabsContent value="subscriptions">
          <Card className="py-3 gap-0">
            <CardHeader className="flex justify-between items-center py-2">
              <CardTitle className="flex justify-start gap-4 items-center">
                <h3 className="text-[18px] text-[#1F2937] font-semibold">Active Subscriptions</h3>
              </CardTitle>
              <div className="flex gap-4 items-center justify-end">
                <div className="flex gap-3 items-center text-[14px] text-[#6B7280]">
                  <span>Total:</span>
                  <span>1,267 subscriptions</span>
                </div>
                <CustomButton
                  title="Export Users"
                  link="/export-component"
                  icon={<FaDownload />}
                  className="!h-[38px] bg-transparent !border-[#D1D5DB] !text-[#374151]"
                />
              </div>
            </CardHeader>
            <Separator className="py-0" />
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-[#F9FAFB] h-[45px]">
                  <TableRow>
                    <TableHead className="text-[#6B7280] text-[12px] font-medium">Subscription ID</TableHead>
                    <TableHead className="text-[#6B7280] text-[12px] font-medium">User</TableHead>
                    <TableHead className="text-[#6B7280] text-[12px] font-medium">Plan</TableHead>
                    <TableHead className="text-[#6B7280] text-[12px] font-medium">Status</TableHead>
                    <TableHead className="text-[#6B7280] text-[12px] font-medium">Current Period End</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedSubs.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>#{1000 + i}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Image
                            src={row.avatar}
                            alt={row.name}
                            width={36}
                            height={36}
                            className="rounded-full"
                          />
                          <div className="flex flex-col">
                            <span className="font-medium text-[#1F2937] text-[14px]">{row.name}</span>
                            <span className="text-[12px] text-[#6B7280]">{row.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-[12px]">
                        <span
                          className="px-2 py-1 rounded-md font-medium"
                          style={{
                            backgroundColor: planStyles[row.plan]?.bg,
                            color: planStyles[row.plan]?.text,
                          }}
                        >
                          {row.plan}
                        </span>
                      </TableCell>
                      <TableCell className="text-[12px] font-medium text-[#111827]">
                        <span
                          className="px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: statusColors[row.status]?.bg ?? "#F3F4F6",
                            color: statusColors[row.status]?.text ?? "#111827",
                          }}
                        >
                          {row.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-[12px] text-[#6B7280]">{row.lastActivity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {/* Pagination */}
              <div className="flex justify-end p-4">
                <CustomPagination page={page} setPage={setPage} totalPages={totalPages} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Refunds Table */}
        <TabsContent value="refunds">
          <Card className="py-3 gap-0">
            <CardHeader className="flex justify-between items-center py-2">
              <CardTitle className="flex justify-start gap-4 items-center">
                <h3 className="text-[18px] text-[#1F2937] font-semibold">Refund Issues</h3>
              </CardTitle>
              <div className="flex gap-4 items-center justify-end">
                <div className="flex gap-3 items-center text-[14px] text-[#6B7280]">
                  <span>Total:</span>
                  <span>327 refunds</span>
                </div>
                <CustomButton
                  title="Export Refunds"
                  link="/export-refunds"
                  icon={<FaDownload />}
                  className="!h-[38px] bg-transparent !border-[#D1D5DB] !text-[#374151]"
                />
              </div>
            </CardHeader>
            <Separator className="py-0" />
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-[#F9FAFB] h-[45px]">
                  <TableRow>
                    <TableHead className="text-[#6B7280] text-[12px] font-medium">Refund ID</TableHead>
                    <TableHead className="text-[#6B7280] text-[12px] font-medium">User</TableHead>
                    <TableHead className="text-[#6B7280] text-[12px] font-medium">Plan</TableHead>
                    <TableHead className="text-[#6B7280] text-[12px] font-medium">Amount</TableHead>
                    <TableHead className="text-[#6B7280] text-[12px] font-medium">Reason</TableHead>
                    <TableHead className="text-[#6B7280] text-[12px] font-medium">Status</TableHead>
                    <TableHead className="text-[#6B7280] text-[12px] font-medium">Date Issued</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedRefunds.slice(0, 5).map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>RFD-{5000 + i}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Image
                            src={row.avatar}
                            alt={row.name}
                            width={36}
                            height={36}
                            className="rounded-full"
                          />
                          <div className="flex flex-col">
                            <span className="font-medium text-[#1F2937] text-[14px]">{row.name}</span>
                            <span className="text-[12px] text-[#6B7280]">{row.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      {/* Plan */}
                      <TableCell className="text-[12px]">
                        <span
                          className="px-2 py-1 rounded-md font-medium"
                          style={{
                            backgroundColor: planStyles[row.plan]?.bg,
                            color: planStyles[row.plan]?.text,
                          }}
                        >
                          {row.plan}
                        </span>
                      </TableCell>
                      {/* Amount */}
                      <TableCell className="text-[12px] font-medium text-[#111827]">
                        ${(50 + i * 20).toFixed(2)}
                      </TableCell>
                      {/* Reason */}
                      <TableCell className="text-[12px] text-[#6B7280]">
                        {i % 2 === 0 ? "Duplicate charge" : "Service issue"}
                      </TableCell>
                      {/* Status */}
                      <TableCell className="text-[12px] font-medium text-[#111827]">
                        <span
                          className="px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: statusColors[row.status]?.bg ?? "#F3F4F6",
                            color: statusColors[row.status]?.text ?? "#111827",
                          }}
                        >
                          {row.status}
                        </span>
                      </TableCell>
                      {/* Date */}
                      <TableCell className="text-[12px] text-[#6B7280]">
                        {row.lastActivity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex justify-end p-4">
                <CustomPagination page={refundPage} setPage={setRefundPage} totalPages={totalPages} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Failed Payments Table */}
        <TabsContent value="failed">
          <Card className="py-3 gap-0">
            <CardHeader className="flex justify-between items-center py-2">
              <CardTitle className="flex justify-start gap-4 items-center">
                <h3 className="text-[18px] text-[#1F2937] font-semibold">Failed Payments</h3>
              </CardTitle>
              <div className="flex gap-4 items-center justify-end">
                <div className="flex gap-3 items-center text-[14px] text-[#6B7280]">
                  <span>Total:</span>
                  <span>{failedPayments.length} failed</span>                  
                </div>
                <CustomButton title="Export Records" link="/export-component" icon={<FaDownload />} className='!h-[38px] bg-transparent !border-[#D1D5DB] !text-[#374151]' />
              </div>
            </CardHeader>
            <Separator className="py-0" />
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-[#F9FAFB] h-[45px]">
                  <TableRow>
                    <TableHead className="text-[#6B7280] text-[12px] font-medium">Payment ID</TableHead>
                    <TableHead className="text-[#6B7280] text-[12px] font-medium">User</TableHead>
                    <TableHead className="text-[#6B7280] text-[12px] font-medium">Plan</TableHead>
                    <TableHead className="text-[#6B7280] text-[12px] font-medium">Amount</TableHead>
                    <TableHead className="text-[#6B7280] text-[12px] font-medium">Method</TableHead>
                    <TableHead className="text-[#6B7280] text-[12px] font-medium">Failure Reason</TableHead>
                    <TableHead className="text-[#6B7280] text-[12px] font-medium">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedFailed.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Image
                            src={row.avatar}
                            alt={row.name}
                            width={36}
                            height={36}
                            className="rounded-full"
                          />
                          <div className="flex flex-col">
                            <span className="font-medium text-[#1F2937] text-[14px]">{row.name}</span>
                            <span className="text-[12px] text-[#6B7280]">{row.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-[12px]">
                        <span
                          className="px-2 py-1 rounded-md font-medium"
                          style={{
                            backgroundColor: planStyles[row.plan]?.bg,
                            color: planStyles[row.plan]?.text,
                          }}
                        >
                          {row.plan}
                        </span>
                      </TableCell>
                      <TableCell className="text-[12px] text-[#374151]">{row.amount}</TableCell>
                      <TableCell className="text-[12px] text-[#374151]">{row.method}</TableCell>
                      <TableCell className="text-[12px] text-[#DC2626] font-medium">{row.reason}</TableCell>
                      <TableCell className="text-[12px] text-[#6B7280]">{row.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
               {/* Pagination */}
              <div className="flex justify-end p-4">
                <CustomPagination page={failedPage} setPage={setFailedPage} totalPages={totalPages} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
