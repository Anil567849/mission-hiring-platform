"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import PrimaryTagSelector from "./PrimaryTagSelector"
import EmploymentTypeSelector from "./EmploymentTypeSelector"

export default function PostCardModal({ButtonTriggerComponent}: {ButtonTriggerComponent: React.ReactElement}) {
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [aboutCompany, setAboutCompany] = useState("")
  const [companyMission, setCompanyMission] = useState("")
  const [companyVision, setCompanyVision] = useState("")
  const [companyLocation, setCompanyLocation] = useState("")
  const [numberOfPeople, setNumberOfPeople] = useState(0)
  const [jobRole, setJobRole] = useState("")
  const [primaryTag, setPrimaryTag] = useState("")
  const [employmentType, setEmploymentType] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [minSalary, setMinSalary] = useState("")
  const [maxSalary, setMaxSalary] = useState("")  

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
        body: JSON.stringify({
            companyName,
            aboutCompany,
            companyMission,
            companyVision,
            numberOfPeople,
            companyLocation,
            jobRole,
            primaryTag,
            tags,
            employmentType,
            jobDescription,
            minSalary,
            maxSalary,
          })
    })
    const data = await res.json();

    if(data) {
      alert('job posted successfully')
    }else {
      alert('something went wrong')
    }
    
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
      {
          ButtonTriggerComponent
      }
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] md:max-w-[60vw] bg-white max-h-[80vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Job Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">

          <div className="grid gap-2">
            <Label htmlFor="companyName" className="font-bold">
            Company Name
            </Label>
            <Input 
            id="companyName" 
            className="col-span-3" 
            placeholder="eg: Google"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="aboutCompany" className="font-bold">
              About Company
            </Label>
            <Textarea  
            id="aboutCompany" 
            className="col-span-3" 
            placeholder="eg: we are building search engine. We are collecting and organizing vast amounts of information"
            value={aboutCompany}
            onChange={(e) => setAboutCompany(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="companyMission" className="font-bold">
              Company Mission
            </Label>
            <Input 
            id="companyMission" 
            className="col-span-3" 
            placeholder="eg: organize the world's information"
            value={companyMission}
            onChange={(e) => setCompanyMission(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="companyVision" className="font-bold">
              Company Vision
            </Label>
            <Input 
            id="companyVision" 
            className="col-span-3" 
            placeholder="eg: continuous innovation in search technology"
            value={companyVision}
            onChange={(e) => setCompanyVision(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="numberOfPeople" className="font-bold">
              Number of People
            </Label>
            <Input 
            id="numberOfPeople" 
            className="col-span-3" 
            placeholder="About Your Company"
            type="number"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(parseInt(e.target.value))} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="companyLocation" className="font-bold">
              Company Location
            </Label>
            <Input 
            id="companyLocation" 
            className="col-span-3" 
            placeholder="eg: Menlo Park CA"
            value={companyLocation}
            onChange={(e) => setCompanyLocation(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="role" className="font-bold">
              Job Role
            </Label>
            <Input 
            id="role" 
            className="col-span-3" 
            placeholder="eg: Full Stack Web Developer"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <PrimaryTagSelector primaryTag={primaryTag} setPrimaryTag={setPrimaryTag} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="tags" className="font-bold">
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

          <div className="grid gap-2">
            <EmploymentTypeSelector employmentType={employmentType} setEmploymentType={setEmploymentType} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="jobDescription" className="font-bold">
            Job Description
            </Label>
            <Textarea 
            id="jobDescription" 
            className="col-span-3" 
            placeholder="eg: Fresher Full Stack Web Developer. Expertise in Mern and NextJS."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="salary" className="font-bold">
              Salary (Annual in $)
            </Label>
            <Input
            id="salary" 
            className="col-span-3" 
            placeholder="eg: Min per year"
            value={minSalary}
            onChange={(e) => setMinSalary(e.target.value)} />
            <Input
            id="salary" 
            className="col-span-3" 
            placeholder="eg: Max per year"
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)} />
          </div>

        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}