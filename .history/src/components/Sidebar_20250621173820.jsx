'use client'
import { useMenu, useViewStore } from '@/store/store'
import { useIsMobile } from '@/hooks/useIsMobile'
import { PiChatsFill } from 'react-icons/pi'
import { IoPeople } from 'react-icons/io5'
import Menu from './Menu'
import Hamburger from './Hamburger'
import UserList from './UserList'
import { useState, useRef, useEffect } from 'react'
import ChatsList from './ChatsList'

export default function Sidebar() {
  const usersIcon = useRef()
  const chatsRef = useRef()
  const color = '#5d24f1'
  const setView = useViewStore((s) => s.setView)
  const isMenuHidden = useMenu((s) => s.isMenuHidden)
  const setIsMenuHidden = useMenu((s) => s.setIsMenuHidden)
  const isMobile = useIsMobile((s) => s.isMobile)
  const [selectedIcon, setSelectedIcon] = useState('chats')

  useEffect(()=>{})

  return (
    <div className="relative w-full h-full flex  bg-gray-900 text-white">
      <div className="flex-1 flex flex-col justify-start items-center gap-8 py-4 border-r border-gray-500/25">
        <div
          onClick={() => {
            setIsMenuHidden((prev) => !prev)
            setSelectedIcon('menu')
          }}
        >
          <Hamburger />
        </div>

        <div className="flex flex-col gap-4">
          <PiChatsFill
            onClick={() => {
              setSelectedIcon('chats')
            }}
            size={32}
            style={{ color: selectedIcon === 'chats' ? color : 'white' }}
          />

          <IoPeople
            onClick={() => {
              setSelectedIcon('people')
            }}
            size={32}
            style={{ color: selectedIcon === 'people' ? color : 'white' }}
          />
        </div>

        <div />
      </div>

      <div className="relative flex-5 h-full py-4 pl-4 overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between"></div>

        <div className="w-full h-full">
          {!isMenuHidden && selectedIcon === 'menu' && <Menu />}
          {selectedIcon === 'people' && <UserList />}
          {selectedIcon === 'chats' && <ChatsList />}
        </div>
      </div>
    </div>
  )
}
