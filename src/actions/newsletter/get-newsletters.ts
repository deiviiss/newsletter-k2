'use server'

import prisma from '@/lib/prisma'
import { validatePageNumber } from '@/utils'

interface PaginationOptions {
  page?: number
  take?: number
}

export const getNewsletters = async ({ page = 1, take = 6 }: PaginationOptions) => {
  page = validatePageNumber(page)

  const newsletters = await prisma.newsletter.findMany({
    take,
    skip: (page - 1) * take,
    include: {
      topics: true
    },
    orderBy: {
      month: 'desc'
    }
  })

  if (!newsletters) {
    return {
      ok: false,
      message: 'No se encontraron newsletters'
    }
  }

  const totalCount = await prisma.newsletter.count({})

  const totalPages = Math.ceil(totalCount / take)

  return {
    ok: true,
    newsletters,
    currentPage: page,
    totalPages
  }
}
