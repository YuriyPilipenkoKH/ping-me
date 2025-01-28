
export interface Message {
  _id:string
  senderId: string
  receiverId: string
  text?: string
  image?: string
  createdAt?:Date
  updatedAt?:Date
}
export interface img {
  image: File
  text?: string
}

export interface MessageInput  {
  text?: string
  image?: string
}

