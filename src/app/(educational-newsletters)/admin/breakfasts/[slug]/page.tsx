import { redirect } from 'next/navigation'
import { FormBreakfasts } from './FormBreakfasts'
import { getMenuByTitle } from '@/actions/breakfasts/get-menu-by-slug'

interface Props {
  params: {
    slug: string
  }
}

export default async function MenuPage({ params }: Props) {
  const { slug } = params

  const decodedTitle = decodeURIComponent(slug)

  const { menu } = await getMenuByTitle(decodedTitle)

  if (!menu && slug !== 'create') {
    redirect('/admin/breakfasts')
  }

  return (
    <div className='w-full m-auto md:w-[600px] py-4'>
      <FormBreakfasts breakfast={menu} />
    </div>
  )
}
