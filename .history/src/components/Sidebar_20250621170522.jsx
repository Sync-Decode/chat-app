import { useMenu, useViewStore } from '@/store/store'
import { useIsMobile } from '@/hooks/useIsMobile'
import { PiChatsFill } from 'react-icons/pi'
import { IoPeople } from 'react-icons/io5'
import Menu from './Menu'
import Hamburger from './Hamburger'
import UserList from './UserList'
import { useState } from 'react'

export default function Sidebar() {
  const usersIcon = useRef()
  const color = '#5d24f1'
  const setView = useViewStore((s) => s.setView)
  const isMenuHidden = useMenu((s) => s.isMenuHidden)
  const setIsMenuHidden = useMenu((s) => s.setIsMenuHidden)
  const isMobile = useIsMobile((s) => s.isMobile)
  const [selectedIcon, setSelectedIcon] = useState(null)

  return (
    <div className="relative w-full h-full flex  bg-gray-900 text-white">
      <div className="flex-1 flex flex-col justify-start items-center gap-8 py-4 border-r border-gray-500/25">
        <div onClick={() => setIsMenuHidden((prev) => !prev)}>
          <Hamburger />
        </div>

        <div className="flex flex-col gap-4">
          <PiChatsFill ref onClick={() => {}} size={32} style={{ color: color }} />

          <IoPeople ref={usersIcon} size={32} />
        </div>

        <div />
      </div>

      <div className="relative flex-5 h-full py-4 pl-4 overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Users</h3>
        </div>
        {!isMenuHidden && <Menu />}
        <UserList />
      </div>
    </div>
  )
}
