"use client"

import { useBooks } from "@/contexts/book-context"
import BookCard from "./book-card"
import LoadingSpinner from "./loading-spinner"

export default function FeaturedBooks() {
  const { books, loading, error } = useBooks()

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-center text-red-600">Error loading featured books</div>

  const featuredBooks = books.filter((book) => book.featured).slice(0, 8)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredBooks.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}
