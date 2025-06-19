"use client"

import { useState, useEffect } from "react"
import { useBooks } from "@/contexts/book-context"
import BookCard from "@/components/book-card"
import SearchFilters from "@/components/search-filters"
import LoadingSpinner from "@/components/loading-spinner"
import type { Book } from "@/types"

export default function BooksPage() {
  const { books, loading, error, searchBooks, filterBooks } = useBooks()
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const booksPerPage = 12

  useEffect(() => {
    setFilteredBooks(books)
  }, [books])

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      setFilteredBooks(books)
    } else {
      const filtered = books.filter(
        (book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase()) ||
          book.genre.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredBooks(filtered)
    }
    setCurrentPage(1)
  }

  const handleFilter = (filters: { genre: string; rating: number }) => {
    let filtered = books

    if (filters.genre && filters.genre !== "all") {
      filtered = filtered.filter((book) => book.genre.toLowerCase() === filters.genre.toLowerCase())
    }

    if (filters.rating > 0) {
      filtered = filtered.filter((book) => book.averageRating >= filters.rating)
    }

    setFilteredBooks(filtered)
    setCurrentPage(1)
  }

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage
  const indexOfFirstBook = indexOfLastBook - booksPerPage
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook)
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage)

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-center text-red-600 py-8">Error: {error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Books</h1>

      <SearchFilters onSearch={handleSearch} onFilter={handleFilter} />

      <div className="mb-6">
        <p className="text-gray-600">
          Showing {indexOfFirstBook + 1}-{Math.min(indexOfLastBook, filteredBooks.length)} of {filteredBooks.length}{" "}
          books
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {currentBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No books found matching your criteria.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 border rounded-lg ${
                currentPage === page ? "bg-blue-600 text-white" : "hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
