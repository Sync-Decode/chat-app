'use client'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useIsDesktop } from '@/hooks/useIsDesktop'
import { useViewStore } from '@/store/store'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Chat from '@/components/Chat'
import Profile from '@/components/Profile'
const Home = () => {
  const view = useViewStore((s) => s.view)
  const isMobile = useIsMobile()
  isDesktop 
  const router = useRouter()
  const sessionTest = null
  const renderHome = () => {
    if (!sessionTest) {
      router.push('/auth/signin')
      return
    }

    if (isMobile) {
      if (view === 'sidebar') return <Sidebar />
      if (view === 'chat') return <Chat />
      if (view === 'profile') return <Profile />
    }

    if (is)
  }
  return (
    <>
      <h1>Lisp Chat</h1>
      <div>{renderHome()}</div>
    </>
  )
}

export default Home
