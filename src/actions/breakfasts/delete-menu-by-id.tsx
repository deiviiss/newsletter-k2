'use server'

import { revalidatePath } from 'next/cache'
import { validateUserAdmin } from '../auth/validate-user-admin'
import prisma from '@/lib/prisma'

export const deleteMenuById = async (id: string) => {
  const isAdmin = await validateUserAdmin()

  if (!isAdmin) {
    return {
      ok: false,
      message: 'You are not authorized to perform this action'
    }
  }

  try {
    const menu = await prisma.menu.delete({
      where: {
        id
      }
    })

    if (!menu) {
      return {
        ok: false,
        message: 'Menus not found'
      }
    }

    revalidatePath('/admin/breakfasts')
    revalidatePath('/')

    return {
      ok: true,
      message: 'Menu deleted successfully.'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error deleting menus, please try again'
    }
  }
}
