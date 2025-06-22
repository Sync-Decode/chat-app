// store/viewStore.js
import { create } from 'zustand'
import supabase from '@/lib/supabase'

//view store
export const useViewStore = create((set) => ({
  view: 'sidebar', // 'sidebar' | 'chat' | 'profile'
  setView: (view) => set({ view: view }),
}))

// login view store
export const useLoginViewStore = create((set) => ({
  loginType: 'signin',
  setLoginType: (type) => set({ loginType: type }),
}))

//session store
export const useSession = create((set) => ({
  session: null,
  hasFetchedSession: false,
  user: null,
  metadata: null,

  fetchSession: async () => {
    const { data, error } = await supabase.auth.getSession()

    if (error || !data?.session) {
      console.warn('No active session or error:', error)
      set({ session: null, hasFetchedSession: true })
      return null
    }

    console.log(data.session)

    const user = data.session.user

    // Optional: ensure metadata is not null
    const metadata = user.user_metadata || {}

    await supabase.from('users').upsert({
      user_id: user.id,
      email: user.email,
      username: metadata.name || '',
      avatar_url: metadata.avatar_url || '',
    })

    set({
      session: data.session,
      hasFetchedSession: true,
      user: user,
      metadata: metadata,
    })
    return data.session
  },
}))

//menu store
export const useMenu = create((set) => ({
  isMenuHidden: true,
  setIsMenuHidden: () =>
    set((state) => ({
      isMenuHidden: !state.isMenuHidden,
    })),
}))

// signup store
export const useSignupInfo = create((set) => ({
  username: '',
  setUsername: (username) => set({ username }),
  email: '',
  setEmail: (email) => set({ email }),
  password: '',
  setPassword: (password) => set({ password }),
}))

// users store
export const useUsersStore = create((set) => ({
  users: [],
  error: null,
  currentUserID: null,

  fetchUsers: async () => {
    try {
      const session = supabase.auth.getSession()
      const currentUserID = session.data.session?.user?.id
      set({ currentUserID })

      if (!currentUserID) {
        throw new Error('Not authenticated')
      }

      const { data, error } = await supabase
        .from('users')
        .select('user_id, username, avatar_url, is_online, email')
        .neq('user_id', currentUserID)

      if (error) throw error

      set({ users: data })
      console.log('FetchedUsers', data)
    } catch (err) {
      set({ error: err.message || 'Error fetching users' })
      console.error('Error fetching users:', err.message)
    }
  },
}))

//chat store
export const useChatStore = create((set) => ({
  selectedChatId: null,
  otherUser: null,
  setOtherUser: (user) => set({ otherUser: user }),
  setSelectedChatId: (id) => set({ selectedChatId: id }),
  setSelectedChat: (chat) => set({ selectedChat: chat }),
  fetchChat: async (chatId) => {
    try {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .eq('chat_id', chatId)
        .single()

      if (error) throw error

      set({ selectedChat: data })
      console.log('Fetched chat:', data)
    } catch (err) {
      console.error('Error fetching chat:', err.message)
    }
  },
}))

export const useUsersStore = create((set) => ({
  users: [],
  fetchUsers: async () => {
    try {
      const { data, error } = await supabase.from('users').select('*')
      if (data) {
        set({ users: data })
      }
      console.log('USERS: ', data)
      if (error) {
        throw error
      }
      return data
    } catch (err) {
      console.error('Could not fetch users', err.message)
    }
  },
  setUsers: () => ({ s }),
}))
