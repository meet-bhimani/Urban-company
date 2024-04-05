import React, { Suspense, useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { Router } from './routes'
import Loader from './components/common/Loader'
import { useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const router = Router()
  const { loader } = useSelector((state) => state.app)

  if (loader) {
    return <Loader />
  }

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Toaster position="top-center" reverseOrder={false} />
        <RouterProvider router={router} />
      </Suspense>
    </>
  )
}

export default App
