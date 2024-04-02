import React from 'react'

const Footer = () => {
  return (
    <div className="py-2 w-[90%] mx-auto">
      <p className="text-center text-xs sm:text-sm flex flex-col xsm:flex-row items-center justify-center gap-2">
        &copy; Copyright {new Date().getFullYear()} Urban Company |<span>All rights reserved</span>
      </p>
    </div>
  )
}

export default Footer
