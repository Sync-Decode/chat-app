'use client'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useIsTablet } from '@/hooks/useIsTablet'
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
  const isTablet = useIsTablet
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

    if (isTablet) {
      return (
        <div className="w-screen max-w-screen-2xl h-svh flex gap-4 ">
          <div className="flex-1 w-full h-full">
            <Sidebar />
          </div>
          <div className="flex-2 w-full h-full"></div>
        </div>
      )
    }

    if (isDesktop) {
      return (
        <div className="w-screen max-w-screen-2xl h-svh flex gap-4 ">
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
