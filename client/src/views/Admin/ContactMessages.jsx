import React, { useEffect, useState } from 'react'
import { getContactMessages, markMessageReviewed } from '../../api/contactMessageApi'
import Button from '../../components/common/Button'
import HelmetHeader from '../../components/common/HelmetHeader'
import toast from 'react-hot-toast'

const ContactMessages = () => {
  const [messages, setMessages] = useState([])
  // const [messageIdToBeReviewd]

  const fetchMessages = async () => {
    try {
      const { success, data, error } = await getContactMessages()
      if (!success) throw new Error(error.message || 'Error fetching message')
      setMessages(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleReview = async (id) => {
    try {
      const { success, error } = await markMessageReviewed(id)
      if (!success) throw new Error(error.message || 'Error reviewing message')
      toast.success('Message reviewed successfully')
      fetchMessages()
    } catch (error) {
      console.error(error)
      toast.error('Error reviewing message! try again')
    }
  }

  return (
    <>
      <HelmetHeader
        title={'Contact Messages | Urban Company'}
        description={'admin can see all the contact messages sent by the user and mark then reviewed'}
      />
      <div className="w-3/4 mx-auto my-10 mb-16">
        {messages.length === 0 ? (
          <p className="text-xl md:text-2xl text-center mt-10">No messages received from users yet!</p>
        ) : (
          <>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-center my-2">Contact Messages</h2>
            {messages.map((message) => (
              <div key={message.id} className="bg-secondary shadow-md rounded-lg p-4 mb-6">
                <div>
                  <h3 className="text-lg font-semibold">{message.name}</h3>
                  <p className="text-gray-500">{message.email}</p>
                </div>
                <div className="mt-2">
                  <p className="text-gray-700">{message.message}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Received on: {message.timestamp}</p>
                </div>
                <div className="mt-2">
                  <Button
                    variant={message.reviewed ? 'disabled' : 'primary'}
                    size={'sm'}
                    rounded={true}
                    onClick={message.reviewed ? () => {} : () => handleReview(message.id)}
                  >
                    {message.reviewed ? 'Reviewed' : 'Review'}
                  </Button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default ContactMessages
