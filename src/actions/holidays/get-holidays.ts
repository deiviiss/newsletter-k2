'use server'

import { type Holiday } from '@/interfaces/holidays/holiday.interface'
import prisma from '@/lib/prisma'

export const getHolidays = async (): Promise<Holiday[]> => {
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  try {
    // const holidays = await prisma.holiday.findMany({
    //   orderBy: [
    //     {
    //       date: 'asc'
    //     }
    //   ]
    // })

    const holidays = await prisma.$queryRaw<Holiday[]>`
      SELECT *
      FROM "holidays"
      ORDER BY
        CASE WHEN date >= ${currentDate} THEN 0 ELSE 1 END,
        date ASC;
    `

    return holidays
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error getting holidays:', error)
    return []
  }
}

// Get holidays by month
export const getHolidaysByMonth = async (month: number): Promise<Holiday[]> => {
  try {
    const holidays = await prisma.holiday.findMany({
      where: {
        date: {
          gte: new Date(2025, month - 1, 1), // Primer día del mes
          lt: new Date(2025, month, 0) // Último día del mes
        }
      },
      orderBy: {
        date: 'asc'
      }
    })

    return holidays
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error getting holidays by month:', error)
    return []
  }
}

// Get holidays by date range
export const getHolidaysByDateRange = async (startDate: Date, endDate: Date): Promise<Holiday[]> => {
  try {
    const holidays = await prisma.holiday.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      orderBy: {
        date: 'asc'
      }
    })

    return holidays
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error getting holidays by date range:', error)
    return []
  }
}
