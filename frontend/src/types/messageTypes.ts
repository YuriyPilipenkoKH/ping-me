
export interface Message {
  _id:string
  senderId: string
  receiverId: string
  text?: string
  image?: string
  createdAt?:Date
  updatedAt?:Date
}
export interface MessageInput extends Pick<Message, "text" | "image"> {}