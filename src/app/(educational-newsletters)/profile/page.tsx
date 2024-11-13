import { type Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { IoPencil, IoNewspaper, IoCafe, IoPeopleOutline } from 'react-icons/io5'
import { getUserById, getUserSessionServer, validateUserAdmin } from '@/actions'
import { ButtonLogout } from '@/components'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'User profile',
  description: 'Contains user information.'
}

const ProfilePage = async () => {
  const userSession = await getUserSessionServer()

  if (!userSession) {
    redirect('/')
  }

  const { user } = await getUserById(userSession.id)
  const isAdmin = await validateUserAdmin()

  if (!user) {
    redirect('/')
  }

  const userName = user.name || 'User name'
  const userImage = '/imgs/avatar.png'
  const userMail = user.email || 'email'
  const userRole = user.role || 'teacher'

  return (
    <div className='w-full m-auto sm:w-[400px] py-4'>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            User information
          </CardDescription>
        </CardHeader>

        <CardContent className='flex justify-center'>
          <Avatar className="bg-gray-200 text-gray-600 h-28 w-28 rounded-full">
            <AvatarImage src={userImage} />
            <AvatarFallback>NK-2</AvatarFallback>
          </Avatar>
        </CardContent>

        <CardContent >
          <div className=' flex justify-end'>
            <Button asChild variant='outline' size='sm' className='gap-1'>
              <Link href={`/profile/${user.id}/edit?redirectTo=profile`} className='text-[10px]'>
                <IoPencil />
                <span className='hidden sm:flex'>Edit</span>
              </Link>
            </Button>
          </div>

          <p><span className='font-semibold'>Name:</span> {userName}</p>
          <p><span className='font-semibold'>Email:</span> {userMail}</p>
          <p className='capitalize'><span className='font-semibold mr-1'>Role:</span>{userRole}</p>
        </CardContent>

        <CardFooter className='flex flex-col gap-4'>
          <Button asChild variant='outline' size='sm' className='w-full gap-2'>
            <Link href="/admin/newsletters">
              <IoNewspaper />
              <span>Manage Newsletter</span>
            </Link>
          </Button>
          {
            isAdmin && (
              <>
                <Button asChild variant='outline' size='sm' className='w-full gap-2'>
                  <Link href="/admin/breakfasts">
                    <IoCafe />
                    <span>Manage Breakfast</span>
                  </Link>
                </Button>
                <Button asChild variant='outline' size='sm' className='w-full gap-2'>
                  <Link href="/admin/users">
                    <IoPeopleOutline />
                    <span>Manage Users</span>
                  </Link>
                </Button>
              </>
            )
          }
          <ButtonLogout />

        </CardFooter>

      </Card>
    </div>
  )
}

export default ProfilePage
