import prisma from '@/lib/prisma'

export const getAllNewslettersOrderedByMonth = async () => {
  try {
    const newsletters = await prisma.newsletter.findMany({
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
