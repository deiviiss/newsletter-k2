import { redirect } from 'next/navigation'
import { getUserById } from '@/actions'
import { EditForm } from '@/components'

interface Props {
  params: {
    id: string
  }
}

export default async function EditUserPage({ params }: Props) {
  const { id } = params
  const { user } = await getUserById(id)

  if (!user) {
    redirect('/')
  }

  return (
    <div className='w-full m-auto sm:max-w-[400px] py-4'>
      <EditForm {...user} />
    </div>
  )
}
