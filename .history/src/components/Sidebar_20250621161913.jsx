import { useMenu, useViewStore } from '@/store/store'
import { useIsMobile } from '@/hooks/useIsMobile'
import Menu from './Menu'
import Hamburger from './Hamburger'
import UserList from './UserList'

export default function Sidebar() {
  const setView = useViewStore((s) => s.setView)
  const isMenuHidden = useMenu((s) => s.isMenuHidden)
  const setIsMenuHidden = useMenu((s) => s.setIsMenuHidden)
  const isMobile = useIsMobile((s) => s.isMobile)

  return (
    <div className="relative w-full h-full flex  gap-4 p-4 bg-gray-900 text-white">
      <div className="flex-1 ">
        <div onClick={() => setIsMenuHidden((prev) => !prev)}>
          <Hamburger />
        </div>
      </div>

      {!isMenuHidden && <Menu />}

      <div className="flex-5 bg-amber-400 h-fit">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Users</h3>
        </div>
        <UserList />
      </div>
    </div>
  )
}
