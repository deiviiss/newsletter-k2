'use server'

import { type Grade } from '@/interfaces'
import prisma from '@/lib/prisma'
import { validatePageNumber } from '@/utils'

interface PaginationOptions {
  page?: number
  take?: number
  grade?: Grade
}

export const getNewsletters = async ({ page = 1, take = 72, grade }: PaginationOptions) => {
  page = validatePageNumber(page)

  const newsletters = await prisma.newsletter.findMany({
    where: {
      grade
    },
    take,
    skip: (page - 1) * take,
    include: {
      topics: true,
      playlist: true
    },
    orderBy: {
      month: 'desc'
    }
  })

  if (!newsletters) {
    return {
      ok: false,
      message: 'No newsletters found'
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
