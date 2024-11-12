'use server'

import bcrypt from 'bcryptjs'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { type Role } from '@/interfaces'
import prisma from '@/lib/prisma'

const userSchema = z.object({
  id: z
    .string()
    .uuid(),
  name: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(255, { message: 'El nombre debe tener menos de 255 caracteres' }),
  email: z
    .string()
    .email({ message: 'El correo electrónico no es válido' }),
  password: z
    .string()
    .refine(value => value === '' || (value.length >= 6 && value.length <= 10), {
      message: 'La contraseña debe tener entre 6 y 10 caracteres si será cambiada'
    }),
  role: z.enum(['teacher', 'admin'])
})

interface IData {
  id: string
  email: string
  name: string
  password?: string | null
  role: Role
}

export const updateUser = async (data: IData) => {
  try {
    const userParsed = userSchema.safeParse(data)

    if (!userParsed.success) {
      return {
        ok: false,
        message: 'Error updating user'
      }
    }

    const { name, email, password, id, role } = userParsed.data

    const dataUserUpdated: {
      name: string
      email: string
      password?: string
      role: Role
    } = {
      name,
      email,
      role
    }

    if (password.length > 0) {
      const encryptedPassword = bcrypt.hashSync(password)
      dataUserUpdated.password = encryptedPassword
    }

    const userUpdated = await prisma.user.update({
      where: { id },
      data: dataUserUpdated
    })

    if (!userUpdated) {
      return {
        ok: false,
        message: 'User not updated'
      }
    }

    revalidatePath('/admin/users')
    revalidatePath(`/admin/users/${id}/edit`)
    revalidatePath('/profile')
    revalidatePath(`/profile/${id}/edit`)

    return {
      ok: true,
      message: 'Updated successfully'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error updating user, contact support'
    }
  }
}
