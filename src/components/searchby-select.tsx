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

export default function SearchBySelect({
    onChange = () => {},
    columns = []
}:{
    onChange?: (value: string) => void;
    columns?: string[]
}
) {
    if(columns.length <= 1){
        return null
    }
  return (
    <Select onValueChange={onChange}>
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
