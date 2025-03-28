'use server'

import { differenceInDays, isWeekend, addDays, isSameDay } from 'date-fns'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'

interface AssignmentResponse {
  ok: boolean
  message: string
}

interface AssignmentRequest {
  startDate: Date
}

export const assignMenus = async (request: AssignmentRequest): Promise<AssignmentResponse> => {
  try {
    // Get active school year
    const startCycle = await prisma.holiday.findFirst({
      where: {
        name: 'Inicio de ciclo'
      }
    })

    if (!startCycle) {
      return {
        ok: false,
        message: 'The start date of the cycle is not set'
      }
    }

    // Get all holidays
    const holidays = await prisma.holiday.findMany({
      where: {
        NOT: {
          name: 'Inicio de ciclo'
        }
      },
      select: {
        date: true
      }
    })

    // Format the holidays dates to be used in the comparison
    const holidayDates = holidays.map(h => new Date(h.date))

    const startDate = new Date(startCycle.date)
    const userAssignedDate = new Date(request.startDate)
    userAssignedDate.setHours(12, 0, 0, 0)

    // Get the user assigned day of the week (Sunday = 7, Monday = 1, ..., Saturday = 6)
    const userAssignedDay = userAssignedDate.getDay()

    // Determine the days to assign the menus
    const startAssignedDay = userAssignedDay
    const lastAssignedDay = 5

    // Calculate days from the start of the cycle
    const totalDays = differenceInDays(userAssignedDate, startDate)

    let businessDays = 0 // Count the business days

    let currentDate = startDate

    // Calculate the business days
    for (let i = 0; i < totalDays; i++) {
      if (!isWeekend(currentDate) && !holidayDates.some(holiday => isSameDay(holiday, currentDate))) {
        businessDays++
      }

      currentDate = addDays(currentDate, 1)
    }

    const allMenus = await prisma.menu.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    })

    const menuIndex = businessDays % 20
    let currentMenuIndex = menuIndex

    // Get weekdays
    const weekdays = await prisma.weekday.findMany({
      where: {
        order: {
          gte: startAssignedDay,
          lte: lastAssignedDay
        }
      },
      orderBy: {
        order: 'asc'
      }
    })

    // Assign menus to weekdays
    const assignedMenus: Array<{ weekdayId: string, menuId: string }> = []
    let currentMenuDate = userAssignedDate

    for (const weekday of weekdays) {
      if (!holidayDates.some(holiday => isSameDay(holiday, currentMenuDate))) {
        const menu = allMenus[currentMenuIndex % 20]
        assignedMenus.push({
          weekdayId: weekday.id,
          menuId: menu.id
        })
        currentMenuIndex++
      }
      currentMenuDate = addDays(currentMenuDate, 1)
    }

    // Remove all active menus
    const activeMenus = await prisma.menu.findMany({
      where: {
        isActive: true
      }
    })

    for (const menu of activeMenus) {
      await prisma.menu.update({
        where: {
          id: menu.id
        },
        data: {
          weekdayId: null,
          isActive: false
        }
      })
    }

    // Assign menus to weekdays
    for (const assignment of assignedMenus) {
      await prisma.menu.update({
        where: {
          id: assignment.menuId
        },
        data: {
          weekdayId: assignment.weekdayId,
          isActive: true
        }
      })
    }

    revalidatePath('/')
    revalidatePath('/admin/breakfasts')

    return {
      ok: true,
      message: 'Menu assigned successfully'
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in the menu assignment:', error)
    return {
      ok: false,
      message: 'Error in the menu assignment'
    }
  }
}
