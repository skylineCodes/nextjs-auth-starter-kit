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
import ProfileComponentItemSVG from '../../assets/icons/profile-component.svg';
import DashboardComponentItemSVG from '../../assets/icons/dashboard-component.svg';
import DatatableComponentItemSVG from '../../assets/icons/data-table-component.svg';
import AnalyticsComponentItemSVG from '../../assets/icons/analytics-component.svg';

const platformColors: Record<string, string> = {
  Figma: "#E0E7FF",
  React: "#DBEAFE",
  "React Native": "#CFFAFE",
  Flutter: "#FDE68A",
  Web: "#DCFCE7",
};

const statusColors: Record<string, string> = {
  Published: "#DCFCE7", // green
  Draft: "#FEF9C3",     // yellow
  Archived: "#FECACA",  // red
};

const ComponentsDataTable = () => {
  const data = [
    {
      title: "Dashboard Card",
      category: 'UI Components',
      Icon: DashboardComponentItemSVG,
      IconBrand: '#E0E7FF',
      type: "UI",
      typeColor: "#E0F2FE",
      tags: ["Navigation", "Header"],
      platform: ["Web", "React"],
      status: "Published",
      version: "1.0.2",
      updated: "Aug 20, 2025",
    },
    {
      title: "Data Table",
      category: 'Tables',
      Icon: DatatableComponentItemSVG,
      IconBrand: '#DBEAFE',
      type: "Form",
      typeColor: "#FEF9C3",
      tags: ["Auth", "Input"],
      platform: ["Web", "React Native"],
      status: "Draft",
      version: "2.3.1",
      updated: "Aug 15, 2025",
    },
    {
      title: "Profile Card",
      category: 'User Interface',
      Icon: ProfileComponentItemSVG,
      IconBrand: '#DBEAFE',
      type: "UI",
      typeColor: "#FCE7F3",
      tags: ["Pricing", "Cards"],
      platform: ["Figma"],
      status: "Archived",
      version: "1.2.0",
      updated: "Aug 10, 2025",
    },
    {
      title: "Analytics Chart",
      category: 'Data Visualization',
      Icon: AnalyticsComponentItemSVG,
      IconBrand: '#DCFCE7',
      type: "Widget",
      typeColor: "#DCFCE7",
      tags: ["Analytics", "Charts"],
      platform: ["Web", "Flutter"],
      status: "Published",
      version: "3.0.0",
      updated: "Aug 18, 2025",
    },
  ]

  const [selectedAll, setSelectedAll] = useState(false)
  const [selectedRows, setSelectedRows] = useState<boolean[]>(new Array(data.length).fill(false))

  const handleSelectAll = (checked: boolean) => {
    setSelectedAll(checked)
    setSelectedRows(new Array(data.length).fill(checked))
  }

  const handleRowSelect = (index: number, checked: boolean) => {
    const updated = [...selectedRows]
    updated[index] = checked
    setSelectedRows(updated)
    setSelectedAll(updated.every(Boolean))
  }

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
              <TableHead className="text-[#6B7280] text-[12px]">Title</TableHead>
              <TableHead className="text-[#6B7280] text-[12px]">Type</TableHead>
              <TableHead className="text-[#6B7280] text-[12px]">Style Tags</TableHead>
              <TableHead className="text-[#6B7280] text-[12px]">Platform</TableHead>
              <TableHead className="text-[#6B7280] text-[12px]">Status</TableHead>
              <TableHead className="text-[#6B7280] text-[12px]">Version</TableHead>
              <TableHead className="text-[#6B7280] text-[12px]">Last updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                <TableCell className="w-12">
                  <Checkbox
                    checked={selectedRows[i]}
                    onCheckedChange={(val: any) => handleRowSelect(i, !!val)}
                  />
                </TableCell>
                
                {/* Title */}
                <TableCell className="text-[#111827] text-[12px]">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 flex items-center justify-center rounded-md"
                      style={{ backgroundColor: row.IconBrand }}
                    >
                      <row.Icon className="" size={70} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-[#1F2937] text-[14px]">{row.title}</span>
                      <span className="text-[12px] text-[#6B7280]">{row.category}</span>
                    </div>
                  </div>
                </TableCell>

                {/* Type with dynamic background */}
                <TableCell>
                  <span
                    className="px-2 py-1 rounded text-[12px] font-medium"
                    style={{ backgroundColor: row.typeColor }}
                  >
                    {row.type}
                  </span>
                </TableCell>

                {/* Tags */}
                <TableCell className="text-[#111827] text-[12px]">
                  <div className="flex flex-wrap gap-1">
                    {row.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-[#F3F4F6] px-2 py-1 rounded text-[12px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </TableCell>

                {/* Platforms with dynamic background */}
                <TableCell className="text-[#111827] text-[12px]">
                  <div className="flex flex-wrap gap-1">
                    {row.platform.map((plat, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded text-[12px] font-medium"
                        style={{ backgroundColor: platformColors[plat] || "#E5E7EB" }}
                      >
                        {plat}
                      </span>
                    ))}
                  </div>
                </TableCell>

                {/* Status with dynamic background */}
                <TableCell className="text-[#111827] text-[12px]">
                  <span
                    className="px-2 py-1 rounded text-[12px] font-medium"
                    style={{ backgroundColor: statusColors[row.status] || "#E5E7EB" }}
                  >
                    {row.status}
                  </span>
                </TableCell>

                <TableCell className="text-[#6B7280] text-[12px]">{row.version}</TableCell>
                <TableCell className="text-[#111827] text-[12px]">{row.updated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default ComponentsDataTable;
