import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Plans() {
  return (
    <Select defaultValue="all_plans">
      <SelectTrigger className="w-[120px] border border-[#D1D5DB] shadow-none text-[#000]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all_plans">All Plans</SelectItem>
          <SelectItem value="free">Free Plan</SelectItem>
          <SelectItem value="pro">Pro Plan</SelectItem>
          <SelectItem value="platinum">Platinum Plan</SelectItem>
          <SelectItem value="enterprise">Enterprise Plan</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
