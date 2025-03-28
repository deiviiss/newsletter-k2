import { ClockIcon } from 'lucide-react'
import { type Holiday } from '@/interfaces/holidays/holiday.interface'

interface NextHolidayProps {
  holidays: Holiday[]
}

export const NextHoliday = ({ holidays }: NextHolidayProps) => {
  const nextHoliday = holidays
    .filter(h => new Date(h.date).getTime() >= new Date().getTime()) // Filter only future holidays
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // Order by date
    .shift()

  return (
    <div className="p-4 bg-blue-100 dark:bg-blue-800 rounded-md shadow-md flex items-center gap-4" >
      <ClockIcon className="w-8 h-8 text-blue-600 dark:text-blue-300" />
      <div>
        <h2 className="text-xl font-semibold" > {nextHoliday ? nextHoliday.name : 'There are no holidays scheduled for this period'} </h2>
        {
          nextHoliday && (
            <p className="text-sm text-gray-700 dark:text-gray-300" >
              📅 {new Date(nextHoliday.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}
            </p>
          )}
      </div>
    </div>
  )
}
