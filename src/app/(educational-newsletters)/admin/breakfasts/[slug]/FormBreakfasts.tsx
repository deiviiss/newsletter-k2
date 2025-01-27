'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { toast } from 'sonner'
import * as z from 'zod'
import { createUpdateMenu } from '@/actions/breakfasts/create-update-menu'
import { deleteMenuImage } from '@/actions/breakfasts/delete-menu-image'
import { MenuImage } from '@/components/menu-image/MenuImage'
import { Button } from '@/components/ui/button'
import { CloudinaryButton, type MenuImage as MenuImageType } from '@/components/ui/button-cloudinary/CloudinaryButton'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { type WeeklyMenuItem } from '@/interfaces/menu/menu.interface'

const formSchema = z.object({
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
  preparation: z.string().min(1, 'Preparation cannot be empty.')
})

type FormValues = z.infer<typeof formSchema>

interface BreakfastFormProps {
  breakfast?: WeeklyMenuItem
}

export const FormBreakfasts = ({ breakfast }: BreakfastFormProps) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [image, setImage] = useState<MenuImageType | null>(breakfast?.menuImage ?? null)

  const defaultFormValues: FormValues = {
    title: breakfast?.title ?? '',
    ingredients: breakfast?.ingredients ?? [{ name: '', quantity: '', calories: 0, protein: 0, lipids: 0, carbs: 0 }],
    preparation: breakfast?.preparation ?? ''
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues
  })

  const { fields: ingredientsFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control: form.control,
    name: 'ingredients'
  })

  const openConfirmDeleteImage = (id: string, url: string) => {
    toast('¿Estás seguro de eliminar la imagen?', {
      position: 'top-right',
      duration: Infinity,
      className: 'grid grid-cols-[1fr,110px] items-start justify-center text-sm p-2 col-span-2 pb-4',
      classNames: {
        content: 'flex items-start justify-center text-sm col-span-4 p-2'
      },
      actionButtonStyle: {
        color: 'white',
        backgroundColor: '#000000',
        borderRadius: '0px',
        font: 'message-box',
        padding: '0.5rem 1rem',
        height: '2rem'
      },
      action: {
        label: 'Confirmar',
        onClick: async () => { await handleDeleteImageClick(id, url) }
      },
      cancel:
      {
        label: 'Cancelar',
        onClick: () => { toast.dismiss() }
      },
      cancelButtonStyle: {
        color: 'white',
        backgroundColor: 'red',
        borderRadius: '0px',
        font: 'message-box',
        padding: '0.5rem 1rem',
        height: '2rem'
      }
    })
  }

  const handleDeleteImageClick = async (id: string, url: string) => {
    setIsSubmitting(true)

    const { ok, message } = await deleteMenuImage(id, url)

    if (!ok) {
      toast.error(message, {
        position: 'top-right',
        duration: 2000
      })
      setIsSubmitting(false)
      return
    }

    setImage(null)

    setIsSubmitting(false)
    toast.success('Image deleted successfully', {
      position: 'top-right',
      duration: 2000
    })
  }

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)

    if (!image) {
      toast.error('Should upload an image', {
        position: 'top-right',
        duration: 2000
      })
      setIsSubmitting(false)
      return
    }

    try {
      const formData = new FormData()
      if (breakfast?.id) { formData.append('id', breakfast.id) }
      formData.append('title', values.title)
      formData.append('ingredients', JSON.stringify(values.ingredients))
      formData.append('preparation', values.preparation)
      formData.append('images', JSON.stringify(image))

      const { ok, message } = await createUpdateMenu(formData)

      if (!ok) {
        toast.error(message, {
          position: 'top-right',
          duration: 2000
        })

        return
      }

      toast.success(message, {
        position: 'top-right',
        duration: 2000
      })

      router.push('/admin/breakfasts')
    } catch (error) {
      toast.error('An error occurred while saving the breakfast', {
        position: 'top-right',
        duration: 2000
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card >
          {/* Title */}
          <CardHeader>
            <CardTitle>{breakfast ? 'Edit Breakfast Menu' : 'Create Breakfast Menu'}</CardTitle>
            <CardDescription>Enter the details for the breakfast menu</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title of the menu</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write the title"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>

          {/* <div> */}

          <CardHeader>
            Ingredients
          </CardHeader>
          <CardContent className='space-y-4'>
            {ingredientsFields.map((field, index) => (
              <div key={field.id} className='space-y-2'>
                <span className='text-xs'>Ingredient {index + 1}</span>
                <div className='grid grid-cols-2 gap-x-2'>
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='grid grid-cols-2 gap-x-2'>
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.calories`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Calories</FormLabel>
                        <FormControl>
                          <Input {...field}
                            onChange={(e) => { field.onChange(e.target.value === '' ? 0 : parseFloat(e.target.value)) }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.protein`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Protein</FormLabel>
                        <FormControl>
                          <Input {...field}
                            onChange={(e) => { field.onChange(e.target.value === '' ? 0 : parseFloat(e.target.value)) }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.lipids`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lipids</FormLabel>
                        <FormControl>
                          <Input {...field}
                            onChange={(e) => { field.onChange(e.target.value === '' ? 0 : parseFloat(e.target.value)) }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.carbs`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Carbs</FormLabel>
                        <FormControl>
                          <Input {...field}
                            onChange={(e) => { field.onChange(e.target.value === '' ? 0 : parseFloat(e.target.value)) }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='w-full flex justify-end'>
                  <Button
                    type='button'
                    size={'sm'}
                    variant={'outline'}
                    onClick={() => {
                      removeIngredient(index)
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <div className='w-full flex justify-end'>
              <Button
                type='button'
                variant={'outline'}
                onClick={() => {
                  appendIngredient({ name: '', quantity: '', calories: 0, protein: 0, lipids: 0, carbs: 0 })
                }}
              >
                Add ingredient
              </Button>
            </div>
          </CardContent>

          <CardContent>
            <FormField
              control={form.control}
              name="preparation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preparation Mode</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Write the way to prepare' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )

              }
            />
          </CardContent>

          <CardHeader>
            <h2>Image</h2>
          </CardHeader>

          {
            image && (
              <div
                className='flex items-center justify-center gap-1'
              >
                <div className='relative'>
                  <MenuImage
                    src={image.url}
                    alt={image?.url}
                    width={300}
                    height={200}
                    className="rounded-t shadow-md"
                  />
                  <Button
                    disabled={isSubmitting}
                    size='icon'
                    variant='destructive'
                    className='absolute w-5 h-5 rounded-lg -top-2 -right-2 p-0'
                    onClick={() => { openConfirmDeleteImage(image.id, image.url) }}
                    type='button'
                  >
                    <IoCloseCircleOutline className='w-6 h-6' />
                  </Button>
                </div>
              </div>
            )
          }

          <CloudinaryButton image={image} setImage={setImage as (image: MenuImageType | ((prevImage: MenuImageType) => MenuImageType)) => void} />

          <CardFooter>
            <div className='flex gap-2 w-full text-center justify-end my-10'>
              <Button
                size="sm"
                type='button'
                onClick={() => { router.back() }}
                variant='destructive'
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                size={'sm'}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'loading...' : (breakfast ? 'Update' : 'Create')}
              </Button>
            </div>
          </CardFooter>
        </Card>

      </form>
    </Form>
  )
}
