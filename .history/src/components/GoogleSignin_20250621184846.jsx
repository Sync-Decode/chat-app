import supabase from '@/lib/supabase'
import { toast } from 'react-toastify'

const GoogleSignin = () => {
  const handleGoogleSignin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: '/', // Redirect to home after sign-in
        scope: 'openid email profile',
      },
    })

    if (error) {
      console.error('Error signing in with Google:', error.message)
      toast.error('Failed to sign in with Google. Please try again.')
    }

    
  }
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-full">
        <button
          className="border border text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={handleGoogleSignin}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

export default GoogleSignin
