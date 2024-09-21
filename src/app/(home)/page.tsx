'use client'
import Header from "./components/Header";
import JobCard from "./components/JobCard";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

interface IJob {
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

const LOGO = "https://img.freepik.com/free-vector/quill-pen-logo-template_23-2149852429.jpg?w=740&t=st=1726913330~exp=1726913930~hmac=88dad5eb5c1f949760b302a56f8b19986984ee712b0f8f0fe185094c4d747dc1";

export default function Home() {
  const [jobListings, setJobListings] = useState<IJob[]>();
  const [posts, setPosts] = useState(0)

  useEffect(() => {
    async function getData(){
      const url = 'http://localhost:3000/api/get-jobs'
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({range: [posts, posts+9]})
      })
      const {jobs} = await res.json();

      setJobListings((prevJobs) => {
        return !prevJobs ? jobs : [...prevJobs, ...jobs]
      });
    }
    getData();
  }, [posts])
  

  async function fetchData() {
    setPosts(posts+10); // next time fetch
  }
  let inter = true;
  useEffect(() => {
    async function handleScroll() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      const atBottom = windowHeight + scrollTop >= documentHeight - 200; // 200px threshold
      // fetch more content 
      if(atBottom){
        if(inter){
          // console.log('fetched');
          fetchData();
        }
        inter = false;
        setTimeout(() => {
          inter = true;
        }, 5000);
      }

      
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <div className="flex flex-col items-center">
        <div className="w-[80vw]">
          <Navbar />
        </div>
        <div className="w-[80vw] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
          {
            jobListings && jobListings.map((job: IJob, index) => {
              return <JobCard key={index} logo={LOGO}
              title={job.jobRole}
              company={job.companyName}
              benefits={[]}
              tags={job.tags}
              posted={job.join}/>
            })
          }
        </div>
      </div>
    </div>
  );
}
