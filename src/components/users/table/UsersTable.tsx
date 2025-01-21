'use client'

import { MenuOptionsUser } from './MenuOptions'
import { type User } from '@/interfaces'

interface Props {
  users: User[]
}

export const UsersTable = ({ users }: Props) => {
  return (
    <table className="min-w-full shadow-lg rounded-lg overflow-hidden">
      <thead className="bg-green-200 dark:bg-gray-700 border-b ">
        <tr>
          <th scope="col" className="text-sm font-medium text-gray-900 dark:text-gray-100 px-6 py-4 text-left">
            Email
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 dark:text-gray-100 px-6 py-4 text-left">
            Nombre completo
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 dark:text-gray-100 px-6 py-4 text-left">
            Role
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 dark:text-gray-100 px-6 py-4 text-left">
            Role
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 dark:text-gray-100 px-6 py-4 text-left">
            Opciones
          </th>
        </tr>
      </thead>
      <tbody>
        {
          users?.map(user => (
            <tr
              key={user.id}
              className="bg-white dark:bg-gray-800 border-b transition duration-300 ease-in-out hover:bg-gray-100">

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                {user.email}
              </td>
              <td className="text-sm text-gray-900 dark:text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                {user.name}
              </td>
              <td className="text-sm text-gray-900 dark:text-gray-100 font-light px-6 py-4 whitespace-nowrap capitalize">
                {user.role}
              </td>
              <td className="text-sm text-gray-900 dark:text-gray-100 font-light px-6 py-4 whitespace-nowrap capitalize">
                {user.isActive ? 'Activo' : 'Inactivo'}
              </td>
              <td className="text-sm text-gray-900 dark:text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                <MenuOptionsUser user={user} />
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
