'use client'
import { useLoginViewStore } from '@/store/store'
import { useRef, useState } from 'react'
import Logo from './Logo'
import Link from 'next/link'

import { toast } from 'react-toastify'
import supabase from '@/lib/supabase'
import GoogleSignin from './GoogleSignin'
import { useSession } from '@/store/store'

import { useRouter } from 'next/navigation'

const Signin = () => {
  const router = useRouter()
  const emailRef = useRef()
  const passwordRef = useRef()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const setLoginType = useLoginViewStore((s) => s.setLoginType)

  const handleSubmit = async (e) => {
    e.preventDefault()

    let isValid = true

    // Email Validation
    if (email.trim() === '') {
      emailRef.current.focus()
      emailRef.current.classList.add('border-red-500')
      emailRef.current.classList.remove('border-sky-200')
      toast.warning('Email is required.')
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailRef.current.focus()
      emailRef.current.classList.add('border-red-500')
      emailRef.current.classList.remove('border-sky-200')
      toast.warning('Please enter a valid email address.')
      isValid = false
    } else {
      emailRef.current.classList.remove('border-red-500')
      emailRef.current.classList.add('border-green-500')
    }

    // Password Validation
    if (password.trim() === '') {
      passwordRef.current.focus()
      passwordRef.current.classList.add('border-red-500')
      passwordRef.current.classList.remove('border-sky-200')
      toast.warning('Password is required.')
      isValid = false
    } else if (password.length < 8) {
      passwordRef.current.focus()
      passwordRef.current.classList.add('border-red-500')
      passwordRef.current.classList.remove('border-sky-200')
      toast.warning('Password must be at least 8 characters long.')
      isValid = false
    } else {
      passwordRef.current.classList.remove('border-red-500')
      passwordRef.current.classList.add('border-green-500')
    }

    if (!isValid) return

    // Sign in with Supabase
    const { error } = await supabase.auth.signIn({
      email,
      password,
    })

    if (error) {
      console.error('Error signing in:', error.message)
      toast.error('Failed to sign in. Please check your credentials.')
      emailRef.current.classList.add('border-red-500')
      passwordRef.current.classList.add('border-red-500')
      return
    }
    // Successful sign in

    toast.success('Successfully signed in!')
    setEmail('')
    setPassword('')

    const session = supabase.auth.getSession()
    useSession.setState({ session: session })
    console.log('Session:', session)

    router.replace('/')
  }

  const handleSwithToSignup = () => {
    router.push('/auth/signup')
  }

  return (
    <div
      className="relative w-full h-full flex flex-col justify-center items-center flex-2 gap-4 p-5 bg-gray-900"
      id="left"
    >
      <div className="absolute top-4 left-1/2 -translate-x-1/2 ">
        <Logo />
      </div>

      <h2 className="text-xl mb-4">Welcome back</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-md:max-w-xl flex flex-col px-4 gap-4"
      >
        <input
          ref={emailRef}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            emailRef.current.classList.remove('border-red-500')
            emailRef.current.classList.add('border-sky-200')
            emailRef.current.classList.remove('border-green-500')
          }}
          type="text"
          placeholder="Email"
          className="outline-0 border-0 border-gray-200/25 border-b-[1px] w-full p-2 bg-transparent focus:outline-accent focus:bg-transparent"
        />

        

        <button
          type="submit"
          className="w-full p-2 border-0 mt-4 bg-amber-400 px-4 py-2 "
        >
          Sign in
        </button>
      </form>

      <GoogleSignin />

      <button onClick={handleSwithToSignup} className="bg-transparent">
        Switch to signup
      </button>
    </div>
  )
}

export default Signin
