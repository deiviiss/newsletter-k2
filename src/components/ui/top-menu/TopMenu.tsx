'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { IoChevronDown, IoMenu } from 'react-icons/io5'
import { Button } from '../button'
import { ToogleDarkMode } from '@/components/dark-mode/toogle-dark-mode/ToogleDarkMode'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { titleFont } from '@/config/fonts'
import { useUiStore } from '@/store'

export const TopMenu = () => {
  const openMenu = useUiStore((state) => state.openSideMenu)

  const { data: session } = useSession()
  const isAuthenticated = !!session?.user

  const [bgColor, setBgColor] = useState('bg-none')
  const fixedScrollThreshold = 0.1 // 1% scroll threshold

  const handleScroll = () => {
    // calculate the vertical scroll percentage
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    setBgColor(scrolled > fixedScrollThreshold ? 'bg-white dark:bg-gray-950' : 'bg-none') // change the background color if the percentage is greater than the fixed value
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll) // add the event listener for the scroll

    return () => {
      window.removeEventListener('scroll', handleScroll) // delete the event listener when the component is unmounted
    }
  }, [])

  return (
    <div className={`fixed-menu w-full fixed top-0 z-20 ${bgColor} transition-all duration-500`}>
      <header className="container mx-auto lg:px-20 px-4 py-2 flex justify-between items-center">
        <Link href={'/'}>
          <div className="flex items-center space-x-2">
            <Image src="/imgs/GK_foundation_logo-vertical.png" alt="Public Bilingual Kinder Garden" width={70} height={70} />
            <span className="text-xl sm:text-2xl font-bold">Public Bilingual Kinder Garden</span>
          </div>
        </Link>
        <nav className='flex items-center space-x-2'>
          <ToogleDarkMode />
          <Button
            size="lg"
            type="button"
            variant='ghost'
            onClick={openMenu}
            className={`${titleFont.className} transition-all hover:bg-gray-900 hover:text-white md:hidden px-2`}
          >
            <IoMenu size={30} />
          </Button>
          <ul className="hidden space-x-4 md:flex items-center">
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center hover:text-blue-400 transition-colors">
                  Newsletters <IoChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/newsletters?grade=K2" className="w-full">K2</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/newsletters?grade=K3" className="w-full">K3</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li><Link href="/breakfasts" className="hover:text-blue-400 transition-colors">Breakfasts</Link></li>
            {
              !isAuthenticated
                ? (
                  <li><Link href="/auth/login" className="hover:text-blue-400 transition-colors">Login</Link></li>)
                : (
                  <>
                    <li><Link href="/profile" className="hover:text-blue-400 transition-colors">Profile</Link></li>
                  </>)
            }
          </ul>
        </nav>
      </header>
    </div>
  )
}
