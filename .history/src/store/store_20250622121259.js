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
    console.log(data.session.user.user)

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

//chat store
export const useChatStore = create((set) => ({
  chats: [],
  currentUserID: null,
  selectedChatId: null,
  otherUser: null,
  setOtherUser: (user) => set({ otherUser: user }),
  setSelectedChatId: (id) => set({ selectedChatId: id }),
  setSelectedChat: (chat) => set({ selectedChat: chat }),

  fetchChats: async () => {
    try {
      const session = await supabase.auth.getSession()
      const currentUserID = session.data.session?.user?.id
      set({ currentUserID })

      if (!currentUserID) {
        throw new Error('Not authenticated')
      }

      const { data, error } = await supabase
        .from('chat_members')
        .select('chats(*)')
        .eq('user_id', currentUserID)

      if (error) throw error

      const chats = data.map((item) => item.chats)

      set({ chats })

      console.log('Fetched full chats:', chats)

      console.log('Fetched Chats', data)
    } catch (err) {
      set({ error: err.message || 'Error fetching users chats' })
      console.error('Error fetching users chats:', err.message)
    }
  },

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
      if (error) throw error
      set({ users: data })
      console.log('USERS: ', data)

      return data
    } catch (err) {
      console.error('Could not fetch users', err.message)
    }
  },
  setUsers: (users) => {
    set({ users })
  },
}))

//uiStore.js

export const useUIStore = create((set) => ({
  selectedIcon: 'chats',
  setSelectedIcon: (icon) => set({ selectedIcon: icon }),
}))
