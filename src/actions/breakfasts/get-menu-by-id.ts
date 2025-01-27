'use server'

import prisma from '@/lib/prisma'

export const getMenuById = async (id: string) => {
  const menu = await prisma.menu.findFirst({
    where: {
      id
    },
    include: {
      ingredients: true,
      weekday: true,
      menuImage: true
    }
  })

  if (!menu) {
    return {
      ok: false,
      message: 'Menu not found'
    }
  }

  return {
    ok: true,
    menu
  }
}
