import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const tags = [
  "Software Development",
  "Customer Support",
  "Sales",
  "Marketing",
  "Design",
  "Front End",
  "Back End",
  "Legal",
  "Testing",
  "Quality Assurance",
  "Non-Tech",
  "Other",
]

export default function PrimaryTagSelector({primaryTag, setPrimaryTag}: {primaryTag: string, setPrimaryTag: any}) {
  return (
    <>
      <Label htmlFor="primary-tag" className="font-bold">Select a primary tag</Label>
      <Select value={primaryTag} onValueChange={(value) => setPrimaryTag(value)}>
        <SelectTrigger id="primary-tag" className="w-[200px]">
          <SelectValue placeholder="Select a primary tag" />
        </SelectTrigger>
        <SelectContent className="max-h-[40vh]">
          {tags.map((tag) => (
            <SelectItem key={tag} value={tag.toLowerCase().replace(/\s+/g, '-')}>
              {tag}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}