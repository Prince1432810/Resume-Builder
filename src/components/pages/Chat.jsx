import React from 'react'
import refresh from '../../assets/ChatAsset/refresh.svg'
import chat from '../../assets/ChatAsset/chat.svg'

const Chat = () => {
  return (
    <div className='h-[90vh] w-full flex mt-2'>
      <div className=' bg-white h-full min-w-95 rounded-lg p-2 pt-5.5 '>
        <strong className='text-gray-500'>Chats</strong><br />
        <input type="text" className='mt-2 border border-gray-200 rounded-sm text-sm w-full p-2.5' placeholder='Search Connection...'/>
        <div className='border-t border-gray-200 w-full mt-6 mb-4'></div>
        <img src={refresh} className='w-5' alt="refresh"/>
        <div className='text-xs text-gray-500 mt-6 place-self-center'>No new chat found</div>
      </div>

      <div className='ml-6 w-full h-full flex flex-col justify-center items-center bg-gray-200'>
        <img className='w-25' src={chat} alt="chat" />
        <p className='text-xl text-gray-400'>The messages you send and recieve appear here</p>
      </div>
    </div>
  )
}

export default Chat
