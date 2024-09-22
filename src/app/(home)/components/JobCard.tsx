'use client'
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IJob } from '../page';
import { useRouter } from 'next/navigation';

const LOGO = "https://img.freepik.com/free-vector/quill-pen-logo-template_23-2149852429.jpg?w=740&t=st=1726913330~exp=1726913930~hmac=88dad5eb5c1f949760b302a56f8b19986984ee712b0f8f0fe185094c4d747dc1";


const JobListingCard = ({job}: {job: IJob}) => {

  const router = useRouter();
  
  const joinDate = new Date(job.join);
  const formattedDate = joinDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).split('/').join('-');


  function handleApply(id: string){
    router.push(`/startup/${id}`)
  }

  return (
    <Card className="grid grid-rows-subgrid grid-rows-2 w-full h-[100%] max-w-md mx-auto overflow-hidden shadow-xl rounded-3xl">
      <CardHeader className="flex items-center justify-between p-6 bg-gray-50">
        <div className="flex items-center space-x-4">
          <img src={LOGO} alt="Company Logo" className="w-12 h-12 rounded-full" />
          <div>
            <h2 className="text-xl font-bold">{job.jobRole}</h2>
            <p className="text-gray-600">{job.companyName}</p>
          </div>
        </div>
        <Badge variant="secondary">{formattedDate}</Badge>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center text-sm text-gray-600 w-full justify-between">
            <p>Min per year: ${job.minSalary}K</p>
            <p>Max per year: ${job.maxSalary}K</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {job.tags.map((tag, index) => (
            <Badge key={index} variant="outline">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 bg-gray-50">
        <button 
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        onClick={() => handleApply(job._id)}>
          Apply Now
        </button>
      </CardFooter>
    </Card>
  );
};

export default JobListingCard;