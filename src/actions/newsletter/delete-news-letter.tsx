'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'

export const deleteNewsLetter = async (id: string) => {
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
