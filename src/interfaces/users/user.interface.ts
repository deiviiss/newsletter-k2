export interface User {
  id: string
  email: string
  name: string
  password: string
  role: Role
  isActive: boolean
}

export type Role = 'admin' | 'teacher'
