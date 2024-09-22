'use client'
import Header from "./components/Header";
import JobCard from "./components/JobCard";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

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
      <Header jobListings={jobListings} setJobListings={setJobListings}/>
      <div className="flex flex-col items-center">
        <div className="w-[80vw]">
          <Navbar />
        </div>
        <div className="w-[80vw] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
          {
            jobListings && jobListings.map((job: IJob, index) => {
              return <JobCard key={index} job={job}/>
            })
          }
        </div>
      </div>
    </div>
  );
}
