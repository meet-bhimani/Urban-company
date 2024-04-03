import React, { Suspense, useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { Router } from './routes'
import Loader from './components/common/Loader'
import { useSelector } from 'react-redux'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const router = Router(isAuthenticated)
  const { loader } = useSelector((state) => state.app)

  return (
    <>
      <Suspense fallback={<Loader />}>
        {loader && <Loader />}
        <RouterProvider router={router} />
      </Suspense>
    </>
  )
}

export default App
