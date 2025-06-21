'use client'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useLoginViewStore } from '@/store/store'

const AuthPage = ({ children }) => {
  const isMobile = useIsMobile()
  const view = useLoginViewStore((s) => s.loginType)
  return (
    <div className="w-full h-[75vh] flex flex-col gap-4 max-w-5xl m-auto p-4 rounded-lg overflow-hidden outline outline-[#0d6cea]  text-white ">
      <div className="w-full h-full flex flex-1">
        {/* left */}
        <div className="w-full h-full flex-2 " id="left">
          <div className="w-full h-full flex justify-start items-center">
            {children}
          </div>
        </div>

        {/* right */}

        {!isMobile && (
          <div
            className="relative w-full h-full min-[768px]:flex-2 min-[1024px]:flex-3 bg-[#0d6cea] trapezoid-clip rounded-bl-2xl rounded-tl-2xl flex justify-center items-center"
            id="right"
          >
            {/* <img
              src="/bg.jpg"
              alt=""
              className="absolute top-0 left-0 filter:grayscale-[1] mix-blend-multiply"
            /> */}

            <div className="absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center backdrop:blur-lg">
              {view === 'signup' ? (
                <h1 className="text-3xl font-bold text-white">
                  Welcome to Lisp Chat
                </h1>
              ) : (
                <h1 className="text-3xl font-bold text-white"> Welcome Back</h1>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthPage
