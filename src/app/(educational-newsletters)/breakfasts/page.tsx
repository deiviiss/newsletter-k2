import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default async function BreakfastsPage() {
  redirect('/')
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center"> Soon </h1>

        <div className="mt-8 text-center">
          <Link href="/" passHref>
            <Button >Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
