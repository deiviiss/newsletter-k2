'use server'

import { revalidatePath } from 'next/cache'
import { validateUserAdmin } from '@/actions'
import prisma from '@/lib/prisma'

interface Props {
  id: string
  status: boolean
}

export const toggleUserStatus = async ({ id, status }: Props) => {
  try {
    const isAdmin = await validateUserAdmin()

    if (!isAdmin) {
      return {
        ok: false,
        message: 'Should be an admin to perform this action'
      }
    }

    const newStatus = !status

    const userDeleted = await prisma.user.update({
      where: { id },
      data: {
        isActive: newStatus
      }
    })

    if (!userDeleted) {
      return {
        ok: false,
        message: 'User not updated'
      }
    }

    revalidatePath('/admin/users')

    return {
      ok: true,
      message: userDeleted.isActive ? 'User successfully activated' : 'User successfully deactivated'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error updating user'
    }
  }
}
