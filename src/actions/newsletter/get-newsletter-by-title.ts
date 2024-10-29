'use server'

import prisma from '@/lib/prisma'

export const getNewsletterByTitle = async (title: string) => {
  const newsletter = await prisma.newsletter.findUnique({
    where: {
      title
    },
    include: {
      topics: true,
      vocabularies: true,
      videos: true,
      notes: true,
      socialSkill: true
    }
  })

  if (!newsletter) {
    return {
      ok: false,
      message: 'Newsletters not found'
    }
  }

  return {
    ok: true,
    newsletter
  }
}
