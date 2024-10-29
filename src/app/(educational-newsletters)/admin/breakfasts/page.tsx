import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const revalidate = 0

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function UsersPage({ searchParams }: Props) {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Breakfast maintenance</h1>
      </div>

      <div className="mt-8 text-center">
        <Link href="/profile" passHref>
          <Button variant="outline">Profile</Button>
        </Link>
      </div>
    </div>
  )
}
