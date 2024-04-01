import React, { Suspense, useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { Router } from './routes'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const router = Router(isAuthenticated)

  return (
    <>
      <Suspense fallback={<h1>Page is Loading...</h1>}>
        {/* <RouterProvider router={router} /> */}
        <div className="w-svw h-svh grid place-items-center text-white">
          <button className="w-24 h-10 bg-green bg-opacity-90 hover:bg-opacity-100  font-roboto">
            Me app hu
          </button>
        </div>
      </Suspense>
    </>
  )
}

export default App
