// components/Chat.js

import { useChatStore } from '@/store/store'
import ChatView from './Chatview'

const Chat = () => {
  //Chat panel component
  // This component serves as the main chat interface, displaying the selected chat and providing navigation options

  const selectedChatId = useChatStore((s) => s.selectedChatId)

  return (
    <div className="relative w-full h-full flex flex-col bg-gray-800 overflow-scroll ">
      <div className="absolute top-0 left-0 right-0 h-full -z-20 ">
        <img src="/bg-svg.svg" alt="bg" />
      </div>
      <div className="relative flex-1 w-full max-h-full flex flex-col bg-gray-100">
        {selectedChatId ? (
          <ChatView chatId={selectedChatId} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  )
}
export default Chat
