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
    <div className="w-full items-center flex flex-col min-h-screen pt-32 px-2 dark:bg-gray-800">

      <h1 className={`${titleFont.className} text-4xl mb-5`}>Ingresar</h1>

      <LoginForm />
    </div>
  )
}
