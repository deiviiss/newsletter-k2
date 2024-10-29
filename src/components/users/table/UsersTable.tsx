'use client'

import Link from 'next/link'
import { BsPencil } from 'react-icons/bs'
import { Button } from '@/components/ui/button'
import { type IUser } from '@/interfaces'

interface Props {
  users: IUser[]
}

export const UsersTable = ({ users }: Props) => {
  return (
    <table className="min-w-full">
      <thead className="bg-gray-200 border-b">
        <tr>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Email
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Nombre completo
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Role
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Opciones
          </th>
        </tr>
      </thead>
      <tbody>
        {
          users?.map(user => (
            <tr
              key={user.id}
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.email}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {user.name}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap capitalize">
                {user.role}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {/* <MenuOptionsUser user={user} /> */}
                <Button asChild size="sm" variant="outline" className="h-8 gap-1">
                  <Link
                    href={`/admin/users/${user.id}/edit`}
                    className="hover:underline flex items-center gap-2">
                    <BsPencil className="h-3.5 w-3.5" />
                    <span className='hidden min-[500px]:block'>Editar</span>
                  </Link>
                </Button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
