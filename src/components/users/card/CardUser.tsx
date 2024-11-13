'use client'

import Link from 'next/link'
import { BsPencil, BsToggleOff, BsToggleOn } from 'react-icons/bs'
import { toast } from 'sonner'
import { toggleUserStatus } from '@/actions/users/toggle-status'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { type IUser } from '@/interfaces'

interface Props {
  user: IUser
}

export const CardUser = ({ user }: Props) => {
  const { id, isActive, name } = user

  const openConfirmationToggle = () => {
    toast('Deactivate user', {
      description: `Are you sure? Will be ${isActive ? 'disabled' : 'able'
        } the user ${name} and ${isActive ? 'will not be able' : 'will be able'} to access the platform`,
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
        label: 'Confirm',
        onClick: async () => { await handleToggleUserStatus(id, isActive) }
      },
      cancel:
      {
        label: 'Cancel',
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

  const handleToggleUserStatus = async (id: string, status: boolean) => {
    const { ok, message } = await toggleUserStatus({ id, status })

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
  }
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <Avatar className="bg-gray-200 text-gray-600 h-12 w-12 rounded-full">
            <AvatarImage src="/imgs/avatar.png" />
            <AvatarFallback>BC</AvatarFallback>
          </Avatar>
          <CardTitle className="group flex items-center gap-2 text-lg mt-1">{user.name}</CardTitle>
          <CardDescription className="text-gray-500 text-sm">{user.email}</CardDescription>
          <CardDescription className="text-gray-500 text-sm capitalize">{user.role}</CardDescription>
        </div>

        <div className="ml-auto flex flex-col min-[430px]:flex-row items-center gap-2">
          <Button asChild size="sm" variant="outline" className="h-8 gap-1">
            <Link
              href={`/admin/users/${user.id}/edit`}
              className="hover:underline flex items-center gap-2">
              <BsPencil className="h-3.5 w-3.5" />
              <span className='hidden min-[550px]:block'>Editar</span>
            </Link>
          </Button>
          <Button
            onClick={() => {
              openConfirmationToggle()
            }}
            size="sm"
            variant={user.isActive ? 'destructive' : 'primary'}
            className="h-8 gap-1">
            {
              user.isActive
                ? (
                  <>
                    <BsToggleOn className="h-3.5 w-3.5" />
                    <span className="hover:underline hidden min-[550px]:block">Desactive</span>
                  </>)
                : (
                  <>
                    <BsToggleOff className="h-3.5 w-3.5" />
                    <span className="hover:underline hidden min-[550px]:block">Active</span>
                  </>)
            }
          </Button>
        </div>
      </CardHeader>
    </Card>
  )
}
