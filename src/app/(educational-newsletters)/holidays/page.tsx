import { getHolidays } from '@/actions'
import { HolidayCalendar } from '@/components/holidays/HolidayCalendar'

export default async function HolidaysPage() {
  const holidays = await getHolidays()

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-300 mb-8 text-center">Holidays</h1>

        <div className="grid grid-cols-1 gap-8">
          <HolidayCalendar initialHolidays={holidays} />
        </div>
      </div>
    </div>
  )
}
