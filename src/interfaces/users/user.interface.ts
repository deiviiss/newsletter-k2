export interface IUser {
  id: string
  email: string
  name: string
  password: string
  role: Role
}

export type Role = 'admin' | 'teacher'
