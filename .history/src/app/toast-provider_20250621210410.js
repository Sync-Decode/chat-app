// app/toast-provider.tsx or toast-provider.js
'use client'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ToastProvider() {
  return <ToastContainer position="" autoClose={3000} theme="dark" />
}
