'use client'
import React from 'react';
import Loader from "@/components/Loader";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { Suspense } from 'react'
const JobCard = React.lazy(() => import('./components/JobCard'));
const Header = React.lazy(() => import('./components/Header'));

export interface IJob {
  _id: string;
  email: string;
  companyName: string;
  aboutCompany: string;
  companyMission: string;
  companyVision: string;
  numberOfPeople: string;
  companyLocation: string;
  jobRole: string;
  primaryTag: string;
  tags: string[];
  employmentType: string;
  jobDescription: string;
  minSalary: string;
  maxSalary: string;
  join: Date;
}
export default function Home() {
  const [jobListings, setJobListings] = useState<IJob[]>([]);

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Suspense fallback={<Loader />}>
        <Header jobListings={jobListings} setJobListings={setJobListings}/>
      </Suspense>
      <div className="flex flex-col items-center">
        <div className="w-[80vw]">
          <Navbar />
        </div>
        <div className="w-[80vw] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
          {
            jobListings && jobListings.map((job, index) => (
              <JobCard key={index} job={job} />
            ))
          }
        </div>
      </div> 
    </div>
  );
}
