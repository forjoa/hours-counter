export interface ApiResponse {
  message: string
  success: boolean
}

export interface User {
  userid?: number
  name: string
  lastname: string
  email: string
  password?: string
  createdat?: string
  updatedat?: string
}
