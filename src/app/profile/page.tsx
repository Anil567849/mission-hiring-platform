import React from 'react'
import FounderProfile from './_components/FounderProfile'

function profile() {
  return (
    <div className='min-h-screen min-w-screen flex justify-center'>
      <div className="w-[80vw]">
        <FounderProfile />
      </div>
    </div>
  )
}

export default profile