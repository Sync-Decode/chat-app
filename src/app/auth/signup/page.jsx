'use client'
import AuthPage from '@/components/AuthPage'
import Signup from '@/components/Signup'
import { useLoginViewStore } from '@/store/store'
import { useEffect } from 'react'

const SignupPage = () => {
  const setLoginType = useLoginViewStore((s) => s.setLoginType)
  useEffect(() => {
    document.title = 'Lisp Chat - Sign Up'
    setLoginType('signup')
  }, [])
  return (
    <AuthPage>
      <Signup />
    </AuthPage>
  )
}

export default SignupPage
