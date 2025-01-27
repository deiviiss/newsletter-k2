'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { getUserSessionServer } from '../auth/getUserSessionServer'
import prisma from '@/lib/prisma'

const formSchema = z.object({
  id: z.string().optional().nullable(),
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.'
  }),
  ingredients: z.array(z.object({
    name: z.string().min(1, 'Ingredient name cannot be empty.'),
    quantity: z.string().min(1, 'Ingredient quantity cannot be empty.'),
    calories: z
      .number()
      .min(0.01, 'Ingredient calories cannot be empty.')
      .transform(val => Number(val.toFixed(2))),
    protein: z
      .number()
      .min(0.01, 'Ingredient protein cannot be empty.')
      .transform(val => Number(val.toFixed(2))),
    lipids: z
      .number()
      .min(0.01, 'Ingredient lipids cannot be empty.')
      .transform(val => Number(val.toFixed(2))),
    carbs: z
      .number()
      .min(0.01, 'Ingredient carbs cannot be empty.')
      .transform(val => Number(val.toFixed(2)))
  })),
  image: z.object({
    id: z.string().min(1, 'Image id cannot be empty.'),
    url: z.string().min(1, 'Image url cannot be empty.')
  }),
  preparation: z.string().min(1, 'Preparation cannot be empty.')
})

export const createUpdateMenu = async (formData: FormData) => {
  const data = Object.fromEntries(formData)
  const parsedIngredients = JSON.parse(formData.get('ingredients') as string)
  const parsedImages = JSON.parse(formData.get('images') as string)

  const dataToValidate = {
    id: data.id,
    title: data.title,
    ingredients: parsedIngredients,
    preparation: data.preparation,
    image: parsedImages
  }

  const menuParsed = formSchema.safeParse(dataToValidate)

  if (!menuParsed.success) {
    throw new Error('Invalid data')
  }

  try {
    // check user
    const userSession = await getUserSessionServer()
    const email = userSession?.email

    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if (user === null) {
      throw new Error('User not found')
    }

    const { title, ingredients, preparation, image, id } = menuParsed.data

    const prismaTx = await prisma.$transaction(async (tx) => {
      if (id) {
        await tx.menu.update({
          where: {
            id
          },
          data: {
            title,
            preparation,
            ingredients: {
              deleteMany: {},
              createMany: {
                data: ingredients
              }
            },
            menuImage: {
              upsert: {
                update: image,
                create: image
              }
            }
          }
        })

        return {
          ok: true,
          message: 'Breakfast updated successfully'
        }
      }

      if (!id) {
        await tx.menu.create({
          data: {
            title,
            preparation,
            ingredients: {
              createMany: {
                data: ingredients
              }
            },
            menuImage: {
              create: image
            }
          }

        })
        return {
          ok: true,
          message: 'Breakfast created successfully'
        }
      }
    })

    if (id) {
      revalidatePath(`/breakfasts/${id}`)
    }

    revalidatePath('/')
    revalidatePath('/admin/breakfasts')

    return {
      ok: true,
      message: prismaTx?.message
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error creating menu, please try again'
    }
  }
}
