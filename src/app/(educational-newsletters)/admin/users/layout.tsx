import { redirect } from 'next/navigation'
import { validateUserAdmin } from '@/actions'

export default async function UserLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const isAdmin = await validateUserAdmin()

  if (!isAdmin) {
    redirect('/profile')
  }
  return (
    <div className='px-1 md:p-4 min-[992px]:p-6 min-[1200px]:p-10 pb-10 bg-gray-100'>
      {children}
    </div>
  )
}
