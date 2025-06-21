import { useUsersStore } from '@/store/store'
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5'
import { useEffect } from 'react'
import supabase from '@/lib/supabase'
import { useChatStore, useViewStore } from '@/store/store'

export default function UserList() {
  const setView = useViewStore((s) => s.setView)
  const users = useUsersStore((s) => s.users)
  const fetchUsers = useUsersStore((s) => s.fetchUsers)
  const setSelectedChatId = useChatStore((s) => s.setSelectedChatId)
  const setOtherUser = useChatStore((s) => s.setOtherUser)

  useEffect(() => {
    fetchUsers()
    console.log('Users :', users)
  }, [])

  useEffect(() => {
    console.log('Users fetched:', users)
  }, [users])

  const fetchMessages = async (chatId) => {
    const { data, error } = await supabase
      .from('messages')
      .select('message_id, sender_id, content, created_at, edited_at')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching messages:', error.message)
      return []
    }

    return data
  }

  const handleUpsertChat = async (otherUser) => {
    const currentUserId = useUsersStore.getState().currentUserID

    if (!currentUserId || !otherUser.user_id) return

    // Step 1: Check if a chat exists with exactly these 2 members
    const { data: existingChats, error: chatFetchError } = await supabase
      .from('chat_members')
      .select('chat_id')
      .in('user_id', [currentUserId, otherUser.user_id])

    if (chatFetchError) {
      console.error('Failed to fetch chat memberships', chatFetchError)
      return null
    }

    const chatCount = existingChats.reduce((acc, curr) => {
      acc[curr.chat_id] = (acc[curr.chat_id] || 0) + 1
      return acc
    }, {})

    const existingChatId = Object.entries(chatCount).find(
      ([, count]) => count === 2
    )?.[0]

    if (existingChatId) {
      setSelectedChatId(existingChatId)
      const { data: chat } = await supabase
        .from('chats')
        .select('*')
        .eq('chat_id', existingChatId)
        .single()

      return chat
    }

    // Step 2: Create new chat
    const { data: newChat, error: createError } = await supabase
      .from('chats')
      .insert({
        type: 'dm',
        created_by: currentUserId,
      })
      .select()
      .single()

    if (createError) {
      console.error('Failed to create chat', createError)
      return null
    }

    // Step 3: Add both users to chat_members
    const { error: memberInsertError } = await supabase
      .from('chat_members')
      .insert([
        {
          chat_id: newChat.chat_id,
          user_id: currentUserId,
          role: 'admin',
        },
        {
          chat_id: newChat.chat_id,
          user_id: otherUser.user_id,
          role: 'member',
        },
      ])

    if (memberInsertError) {
      console.error('Failed to add members', memberInsertError)
      return null
    }

    return newChat
  }

  return (
    <div className="w-full h-full overflow-y-auto ">
      <form action="">
        <input type="text" className='rounded-xl border border-gray-400 focus:outline-none p-'/>
      </form>
      {users.map((user) => (
        <div
          key={user.user_id}
          className="p-2 border-b  border-b-slate-700 hover:bg-gray-800"
          onClick={async () => {
            handleUpsertChat(user)
            console.log('Selected user:', user)
            setOtherUser(user)
            setView('chat')
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

            <span>{user.username || user.email}</span>
            {user.is_online && (
              <span className="text-green-500 text-xs ml-2">● Online</span>
            )}
            <div className="self-end" onClick={() => handleUpsertChat(user)}>
              <IoChatbubbleEllipsesOutline width={32} height={32} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
