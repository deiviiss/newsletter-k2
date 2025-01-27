'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { MenuImage } from '@/components/menu-image/MenuImage'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { type WeeklyMenuProps } from '@/interfaces/menu/menu.interface'

export default function MenuCarousel({ menuItems }: WeeklyMenuProps) {
  if (!menuItems || menuItems.length === 0) return null
  const router = useRouter()

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const today = new Date().getDay() - 1
    setCurrentIndex(today >= 0 && today < 5 ? today : 0)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % menuItems.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + menuItems.length) % menuItems.length)
  }

  const goToDetails = (id: string) => {
    router.push(`/breakfasts/${id}`)
  }

  return (
    <div className="relative w-full mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center capitalize">{menuItems[currentIndex]?.weekday?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <MenuImage
            src={menuItems[currentIndex]?.menuImage?.url || '/images/placeholder.svg'}
            alt={menuItems[currentIndex]?.title}
            width={500}
            height={600}
            className="w-full h-48 object-cover mb-4 rounded-md"
          />
          <h3 className="text-xl font-bold mb-2">{menuItems[currentIndex]?.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{menuItems[currentIndex]?.ingredients?.map(item => item.name).join(', ') + '.'}</p>
          <Button
            onClick={() => {
              goToDetails(menuItems[currentIndex]?.id)
            }}
            className="w-full flex items-center justify-center gap-2"
          >
            <AiOutlineInfoCircle className="text-lg" />
            View Details
          </Button>
        </CardContent>
      </Card>
      {
        menuItems.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 left-4 transform -translate-y-1/2"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-4 transform -translate-y-1/2"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )
      }

    </div>
  )
}
