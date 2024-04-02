import React from 'react'
import HelmetHeader from '../../common/HelmetHeader'

const Home = () => {
  return (
    <>
      <HelmetHeader title={'Urban Company'} description={'Urban Company - Get expert professional services at home'} />
      <h1 className="text-3xl">Home</h1>
      <img src="/images/logo.png" alt="Logo" width="500" height="500" />
    </>
  )
}

export default Home
