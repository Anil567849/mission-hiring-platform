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
  "Remote Full Time",
  "Remote Part Time",
  "Onsite Full Time",
  "Onsite Part Time",
  "Remote Internship",
  "Onsite Internship",
  "Contractor",
]

export default function PrimaryTagSelector({employmentType, setEmploymentType}: {employmentType: string, setEmploymentType: any}) {
  return (
    <>
      <Label htmlFor="primary-tag" className="font-bold">Employment Type</Label>
      <Select value={employmentType} onValueChange={(value) => setEmploymentType(value)}>
        <SelectTrigger id="primary-tag" className="w-[200px]">
          <SelectValue placeholder="Select employment type" />
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