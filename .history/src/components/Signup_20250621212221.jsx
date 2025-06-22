import { useRef, useState } from 'react'
import Logo from './Logo'
import { toast } from 'react-toastify'
import supabase from '@/lib/supabase'
import GoogleSignin from './GoogleSignin'
import { useSession, useSignupInfo, useLoginViewStore } from '@/store/store'
import { useRouter } from 'next/navigation'

const Signup = () => {
  const router = useRouter()

  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {
    setUsername: setSignupUsername,
    setEmail: setSignupEmail,
    setPassword: setSignupPassword,
  } = useSignupInfo()

  const handleSubmit = async (e) => {
    e.preventDefault()

    let isValid = true

    // Username Validation
    if (username.trim() === '') {
      usernameRef.current.focus()
      usernameRef.current.classList.add('border-red-500')
      usernameRef.current.classList.remove('border-sky-200')
      toast.warning('Username is required.')
      isValid = false
    } else if (username.length < 3) {
      usernameRef.current.focus()
      usernameRef.current.classList.add('border-red-500')
      usernameRef.current.classList.remove('border-sky-200')
      toast.warning('Username must be at least 3 characters long.')
      isValid = false
    } else {
      usernameRef.current.classList.remove('border-red-500')
      usernameRef.current.classList.add('border-green-500')
    }

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

    // If validation fails, stop
    if (!isValid) return

    // Create user in Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    })

    if (data) {
      await supabase.from('users').upsert([
        {
          user_id: data.id,
          username: data.user_metadata?.username ?? username,
          email: data.email,
        },
      ])
      console.log('User created:', data)
    }

    if (error) {
      console.error('Error signing up:', error.message)
      toast.error('Failed to sign up. Please try again.')
      return
    }

    toast.success('Successfully signed up!')
    setUsername('')
    setEmail('')
    setPassword('')

    

    setSignupUsername(username)
    setSignupEmail(email)
    setSignupPassword(password)

    router.replace('/auth/verify')
  }

  const handleSwitchToSignin = () => {
    router.push('/auth/signin')
  }

  return (
    <div
      className="relative w-full h-full flex flex-col justify-center items-center flex-2 gap-4 py-4 bg-gray-900"
      id="left"
    >
      <div className="">
        <Logo />
      </div>

      <h2 className="text-xl mb-4">Create an acoount</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-md:max-w-xl flex flex-col py-12 px-4 gap-6 "
      >
        <input
          ref={usernameRef}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            usernameRef.current.classList.remove('border-red-500')
            usernameRef.current.classList.remove('border-green-500')
            usernameRef.current.classList.add('border-sky-200')
          }}
          type="text"
          placeholder="Username"
          className="outline-0 border-0 border-gray-200/25 border-b-[1px] w-full text-sm placeholder:text-sm p-2 bg-transparent focus:outline-accent focus:bg-transparent placeholder:text-gray-400"
        />

        <input
          ref={emailRef}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            emailRef.current.classList.remove('border-red-500')
            emailRef.current.classList.remove('border-green-500')
            emailRef.current.classList.add('border-sky-200')
          }}
          type="text"
          placeholder="Email"
          className="outline-0 border-0 border-gray-200/25 border-b-[1px] w-full text-sm placeholder:text-sm p-2 bg-transparent focus:outline-accent focus:bg-transparent placeholder:text-gray-400"
        />

        <input
          ref={passwordRef}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            passwordRef.current.classList.remove('border-red-500')
            passwordRef.current.classList.remove('border-green-500')
            passwordRef.current.classList.add('border-sky-200')
          }}
          type="password"
          placeholder="Password"
          className="outline-0 border-0 border-gray-200/25 border-b-[1px] w-full text-sm placeholder:text-sm p-2 bg-transparent focus:outline-accent focus:bg-transparent placeholder:text-gray-400"
        />

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full p-2 border-0  bg-amber-400 hover:bg-amber-500 transition-colors px-4 py-2 rounded text-gray-900"
        >
          Sign up
        </button>
      </form>

      <div className="flex flex-col gap-12 bgg ">
        <GoogleSignin text="Sign up with Google" />

        <button
          onClick={handleSwitchToSignin}
          className="bg-transparent text-sm"
        >
          <span className="text-gray-400">Already have an account?</span>{' '}
          <span className="text-amber-400  font-bold">Sign in</span>
        </button>
      </div>
    </div>
  )
}

export default Signup
