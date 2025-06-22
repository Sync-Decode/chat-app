'use client'
import React from 'react'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import supabase from '@/lib/supabase'

const ResetPassword = () => {
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <div className="w-full h-[75vh] flex flex-col max-w-5xl m-auto rounded-lg overflow-hidden  text-white ">
      <div className="w-full h-full flex flex-col justify-center items-center p-5 rounded-lg shadow-md">
        <div className='flex flex-col '>
          <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
          <p className="text-gray-600 mb-6">
            Please enter your new password to reset your account password.
          </p>
        </div>
        <form className="w-full max-w-sm">
          <input
            ref={passwordRef}
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            ref={confirmPasswordRef}
            type="password"
            placeholder="Confirm New Password"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
