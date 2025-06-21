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

  return (
    <div className="relative w-full h-full flex  bg-gray-900 text-white">
      <div className="flex-1 flex flex-col justify-start items-center gap-8 py-4 border-r border-gray-500/25">
        <div
          onClick={() => {
            setIsMenuHidden((prev) => !prev)
          }}
        >
          <Hamburger />
        </div>

        <div className="flex flex-col gap-6 px-4">
          <div
            onClick={() => {
              setSelectedIcon('chats')
              if(!isMenuHidden){
                
              }
              setIsMenuHidden((prev) => !prev)
            }}
            className="flex flex-col  gap-0.5 justify-center items-center  "
          >
            <PiChatsFill
              size={isMobile ? 32 : 24}
              style={{ color: selectedIcon === 'chats' ? color : 'white' }}
            />
            {!isMobile && <p className="text-xs">Chats</p>}
          </div>

          <div
            onClick={() => {
              setSelectedIcon('people')
              setIsMenuHidden((prev) => !prev)
            }}
            className="flex flex-col  gap-0.5 justify-center items-center "
          >
            <IoPeople
              size={isMobile ? 32 : 24}
              style={{ color: selectedIcon === 'people' ? color : 'white' }}
            />
            {!isMobile && <p className="text-xs">Users</p>}
          </div>
        </div>

        <div />
      </div>

      <div className="relative flex-5 h-full py-4 px-4 overflow-y-auto">
        {!isMenuHidden ? (
          <Menu />
        ) : (
          <div className="w-full h-full">
            {selectedIcon === 'people' && <UserList />}
            {selectedIcon === 'chats' && <ChatsList />}
          </div>
        )}
      </div>
    </div>
  )
}
