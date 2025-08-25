import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function DaysFilter() {
  return (
    <Select defaultValue="7">
      <SelectTrigger className="w-[125px] border border-[#D1D5DB] shadow-none text-[#000]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="7">Last 7 days</SelectItem>
          <SelectItem value="30">Last 30 days</SelectItem>
          <SelectItem value="180">Last six months</SelectItem>
          <SelectItem value="365">Last year</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
