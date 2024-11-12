'use server'

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import prisma from '@/lib/prisma'

const newsletterSchema = z.object({
  id: z.string().optional().nullable(),
  title: z
    .string({
      required_error: 'Title is required',
      message: 'Title must be a string'
    }).min(3, {
      message: 'Title must be at least 3 characters long'
    }).max(100, {
      message: 'Title must be at most 100 characters long'
    }),
  month: z.string().regex(/^\d{4}-\d{2}$/, {
    message: 'Month must be in the format YYYY-MM.'
  }).transform((val) => new Date(`${val}-01T00:00:00.000Z`)),
  socialSkill: z.object({
    skill: z.string().min(2, 'Skill must be at least 2 characters.'),
    activity: z.string().min(2, 'Activity must be at least 2 characters.')
  }),
  notes: z.array(z.object({
    content: z.string().min(1, 'Note content cannot be empty.')
  })),
  vocabularies: z.array(z.object({
    word: z.string().min(1, 'Word cannot be empty.'),
    pronunciation: z.string().min(1, 'Pronunciation cannot be empty.')
  })),
  topics: z.array(z.object({
    name: z.string().min(1, 'Topic name cannot be empty.')
  })),
  videos: z.array(z.object({
    title: z.string().min(1, 'Video title cannot be empty.'),
    by: z.string().min(1, 'Video creator cannot be empty.'),
    url: z.string().url('Must be a valid URL.')
  })),
  grade: z.enum(['K2', 'K3'])
})

export const createUpdateNewsletter = async (formData: FormData) => {
  const data = Object.fromEntries(formData)
  const parsedSocialSkill = JSON.parse(formData.get('socialSkill') as string)
  const parsedNotes = JSON.parse(formData.get('notes') as string)
  const parsedVocabulary = JSON.parse(formData.get('vocabulary') as string)
  const parsedTopics = JSON.parse(formData.get('topics') as string)
  const parsedVideos = JSON.parse(formData.get('videos') as string)

  const dataToValidate = {
    ...data,
    socialSkill: parsedSocialSkill,
    notes: parsedNotes,
    vocabularies: parsedVocabulary,
    topics: parsedTopics,
    videos: parsedVideos
  }

  const newsletterParsed = newsletterSchema.safeParse(dataToValidate)

  if (!newsletterParsed.success) {
    return {
      ok: false,
      message: 'Error to create newsletter. Please check the fields.'
    }
  }

  const newsletterData = newsletterParsed.data

  const { title, month, socialSkill, notes, vocabularies, topics, videos, id, grade } = newsletterData

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      if (id) {
        await tx.newsletter.update({
          where: {
            id
          },
          data: {
            title,
            month,
            socialSkill: {
              upsert: {
                update: socialSkill,
                create: socialSkill
              }
            },
            notes: {
              deleteMany: {},
              createMany: {
                data: notes
              }
            },
            vocabularies: {
              deleteMany: {},
              createMany: {
                data: vocabularies
              }
            },
            topics: {
              deleteMany: {},
              createMany: {
                data: topics
              }
            },
            videos: {
              deleteMany: {},
              createMany: {
                data: videos
              }
            },
            grade
          }
        })

        return {
          ok: true,
          message: 'Newsletter updated successfully'
        }
      }

      if (!id) {
        await tx.newsletter.create({
          data: {
            title,
            month,
            socialSkill: {
              create: socialSkill
            },
            notes: {
              createMany: {
                data: notes
              }
            },
            vocabularies: {
              createMany: {
                data: vocabularies
              }
            },
            topics: {
              createMany: {
                data: topics
              }
            },
            videos: {
              createMany: {
                data: videos
              }
            },
            grade
          }
        })

        return {
          ok: true,
          message: 'Newsletter created successfully'
        }
      }

      return {
        ok: false,
        message: 'No operation performed'
      }
    })

    revalidatePath('/admin/newsletters')
    revalidatePath('/newsletters')
    revalidatePath('/')

    return {
      ok: prismaTx.ok,
      message: prismaTx.message
    }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        // Unique constraint error
        const target = (error.meta?.target as string[]) || []
        if (target.includes('title')) {
          return {
            ok: false,
            message: 'Newsletter with this title already exists'
          }
        }
      }
    }

    return {
      ok: false,
      message: 'Error to create newsletter'
    }
  }
}
