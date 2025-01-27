'use server'

import prisma from '@/lib/prisma'

export const getWeeklyMenu = async () => {
  try {
    const weeklyMenu = await prisma.menu.findMany({
      where: {
        isActive: true,
        weekday: {
          isNot: null
        }
      },
      include: {
        weekday: true,
        ingredients: true,
        menuImage: true
      },
      orderBy: {
        weekday: {
          order: 'asc'
        }
      }
    })

    if (!weeklyMenu || weeklyMenu.length === 0) {
      return {
        ok: false,
        message: 'No menu found'
      }
    }

    return {
      ok: true,
      weeklyMenu
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error getting weekly menu'
    }
  }
}
