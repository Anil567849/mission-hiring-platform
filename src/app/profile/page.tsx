import React from 'react'
import Loader from '@/components/Loader'

// React.lazy is designed for client-side lazy loading. It delays the loading of components until they are rendered on the client.
// next/dynamic is specifically made for both client-side and server-side rendering in Next.js. 

import dynamic from 'next/dynamic';
const FounderProfile = dynamic(() => import('./_components/FounderProfile'), {
  loading: () => <Loader />, // Fallback component while loading
  ssr: false, // Disable SSR for this component
});

function profile() {
  return (
    <div className='min-h-screen min-w-screen flex justify-center'>
      <div className="min-w-[80vw]">
          <FounderProfile />
      </div>
    </div>
  )
}

export default profile