import { redirect } from 'next/navigation'
import NewsletterForm from './FormNewsletter'
import { getNewsletterByTitle } from '@/actions/newsletter'
import { convertToGrade } from '@/utils/convertToGrade'

interface Props {
  params: {
    slug: string
  }
  searchParams: {
    grade?: string
  }
}

export default async function NewsLetterPage({ params, searchParams }: Props) {
  const { slug } = params

  const grade = convertToGrade(searchParams.grade)

  const decodedTitle = decodeURIComponent(slug)

  const { newsletter } = await getNewsletterByTitle(decodedTitle, grade)

  if (!newsletter && slug !== 'create') {
    redirect('/admin/newsletters')
  }

  return (
    <div className='w-full m-auto md:w-[600px] py-4'>
      <NewsletterForm newsletter={newsletter} />
    </div>
  )
}
