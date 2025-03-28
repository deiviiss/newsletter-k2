'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState, useEffect, type ChangeEvent } from 'react'
import { IoTrash, IoPencil, IoCheckbox, IoAdd } from 'react-icons/io5'
import { toast } from 'sonner'
import { assignMenus } from '@/actions/breakfasts/assigment-menu'
import { getAvailableDays } from '@/actions/breakfasts/available-days'
import { deleteMenuById } from '@/actions/breakfasts/delete-menu-by-id'
import { getMenus } from '@/actions/breakfasts/get-menus'
import { toggleMenuDay } from '@/actions/breakfasts/toogle-menu-day-assigment'
import AssignmentModal from '@/components/holidays/AssigmentModal'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { type availableDays, type WeeklyMenuItem } from '@/interfaces/menu/menu.interface'

export default function BreakfastPage() {
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'admin'

  const [availableDays, setAvailableDays] = useState<availableDays[]>([])
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [menuItems, setMenuItems] = useState<WeeklyMenuItem[]>([])
  const [totalActiveMenus, setTotalActiveMenus] = useState<number>(0)

  const [filteredMenuItems, setFilteredMenuItems] = useState<WeeklyMenuItem[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const itemsPerPage = 6

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAssignment = async (date: string) => {
    const { ok, message } = await assignMenus({ startDate: new Date(date) })

    if (!ok) {
      toast.error(message, {
        position: 'top-right',
        duration: 2000
      })
    }

    toast.success(message, {
      position: 'top-right',
      duration: 2000
    })

    setIsModalOpen(false)
    fetchMenuItems()
  }

  useEffect(() => {
    fetchAvailableDays()
    fetchMenuItems()
  }, [])

  useEffect(() => {
    // Recalculate totalActiveMenus whenever menuItems changes
    const activeMenus = menuItems.filter((menu) => menu.isActive).length

    setTotalActiveMenus(activeMenus)
  }, [menuItems])

  const fetchAvailableDays = async () => {
    try {
      const { days } = await getAvailableDays()

      if (!days) {
        return <div>Error fetching available days</div>
      }

      setAvailableDays(days)
    } catch (error) {
      return <div>Error fetching available days</div>
    }
  }

  const fetchMenuItems = async () => {
    setLoading(true)
    setError(null)
    try {
      const { menus } = await getMenus({})

      if (!menus) {
        setMenuItems([])
        setFilteredMenuItems([])
        setError('No MenuItems found.')
        return
      }

      setMenuItems(menus)
      setFilteredMenuItems(menus)
    } catch (error) {
      setError('An error occurred while loading the MenuItems. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value
    setSearchTerm(term)
    filterMenus(term)
  }

  const filterMenus = (term: string) => {
    const filtered = menuItems.filter(menu => {
      const matchesTerm = term ? menu.title.toLowerCase().includes(term.toLowerCase()) : true

      return matchesTerm
    })

    setFilteredMenuItems(filtered)
    setCurrentPage(1)
  }

  const handleDelete = async (id: string) => {
    try {
      const { ok, message } = await deleteMenuById(id)

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

      fetchMenuItems()
      fetchAvailableDays()
    } catch (error) {
      setError('Error deleting MenuItem. Please try again.')
    }
  }

  const handleToggleDay = async (menuId: string, dayId: string | null) => {
    const { ok, message } = await toggleMenuDay(menuId, dayId)

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

    // Refetch available days and menus to update the UI
    fetchAvailableDays()
    fetchMenuItems()
  }
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredMenuItems.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => { setCurrentPage(pageNumber) }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-300 mb-8 text-center">Breakfasts Maintenance</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total menus */}
          <Card>
            <CardHeader>
              <CardTitle>Total Menus</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{menuItems.length}</p>
            </CardContent>
          </Card>

          {/* Total active menus */}
          <Card>
            <CardHeader>
              <CardTitle>Total Active Menus</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold flex items-end justify-between gap-1">
                {totalActiveMenus === 5
                  ? <span>{totalActiveMenus}</span>
                  : <>
                    <span className=' text-red-500 dark:text-red-700'>{totalActiveMenus}</span> <span className='text-xs  text-red-500 dark:text-red-700'>Finish assigning all menus</span>
                  </>
                }
              </p>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">

              <Button
                asChild
                className="w-full flex"
              >
                <Link href="/admin/breakfasts/create">
                  <IoAdd className="mr-2" />
                  Create Menu
                </Link>
              </Button>

              <AssignmentModal
                handleAssignment={handleAssignment}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            </CardContent>
          </Card>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
            <p className="mt-4 text-lg text-gray-700">Loading breakfasts...</p>
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
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={handleSearch}
                className="flex-grow"
              />
            </div>

            {/* Table breakfasts */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <div className="bg-primary dark:bg-gray-700 text-white py-3 px-4">
                <h2 className="text-2xl font-semibold">Breakfasts Available</h2>
              </div>

              {/* Content desktop */}
              <ul className="divide-y divide-gray-200">
                {currentItems.length === 0
                  ? (
                    <p className='text-sm font-medium text-primary truncate px-4 py-4 sm:px-6'>No menu item found</p>)
                  : (currentItems.map((menuItem) => (
                    <li key={menuItem.id} className="w-full px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-500 min-[470px]:flex min-[470px]:flex-row-reverse min-[470px]:justify-between min-[475px]:items-center">
                      {/* Buttons */}
                      <div className="text-end pb-2 sm:pb-0">
                        {
                          isAdmin && (
                            <>
                              {/* Render the dialog only if there are available days or the menu is already active */}
                              {(totalActiveMenus < 5 || menuItem.isActive)
                                ? (
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className={clsx(
                                          'mr-2',
                                          !menuItem.isActive ? 'text-red-500' : 'text-green-500'
                                        )}
                                      >
                                        <IoCheckbox className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      {!menuItem.isActive
                                        ? (
                                          <>
                                            <DialogHeader>
                                              <DialogTitle>Assign Day to Menu</DialogTitle>
                                              <DialogDescription>
                                                Assign an available day to this menu.
                                              </DialogDescription>
                                            </DialogHeader>
                                            <div className="flex flex-col gap-4">
                                              <Label className="block text-sm font-medium text-gray-700">
                                                Select Available Day:
                                              </Label>
                                              <select
                                                className="border rounded-md px-3 py-2"
                                                onChange={(e) => {
                                                  if (e.target.value) {
                                                    setSelectedDay(e.target.value)
                                                  }
                                                }}
                                              >
                                                <option value="">Select a day</option>
                                                {availableDays?.map((day) => (
                                                  <option key={day.id} value={day.id} className="capitalize">
                                                    {day.name}
                                                  </option>
                                                ))}
                                              </select>
                                            </div>
                                            <DialogFooter className="gap-y-2">
                                              <DialogClose asChild>
                                                <Button type="button" variant="secondary">
                                                  Cancel
                                                </Button>
                                              </DialogClose>
                                              <Button
                                                type="button"
                                                onClick={async () => {
                                                  if (selectedDay) {
                                                    await handleToggleDay(menuItem.id, selectedDay)
                                                    setSelectedDay(null)
                                                  }
                                                }}
                                              >
                                                Save
                                              </Button>
                                            </DialogFooter>
                                          </>)
                                        : (
                                          <>
                                            <DialogHeader>
                                              <DialogTitle>Unassign Day to Menu</DialogTitle>
                                              <DialogDescription>
                                                Unassign its current day from this menu.
                                              </DialogDescription>
                                            </DialogHeader>
                                            <div className="flex flex-col sm:flex-row gap-2 w-full items-center">
                                              <Label className="block w-full text-base font-medium capitalize">
                                                assigned day: <span>{menuItem.weekday?.name}</span>
                                              </Label>
                                              <Button
                                                variant="outline"
                                                onClick={() => {
                                                  handleToggleDay(menuItem.id, null)
                                                }}
                                                disabled={!menuItem.id}
                                              >
                                                Unassign Current Day
                                              </Button>
                                            </div>
                                          </>)
                                      }
                                    </DialogContent>
                                  </Dialog>)
                                : (
                                  // Show a disabled button if there are no days available
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="mr-2 text-gray-500 cursor-not-allowed"
                                    disabled
                                    aria-disabled
                                  >
                                    <IoCheckbox className="h-4 w-4" />
                                  </Button>)
                              }
                            </>
                          )
                        }

                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="mr-2"
                        >
                          <Link href={`/admin/breakfasts/${menuItem.title}`}>
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
                                  <AlertDialogAction onClick={async () => { await handleDelete(menuItem.id) }}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )
                        }
                      </div>

                      <Link href={`/breakfasts/${menuItem.id}`}>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-primary truncate">
                            {menuItem.title}
                          </p>
                        </div>
                      </Link>
                    </li>)))
                }
              </ul>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
              {Array.from({ length: Math.ceil(filteredMenuItems.length / itemsPerPage) }, (_, i) => (
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
    </div >
  )
}
