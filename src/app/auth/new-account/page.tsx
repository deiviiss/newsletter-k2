import { redirect } from 'next/navigation'
import { RegisterForm } from './ui/RegisterForm'
import { validateUserAdmin } from '@/actions'

export default async function NewAccountPage() {
  const isAdmin = await validateUserAdmin()

  if (!isAdmin) {
    redirect('/')
  }

  return (
    <div className="w-full m-auto sm:max-w-[400px] py-4">      <RegisterForm />
    </div>
  )
}
