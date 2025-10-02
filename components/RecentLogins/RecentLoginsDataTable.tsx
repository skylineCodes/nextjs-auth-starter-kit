"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { useQuery } from "@tanstack/react-query";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Loader2Icon } from "lucide-react"

const statusColors: Record<string, string> = {
  success: "#DCFCE7", // green
  failed: "#FECACA", // red
}
const suspiciousColors: Record<"true" | "false", string> = {
  true: "#FECACA", // red
  false: "#E0F2FE", // blue
}

const RecentLoginsDataTable = () => {
  const [selectedAll, setSelectedAll] = useState(false)
  const [selectedRows, setSelectedRows] = useState<boolean[]>([])

  const handleSelectAll = (checked: boolean, length: number) => {
    setSelectedAll(checked)
    setSelectedRows(new Array(length).fill(checked))
  }

  const handleRowSelect = (index: number, checked: boolean) => {
    const updated = [...selectedRows]
    updated[index] = checked
    setSelectedRows(updated)
    setSelectedAll(updated.every(Boolean))
  }

  // 🔑 Pagination states
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10);

  const fetchWithRefresh = async (url: string) => {
    let res = await fetch(url, { credentials: "include" }); // include cookies

    if (res.status === 401) {
      // try refresh
      const refreshRes = await fetch(`/api/auth/refresh`, { method: "POST", credentials: "include" });

      console.log('refreshRes', await refreshRes.text());

      if (refreshRes.status === 200) {
        // retry original
        res = await fetch(url, { credentials: "include" });
      } else {
        throw new Error("Session expired. Please login again.");
      }
    }

    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["recent-logins", page, pageSize],
    queryFn: () => fetchWithRefresh(`/api/security/recent-logins?page=${page}&pageSize=${pageSize}`),
    retry: 1
  });

  const rows = data?.data || [];

  // ✅ no backend meta, so just check if data returned < pageSize
  const hasNextPage = rows.length === pageSize
  const hasPreviousPage = page > 1;

  return (
    <Card className="bg-white shadow-none rounded w-full py-0">
      <CardContent className="p-0">
        {isLoading && <div className="p-6"><Loader2Icon className="animate-spin" /></div>}
        {error && <p className="p-4 text-red-500">Error loading data</p>}
        {!isLoading && !error && (
          <>
            <Table>
              <TableHeader className="bg-[#F9FAFB]">
                <TableRow>
                  <TableHead className="w-[56px]">
                    <Checkbox
                      checked={selectedAll}
                      onCheckedChange={(val: any) => handleSelectAll(!!val, rows.length)}
                    />
                  </TableHead>
                  <TableHead className="text-[#6B7280] text-[12px]">IP Address</TableHead>
                  <TableHead className="text-[#6B7280] text-[12px]">Location</TableHead>
                  <TableHead className="text-[#6B7280] text-[12px]">Device</TableHead>
                  <TableHead className="text-[#6B7280] text-[12px]">User Agent</TableHead>
                  <TableHead className="text-[#6B7280] text-[12px]">Status</TableHead>
                  <TableHead className="text-[#6B7280] text-[12px]">Suspicious</TableHead>
                  <TableHead className="text-[#6B7280] text-[12px]">Login Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((item: any, index: number) => (
                  <TableRow key={item._id}>
                    <TableCell className="w-12">
                      <Checkbox
                        checked={selectedRows[index]}
                        onCheckedChange={(val: any) => handleRowSelect(index, !!val)}
                      />
                    </TableCell>

                    {/* IP */}
                    <TableCell className="text-[#111827] text-[12px]">{item.ipAddress}</TableCell>

                    {/* Location */}
                    <TableCell className="text-[#111827] text-[12px]">
                      {item.location?.city}, {item.location?.region}, {item.location?.country}
                    </TableCell>

                    {/* Device */}
                    <TableCell className="text-[#111827] text-[12px]">
                      {item.device?.type || "Unknown"}
                    </TableCell>

                    {/* User Agent */}
                    <TableCell className="text-[#6B7280] text-[12px] truncate max-w-[200px]">
                      {item.userAgent}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <span
                        className="px-2 py-1 rounded text-[12px] font-medium"
                        style={{ backgroundColor: statusColors[item.status] || "#E5E7EB" }}
                      >
                        {item.status}
                      </span>
                    </TableCell>

                    {/* Suspicious */}
                    <TableCell>
                      <span
                        className="px-2 py-1 rounded text-[12px] font-medium"
                        style={{
                          backgroundColor:
                            suspiciousColors[String(item.isSuspicious) as "true" | "false"],
                        }}
                      >
                        {item.isSuspicious ? "Yes" : "No"}
                      </span>
                    </TableCell>

                    {/* Login Time */}
                    <TableCell className="text-[#6B7280] text-[12px]">
                      {new Date(item.loginAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* 🔑 Shadcn Pagination */}
            <div className="flex items-center justify-between p-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (hasPreviousPage) setPage((p) => p - 1)
                      }}
                      className={!hasPreviousPage ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationLink href="#">{page}</PaginationLink>
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (hasNextPage) setPage((p) => p + 1)
                      }}
                      className={!hasNextPage ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>

              {/* page size selector */}
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value))
                  setPage(1) // reset to first page when size changes
                }}
                className="ml-4 border rounded px-2 py-1 text-sm"
              >
                {[5, 10, 20, 50].map((size) => (
                  <option key={size} value={size}>
                    {size} / page
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default RecentLoginsDataTable
