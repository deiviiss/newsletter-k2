import { type Grade } from '@/interfaces'
import prisma from '@/lib/prisma'

interface IParams {
  grade: Grade
}

export const getAllNewslettersOrderedByMonth = async ({ grade }: IParams) => {
  try {
    const newsletters = await prisma.newsletter.findMany({
      where: {
        grade
      },
      orderBy: { month: 'asc' },
      select: {
        title: true
      }
    })

    return newsletters
  } catch (error) {
    return []
  }
}
