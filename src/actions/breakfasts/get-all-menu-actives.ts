import prisma from '@/lib/prisma'

export const getAllWeeklyMenuActives = async () => {
  try {
    const menus = await prisma.menu.findMany({
      where: {
        isActive: true,
        weekdayId: null
      },
      orderBy: {
        weekday: {
          order: 'asc'
        }
      }
    })

    return menus
  } catch (error) {
    return []
  }
}
