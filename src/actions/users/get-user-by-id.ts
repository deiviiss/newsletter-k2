'use server'

import { type IUser } from '@/interfaces'
import prisma from '@/lib/prisma'

interface IResponse {
  ok: boolean
  message: string
  user?: IUser
}

export const getUserById = async (id: string): Promise<IResponse> => {
  try {
    const user = await prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        role: true
      }
    })

    if (!user) {
      return {
        ok: false,
        message: 'Usuario no encontrado'
      }
    }

    return {
      ok: true,
      message: 'Usuario encontrado',
      user
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al buscar usuario, contacta a soporte'
    }
  }
}
