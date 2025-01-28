
export interface Message {
  _id:string
  senderId: string
  receiverId: string
  text?: string
  image?: string
  createdAt?:Date
  updatedAt?:Date
}
export interface MessageInput  {
  image: File
  text?: string
}
export interface img {
  image: File
}
export interface txt {
  text: string
}


