export interface IUser {
  id: string
  email: string
  name: string
  password: string
  role: Role
  isActive: boolean
}

export type Role = 'admin' | 'teacher'
