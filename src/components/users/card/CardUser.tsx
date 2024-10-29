'use client'

import Link from 'next/link'
import { BsPencil } from 'react-icons/bs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  user: {
    id: string
    name: string
    email: string
    role: string
  }
}

export const CardUser = ({ user }: Props) => {
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

        <div className="ml-auto flex items-center gap-2">
          <Button asChild size="sm" variant="outline" className="h-8 gap-1">
            <Link
              href={`/admin/users/${user.id}/edit`}
              className="hover:underline flex items-center gap-2">
              <BsPencil className="h-3.5 w-3.5" />
              <span className='hidden min-[500px]:block'>Editar</span>
            </Link>
          </Button>
        </div>
      </CardHeader>
    </Card>
  )
}
