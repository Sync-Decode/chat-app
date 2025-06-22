'use client'
import React, { useState, useRef } from 'react'
import { toast } from 'react-toastify'
import supabase from '@/lib/supabase'
const ForgotPassword = () => {
  React.useEffect(() => {
    document.title = 'Lisp Chat - Forgot Password'
  }, [])

  const [email, setEmail] = useState('')
  const inputRef = useRef(null)

  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email address.')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address.')
      return
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/auth/reset-password',
    })
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Password reset email sent successfully!')
      setEmail('')
    }
  }

  return (
    <div className="w-full h-[75vh] flex flex-col max-w-5xl m-auto rounded-lg overflow-hidden  text-gray-100 ">
      <div className="w-full h-full flex flex-col gap-8  justify-center items-center p-5 rounded-lg shadow-md">
        <div className="flex flex-col gap-4 ">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Forgot Password
          </h1>
          <p className="text-gray-400 mb-6 text-center">
            Please enter your email address to reset your password.
          </p>
        </div>
        <form className="w-full max-w-sm flex flex-col gap-4">
          <input
            ref={inputRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 mb-4 border border-amber-400 rounded outline-none"
            required
          />
          <button
            type="submit"
            onClick={handleResetPassword}
            className="w-full px-4 py-2 bg-amber-400  rounded hover:bg-amber-500transition text-gray-900"
          >
            <span>Reset Password</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
