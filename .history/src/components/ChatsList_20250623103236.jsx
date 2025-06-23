import { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import supabase from '@/lib/supabase'
import { useChatStore } from '@/store/store'

const ChatsList = () => {
  const currentUserID = useChatStore((s) => s.currentUserID)
  const otherUser = useChatStore((s) => s.otherUser)
  const chats = useChatStore((s))


  return (
    <div className="w-full h-full overflow-y-auto ">
      <form action="">
        <div className="relative flex">
          <input
            placeholder="Search chats..."
            type="text"
            className="w-full rounded-xl border border-gray-400 focus:outline-none px-4  py-2 text-xs placeholder:text-gray-500 "
          />
          <button className="absolute top-1/2 right-2 -translate-y-1/2">
            <CiSearch size={24} />
          </button>
        </div>
      </form>
      <div>
        {chats.map((chat) => (
          <div key={chat.chat_id} onClick={() => openChat(chat.chat_id)}>
            <img
              src={otherUser.avatar_url}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h4>{chat.username}</h4>
              <p className="text-sm text-gray-400">{chat.last_message}</p>
            </div>
            <span className="text-xs">{formatTime(chat.last_message_at)}</span>
          </div>
        ))}

        
      </div>
    </div>
  )
}

export default ChatsList
