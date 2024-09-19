'use client';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import {
  DialogTrigger,
} from "@/components/ui/dialog"
import PostCardModal from "./PostJobModal";

export default function Component() {
  const session = useSession();
  const [job, setJob] = useState<string>("");
  const modalOpen = useRef<HTMLButtonElement | null>(null)
  
  function handlePostaJob(){
    if(session.data){
      if(!modalOpen || !modalOpen.current) return
      modalOpen.current.click();
    }else{
      signIn();
    }
  }
  
  function handleSearchJob(){
    alert(`search a job: ${job}`);
  }

  return (
    <div className="relative h-[60vh] w-full bg-center flex flex-col items-center justify-center bg-[url('/bg1.jpg')] bg-cover">
      
      <PostCardModal ButtonTriggerComponent={<Button variant="outline" className="hidden" ref={modalOpen}>Open Job Application</Button>}/>
      
      {/* Buttons at the top right */}
      <div className="absolute top-4 right-4 space-x-2">
        {
          !session.data ? <Button 
          variant="outline" 
          className="bg-white bg-opacity-50 hover:bg-opacity-75 rounded-3xl"
          onClick={() => signIn()}>
          Login
          </Button> : 
          <Button 
          variant="outline" 
          className="bg-white bg-opacity-50 hover:bg-opacity-75 rounded-3xl"
          onClick={() => signOut()}>
            Logout
          </Button>
        }
        
        <Button 
        className="bg-primary hover:bg-primary/90 rounded-3xl"
        onClick={handlePostaJob}>
          Post a Job
        </Button>
      </div>
      
      {/* Centered content */}
      <div className="text-center space-y-6 max-w-2xl px-4">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          Welcome to Our Platform
        </h1>
        <p className="text-xl text-white drop-shadow-md">
          Discover amazing content and connect with others. Start your journey today!
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