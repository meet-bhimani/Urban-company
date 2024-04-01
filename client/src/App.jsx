import React, { Suspense, useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { Router } from './routes'
import Loader from './components/common/Loader'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const router = Router(isAuthenticated)

  return (
    <>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  )
}

export default App
