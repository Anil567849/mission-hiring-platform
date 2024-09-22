'use client'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

function ApplyNow({jobId, userEmail, companyEmail}: {jobId: string, userEmail: string, companyEmail: string}) {

    async function handleApply(formData: FormData){
        const desc = formData.get('desc') as string;
        const resume = formData.get('resume') as File;

        if(desc == "" || !resume.size){
            alert('Enter Details Correctly')    
            return;
        }
        formData.append('jobId', jobId)
        formData.append('userEmail', userEmail)
        formData.append('companyEmail', companyEmail)

        const res = await fetch('http://localhost:3000/api/apply-job',{
            method: "POST",
            body: formData
        })
        const {data} = await res.json();
        alert(data);
        
    }

  return (
    <form action={handleApply} className='grid gap-y-10'>

        <div className="grid gap-2 w-full">
            <Label htmlFor="desc" className="text-lg font-semibold mb-2">
            Why are you excited with our mission and vision?
            </Label>
            <Textarea 
            id="desc" 
            name='desc'
            className="col-span-3" 
            placeholder="eg: I have similar experience" />
        </div>
        <div className="grid gap-2 w-full">
            <Label htmlFor="uploadResume" className="text-lg font-semibold mb-2">
            Upload Resume
            </Label>
            <span className="sr-only">Upload Resume</span>
            <Input 
            id="uploadResume"
            className="w-full py-0 text-sm text-gray-500
            file:me-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-green-600 file:text-white
            hover:file:bg-green-700
            file:disabled:opacity-50 file:disabled:pointer-events-none
            cursor-pointer"
            type="file"
            accept=".pdf"
            name='resume'
            />
        </div>

        <button 
        className="mt-5 w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        type="submit">
        Apply Now
        </button>
    </form>
  )
}

export default ApplyNow