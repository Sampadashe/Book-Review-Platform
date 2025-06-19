"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useBooks } from "@/contexts/book-context"
import { useReviews } from "@/contexts/review-context"
import BookDetails from "@/components/book-details"
import ReviewsList from "@/components/reviews-list"
import ReviewForm from "@/components/review-form"
import LoadingSpinner from "@/components/loading-spinner"
import type { Book } from "@/types"

export default function BookPage() {
  const params = useParams()
  const bookId = Number.parseInt(params.id as string)
  const { getBookById } = useBooks()
  const { getReviewsByBookId } = useReviews()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true)
        const bookData = await getBookById(bookId)
        if (bookData) {
          setBook(bookData)
        } else {
          setError("Book not found")
        }
      } catch (err) {
        setError("Failed to load book")
      } finally {
        setLoading(false)
      }
    }

    if (bookId) {
      fetchBook()
    }
  }, [bookId, getBookById])

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-center text-red-600 py-8">Error: {error}</div>
  if (!book) return <div className="text-center py-8">Book not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <BookDetails book={book} />

      <div className="mt-12 grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Write a Review</h2>
          <ReviewForm bookId={book.id} />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Reviews</h2>
          <ReviewsList bookId={book.id} />
        </div>
      </div>
    </div>
  )
}
