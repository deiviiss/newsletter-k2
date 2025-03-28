'use server'

import { type Holiday } from '@/interfaces/holidays/holiday.interface'
import prisma from '@/lib/prisma'

export const getHolidays = async (): Promise<Holiday[]> => {
  try {
    const holidays = await prisma.holiday.findMany({
      orderBy: {
        date: 'asc'
      }
    })

    return holidays
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error al obtener los días festivos:', error)
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
    console.error('Error al obtener los días festivos por mes:', error)
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
    console.error('Error al obtener los días festivos por rango de fechas:', error)
    return []
  }
}
