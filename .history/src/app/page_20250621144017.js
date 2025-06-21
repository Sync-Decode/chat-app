'use client'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useIsDesktop } from '@/hooks/useIsDesktop'
import { useViewStore } from '@/store/store'
import 
const Home = () => {
  const sessionTest = true
  const renderHome = () => {
    if(!sessionTest){

    }

  }
  return (
    <>
      <h1>Lisp Chat</h1>
    </>
  )
}

export default Home
