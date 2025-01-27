'use server'

import prisma from '@/lib/prisma'

export const getMenuByTitle = async (title: string) => {
  const menu = await prisma.menu.findFirst({
    where: {
      title
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
