import React from 'react'
import ShowJobDetails from './_components/ShowJobDetails';

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