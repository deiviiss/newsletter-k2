import { Toaster } from 'sonner'

export default async function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='flex justify-center'>
      <div className='w-full bg-gray-100 min-h-screen'>
        {children}
      </div>

      <Toaster />
    </main>
  )
}
