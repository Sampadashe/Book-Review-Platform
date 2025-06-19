import Link from "next/link"
import { Star, Calendar } from "lucide-react"
import type { Review } from "@/types"

interface UserReviewsProps {
  reviews: Review[]
}

export default function UserReviews({ reviews }: UserReviewsProps) {
  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">You haven't written any reviews yet.</p>
          <Link
            href="/books"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Books to Review
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">My Reviews ({reviews.length})</h2>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg">{review.title}</h3>
                <p className="text-sm text-gray-600">Book ID: {review.bookId}</p>
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

            <p className="text-gray-700 mb-3 line-clamp-3">{review.content}</p>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
              <span>{review.helpful} people found this helpful</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
