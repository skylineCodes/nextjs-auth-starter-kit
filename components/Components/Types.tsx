import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Types() {
  return (
    <Select defaultValue="all_types">
      <SelectTrigger className="w-[120px] border border-[#D1D5DB] shadow-none text-[#000]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all_types">All Types</SelectItem>
          <SelectItem value="button">Button</SelectItem>
          <SelectItem value="button_nav">Button Nav</SelectItem>
          <SelectItem value="card">Card</SelectItem>
          <SelectItem value="dropdown_menu">Dropdown Menu</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
