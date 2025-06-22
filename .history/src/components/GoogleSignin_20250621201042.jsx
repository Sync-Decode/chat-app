import supabase from '@/lib/supabase'
import { toast } from 'react-toastify'
import { FcGoogle } from 'react-icons/fc'

const GoogleSignin = ({text}) => {
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
        <div
          className="flex justify-center items-center gap-2 border border-amber-400 text-white px-4 py-2 rounded hover:border-amber-500 transition"
          onClick={handleGoogleSignin}
        >
          <span className="text-sm text-gray-300">{text}</span>
          <div>
            <FcGoogle size={24} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoogleSignin
