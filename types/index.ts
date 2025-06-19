export interface Book {
  id: number
  title: string
  author: string
  genre: string
  description: string
  coverImage: string
  publishedDate: string
  isbn: string
  pageCount: number
  averageRating: number
  reviewCount: number
  featured?: boolean
}

export interface Review {
  id: number
  bookId: number
  userId: number
  userName: string
  rating: number
  title: string
  content: string
  createdAt: string
  helpful: number
}

export interface User {
  id: number
  name: string
  email: string
  bio?: string
  joinedDate: string
  reviewCount: number
  favoriteGenres: string[]
  avatar?: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
  error?: string
}
