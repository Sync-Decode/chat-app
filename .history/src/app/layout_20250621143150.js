import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetBrains_Mono = JetBrains_Mono({
  variable: '--font-JetBrains_Mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Lisp Chat',
  description: 'Chat and connect with fellow tweeps',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jetBrains_Mono.variable}  antialiased`}>
        {children}
      </body>
    </html>
  )
}
