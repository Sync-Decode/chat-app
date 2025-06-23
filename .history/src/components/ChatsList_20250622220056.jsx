import { CiSearch } from 'react-icons/ci'

const ChatsList = () => {
  const fetchChats = async () => {
    const { data, error } = await supabase.rpc('get_user_chats', {
      user_id: currentUserID,
    })
  }

  useEf

  return (
    <div className="w-full h-full overflow-y-auto ">
      <form action="">
        <div className="relative flex">
          <input
            placeholder="Search chats..."
            type="text"
            className="w-full rounded-xl border border-gray-400 focus:outline-none px-4  py-2 text-xs placeholder:text-gray-500 "
          />
          <button className="absolute top-1/2 right-2 -translate-y-1/2">
            <CiSearch size={24} />
          </button>
        </div>
      </form>
      <div></div>
    </div>
  )
}

export default ChatsList
