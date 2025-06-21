'use client'
import AuthPage from '@/components/AuthPage'
import Signin from '@/components/Signin'
import { useLoginViewStore } from '@/store/store'
import { useEffect } from 'react'

const SigninPage = () => {
  const setLoginType = useLoginViewStore((s) => s.setLoginType)
  useEffect(() => {
    document.title = 'Lisp Chat - Sign In'
    setLoginType('signin')
  }, [])
  return (
    <AuthPage>
      <Signin />
    </AuthPage>
  )
}

export default SigninPage
