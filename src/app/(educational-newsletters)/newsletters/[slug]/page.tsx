import { type Metadata, type ResolvingMetadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { IoLogoYoutube } from 'react-icons/io5'
import { getNewsletterByTitle, getAllNewslettersOrderedByMonth } from '@/actions/newsletter'
import { Button } from '@/components/ui/button'
import { convertToGrade } from '@/utils/convertToGrade'
import { monthColors } from '@/utils/monthColors'

export const revalidate = 60 * 60 * 24 * 7 // 1 week

interface Props {
  params: {
    slug: string
  }
  searchParams: {
    grade?: string
  }
}

// This function is called at build time, metadata is used to generate the <head> of the page
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const slug = params.slug
  const decodedTitle = decodeURIComponent(slug)
  const { newsletter } = await getNewsletterByTitle(decodedTitle)
  const defaultImageUrl = '/images/newsletter.jpg'
  const urlSite = process.env.URL_SITE

  if (!newsletter) {
    return {
      title: 'Newsletter not found',
      description: 'The requested newsletter does not exist.'
    }
  }

  return {
    title: newsletter.title,
    description: `Vocabulary, topics, and important notes from the ${newsletter.title} newsletter.`,
    keywords: newsletter.topics.map(topic => topic.name).join(', '),
    authors: [{ name: 'Educational Newsletter' }],
    openGraph: {
      title: newsletter.title,
      description: `Vocabulary, topics, and important notes from the ${newsletter.title} newsletter.`,
      url: urlSite,
      type: 'article',
      images: {
        url: defaultImageUrl,
        alt: newsletter.title,
        width: 1200,
        height: 630
      },
      siteName: 'Educational Newsletters'
    }
  }
}

