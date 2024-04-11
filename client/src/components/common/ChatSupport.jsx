import { useSelector } from 'react-redux'

const ChatSupport = () => {
  const { isAuth, user } = useSelector((state) => state.role)
  const whatsappWebURL =
    window.innerWidth <= 768
      ? 'whatsapp://send?phone=919601063644&text=Hi%2C%20I%20would%20like%20to%20request%20chat%20support%20for%20Urban%20Company'
      : 'https://web.whatsapp.com/send?phone=919601063644&text=Hi%2C%20I%20would%20like%20to%20request%20chat%20support%20for%20Urban%20Company'

  if (isAuth && user.role === 'admin') return

  return (
    <a href={whatsappWebURL} target="_blank" className="group relative w-full">
      <img src="/images/whatsapp.png" alt="Chat Support" className="w-8" />
      <div className="hidden group-hover:block absolute right-full mr-1 text-sm top-1/2 -translate-y-1/2 min-w-[100px] bg-[#54b258] text-white rounded-lg px-2 py-1">
        Chat Support
      </div>
    </a>
  )
}

export default ChatSupport
