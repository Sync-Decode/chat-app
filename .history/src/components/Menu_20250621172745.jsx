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
    <div className="w-full h-full overflow-y-auto ">
      <div
        className="relative flex items-center justify-between "
        onClick={() => setIsMenuHidden((prev) => !prev)}
      >
        {/*  */}
      </div>

      <button onClick={handleSignout} className="bg-blue-600 px-4 py-2 rounded">
        Sign out
      </button>
    </div>
  )
}

export default Menu
