import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function FoodsPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center"> Building... </h1>

        <div className="mt-8 text-center">
          <Link href="/" passHref>
            <Button variant="outline">Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
