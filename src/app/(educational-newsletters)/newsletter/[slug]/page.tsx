import { type Metadata, type ResolvingMetadata } from 'next'
import Link from 'next/link'
import { getNewsletterByTitle } from '@/actions/newsletter/get-newsletter-by-title'
import { monthColors } from '@/utils/monthColors'

export const revalidate = 60 * 60 * 24 * 7 // 1 week

interface Props {
  params: {
    slug: string
  }
}

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

export default async function NewsletterPage({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const decodedTitle = decodeURIComponent(slug)

  const { ok, newsletter } = await getNewsletterByTitle(decodedTitle)

  if (!ok || !newsletter) {
    return <div>No se encontró el newsletter</div>
  }

  const monthNumber = newsletter.month.getUTCMonth() + 1
  const headerColor = monthColors[monthNumber] || 'bg-blue-300'

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">{newsletter.title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12 md:py-8">
          {/* Vocabulary */}
          <div className="bg-white shadow-lg rounded-t-[50px] rounded-b-[30px] mb-8 pt-3 relative">
            <h2 className={`text-white py-1 px-6 absolute -top-6 left-3 rounded-t-2xl rounded-b-3xl ${headerColor} text-2xl font-extrabold`}>Vocabulary</h2>
            <div className="p-4">
              {newsletter.vocabulary.map((item, index) => (
                <div key={index} className="flex justify-between py-2 border-b last:border-b-0">
                  <span className="font-medium">{item.word}</span>
                  <span className="text-gray-500">{item.pronunciation}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Other Sections */}
          <div className="space-y-8">
            {/* Topics */}
            <div className="bg-white shadow-lg rounded-t-[50px] rounded-b-[30px] mb-12 pt-3 relative">
              <h2 className={`text-white py-1 px-6 absolute -top-6 left-3 rounded-t-2xl rounded-b-3xl ${headerColor} text-2xl font-extrabold`}>What are we learning?</h2>
              <div className="p-4">
                <p className="text-lg text-gray-700">{newsletter.topics.map(topic => (
                  <span key={topic.name}>{topic.name}, </span>
                ))}</p>
              </div>
            </div>

            {/* For the parents */}
            <div className="bg-white shadow-lg rounded-t-[50px] rounded-b-[30px] mb-8 pt-3 relative">
              <h2 className={`text-white py-1 px-6 absolute -top-6 left-3 rounded-t-2xl rounded-b-3xl ${headerColor} text-2xl font-extrabold`}>For the parents</h2>
              <div className="p-4 mb-12">
                <ul className="list-disc pl-5 space-y-2">
                  {newsletter.note.map((note, index) => (
                    <li key={index} className="text-gray-700">{note.content}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Social Skill */}
            {
              newsletter.socialSkill && (
                <div className="bg-white shadow-lg rounded-t-[50px] rounded-b-[30px] mb-8 pt-3 relative">
                  <h2 className={`text-white py-1 px-6 absolute -top-6 left-3 rounded-t-2xl rounded-b-3xl ${headerColor} text-2xl font-extrabold`}>Social Skills</h2>

                  <div className="p-4">
                    <p className="font-medium mb-2">{newsletter.socialSkill.skill}</p>
                    <p className="text-gray-700">{newsletter.socialSkill.activity}</p>
                  </div>
                </div>
              )
            }
          </div>
        </div>

        {/* Section Video */}
        <div className="bg-white shadow-lg rounded-t-[50px] rounded-b-[30px] mb-8 pt-3 relative">
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
      </div>
    </div>
  )
}
