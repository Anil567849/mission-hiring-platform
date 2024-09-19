"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

export default function PostCardModal({ButtonTriggerComponent}: {ButtonTriggerComponent: React.ReactElement}) {
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [company, setCompany] = useState("")
  const [location, setLocation] = useState("")
  const [role, setRole] = useState("")
  const [salary, setSalary] = useState("")

  const addTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async () => {
    const url = "http://localhost:3000/api/post-job"
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({tags,
            company,
            location,
            role,
            salary,})
    })
    const data = await res.json();
    console.log(data);
    
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
      {
          ButtonTriggerComponent
      }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Job Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="company" className="text-right">
              Company
            </Label>
            <Input 
            id="company" 
            className="col-span-3" 
            placeholder="Enter company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input 
            id="location" 
            className="col-span-3" 
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Input 
            id="role" 
            className="col-span-3" 
            placeholder="Enter role"
            value={role}
            onChange={(e) => setRole(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="salary" className="text-right">
              Salary
            </Label>
            <Input 
            id="salary" 
            className="col-span-3" 
            placeholder="Enter salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tags" className="text-right">
              Tags
            </Label>
            <div className="col-span-3 space-y-2">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button onClick={() => removeTag(tag)} className="ml-1 focus:outline-none">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                  placeholder="Add 3 tags"
                />
                <Button onClick={addTag} type="button" size="sm">
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}