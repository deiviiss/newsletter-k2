'use client'

import { useState } from 'react'
import { NextHoliday } from './NextHoliday'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type Holiday } from '@/interfaces/holidays/holiday.interface'

interface HolidayCalendarProps {
  initialHolidays: Holiday[]
}

export const HolidayCalendar = ({ initialHolidays }: HolidayCalendarProps) => {
  const [holidays, setHolidays] = useState<Holiday[]>(initialHolidays)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [month, setMonth] = useState<string>('all')

  const handleMonthChange = async (newMonth: string) => {
    setMonth(newMonth)
    if (newMonth === 'all') {
      setHolidays(initialHolidays)
      return
    }

    setLoading(true)
    setError(null)

    const filteredHolidays = initialHolidays.filter((holiday) => {
      const holidayMonth = new Date(holiday.date).getMonth() + 1
      return holidayMonth === Number(newMonth)
    })
    setHolidays(filteredHolidays)
    setLoading(false)
  }

  const months = [
    { value: 'all', label: 'All months' },
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ]

  return (
    <div className="w-full space-y-6">
      <div className="flex items-end justify-between">
        <NextHoliday holidays={holidays} />

        <div className="w-48">
          <Select value={month} onValueChange={handleMonthChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading
        ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
            <p className="mt-4 text-lg text-gray-700">Loading holidays...</p>
          </div>)
        : error
          ? (
            <div className="bg-red-50 p-4 rounded-md text-red-600">
              {error}
            </div>)
          : holidays.length === 0
            ? (
              <div className="bg-yellow-50 p-4 rounded-md text-yellow-700">
                There are no holidays scheduled for this period
              </div>)
            : (
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                <div className="bg-primary dark:bg-gray-700 text-white py-3 px-4">
                  <h2 className="text-2xl font-semibold">Holiday Calendar</h2>
                </div>
                <ul className="divide-y divide-gray-200">
                  {holidays.map((holiday) => (
                    <li key={holiday.id} className="block hover:bg-gray-50 dark:hover:bg-gray-500">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-primary truncate">
                            {holiday.name}
                          </p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {new Date(holiday.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                timeZone: 'UTC'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>)
      }
    </div>
  )
}