export default async function NewsletterPage({ params, searchParams }: Props) {
  const slug = params.slug

  const grade = convertToGrade(searchParams.grade)

  if (!grade) {
    redirect('/newsletters')
  }

  const decodedTitle = decodeURIComponent(slug)

  const { ok, newsletter } = await getNewsletterByTitle(decodedTitle, grade)

  const allNewsletters = await getAllNewslettersOrderedByMonth({ grade })

  const currentNewsletterIndex = allNewsletters.findIndex(n => decodeURIComponent(n.title) === decodedTitle)

  const previousNewsletter = currentNewsletterIndex > 0 ? allNewsletters[currentNewsletterIndex - 1] : null

  const nextNewsletter = currentNewsletterIndex < allNewsletters.length - 1 ? allNewsletters[currentNewsletterIndex + 1] : null

  if (!ok || !newsletter) {
    redirect('/newsletters')
  }

  const monthNumber = newsletter.month.getUTCMonth() + 1
  const headerColor = monthColors[monthNumber] || 'bg-blue-300'

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-0 py-11 md:px-6 sm:pt-8 lg:px-8">
      <div className="max-w-6xl mx-auto  animate-fade-up">
        <div className='flex items-center justify-center mb-11 relative'>
          {previousNewsletter && (
            <Button
              asChild
              className={`mr-4 ml-1 p-2 ${headerColor} rounded-full hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-200 hover:text-black absolute left-0 -bottom-12 dark:text-primary`}
              aria-label="Previous Newsletter"
            >
              <Link href={`/newsletters/${previousNewsletter.title}?grade=${newsletter.grade}`}>
                {/* left arrow icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            </Button>
          )}

          <div className={`w-full ${headerColor} px-6 py-4`}>
            <div className="text-center text-white relative mb-20">
              <h1 className="text-lg font-semibold tracking-wide">
                GK FOUNDATION PUBLIC BILINGUAL KINDERGARTEN
              </h1>
              <h2 className="text-md">
                JARDÍN DE NIÑOS &quot;EL HUERTO DE LA ILUSIÓN&quot;
              </h2>

              <div className="mx-auto w-full max-w-[720px] relative bg-green-500">
                {/* Left circle with K3 */}
                <div className="border border-white text-white w-20 h-20 rounded-full flex items-center justify-center font-bold text-3xl absolute -bottom-14 -left-5">
                  {newsletter.grade}
                </div>
                {/* Right date bubble */}
                <div className="border border-white text-white px-4 py-2 rounded-2xl font-bold absolute -bottom-14 -right-5">
                  <div className="text-2xl leading-tight">{newsletter.month.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })}</div>
                  <div className="text-xl"> {newsletter.month.toLocaleDateString('en-US', { year: 'numeric', timeZone: 'UTC' })}</div>
                </div>
              </div>
            </div>

            {/* Center Newsletter text */}
            <div className="flex justify-center items-center w-full text-white">

              <h1 className="text-4xl text-center font-bold tracking-wider relative">

                {/* Decorative lines */}
                <span className="absolute -left-6 top-1/2 w-4 h-1 bg-white transform -translate-y-1/2" />
                {newsletter.title}
                <span className="absolute -right-6 top-1/2 w-4 h-1 bg-white transform -translate-y-1/2" />
              </h1>
            </div>
          </div>

          {nextNewsletter && (
            <Button asChild
              className={`ml-4 mr-1 p-2 ${headerColor} rounded-full hover:bg-gray-300 hover:text-black focus:outline-none focus:ring-1 focus:ring-gray-200 absolute right-0 -bottom-12 dark:text-primary`}
              aria-label="Next Newsletter"
            >
              <Link href={`/newsletters/${nextNewsletter.title}?grade=${newsletter.grade}`}>
                {/* right arrow icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12 px-1">
          {/* Vocabulary */}
          <div className="bg-secondary shadow-lg rounded-t-[50px] rounded-b-[30px] mb-8 pt-3 relative">
            <h2 className={`text-white py-1 px-6 absolute -top-6 left-3 rounded-t-2xl rounded-b-3xl ${headerColor} text-2xl font-extrabold`}>Vocabulary</h2>
            <div className="p-4">
              {newsletter.vocabularies.map((item, index) => (
                <div key={index} className="flex justify-between px-4 py-2 border-b last:border-b-0">
                  <span className="font-medium">{item.word}</span>
                  <span className="text-gray-500">{item.pronunciation}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Other Sections */}
          <div className="space-y-8">
            {/* Topics */}
            <div className="bg-secondary shadow-lg rounded-t-[50px] rounded-b-[30px] mb-12 pt-3 relative">
              <h2 className={`text-white py-1 px-6 absolute -top-6 left-3 rounded-t-2xl rounded-b-3xl ${headerColor} text-2xl font-extrabold`}>What are we learning?</h2>
              <div className="p-4">
                <p className="text-lg text-gray-700 dark:text-gray-100 px-4">{newsletter.topics.map(topic => (
                  <span key={topic.name}>{topic.name}, </span>
                ))}</p>
              </div>
            </div>

            {/* For the parents */}
            <div className="bg-secondary shadow-lg rounded-t-[50px] rounded-b-[30px] mb-8 pt-3 relative">
              <h2 className={`text-white py-1 px-6 absolute -top-6 left-3 rounded-t-2xl rounded-b-3xl ${headerColor} text-2xl font-extrabold`}>For the parents</h2>
              <div className="p-4 mb-12">
                <ul className="list-disc pl-5 space-y-2">
                  {newsletter.notes.map((note, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-100">{note.content}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Social Skill */}
            {
              newsletter.socialSkill && (
                <div className="bg-secondary shadow-lg rounded-t-[50px] rounded-b-[30px] mb-8 pt-3 relative">
                  <h2 className={`text-white py-1 px-6 absolute -top-6 left-3 rounded-t-2xl rounded-b-3xl ${headerColor} text-2xl font-extrabold`}>Social Skills</h2>

                  <div className="p-4">
                    <p className="text-gray-700 dark:text-gray-100 font-medium mb-2 px-4">{newsletter.socialSkill.skill}</p>
                    <p className="text-gray-700 dark:text-gray-100 px-4">{newsletter.socialSkill.activity}</p>
                  </div>
                </div>
              )
            }
          </div>
        </div>

        {/* Section Video */}
        <div className="bg-secondary shadow-lg rounded-t-[50px] rounded-b-[30px] mb-8 pt-3 relative">
          <h2 className={`text-white py-1 px-6 absolute -top-6 left-3 rounded-t-2xl rounded-b-3xl ${headerColor} text-2xl font-extrabold`}>Links</h2>

          <div className="p-4">
            <ul className="space-y-2">
              {newsletter.videos.map((video, index) => (
                <li key={index}>
                  <Link
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline font-bold"
                  >
                    {video.title}
                  </Link>
                  <span className='text-sm text-slate-400 pl-1 font-bold'>by {video.by}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* YouTube Playlist Button */}
        <Button
          variant="default"
          className={`w-full ${headerColor} text-white`}
          asChild
        >
          <Link
            href={newsletter.playlist?.url ?? ''}
            target="_blank"
            className="flex items-center justify-center gap-2"
          >
            <IoLogoYoutube className="w-5 h-5" />
            Play list
          </Link>
        </Button>
      </div>
    </div >
  )
}
