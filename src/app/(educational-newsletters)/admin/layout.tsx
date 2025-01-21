import { redirect } from 'next/navigation'
import { getUserSessionServer } from '@/actions'

export default async function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const isAuthenticated = await getUserSessionServer()

  if (!isAuthenticated) {
    redirect('/profile')
  }

  return (
    <div className='px-1 md:p-4 min-[992px]:p-6 min-[1200px]:p-10 pb-10 bg-gray-100 dark:bg-gray-800'>
      {children}
    </div>
  )
}
