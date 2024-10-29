import Link from 'next/link'
import { getNewsletters } from '@/actions/newsletter/get-newsletters'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export const revalidate = 60 * 60 * 24 * 7 // 1 week

export default async function LandingPage() {
  const { newsletters } = await getNewsletters({ page: 1, take: 2 })

  if (!newsletters) {
    return <div>No newsletters found</div>
  }

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Our Kindergarten Educational Newsletters Platform</h1>
          <p className="text-xl text-gray-600">
            Stay updated with your child&apos;s learning journey. Access monthly newsletters, topics, vocabulary, and educational videos all in one place.
          </p>
        </section>

        <div className='flex flex-col gap-3'>
          <h2>Recently Added Newsletters</h2>
          {
            newsletters.map((newsletter) => (
              <Card key={newsletter.id} className="w-full">
                <CardHeader>
                  <CardTitle>{newsletter.title}</CardTitle>
                  <CardDescription>Latest updates from our kindergarten class</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Topics include: {newsletter.topics.map(topic => (
                    <span key={topic.name}>{topic.name}, </span>
                  ))}</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/newsletters/${newsletter.title}`} passHref>
                    <Button>View More</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          }
        </div>
      </div>
    </main>
  )
}
