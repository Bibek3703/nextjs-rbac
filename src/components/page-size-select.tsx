import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PAGE_SIZE } from '@/constants'

export default function PageSizeSelect({
  value = PAGE_SIZE.toString(),
  onChange = () => {}
}: {
  value: string;
  onChange: (value: string) => void
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-auto gap-3">
        <SelectValue placeholder="Select rows" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectItem value="2">2 rows</SelectItem> */}
          <SelectItem value="5">5 rows</SelectItem>
          <SelectItem value="10">10 rows</SelectItem>
          <SelectItem value="25">20 rows</SelectItem>
          <SelectItem value="50">50 rows</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}