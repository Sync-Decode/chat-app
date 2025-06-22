'use client'
import supabase from '@/lib/supabase'
import { toast } from 'react-toastify'
import { useSignupInfo } from '@/store/store'
import { useState } from 'react'

const ConfirmEmail = () => {
  const { email } = useSignupInfo((s) => s.email)
  const { password } = useSignupInfo((s) => s.password)
  const [isBtnHidden, setIsBtnHidden] = useState(false)

  const handleResendConfirmation = async () => {
    try {
      // Assuming you have a function to resend confirmation email
      const { error } = await supabase.auth.signup({
        email: email,
        password: password,
      })
      if (error) {
        throw error
      }
      toast.success('Confirmation email resent successfully!')
    } catch (error) {
      toast.error(`Error resending confirmation email: ${error.message}`)
    }
  }
  return (
    <div className="w-full h-[75vh] flex flex-col max-w-5xl m-auto rounded-lg overflow-hidden  text-gray-100 ">
      <div></div>
      <div className="w-full h-full flex flex-col  gap-4 justify-center items-center p-5 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Please Confirm Your Email</h1>
        <p className="text-gray-400 text-center mb-6">
          A confirmation link has been sent to your email. Please check your
          inbox and confirm your email address.
        </p>
        {!isBtnHidden && <button
          onClick={()=>{
            handleResendConfirmation()
          }}
          className="px-4 py-2 flex-none w-fit bg-amber-400 text-gray-900 rounded hover:bg-amber-500 transition-colors"
        >
          Resend Confirmation Email
        </button>}
      </div>
    </div>
  )
}

export default ConfirmEmail
