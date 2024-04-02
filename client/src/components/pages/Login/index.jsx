import { useState } from 'react'
import InputWithLabel from '../../common/InputWithLabel'
import Button from '../../common/Button'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add login logic here
  }

  const handleReset = () => {
    setFormData({ email: '', password: '' })
  }

  return (
    <>
      <div className="grid mt-10 place-items-center w-[90%] mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl mb-6">Login to Urban Company</h2>
        <form onSubmit={handleSubmit} onReset={handleReset} className="space-y-4 w-[min(90%,550px)]">
          <InputWithLabel
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputWithLabel
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="flex gap-3 justify-start items-center">
            <Button variant={'primary'} rounded>
              Login
            </Button>
            <Button variant={'danger-outline'} rounded type="reset">
              Reset
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
