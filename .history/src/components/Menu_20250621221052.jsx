import React from 'react'
import supabase from '@/lib/supabase'
import { useSession } from '@/store/store'
import { useMenu } from '@/store/store'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useRouter } from 'next/navigation'

const Menu = () => {
  const fetchSession = useSession((s) => s.fetchSession)
  const setIsMenuHidden = useMenu((s) => s.setIsMenuHidden)
  const router = useRouter()

  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error.message)
      return
    }
    router.refresh()
    await fetchSession() // Refresh session after signout
  }

  return (
    <div className="w-full h-full overflow-y-auto ">
      <div
        className="relative flex items-center justify-between "
        onClick={() => setIsMenuHidden((prev) => !prev)}
      >
        {/*  */}
      </div>

      <p onClick={handleSignout} className="hover:text-amber-400">
        Sign out
      </p>
    </div>
  )
}

export default Menu
