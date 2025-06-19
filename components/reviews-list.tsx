"use client"

import { useState, useEffect } from "react"
import { useReviews } from "@/contexts/review-context"
import { Star, ThumbsUp } from "lucide-react"
import type { Review } from "@/types"

interface ReviewsListProps {
  bookId: number
}

export default function ReviewsList({ bookId }: ReviewsListProps) {
  const { getReviewsByBookId } = useReviews()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const bookReviews = await getReviewsByBookId(bookId)
        setReviews(bookReviews)
      } catch (error) {
        console.error("Failed to fetch reviews:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [bookId, getReviewsByBookId])

  if (loading) {
    return <div className="text-center py-4">Loading reviews...</div>
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No reviews yet. Be the first to review this book!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="font-semibold text-lg">{review.title}</h4>
              <p className="text-sm text-gray-600">by {review.userName}</p>
            </div>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
          </div>

          <p className="text-gray-700 mb-4 leading-relaxed">{review.content}</p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{new Date(review.createdAt).toLocaleDateString()}</span>
            <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
              <ThumbsUp className="w-4 h-4" />
              <span>Helpful ({review.helpful})</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
