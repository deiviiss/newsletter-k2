import { redirect } from 'next/navigation'
import { LoginForm } from './ui/LoginForm'
import { auth } from '@/auth.config'
import { titleFont } from '@/config/fonts'

export default async function LoginPage() {
  const session = await auth()

  if (session?.user) {
    redirect('/')
  }

  return (
    <div className="flex flex-col min-h-screen pt-32 px-10">

      <h1 className={`${titleFont.className} text-4xl mb-5`}>Ingresar</h1>

      <LoginForm />
    </div>
  )
}
