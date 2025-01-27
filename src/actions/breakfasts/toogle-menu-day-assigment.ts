'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'

export const toggleMenuDay = async (menuId: string, dayId: string | null) => {
  try {
    // Get current menu
    const currentMenu = await prisma.menu.findUnique({
      where: { id: menuId },
      select: { weekdayId: true }
    })

    // If current menu has a day assigned
    if (currentMenu?.weekdayId) {
      await prisma.menu.update({
        where: { id: menuId },
        data: { weekdayId: null, isActive: false }
      })

      revalidatePath('/admin/breakfasts')
      return { ok: true, message: 'Day unassigned successfully' }
    }

    // If current menu does not have a day assigned
    await prisma.menu.update({
      where: { id: menuId },
      data: { weekdayId: dayId, isActive: true }
    })

    revalidatePath('/admin/breakfasts')
    return { ok: true, message: 'Day assigned successfully' }
  } catch (error) {
    return { ok: false, message: 'Failed to toggle menu day' }
  }
}
