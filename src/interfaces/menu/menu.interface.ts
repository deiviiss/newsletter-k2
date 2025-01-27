export interface WeeklyMenuItem {
  id: string
  title: string
  weekday: {
    id: string
    name: string
    order: number
  } | null
  menuImage: MenuImage | null
  ingredients: Ingredient[]
  preparation: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface availableDays {
  id: string
  name: string
  order: number
}

interface MenuImage {
  id: string
  url: string
}

interface Ingredient {
  id: string
  name: string
  quantity: string
  calories: number
  protein: number
  lipids: number
  carbs: number
}

export interface WeeklyMenuProps {
  menuItems?: WeeklyMenuItem[]
}
