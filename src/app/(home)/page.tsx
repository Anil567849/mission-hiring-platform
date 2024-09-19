import { Button } from "@/components/ui/button";
import Header from "./components/Header";
import JobCard from "./components/JobCard";
import Navbar from "./components/Navbar";
import {jobListings} from './data/dummy.js';

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <div className="flex flex-col items-center">
        <div className="w-[80vw]">
          <Navbar />
        </div>
        <div className="w-[80vw] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
          {
            jobListings.map((job, index) => {
              return <JobCard key={index} logo={job.logo}
              title={job.title}
              company={job.company}
              benefits={job.benefits}
              tags={job.tags}
              posted={job.posted}/>
            })
          }
        </div>
      </div>
    </div>
  );
}
