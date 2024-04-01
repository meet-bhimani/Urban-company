import { useNavigate } from 'react-router-dom'
import Button from '../../common/Button'

const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <div className="w-svw h-svh bg-white grid place-items-center ">
      <div className="grid place-items-center gap-5">
        <div className="w-[min(75%,430px)]">
          <img src="/images/error-img.gif" alt="404 Error | Page Not Found" className="w-full" />
        </div>
        <div className="grid place-items-center gap-2 w-[min(90%,600px)] text-center">
          <p>We're sorry, we couldn't find what you were looking for!</p>
          <Button variant={'primary-outline'} rounded onClick={() => navigate('/')}>
            Go to homepage
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
