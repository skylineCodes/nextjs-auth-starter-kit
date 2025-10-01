"use client"
import { useEffect, useState } from "react"
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Loader2Icon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Button } from "../ui/button"

const statusColors: Record<string, string> = {
  success: "#DCFCE7", // green
  failed: "#FECACA", // red
}
const suspiciousColors: Record<"true" | "false", string> = {
  true: "#FECACA", // red
  false: "#E0F2FE", // blue
}

// ✅ Fetch wrapper (reuse yours)
const fetchWithRefresh = async (url: string, options: RequestInit = {}) => {
  let res = await fetch(url, { credentials: "include", ...options });

  if (res.status === 401) {
    // try refresh
    const refreshRes = await fetch(`/api/auth/refresh`, { method: "POST", credentials: "include" });

    if (refreshRes.status === 200) {
      res = await fetch(url, { credentials: "include", ...options });
    } else {
      throw new Error("Session expired. Please login again.");
    }
  }

  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export function useRecentLogins(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["device", page, pageSize],
    queryFn: () => fetchWithRefresh(`/api/security/devices?page=${page}&pageSize=${pageSize}`),
    retry: 1,
  });
}

export function useRevokeSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sessionId: string) => {
      return fetchWithRefresh(`/api/security/devices/${sessionId}`, {
        method: "POST",
      });
    },
    onSuccess: () => {
      // ✅ Refresh table after revoke
      queryClient.invalidateQueries({ queryKey: ["device"] });
    },
  });
}

export function useDeleteSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sessionId: string) => {
      return fetchWithRefresh(`/api/security/devices/delete/${sessionId}`, {
        method: "DELETE",
        headers: {
          "x-session-id": sessionId,
        }
      });
    },
    onSuccess: () => {
      // ✅ Refresh table after revoke
      queryClient.invalidateQueries({ queryKey: ["device"] });
    },
  });
}

function SafeDate({ value }: { value?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!value) return <>—</>;
  if (!mounted) return <>…</>; // fallback until hydration

  return <>{new Date(value).toLocaleString()}</>;
}

const DevicesDataTable = () => {
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

  const { data, isLoading, error } = useRecentLogins(page, pageSize);
  const { mutate: revokeSession, isPending: isRevoking } = useRevokeSession();
  const { mutate: deleteSession, isPending: isSigningOut } = useDeleteSession();

  const rows = data?.data || [];

  const hasNextPage = rows.length === pageSize
  const hasPreviousPage = page > 1

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
                  <TableHead className="text-[#6B7280] text-[12px]">Device</TableHead>
                  <TableHead className="text-[#6B7280] text-[12px]">User Agent</TableHead>
                  <TableHead className="text-[#6B7280] text-[12px]">Current Device</TableHead>
                  <TableHead className="text-[#6B7280] text-[12px]">Suspicious</TableHead>
                  <TableHead className="text-[#6B7280] text-[12px]">Revoked</TableHead>
                  <TableHead className="text-[#6B7280] text-[12px]">Last Seen</TableHead>
                  <TableHead className="text-[#6B7280] text-[12px]">Created At</TableHead>
                  <TableHead className="text-[#6B7280] text-[12px]">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {rows.map((item: any, index: number) => (
                  <TableRow key={item._id}>
                    {/* Select checkbox */}
                    <TableCell className="w-12">
                      <Checkbox
                        checked={selectedRows[index]}
                        onCheckedChange={(val: any) => handleRowSelect(index, !!val)}
                      />
                    </TableCell>

                    {/* IP */}
                    <TableCell className="text-[#111827] text-[12px]">{item.ipAddress}</TableCell>

                    {/* Device */}
                    {/* <TableCell className="text-[#111827] text-[12px]">
                      {item.deviceName || "Unknown"}
                    </TableCell> */}

                    <TableCell className="text-[#111827] text-[12px]">
                      {item.deviceName ? (
                        <div className="flex flex-col">
                          <span>{item.deviceName.browser} ({item.deviceName.type})</span>
                          <span className="text-[#6B7280]">{item.deviceName.os}</span>
                        </div>
                      ) : (
                        "Unknown"
                      )}
                    </TableCell>

                    {/* User Agent */}
                    <TableCell className="text-[#6B7280] text-[12px] truncate max-w-[200px]">
                      {item.userAgent}
                    </TableCell>

                    {/* Current Device */}
                    <TableCell>
                      <span
                        className="px-2 py-1 rounded text-[12px] font-medium"
                        style={{ backgroundColor: item.isCurrentDevice ? "#DCFCE7" : "#E5E7EB" }}
                      >
                        {item.isCurrentDevice ? "Yes" : "No"}
                      </span>
                    </TableCell>

                    {/* Suspicious */}
                    <TableCell>
                      <span
                        className="px-2 py-1 rounded text-[12px] font-medium"
                        style={{
                          backgroundColor: item.isSuspicious ? "#FECACA" : "#E0F2FE",
                        }}
                      >
                        {item.isSuspicious ? "Yes" : "No"}
                      </span>
                    </TableCell>

                    {/* Revoked */}
                    <TableCell>
                      <span
                        className="px-2 py-1 rounded text-[12px] font-medium"
                        style={{
                          backgroundColor: item.revoked ? "#FECACA" : "#DCFCE7",
                        }}
                      >
                        {item.revoked ? "Revoked" : "Active"}
                      </span>
                    </TableCell>

                    {/* Last Seen */}
                    <TableCell className="text-[#6B7280] text-[12px]">
                      {/* {item.lastSeenAt ? new Date(item.lastSeenAt).toLocaleString() : "—"} */}
                      <SafeDate value={item.lastSeenAt} />
                    </TableCell>

                    {/* Created At */}
                    <TableCell className="text-[#6B7280] text-[12px]">
                      {/* {item.createdAt ? new Date(item.createdAt).toLocaleString() : "—"} */}
                      <SafeDate value={item.createdAt} />
                    </TableCell>

                    {/* Actions Dropdown */}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => revokeSession(item._id)}
                            disabled={isRevoking}
                          >
                            Sign out this device
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => deleteSession(item?._id)}
                            disabled={isSigningOut}
                          >
                            Delete session
                          </DropdownMenuItem>
                          {/* <DropdownMenuItem
                            onClick={() => console.log("Mark suspicious", item._id)}
                          >
                            Mark as Suspicious
                          </DropdownMenuItem> */}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* 🔑 Shadcn Pagination */}
            <div className="flex items-center justify-between p-4 cursor-pointer">
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

              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value))
                  setPage(1)
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

export default DevicesDataTable
