'use server'

import bcrypt from 'bcryptjs'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'

//! Add validation to the data object

interface RegisterUser {
  name: string
  email: string
  password: string
  role: 'admin' | 'teacher'
}

export const registerUser = async (data: RegisterUser) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: bcrypt.hashSync(data.password),
        role: data.role
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    revalidatePath('/admin/users')

    return {
      ok: true,
      message: 'User created',
      user
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error creating user'
    }
  }
}
