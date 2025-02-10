'use server'

import { type WeeklyMenuItem } from '@/interfaces/menu/menu.interface'
import prisma from '@/lib/prisma'

interface PaginationOptions {
  page?: number
  take?: number
}

export const getMenus = async ({ page = 1, take = 6 }: PaginationOptions) => {
  const menus = await prisma.menu.findMany({
    include: {
      ingredients: true,
      weekday: true,
      menuImage: true
    },
    orderBy: [
      {
        weekday: {
          order: 'asc'
        }
      },
      {
        createdAt: 'asc'
      }
    ]
  })

  if (!menus) {
    return {
      ok: false,
      message: 'No menus found'
    }
  }

  const transformedMenus: WeeklyMenuItem[] = menus.map(menu => ({
    ...menu,
    menuImage: {
      id: menu.menuImage.id,
      url: menu.menuImage.url
    }
  }))

  const totalCount = await prisma.menu.count({})

  const totalPages = Math.ceil(totalCount / take)

  return {
    ok: true,
    menus: transformedMenus,
    currentPage: page,
    totalPages
  }
}
