import React from 'react'
import dynamic from 'next/dynamic';
import Loader from '@/components/Loader';
const ShowJobDetails = dynamic(() => import('./_components/ShowJobDetails'), {
  loading: () => <Loader />, // Fallback component while loading
  ssr: false, // Disable SSR for this component
});

async function StartupPage({params}: {params: {startupId: string}}) {

  const url = "http://localhost:3000/api/get-startup-by-id"
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({id: params.startupId})
  })
   
  const data = await res.json();
  
  return (
    <div>
      <ShowJobDetails jobData={data?.startup} />
    </div>
  )
}

export default StartupPage