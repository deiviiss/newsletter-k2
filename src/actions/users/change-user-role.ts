'use server'

import { revalidatePath } from 'next/cache'
import { validateUserAdmin } from '@/actions'
import prisma from '@/lib/prisma'

export const changeUserRole = async (userId: string, role: string) => {
  const isAdmin = await validateUserAdmin()

  if (!isAdmin) {
    return {
      ok: false,
      message: 'Should be an admin to change user role'
    }
  }

  try {
    const newRole = role === 'admin' ? 'admin' : 'teacher'

    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        role: newRole
      }
    })

    revalidatePath('/admin/users')

    return {
      ok: true,
      user
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error updating user role'
    }
  }
}
