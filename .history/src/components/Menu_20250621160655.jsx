import React from 'react'
import supabase from '@/lib/supabase'
import { useSession } from '@/store/store'
import { useMenu } from '@/store/store'
import { useIsMobile } from '@/hooks/useIsMobile'

const Menu = () => {
  const fetchSession = useSession((s) => s.fetchSession)
  const setIsMenuHidden = useMenu((s) => s.setIsMenuHidden)
  const isMobile = useIsMobile((s) => s.isMobile)

  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error.message)
      return
    }
    fetchgetSession() // Refresh session after signout
  }

  return (
    <div
      className={`absolute top-0 left-5  bg-gray-900 h-full flex flex-col justify-between items-end p-4 ${
        isMobile ? 'w-3/4' : 'w-full'
      }`}
    >
      <div
        className="relative flex items-center justify-between "
        onClick={() => setIsMenuHidden((prev) => !prev)}
      >
        <div className="close__button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>

      <button onClick={handleSignout} className="bg-blue-600 px-4 py-2 rounded">
        Sign out
      </button>
    </div>
  )
}

export default Menu
