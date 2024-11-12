'use server'

import { revalidatePath } from 'next/cache'
import { validateUserAdmin } from '../auth/validate-user-admin'
import prisma from '@/lib/prisma'

export const deleteNewsLetter = async (id: string) => {
  const isAdmin = await validateUserAdmin()

  if (!isAdmin) {
    return {
      ok: false,
      message: 'You are not authorized to perform this action'
    }
  }

  try {
    const newsletter = await prisma.newsletter.delete({
      where: {
        id
      }
    })

    if (!newsletter) {
      return {
        ok: false,
        message: 'Newsletters not found'
      }
    }

    revalidatePath('/admin/newsletters')
    revalidatePath('/newsletters')
    revalidatePath('/')

    return {
      ok: true,
      message: 'Newsletter deleted successfully.'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error deleting newsletters, please try again'
    }
  }
}
