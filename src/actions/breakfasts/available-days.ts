'use server'

import prisma from '@/lib/prisma'

export const getAvailableDays = async () => {
  try {
    const days = await prisma.weekday.findMany({
      where: { menu: null } // Filter the days that are not assigned to any menu
    })

    return {
      ok: true,
      days
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error getting available days'
    }
  }
}
