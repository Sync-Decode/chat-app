// components/Profile.js

import { useUserProfileStore, useViewStore } from '@/store/store'
import { useIsDesktop } from '@/hooks/useIsDesktop'

export default function Profile() {
  const setView = useViewStore((s) => s.setView)
  const isDesktop = useIsDesktop()
  const currentProfile = useUserProfileStore((s) => s.userProfile)

  return (
    <div className="w-full h-full flex flex-col  p-4 bg-gray-900 border-0">
      <h3 className="text-xl mb-4">User Profile</h3>
      <div className="flex-1 flex flex-col justify-start items-center py-8 gap-4">
        <div className="w-64 flex-shrink aspect-square rounded-full overflow-hidden">
          <img src="/fallback-avatar.png" alt="avatar" />
        </div>
      </div>

      {!isDesktop && (
        <button
          onClick={() => setView('chat')}
          className="bg-yellow-600 px-4 py-2 rounded"
        >
          Back to Chat
        </button>
      )}
    </div>
  )
}
