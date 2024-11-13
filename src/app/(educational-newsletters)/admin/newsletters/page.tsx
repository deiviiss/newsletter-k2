'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState, useEffect, type ChangeEvent } from 'react'
import { IoAdd, IoTrash, IoPencil } from 'react-icons/io5'
import { toast } from 'sonner'
import { getNewsletters, deleteNewsLetter } from '@/actions/newsletter'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type Grade } from '@/interfaces'
import { convertToGrade } from '@/utils/convertToGrade'

interface Newsletter {
  id: string
  title: string
  month: Date
  grade: Grade
}

interface Props {
  searchParams: {
    grade?: string
  }
}

export default function NewsletterDashboard({ searchParams }: Props) {
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'admin'

  const grade = convertToGrade(searchParams.grade)

  const [newsletters, setNewsletters] = useState<Newsletter[]>([])
  const [filteredNewsletters, setFilteredNewsletters] = useState<Newsletter[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedMonth, setSelectedMonth] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const itemsPerPage = 5

  useEffect(() => {
    fetchNewsletters()
  }, [])

  const fetchNewsletters = async () => {
    setLoading(true)
    setError(null)
    try {
      const { newsletters } = await getNewsletters({ grade })
      if (!newsletters) {
        setNewsletters([])
        setFilteredNewsletters([])
        setError('No newsletters found.')
        return
      }

      const transformedNewsletters: Newsletter[] = newsletters.map(newsletter => ({
        id: newsletter.id,
        title: newsletter.title,
        month: new Date(newsletter.month),
        grade: newsletter.grade
      }))

      setNewsletters(transformedNewsletters)
      setFilteredNewsletters(transformedNewsletters)
    } catch (error) {
      setError('An error occurred while loading the newsletters. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value
    setSearchTerm(term)
    filterNewsletters(term, selectedMonth)
  }

  const handleMonthSelect = (value: string) => {
    setSelectedMonth(value)
    filterNewsletters(searchTerm, value)
  }

  const filterNewsletters = (term: string, month: string) => {
    const filtered = newsletters.filter(newsletter => {
      const matchesTerm = term ? newsletter.title.toLowerCase().includes(term.toLowerCase()) : true

      const matchesMonth = month && month !== 'all'
        ? newsletter.month.getUTCMonth() + 1 === parseInt(month)
        : true

      return matchesTerm && matchesMonth
    })

    setFilteredNewsletters(filtered)
    setCurrentPage(1)
  }

  const handleDelete = async (id: string) => {
    try {
      const { ok, message } = await deleteNewsLetter(id)

      if (!ok) {
        toast.error(message, {
          position: 'top-right',
          duration: 2000
        })

        return
      }

      toast.success(message, {
        position: 'top-right',
        duration: 2000
      })

      fetchNewsletters()
    } catch (error) {
      setError('Error deleting newsletter. Please try again.')
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredNewsletters.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => { setCurrentPage(pageNumber) }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Newsletter Maintenance</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total newsletter */}
          <Card>
            <CardHeader>
              <CardTitle>Total Newsletters</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{newsletters.length}</p>
            </CardContent>
          </Card>
          {/*  This month */}
          <Card>
            <CardHeader>
              <CardTitle>This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {newsletters.filter(n => n.month.getUTCMonth() === new Date().getMonth()).length}
              </p>
            </CardContent>
          </Card>
          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                className="w-full flex"
              >
                <Link href="/admin/newsletters/create">
                  <IoAdd className="mr-2" />
                  Create Newsletter
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {loading && (
          <div className="text-center my-10">
            <svg className="animate-spin h-8 w-8 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <p className="mt-4 text-lg text-gray-700">Loading newsletters...</p>
          </div>
        )}

        {error && (
          <div className="text-center my-10">
            <p className="text-lg text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Search and filter */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="Search newsletters..."
                value={searchTerm}
                onChange={handleSearch}
                className="flex-grow"
              />

              <Select onValueChange={handleMonthSelect}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="all" value="all">All Months</SelectItem>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <SelectItem key={month} value={month.toString()}>
                      {new Date(2024, month - 1).toLocaleString('en-US', { month: 'long' })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Table newsletter */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="bg-primary text-white py-3 px-4">
                <h2 className="text-2xl font-semibold">Newsletters Available</h2>
              </div>
              <ul className="divide-y divide-gray-200">
                {currentItems.length === 0
                  ? (
                    <p className='text-sm font-medium text-primary truncate px-4 py-4 sm:px-6'>No newsletter found</p>)
                  : (currentItems.map((newsletter) => (
                    <li key={newsletter.id} className="w-full px-4 py-4 sm:px-6 hover:bg-gray-50 min-[470px]:flex min-[470px]:flex-row-reverse min-[470px]:justify-between min-[475px]:items-center">
                      <div className="text-end pb-2 sm:pb-0">
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="mr-2"
                        >
                          <Link href={`/admin/newsletters/${newsletter.title}?grade=${newsletter.grade}`}>
                            <IoPencil className="h-4 w-4" />
                          </Link>
                        </Button>

                        {
                          isAdmin && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <IoTrash className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the newsletter.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={async () => { await handleDelete(newsletter.id) }}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )
                        }
                      </div>
                      <Link href={`/newsletters/${newsletter.title}?grade=${newsletter.grade}`}>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-primary truncate">
                            {newsletter.title} - {newsletter.grade}
                          </p>

                          <div className="ml-2 flex-shrink-0 flex">
                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {newsletter.month.toLocaleDateString('en-US', { year: 'numeric', month: 'long', timeZone: 'UTC' })}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>)))
                }
              </ul>
            </div>

            <div className="mt-6 flex justify-center">
              {Array.from({ length: Math.ceil(filteredNewsletters.length / itemsPerPage) }, (_, i) => (
                <Button
                  key={i}
                  onClick={() => { paginate(i + 1) }}
                  variant={currentPage === i + 1 ? 'default' : 'outline'}
                  className="mx-1"
                >
                  {i + 1}

                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
