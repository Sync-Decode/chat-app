// components/Profile.js

import { useViewStore } from '@/store/store'
import { useIsDesktop } from '@/hooks/useIsDesktop'

export default function Profile() {
  const setView = useViewStore((s) => s.setView)
  const isDesktop = useIsDesktop()

  return (
    <div className="w-full h-full  p-4 bg-gray-900 text-white border-0">
      <h4 className="text-xl mb-4">User Profile</h4>
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
