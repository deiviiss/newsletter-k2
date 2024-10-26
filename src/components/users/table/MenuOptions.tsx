'use client'

import Link from 'next/link'
import { IoEllipsisHorizontalSharp, IoAlertCircleOutline } from 'react-icons/io5'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface Props {
  user: {
    id: string
    name: string
    email: string
    role: string
  }
}
export const MenuOptionsUser = ({ user }: Props) => {
  const { id } = user

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
          <span className="sr-only">Open menu</span>
          <IoEllipsisHorizontalSharp className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Seleccione</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <IoAlertCircleOutline className='h-4 w-4 mr-2' />
          <Link
            href={`/admin/users/${id}/edit`}
            className="hover:underline">
            Editar
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}
