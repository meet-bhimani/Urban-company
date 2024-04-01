import React from 'react'
import { PropagateLoader } from 'react-spinners'

const Loader = () => {
  return (
    <>
      <div className="w-svw h-svh grid place-items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[rgba(0,0,0,0.05)] z-[100]">
        <div className="grid place-items-center gap-5">
          <p>Urban Company</p>
          <PropagateLoader size={8} speedMultiplier={0.8} />
        </div>
      </div>
    </>
  )
}

export default Loader
