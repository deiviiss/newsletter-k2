import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { getMenuById } from '@/actions/breakfasts/get-menu-by-id'
import { getWeeklyMenu } from '@/actions/breakfasts/get-weekly-menu'
import { MenuImage } from '@/components/menu-image/MenuImage'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function BreakfastsDetails({ params }: { params: { id: string } }) {
  const { menu, ok } = await getMenuById(params.id)
  const { weeklyMenu } = await getWeeklyMenu()

  if (!ok || !weeklyMenu) {
    return <div>Menu not found</div>
  }

  const currentMenuIndex = weeklyMenu.findIndex((menu) => menu.id === params.id)
  const previousMenu = currentMenuIndex > 0 ? weeklyMenu[currentMenuIndex - 1] : null
  const nextMenu = currentMenuIndex < weeklyMenu.length - 1 ? weeklyMenu[currentMenuIndex + 1] : null

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Card>
        <CardHeader className='relative'>
          <div className="flex space-x-4">
            {previousMenu && (

              <Button
                variant="outline"
                size="icon"
                asChild
                className="absolute bottom-1 left-"
              >
                <Link href={`/breakfasts/${previousMenu.id}`} >
                  <ChevronLeft className="h-4 w-4" />
                </Link>
              </Button>
            )}
            {nextMenu && (
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-1 right-4"
                asChild
              >
                <Link href={`/breakfasts/${nextMenu.id}`} >
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
          <CardTitle className="text-3xl font-bold text-center">{menu?.title}</CardTitle>
          <p className="text-center text-gray-500 dark:text-gray-300 capitalize">{menu?.weekday?.name}</p>
        </CardHeader>
        <CardContent>
          <MenuImage
            src={menu?.menuImage.url || '/placeholder.svg'}
            alt={menu?.title ?? ''}
            width={581}
            height={789}
            className="w-full max-h-96 object-contain mb-6 rounded-lg"
          />
          <div className='overflow-auto'>
            <table className="w-full mb-6 overflow-hidden">
              <thead className='uppercase'>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="p-2 text-left">ingredients</th>
                  <th className="p-2 text-right">amount</th>
                  <th className="p-2 text-right">kcal</th>
                  <th className="p-2 text-right">p</th>
                  <th className="p-2 text-right">lip</th>
                  <th className="p-2 text-right">hc</th>
                </tr>
              </thead>
              <tbody>
                {menu?.ingredients.map((ingredient, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 text-left">{ingredient.name}</td>
                    <td className="p-2 text-right">{ingredient.quantity}</td>
                    <td className="p-2 text-right">{ingredient.calories}</td>
                    <td className="p-2 text-right">{ingredient.protein}</td>
                    <td className="p-2 text-right">{ingredient.lipids}</td>
                    <td className="p-2 text-right">{ingredient.carbs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-2xl font-semibold my-4">Preparation</h3>
          <p className="text-gray-700 dark:text-gray-300">{menu?.preparation}</p>
          <p className="text-gray-700 dark:text-gray-300">Dar una pieza de fruta de temporada como postre, como melón, sandía, mandarina o naranja (en gajos).</p>
          <p className="text-gray-700 dark:text-gray-300">Dar agua purificada en un vaso de 300ml.</p>
        </CardContent>
      </Card>
    </div>
  )
}
