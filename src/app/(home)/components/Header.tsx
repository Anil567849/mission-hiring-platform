'use client';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useRouter } from "next/navigation";
import PostCardModal from "./PostJobModal";
import { IJob } from "../page";

export default function Header({jobListings, setJobListings}: {jobListings: IJob[], setJobListings: any}) {
  const session = useSession();
  const [job, setJob] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const modalOpen = useRef<HTMLButtonElement | null>(null)
  const router = useRouter();

  useEffect(() => {
    async function getData(){
      const url = 'http://localhost:3000/api/get-jobs'
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({search})
      })
      const {jobs} = await res.json();
      setJobListings(jobs);
    }
    getData();
  }, [search])
  
  
  function handlePostaJob(){
    if(session.data){
      if(!modalOpen || !modalOpen.current) return
      modalOpen.current.click();
    }else{
      signIn();
    }
  }
  
  async function handleSearchJob(){
    setSearch(job);
  }
  
  function handleProfileClick(){
    router.push('/profile')
  }

  return (
    <div className="relative h-[60vh] w-full bg-center flex flex-col items-center justify-center bg-[url('/bg1.jpg')] bg-cover">

        <PostCardModal ButtonTriggerComponent={<Button variant="outline" className="hidden" ref={modalOpen}>Open Job Application</Button>}/>

      {/* Buttons at the top right */}
      <div className="absolute top-4 right-4 space-x-2">
        <div className="flex">
        {
          !session.data ? <Button 
          variant="outline" 
          className="bg-white bg-opacity-50 hover:bg-opacity-75 rounded-3xl mx-2 border-none"
          onClick={() => signIn()}>
          Login
          </Button> : 
          <Button 
          variant="outline" 
          className="bg-white bg-opacity-50 hover:bg-opacity-75 rounded-3xl mx-2 border-none"
          onClick={() => signOut()}>
            Logout
          </Button>
        }
        
        <Button 
        className="bg-primary hover:bg-primary/90 rounded-3xl mx-2"
        onClick={handlePostaJob}>
          Post a Job
        </Button>

        <Avatar 
        className="h-10 w-10 mb-4 mx-2 cursor-pointer"
        onClick={handleProfileClick}>
          <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        </div>
      </div>
      
      {/* Centered content */}
      <div className="text-center space-y-6 max-w-2xl px-4">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          Mission Vision Hiring Platform
        </h1>
        <p className="text-xl text-white drop-shadow-md">
          Hire people those who are align with your mission and vision.
        </p>
        <div className="flex w-full max-w-md mx-auto">
          <Input 
            type="search" 
            placeholder="Search..." 
            className="flex-grow text-white font-bold rounded-3xl"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
          <Button  
          className="ml-2"
          onClick={handleSearchJob}>
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}