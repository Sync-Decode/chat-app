'use client'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useIsDesktop } from '@/hooks/useIsDesktop'
import { useViewStore } from '@/store/store'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Chat from '@/components/Chat'
import Profile from '@/components/Profile'
import Loading from '@/components/Loading'
const Home = () => {
  const view = useViewStore((s) => s.view)
  const isMobile = useIsMobile()
  const isDesktop = useIsDesktop()
  const router = useRouter()
  const sessionTest = true

  const renderHome = () => {
    // if (!sessionTest) {
    //   router.push('/auth/signin')
    //   return
    // }

    if (isMobile) {
      if (view === 'sidebar') return <Sidebar />
      if (view === 'chat') return <Chat />
      if (view === 'profile') return <Profile />
      return
    }

    if (isDesktop) {
      return (
        <div className="w-full h- flex gap-4 bg-amber-400">
          <div className="flex-1">
            <Sidebar />
          </div>

          <div className="flex-2">
            <Chat />
          </div>

          <div className="flex-1">
            <Profile />
          </div>
        </div>
      )
    }
    return <Loading />
  }
  return (
    <>
      <div>{renderHome()}</div>
    </>
  )
}

export default Home
