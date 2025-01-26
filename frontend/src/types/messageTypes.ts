
export interface Message {
  senderId: string
  receiverId: string
  text?: string
  image?: string
  createdAt?:Date
  updatedAt?:Date
}