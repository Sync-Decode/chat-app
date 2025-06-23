import { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import supabase from '@/lib/supabase'
import { useChatStore } from '@/store/store'

const ChatsList = () => {
  const [chats, setChats] = useState([])
  const currentUserID = useChatStore((s) => s.currentUserID)
  const otherUser = useChatStore((s) => s.otherUser)
  const fetchChats = async () => {
    const { data, error } = await supabase.rpc('get_user_chats', {
      user_id: currentUserID,
    })
    if (data) {
      setChats(data)
      console.log('CHATS :', data)
    }
  }

  useEffect(() => {
    fetchChats()
  }, [])

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

         {users
        .filter((user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((user) => (
          <div
            key={user.user_id}
            className="p-2 border-b  border-b-slate-700 hover:bg-gray-800"
            onClick={async () => {
              handleUser(user)
              console.log('Selected user:', user)
              setOtherUser(user)
              setView('profile')
            }}
          >
            <div className="flex p-4 items-center gap-4  cursor-pointer ">
              {user.avatar_url?.trim() ? (
                <img src={user.avatar_url} className="w-8 h-8 rounded-full" />
              ) : (
                <img
                  src="/fallback-avatar.png"
                  className="w-8 h-8 rounded-full"
                />
              )}

              <p>{user.username || user.email}</p>
              {user.is_online && (
                <span className="text-amber-400 text-xs ml-2 flex-1">●</span>
              )}
              {/* <div className="" onClick={() => handleUser(user)}>
              <IoChatbubbleEllipsesOutline width={32} height={32} />
            </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatsList
