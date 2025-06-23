import { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import supabase from '@/lib/supabase'
import { useChatStore } from '@/store/store'

const ChatsList = () => {
  const currentUserID = useChatStore((s) => s.currentUserID)
  const chats = useChatStore((s) => s.chats)
  const setChats = useChatStore((s) => s.setChats)
  const [activeChat, setActiveChat] = useState(null)

  useEffect(() => {
    if (!currentUserID) return

    const fetchChats = async () => {
      // Step 1: Get all chats for current user
      const { data: userChats, error: chatError } = await supabase
        .from('chats')
        .select('chat_id, type, name, members, created_at')
        .contains('members', [currentUserID])
        .order('created_at', { ascending: false })

      if (chatError) {
        console.error('Error fetching chats:', chatError)
        return
      }

      // Step 2: Get all unique user IDs from all chats
      const allUserIds = new Set()
      userChats.forEach((chat) => {
        chat.members.forEach((id) => allUserIds.add(id))
      })

      // Step 3: Fetch all users in one go
      const { data: users, error: userError } = await supabase
        .from('users')
        .select('user_id, username, avatar_url')
        .in('user_id', Array.from(allUserIds))

      if (userError) {
        console.error('Error fetching users:', userError)
        return
      }

      // Step 4: Map user_id to profile
      const userMap = Object.fromEntries(users.map((u) => [u.user_id, u]))

      // Step 5: Format enriched chats
      const enrichedChats = userChats.map((chat) => ({
        ...chat,
        memberProfiles: chat.members.map((id) => userMap[id]),
        otherUser:
          chat.type === 'dm'
            ? userMap[chat.members.find((id) => id !== currentUserID)]
            : null,
      }))

      setChats(enrichedChats)
    }

    fetchChats()
  }, [currentUserID])

  // 📨 Load messages when activeChat changes
  useEffect(() => {
    if (!activeChat) return

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('message_id, sender_id, content, created_at')
        .eq('chat_id', activeChat.chat_id)
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error loading messages:', error)
        return
      }

      setMessages(data)
    }

    fetchMessages()
  }, [activeChat])

  const upsertChat = async () => {
    if (!currentUserID || !otherUserID) {
      console.warn('Missing user IDs — cannot upsert chat')
      return
    }

    const { data: chatId, error } = await supabase.rpc(
      'get_or_create_direct_chat',
      {
        user1: currentUserID,
        user2: otherUserID,
      }
    )

    if (chatId) {
      setSelectedChatId(chatId)
      setSelectedIcon('chats')
      setView('chat')
      console.log('CHAT CREATED')
    }

    if (error) console.error('upsert chat error', error.message)
  }

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
      <div className="flex flex-col gap-4 py-4">
        {chats.map((chat) => (
          <div
            key={chat.chat_id}
            className="bg-gray-800 p-3  shadow text-gray-100"
            
            {chat.type === 'dm' ? (
              <div className="flex items-center gap-3">
                <img
                  src={chat.otherUser?.avatar_url}
                  alt="avatar"
                  className="h-8 w-8 rounded-full"
                />
                <span>{chat.otherUser?.username}</span>
              </div>
            ) : (
              <div>
                <div className="font-semibold">{chat.name || 'Group Chat'}</div>
                <div className="text-sm text-gray-400">
                  {chat.memberProfiles.map((u) => u.username).join(', ')}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatsList
