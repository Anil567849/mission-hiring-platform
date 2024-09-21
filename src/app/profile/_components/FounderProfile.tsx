'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function FounderProfile() {

    const [about, setAbout] = useState<string>("");

    useEffect(() => {
        // get about
        async function getAbout(){
            const res = await fetch("http://localhost:3000/api/add-founders")
            if(!res.ok){
                alert('something went wrong');
                return;
            }
            const {data} = await res.json();            
            setAbout(data.about);
        }
        getAbout();
    }, [])

    async function addFounder(formData: FormData) {
        const about = formData.get('about');

        const res = await fetch("http://localhost:3000/api/add-founders", {
            method: "POST",
            body: JSON.stringify({about})
        })

        const {data} = await res.json();
        alert(data);        
    }

    const session = useSession();
    return (
        <form action={addFounder} className="space-y-6 max-w-md mx-auto p-6 bg-card rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Founder Information</h2>
        
        <div className="space-y-2">
            <Label className="font-bold" htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" value={(session?.data?.user?.email)?.toString()} disabled />
        </div>
        
        <div className="space-y-2">
            <Label className="font-bold" htmlFor="about">About All Founders</Label>
            <Textarea 
            id="about" 
            placeholder="Tell us about the founders [Name | Education | Background]" 
            className="min-h-[100px]"
            name="about"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            />
        </div>
        
        <Button type="submit" className="w-full">Submit</Button>
        </form>
    )
}