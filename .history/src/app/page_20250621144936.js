'use client'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useIsDesktop } from '@/hooks/useIsDesktop'
import { useViewStore } from '@/store/store'
import { useRouter } from 'next/navigation'
const Home = () => {
  const isMobile = useIsMobile
  const router = useRouter()
  const sessionTest = null
  const renderHome = () => {
    if (!sessionTest) {
      router.push('/auth/signin')
      return
    }

    if()
  }
  return (
    <>
      <h1>Lisp Chat</h1>
      <div>{renderHome()}</div>
    </>
  )
}

export default Home
