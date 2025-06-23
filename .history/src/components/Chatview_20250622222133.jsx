import { useEffect, useRef, useState } from 'react'
import supabase from '@/lib/supabase'
import { useChatStore, useViewStore, useUsersStore } from '@/store/store'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useIsDesktop } from '@/hooks/useIsDesktop'
import { IoArrowBack } from 'react-icons/io5'

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
    users (
      username,
      avatar_url
    )
  `
        )
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true })

      if (!error) setMessages(data)
    }

    if (chatId) fetchMessages()
  }, [chatId])

  useEffect(() => {
    const channel = supabase
      .channel('test-connection')
      .on('presence', {}, () => {
        console.log('Presence callback')
      })
      .subscribe((status) => {
        console.log('Realtime channel test status:', status)
      })

    return () => supabase.removeChannel(channel)
  }, [])

  useEffect(() => {
    if (!chatId) return

    const channel = supabase
      .channel('messages-insert')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          console.log('Realtime payload:', payload)
          setMessages((prev) => [...prev, payload.new])
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status)
      })

    return () => {
      console.log('Unsubscribing...')
      supabase.removeChannel(channel)
    }
  }, [chatId])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    await supabase.from('messages').insert({
      chat_id: chatId,
      sender_id: currentUserId,
      content: newMessage,
    })

    setNewMessage('')
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 flex flex-col  w-full h-full bg-transparent ">
      <div className="w-full flex flex-row justify-between gap-2 items-center bg-gray-100 text-black border-b border-gray-300 p-4  mb-4">
        <div className="flex  items-center gap-2">
          {isMobile && (
            <div
              onClick={() => setView('sidebar')}
              className="ml-4 text-black flex gap-1 items-center cursor-pointer hover:underline"
            >
              <IoArrowBack />
            </div>
          )}
          <div className="flex items-center gap-2 w-5 h-5 rounded-full overflow-hidden">
            <img src={avatarUrl} width={48} height={32} alt="avatar" />
          </div>

          <h3 className="font-medium">{otherUser?.username || ''}</h3>
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

      <div className="flex-1 flex flex-col w-full overflow-y-auto p-4 space-y-3 bg-transparent">
        {messages.map((msg) => (
          <div
            key={msg.message_id}
            className={`flex items-start gap-2 ${
              msg.sender_id === currentUserId ? 'self-end' : 'self-start'
            }`}
          >
            {msg.users?.avatar_url && (
              <img
                src={msg.users.avatar_url}
                className="w-5 h-5 rounded-full"
              />
            )}
            <div
              className={` max-w-xs px-4 py-2 rounded-lg text-sm shadow-md ${
                msg.sender_id === currentUserId
                  ? 'bg-blue-500 text-white self-end'
                  : 'bg-gray-200 text-black self-start'
              }`}
            >
              <p>{msg.content}</p>
              <p className="text-[10px] text-gray-600 mt-1">
                {new Date(msg.created_at).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}

        <div ref={scrollRef}></div>
      </div>

      <form
        onSubmit={handleSendMessage}
        className="sticky bottom-0 left-0 w-full flex items-center p-2 border-t border-gray-300 bg-gray-100 text-black"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-full outline-none"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  )
}
