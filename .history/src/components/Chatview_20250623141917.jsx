import { useEffect, useRef, useState } from 'react'
import supabase from '@/lib/supabase'
import { useChatStore, useViewStore, useUsersStore } from '@/store/store'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useIsDesktop } from '@/hooks/useIsDesktop'
import { IoArrowBack } from 'react-icons/io5'
import { IoIosSend } from 'react-icons/io'

export default function ChatView({ chatId }) {
  const setView = useViewStore((s) => s.setView)
  const isMobile = useIsMobile()
  const isDesktop = useIsDesktop()

  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const currentUserId = useChatStore((s) => s.currentUserID)
  const scrollRef = useRef()
  const otherUser = useChatStore((s) => s.otherUser)

  const avatarUrl = otherUser?.avatar_url || '/fallback-avatar.png'

  useEffect(() => {
    if (!chatId) return

    let interval = null
    let lastMessageAt = null

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select(
          `
        message_id,
        chat_id,
        sender_id,
        content,
        created_at,
        type,
        users (
          username,
          avatar_url
        )
      `
        )
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true })

      if (!error) {
        setMessages(data)
      }
    }

    const checkForNewMessages = async () => {
      const { data, error } = await supabase
        .from('chats')
        .select('last_message_at')
        .eq('chat_id', chatId)
        .single()

      if (!error && data?.last_message_at !== lastMessageAt) {
        lastMessageAt = data.last_message_at
        await supabase.rpc('insert_day_start_message', { p_chat_id: chatId })
        await fetchMessages()
      }
    }

    fetchMessages() // initial load
    interval = setInterval(checkForNewMessages, 3000) // poll every 3s

    return () => clearInterval(interval)
  }, [chatId])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const { data, error } = await supabase.rpc('send_message_and_update_chat', {
      p_chat_id: chatId,
      p_sender_id: currentUserId,
      p_content: newMessage,
    })

    if (error) {
      console.error('Failed to send message:', error.message)
      return
    }

    setNewMessage('')
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 flex flex-col  w-full h-full bg-transparent ">
      <div className="w-full flex flex-row justify-between gap-2 items-center bg-gray-100 text-black border-b border-gray-300 p-4  ">
        <div className="flex  items-center gap-2">
          {isMobile && (
            <div
              onClick={() => setView('sidebar')}
              className="ml-4 text-black flex gap-1 items-center cursor-pointer hover:underline"
            >
              <IoArrowBack />
            </div>
          )}

          <div className="flex items-center gap-2 w-8 h-8 rounded-full overflow-hidden ">
            <img src={avatarUrl} alt="avatar" className="bg-gray-900/10" />
          </div>

          <h5 className="">{otherUser?.username || ''}</h5>
        </div>

        {!isDesktop && (
          <p
            onClick={() => setView('profile')}
            className="ml-4 text-blue-600 cursor-pointer hover:underline"
          >
            View Profile
          </p>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-4 w-full overflow-y-auto p-4 space-y-3 bg-transparent">
        {messages.map((msg) => {
          const type = msg.type ?? 'user'

          if (type === 'system') {
            return (
              <div
                key={msg.message_id}
                className="text-center text-gray-500 text-xs my-2"
              >
                {msg.content}
              </div>
            )
          }

          return (
            <div
              key={msg.message_id}
              className={`flex items-start gap-2 ${
                msg.sender_id === currentUserId ? 'self-end' : 'self-start'
              }`}
            >
              <img
                src={msg.users?.avatar_url || 'fallback-avatar.png'}
                className={`w-5 h-5 rounded-full ${
                  msg.sender_id === currentUserId
                    ? 'order-2 ml-2'
                    : ''
                }`}
              />

              <div
                className={` max-w-xs px-4 py-2 rounded-lg text-sm shadow-md flex flex-col gap-2 ${
                  msg.sender_id === currentUserId
                    ? 'bg-amber-500 text-gray-900 self-end'
                    : 'bg-gray-200 text-black self-start'
                }`}
              >
                <p className="text-[10px] text-gray-600 mt-1">
                  {new Date(msg.created_at).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </p>
              </div>
            </div>
          )
        })}

        <div ref={scrollRef}></div>
      </div>

      <form
        onSubmit={handleSendMessage}
        className="sticky bottom-0 left-0 w-full flex items-center p-2 border-t border-gray-300 bg-gray-100 text-gray-900"
      >
        <div className="w-full rounded-full border border-gray-900 flex items-center bg-gray-100">
          <textarea
            rows={1}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 h-10 flex flex-wrap px-4 py-2 border-none rounded-full outline-none overflow-auto resize-none"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 rounded-full  text-white cursor-pointer"
          >
            <IoIosSend size={24} color="#111827" />
          </button>
        </div>
      </form>
    </div>
  )
}
