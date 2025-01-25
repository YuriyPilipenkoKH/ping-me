

export interface User {
  name: string
  email: string
  password: string
  image: string
  role: string
  createdAt?:Date
  updatedAt?:Date
}