'use client'

import { useTheme } from 'next-themes'
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5'
import { Button } from '@/components/ui/button'

export const ToogleDarkMode = () => {
  const { setTheme, theme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="rounded-md"
        onClick={toggleTheme}
      >
        {theme === 'light'
          ? (
            <IoSunnyOutline className="h-[1.2rem] w-[1.2rem]" />)
          : (
            <IoMoonOutline className="h-[1.2rem] w-[1.2rem]" />)
        }
        <span className="sr-only">Toggle theme</span>
      </Button>
    </>
  )
}
