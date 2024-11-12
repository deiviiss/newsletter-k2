'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { updateUser } from '@/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type IUser } from '@/interfaces'

const formUserSchema = z.object({
  id: z
    .string()
    .uuid(),
  name: z
    .string()
    .min(3, { message: 'The name must be at least 3 characters long' })
    .max(255, { message: 'The name must be less than 255 characters' }),
  email: z
    .string()
    .email({ message: 'Invalid email' }),
  password: z
    .string()
    .refine(value => value === '' || (value.length >= 6 && value.length <= 10), {
      message: 'The password must be between 6 and 10 characters long if it is to be changed'
    }),
  role: z.enum(['teacher', 'admin'])
})

export const EditForm = (user: IUser) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultValuesForm = {
    id: user.id,
    name: user.name,
    email: user.email,
    password: '',
    role: user.role
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

    const redirectTo = searchParams.get('redirectTo')
    const isProfile = redirectTo === 'profile'

    if (isProfile) {
      router.replace('/profile')
      return
    }

    router.replace('/admin/users')
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

            <CardContent className='space-y-5'>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input
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
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
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
                  size="sm"
                  type='button'
                  onClick={() => { router.back() }}
                  variant='destructive'
                >
                  Cancel
                </Button>

                <Button
                  size='sm'
                  type="submit"
                  disabled={isSubmitting}
                >
                  Update
                </Button>
              </div>

            </CardContent>
          </Card>

        </form>
      </Form>
    </>
  )
}
