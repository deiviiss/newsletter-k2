import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPaginatedUsers } from '@/actions'
import { CardUser, Pagination, UsersTable } from '@/components'
import { Button } from '@/components/ui/button'

export const revalidate = 0

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function UsersPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { ok, users = [], totalPages } = await getPaginatedUsers({ page })

  if (!ok) {
    redirect('/auth/login')
  }

  return (
    <div className='min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Users Maintenance</h1>

        <div className='w-full flex justify-end py-3'>
          <Button
            asChild
          >
            <Link href="/auth/new-account">
              Create user
            </Link>
          </Button>
        </div>

        <div className='sm:hidden w-full flex flex-col gap-3 mb-10'>
          {
            users.map(user => (
              <CardUser
                key={user.id}
                user={user}
              />
            ))
          }
        </div>

        <div className="hidden sm:block mb-10 overflow-auto">
          <UsersTable users={users} />

        </div>
        <Pagination totalPages={totalPages || 1} />
      </div>
    </div>
  )
}
