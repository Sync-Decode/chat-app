import { useUsersStore } from '@/store/store'
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5'
import { useEffect } from 'react'
import supabase from '@/lib/supabase'
import { useChatStore, useViewStore } from '@/store/store'
import { CiSearch } from 'react-icons/ci'
import { v4 as uuidv4 } from 'uuid' // if generating UUIDs manually

export default function UserList() {
  const setView = useViewStore((s) => s.setView)
  const users = useUsersStore((s) => s.users)
  const setOtherUser = useChatStore((s) => s.setOtherUser)
  const setSelectedChatId = useChatStore((s) => s.setSelectedChatId)

  useEffect(() => {
    setSelectedChatId()
  }, [])

  const handleUpsertChat = async (user) => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    const currentUserID = session?.user?.id
    const otherUserID = user?.id

    if (!currentUserID || !otherUserID) {
      console.error('User IDs missing')
      return
    }

    const { data, error } = await supabase
      .from('chats')
      .upsert(
        [
          {
            chat_id,
            name: user.username,
            type: 'dm',
            created_at: new Date().toISOString(), // optional
            created_by: currentUserID,
          },
        ],
        { onConflict: ['chat_id'] }
      )
      .select() // so you get the resulting data back

    if (error) {
      console.error('Upsert chat error:', error.message)
    } else {
      console.log('Upserted chat:', data[0])
    }
  }

  return (
    <div className="w-full h-full overflow-y-auto ">
      <form action="">
        <div className="relative flex">
          <input
            placeholder="Search users..."
            type="text"
            className="w-full rounded-xl border border-gray-400 focus:outline-none px-4  py-2 text-xs placeholder:text-gray-500 "
          />
          <button className="absolute top-1/2 right-2 -translate-y-1/2">
            <CiSearch size={24} />
          </button>
        </div>
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
