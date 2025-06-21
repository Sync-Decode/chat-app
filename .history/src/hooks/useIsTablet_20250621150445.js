"use client"
import { useState, useEffect } from 'react'

export const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(false)
  useEffect(() => {
    const check = () => setIsTablet(window.innerWidth > 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isDesktop
}
