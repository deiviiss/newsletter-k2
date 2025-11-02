'use client'

import { IoLogOut } from 'react-icons/io5'
import { logout } from '@/actions'
import { Button } from '@/components/ui/button'

export const ButtonLogout = () => {
  return (
    <Button
      variant='destructive'
      size='sm'
      className='w-full gap-2 mt-2'
      onClick={async () => {
        await logout()
        window.location.replace('/')
      }}
    >
      <IoLogOut />
      <span>Log Out</span>
    </Button>
  )
}
