import Link from 'next/link'
import { getNewsletters } from '@/actions/newsletter/get-newsletters'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export const revalidate = 60 * 60 * 24 * 7 // 1 week

export default async function LandingPage() {
  const { newsletters: newslettersK2 } = await getNewsletters({ page: 1, take: 2, grade: 'K2' })
  const { newsletters: newslettersK3 } = await getNewsletters({ page: 1, take: 2, grade: 'K3' })

  if (!newslettersK2 && !newslettersK3) {
    return <div>No newsletters found</div>
  }

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto animate-fade-up">
        <section className="text-center mb-12 animate-fade-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Our Kindergarten Educational Newsletters Platform</h1>
          <p className="text-xl text-gray-600">
            Stay updated with your child&apos;s learning journey. Access monthly newsletters, topics, vocabulary, and educational videos all in one place.
          </p>
        </section>

        <div className='flex flex-col gap-3'>
          <h2>Recently Added</h2>

          {
            newslettersK2?.length !== 0 && (
              <h2 className='font-semibold text-2xl' >Newsletters K2</h2>
            )
          }
          {
            newslettersK2?.map((newsletter) => (

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
          {
            newslettersK2?.length !== 0 && (
              <div className='py-10'>
                <Button
                  asChild
                  className='max-w-2xl justify-center flex mx-auto'
                >
                  <Link href="/newsletters?grade=K2" passHref>
                    View All Newsletters
                  </Link>
                </Button>
              </div>
            )
          }

          {/* divisor l ine */}
          <div className="flex items-center my-5">
            <div className="flex-1 border-t border-gray-500"></div>
          </div>

          {
            newslettersK3?.length !== 0 && (
              <h2 className='font-semibold text-2xl' >Newsletters K3</h2>
            )
          }
          {
            newslettersK3?.map((newsletter) => (
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
          {
            newslettersK3?.length !== 0 && (
              <div className='py-10'>
                <Button
                  asChild
                  className='max-w-2xl justify-center flex mx-auto'
                >
                  <Link href="/newsletters?grade=K3" passHref>
                    View All Newsletters
                  </Link>
                </Button>
              </div>
            )
          }

        </div>
      </div>
    </main>
  )
}
