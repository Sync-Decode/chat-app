// components/Profile.js

import { useUserProfileStore, useViewStore } from '@/store/store'
import { useIsDesktop } from '@/hooks/useIsDesktop'
import { useEffect } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'

export default function Profile() {
  const setView = useViewStore((s) => s.setView)
  const prevView = useViewStore((s) => s.prevView)
  const isDesktop = useIsDesktop()
  const currentProfile = useUserProfileStore((s) => s.userProfile)
  useEffect(() => {
    console.log('CURRENT PROFILE: ', currentProfile)
  }, [])

  return (
    <div className="w-full h-full flex flex-col border-l border-gray-500/25  p-4 bg-gray-900 border-0">
      <div className="relative flex-1 flex flex-col justify-start items-center py-4 gap-4 bg-gray-900">
        <div className="flex justify-center items-center">
          {!isDesktop && (
            <div onClick={() => setView(prevView)} className="absolute left-4">
              <IoArrowBackOutline size={24} />
            </div>
          )}
          <h3 className="text-xl text-center mb-4">User Profile</h3>
        </div>

        <div className="w-64 flex-shrink aspect-square rounded-full overflow-hidden">
          <img
            src={currentProfile?.avatar_url || '/fallback-avatar.png'}
            alt="avatar"
          />
        </div>

        <div className="flex flex-col gap-2 ">
          <h4 className="text-center">
            {currentProfile?.username || 'username'}
          </h4>
          <p className="max-w-[48ch]">{currentProfile?.bio || 'bio'}</p>
        </div>

        <div>{
          const time 
          }</div>
      </div>
    </div>
  )
}
