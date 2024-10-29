'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { updateUser } from '@/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type IUser } from '@/interfaces'

const formUserSchema = z.object({
  id: z
    .string()
    .uuid(),
  name: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(255, { message: 'El nombre debe tener menos de 255 caracteres' }),
  email: z
    .string()
    .email({ message: 'El correo electrónico no es válido' }),
  password: z
    .string()
    .refine(value => value === '' || (value.length >= 6 && value.length <= 10), {
      message: 'La contraseña debe tener entre 6 y 10 caracteres si será cambiada'
    })
})

export const EditForm = (user: IUser) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultValuesForm = {
    id: user.id,
    name: user.name,
    email: user.email,
    password: ''
  }

  const form = useForm<z.infer<typeof formUserSchema>>({
    resolver: zodResolver(formUserSchema),
    defaultValues: defaultValuesForm
  })

  const onSubmit = async (values: z.infer<typeof formUserSchema>) => {
    setIsSubmitting(true)

    const { ok, message } = await updateUser({ ...values })
    if (!ok) {
      toast.error(message, {
        position: 'top-right',
        duration: 2000
      })
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)

    toast.success(message, {
      position: 'top-right',
      duration: 2000
    })

    router.replace('/profile')
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <Card>
            <CardHeader>
              <CardTitle>{user ? 'Edit user' : 'Create'}</CardTitle>
              <CardDescription>
                Edit an existing user
              </CardDescription>
            </CardHeader>

            <CardContent>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input
                        className='focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-200'
                        type='text'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className='focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-200'
                        type='email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className='focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-200'
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      If you capture the password it will be reset
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex gap-2 w-full text-center justify-end my-10'>
                <Button
                  size='sm'
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save
                </Button>

                <Button
                  asChild
                  size="sm"
                  variant='destructive'
                >
                  <Link
                    href="/profile"
                  >
                    Cancel
                  </Link>
                </Button>
              </div>

            </CardContent>
          </Card>

        </form>
      </Form>
    </>
  )
}
