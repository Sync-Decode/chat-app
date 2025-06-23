// components/Profile.js

import { useUserProfileStore, useViewStore } from '@/store/store'
import { useIsDesktop } from '@/hooks/useIsDesktop'
import { useEffect } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5'

export default function Profile() {
  const setView = useViewStore((s) => s.setView)
  const prevView = useViewStore((s) => s.prevView)
  const isDesktop = useIsDesktop()
  const currentProfile = useUserProfileStore((s) => s.userProfile)

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      const now = new Date()
      if (isNaN(date)) return ''
      else {
        const timeDiff = Math.abs(now - date)
        const minDiff = Math.floor(timeDiff / (1000 * 60))
        const hoursDiff = Math.floor(minDiff / 60)
        if (minDiff <= 1) {
          return 'just now'
        } else if (minDiff < 60) {
          return `${minDiff} minutes ago`
        } else if (hoursDiff < 23) {
          return `${hoursDiff} hours ago`
        } else
          return date.toLocaleString('en-US', {
            dateStyle: 'full',
            timeStyle: 'short',
            timeZone: 'EAT',
          })
      }
    } catch {
      return 'Invalid date'
    }
  }

  useEffect(() => {
    console.log('CURRENT PROFILE: ', currentProfile)
  }, [])

  return (
    <div className="w-full h-full flex flex-col border-l border-gray-500/25  p-4 bg-gray-900 border-0">
      {!currentProfile
        <div className="relative flex-1 flex flex-col justify-start items-center py-4 gap-4 bg-gray-900">
          <div className="flex justify-center items-center">
            {!isDesktop && (
              <div
                onClick={() => setView(prevView)}
                className="absolute left-4"
              >
                <IoArrowBackOutline size={24} />
              </div>
            )}
            <h3 className="text-xl text-center mb-4">User Profile</h3>
          </div>

          <div className="w-full py-4 flex justify-center items-center">
            <IoChatbubbleEllipsesOutline size={32} />
          </div>

          <div className="w-64 min-[768px]:w-32 flex-shrink aspect-square rounded-full overflow-hidden ">
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

          <div>
            <span className="text-gray-400">last seen:</span>{' '}
            {formatDate(currentProfile?.last_seen)}
          </div>
        </div>
      }
    </div>
  )
}
