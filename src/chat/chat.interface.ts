export enum MessageRole {
  client,
  service,
}

export interface MessageData {
  content: string
}

export interface Message {
  role: MessageRole
  data: MessageData
  createAt: number
}
