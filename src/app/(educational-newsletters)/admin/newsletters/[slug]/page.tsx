import { redirect } from 'next/navigation'
import NewsletterForm from './FormNewsletter'
import { getNewsletterByTitle } from '@/actions/newsletter'

interface Props {
  params: {
    slug: string
  }
}

export default async function NewsLetterPage({ params }: Props) {
  const { slug } = params
  const decodedTitle = decodeURIComponent(slug)
  const { newsletter } = await getNewsletterByTitle(decodedTitle)

  if (!newsletter && slug !== 'create') {
    redirect('/admin/newsletters')
  }

  return (
    <div className='w-full m-auto md:w-[600px] py-4'>
      <NewsletterForm newsletter={newsletter} />
    </div>
  )
}
