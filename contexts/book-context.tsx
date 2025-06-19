"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Book } from "@/types"

interface BookContextType {
  books: Book[]
  loading: boolean
  error: string | null
  searchBooks: (query: string) => Promise<Book[]>
  filterBooks: (filters: any) => Promise<Book[]>
  getBookById: (id: number) => Promise<Book | null>
  addBook: (book: Omit<Book, "id">) => Promise<Book>
}

const BookContext = createContext<BookContextType | undefined>(undefined)

export function BookProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/books")
      if (!response.ok) throw new Error("Failed to fetch books")
      const data = await response.json()

      // Handle both array response and paginated response
      if (Array.isArray(data)) {
        setBooks(data)
      } else if (data.books && Array.isArray(data.books)) {
        setBooks(data.books)
      } else {
        throw new Error("Invalid response format")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setBooks([]) // Set empty array as fallback
    } finally {
      setLoading(false)
    }
  }

  const searchBooks = async (query: string): Promise<Book[]> => {
    try {
      const response = await fetch(`/api/books?search=${encodeURIComponent(query)}`)
      if (!response.ok) throw new Error("Search failed")
      return await response.json()
    } catch (err) {
      console.error("Search error:", err)
      return []
    }
  }

  const filterBooks = async (filters: any): Promise<Book[]> => {
    try {
      const params = new URLSearchParams()
      if (filters.genre) params.append("genre", filters.genre)
      if (filters.rating) params.append("rating", filters.rating.toString())

      const response = await fetch(`/api/books?${params.toString()}`)
      if (!response.ok) throw new Error("Filter failed")
      return await response.json()
    } catch (err) {
      console.error("Filter error:", err)
      return []
    }
  }

  const getBookById = async (id: number): Promise<Book | null> => {
    try {
      const response = await fetch(`/api/books/${id}`)
      if (!response.ok) return null
      return await response.json()
    } catch (err) {
      console.error("Get book error:", err)
      return null
    }
  }

  const addBook = async (bookData: Omit<Book, "id">): Promise<Book> => {
    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      })
      if (!response.ok) throw new Error("Failed to add book")
      const newBook = await response.json()
      setBooks((prev) => [...prev, newBook])
      return newBook
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to add book")
    }
  }

  return (
    <BookContext.Provider
      value={{
        books,
        loading,
        error,
        searchBooks,
        filterBooks,
        getBookById,
        addBook,
      }}
    >
      {children}
    </BookContext.Provider>
  )
}

export function useBooks() {
  const context = useContext(BookContext)
  if (context === undefined) {
    throw new Error("useBooks must be used within a BookProvider")
  }
  return context
}
