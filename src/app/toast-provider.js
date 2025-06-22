// app/toast-provider.tsx or toast-provider.js
'use client'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-left"
      autoClose={3000}
      theme="dark"
      pauseOnHover={true}
      draggable={false}
    />
  )
}
