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
    <div className="relative w-full h-full flex bg-gray-900 text-white">
      <div className="flex-1 flex flex-col justify-start it  border-r">
        <div onClick={() => setIsMenuHidden((prev) => !prev)}>
          <Hamburger />
        </div>
      </div>

      <div className="relative flex-5 h-full pl-4 overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Users</h3>
        </div>
        {!isMenuHidden && <Menu />}
        <UserList />
      </div>
    </div>
  )
}
