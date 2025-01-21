'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { IoInformationOutline } from 'react-icons/io5'
import { authenticate } from '@/actions'
import { Button } from '@/components/ui/button'

export const LoginForm = () => {
  const searchParams = useSearchParams()
  const [state, dispatch] = useFormState(authenticate, undefined)
  const redirectTo = searchParams.get('redirectTo') || '/profile'

  useEffect(() => {
    if (state === 'SuccessSignin') {
      window.location.replace(redirectTo)
    }
  }, [state])

  return (
    <form action={dispatch} className="w-full flex flex-col max-w-[440px]">

      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border  rounded mb-5"
        type="email"
        name='email'
      />

      <label htmlFor="password">Contraseña</label>
      <input
        className="px-5 py-2 border rounded mb-5"
        type="password"
        name='password' />

      <div
        className='flex h-8 items-end space-x-1 text-red-500'
        aria-live='polite'
        aria-atomic='true'
      >
        {
          state === 'CredentialsInvalid' && (
            <div className='flex mb-2'>
              <IoInformationOutline className='h-5 w-5' />
              <p className='text-sm'>Credenciales invalidas</p>
            </div>
          )
        }
      </div>

      <LoginButton />

    </form >
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      disabled={pending}
    >
      {pending ? 'Ingresando...' : 'Ingresar'}
    </Button>
  )
}
