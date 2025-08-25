import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Status() {
  return (
    <Select defaultValue="all_status">
      <SelectTrigger className="w-[120px] border border-[#D1D5DB] shadow-none text-[#000]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all_status">All Status</SelectItem>
          <SelectItem value="published">Published</SelectItem>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="archive">Archive</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
