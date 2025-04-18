'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { BsChevronDown } from 'react-icons/bs'
import { IoCalendar, IoCloseOutline, IoHome, IoLogInOutline, IoLogOutOutline, IoNewspaperOutline, IoPeopleOutline, IoPersonOutline } from 'react-icons/io5'
import { MdOutlineFreeBreakfast } from 'react-icons/md'
import { logout } from '@/actions'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { useUiStore } from '@/store'

export const Sidebar = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen)
  const closeMenu = useUiStore((state) => state.closeSideMenu)

  const { data: session } = useSession()
  const isAuthenticated = !!session?.user
  const isAdmin = session?.user?.role === 'admin'
  const isTeacher = session?.user?.role === 'teacher'

  return (
    <div>
      {
        isSideMenuOpen && (
          <>
            {/* background */}
            <div className='fixed top-0 left-0 w-screen h-screen z-30 bg-primary opacity-10'>
            </div>
            {/* blur */}
            <div onClick={closeMenu} className='fade-in fixed top-0 left-0 w-screen h-screen z-30 backdrop-filter backdrop-blur-sm'>
            </div>
          </>
        )
      }

      <nav className={
        clsx(
          'fixed p-5 right-0 top-0 w-full md:w-[350px] h-screen bg-secondary dark:bg-gray-950 z-40 shadow-2xl transform transition-all duration-300',
          {
            'translate-x-full': !isSideMenuOpen
          }
        )
      }>

        <IoCloseOutline
          size={50}
          className='absolute top-5 right-5 cursor-pointer'
          onClick={closeMenu}
        />

        {/* menú */}
        <div className='mt-16'>
          <Link href='/'
            onClick={() => { closeMenu() }}
            className='flex items-center mt-7 p-2 hover:bg-primary hover:text-secondary rounded-none transition-all'>
            <IoHome size={30} />
            <span className='ml-3 text-xl'>Home</span>
          </Link>

          <Link href='/holidays'
            onClick={() => { closeMenu() }}
            className='flex items-center mt-7 p-2 hover:bg-primary hover:text-secondary rounded-none transition-all'>
            <IoCalendar size={30} />
            <span className='ml-3 text-xl'>Holidays</span>
          </Link>

          <Collapsible>
            <CollapsibleTrigger className='flex items-center w-full mt-7 p-2 hover:bg-primary hover:text-secondary rounded-none transition-all'>
              <IoNewspaperOutline size={30} />
              <span className='ml-3 text-xl'>Newsletters</span>
              <BsChevronDown className="ml-auto h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Link href='/newsletters?grade=K2'
                onClick={() => { closeMenu() }}
                className='flex items-center mt-2 p-2 pl-12 hover:bg-primary hover:text-secondary rounded-none transition-all'>
                <span className='text-xl'>K2</span>
              </Link>
              <Link href='/newsletters?grade=K3'
                onClick={() => { closeMenu() }}
                className='flex items-center mt-2 p-2 pl-12 hover:bg-primary hover:text-secondary rounded-none transition-all'>
                <span className='text-xl'>K3</span>
              </Link>
            </CollapsibleContent>
          </Collapsible>

          {
            !isAuthenticated
              ? (
                <Link href='/auth/login'
                  onClick={() => { closeMenu() }}
                  className='flex items-center mt-7 p-2 hover:bg-primary hover:text-secondary rounded-none transition-all'>
                  <IoLogInOutline size={30} />
                  <span className='ml-3 text-xl'>Login</span>
                </Link>)
              : (
                <button
                  onClick={() => {
                    logout()
                    closeMenu()
                    window.location.replace('/auth/login')
                  }}
                  className='flex items-center w-full mt-7 p-2 hover:bg-primary hover:text-secondary rounded-none transition-all'>
                  <IoLogOutOutline size={30} />
                  <span className='ml-3 text-xl'>Logout</span>
                </button>)
          }

          {/* divisor */}
          <div className="w-full h-px bg-gray-100 rounded transition-all mt-5"></div>

          {
            isTeacher && (
              <>
                <Link href='/profile'
                  onClick={() => { closeMenu() }}
                  className='flex items-center mt-7 p-2 hover:bg-primary hover:text-secondary rounded-none transition-all'>
                  <IoPersonOutline size={30} />
                  <span className='ml-3 text-xl'>Profile</span>
                </Link>

                <Link href='/admin/newsletters'
                  onClick={() => { closeMenu() }}
                  className='flex items-center mt-7 p-2 hover:bg-primary hover:text-secondary rounded-none transition-all'>
                  <IoNewspaperOutline size={30} />
                  <span className='ml-3 text-xl'>Newsletters</span>
                </Link>
              </>
            )
          }

          {
            isAdmin && (
              <>
                <Link href='/profile'
                  onClick={() => { closeMenu() }}
                  className='flex items-center mt-7 p-2 hover:bg-primary hover:text-secondary rounded-none transition-all'>
                  <IoPersonOutline size={30} />
                  <span className='ml-3 text-xl'>Profile</span>
                </Link>

                <Link href='/admin/newsletters'
                  onClick={() => { closeMenu() }}
                  className='flex items-center mt-7 p-2 hover:bg-primary hover:text-secondary rounded-none transition-all'>
                  <IoNewspaperOutline size={30} />
                  <span className='ml-3 text-xl'>Newsletters</span>
                </Link>

                <Link href='/admin/breakfasts'
                  onClick={() => { closeMenu() }}
                  className='flex items-center mt-7 p-2 hover:bg-primary hover:text-secondary rounded-none transition-all'>
                  <MdOutlineFreeBreakfast size={30} />
                  <span className='ml-3 text-xl'>Breakfasts</span>
                </Link>

                <Link href='/admin/users'
                  onClick={() => { closeMenu() }}
                  className='flex items-center mt-7 p-2 hover:bg-primary hover:text-secondary rounded-none transition-all'>
                  <IoPeopleOutline size={30} />
                  <span className='ml-3 text-xl'>Users</span>
                </Link>
              </>)
          }
        </div>
      </nav >
    </div >
  )
}
