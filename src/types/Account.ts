interface Account {
  name: string
  user?: string
  secret: string
  date: Date
  description?: string
  labels: string[]
  sync: boolean
  encrypt: boolean
}

export default Account
