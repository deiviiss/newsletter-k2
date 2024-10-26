'use server'

import prisma from '@/lib/prisma'

export const getNewsletterByTitle = async (title: string) => {
  const newsletter = await prisma.newsletter.findUnique({
    where: {
      title
    },
    include: {
      topics: true,
      vocabulary: true,
      videos: true,
      note: true,
      socialSkill: true
    }
  })

  if (!newsletter) {
    return {
      ok: false,
      message: 'No se encontraron newsletters'
    }
  }

  return {
    ok: true,
    newsletter
  }
}
