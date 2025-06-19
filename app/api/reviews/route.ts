import { type NextRequest, NextResponse } from "next/server"
import type { Review } from "@/types"

// Mock data - In a real app, this would come from a database
const reviews: Review[] = [
  {
    id: 1,
    bookId: 1,
    userId: 1,
    userName: "John Doe",
    rating: 5,
    title: "A timeless masterpiece",
    content:
      "The Great Gatsby is a beautifully written novel that captures the essence of the American Dream and its ultimate futility. Fitzgerald's prose is elegant and the characters are complex and memorable.",
    createdAt: "2024-01-15T10:30:00Z",
    helpful: 12,
  },
  {
    id: 2,
    bookId: 1,
    userId: 2,
    userName: "Jane Smith",
    rating: 4,
    title: "Great read, but overhyped",
    content:
      "While I enjoyed the book and appreciate its literary significance, I found some parts slow-paced. The symbolism is rich and the ending is powerful.",
    createdAt: "2024-01-20T14:15:00Z",
    helpful: 8,
  },
  {
    id: 3,
    bookId: 2,
    userId: 1,
    userName: "John Doe",
    rating: 5,
    title: "Powerful and moving",
    content:
      "Harper Lee created a masterpiece that deals with serious themes while remaining accessible. The character development is exceptional and the moral lessons are timeless.",
    createdAt: "2024-02-01T09:45:00Z",
    helpful: 15,
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const bookId = searchParams.get("bookId")
    const userId = searchParams.get("userId")

    let filteredReviews = [...reviews]

    if (bookId) {
      filteredReviews = filteredReviews.filter((review) => review.bookId === Number.parseInt(bookId))
    }

    if (userId) {
      filteredReviews = filteredReviews.filter((review) => review.userId === Number.parseInt(userId))
    }

    // Sort by creation date (newest first)
    filteredReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json(filteredReviews)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const reviewData = await request.json()

    // Validate required fields
    const requiredFields = ["bookId", "userId", "userName", "rating", "title", "content"]
    for (const field of requiredFields) {
      if (reviewData[field] === undefined || reviewData[field] === null) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Validate rating
    if (reviewData.rating < 1 || reviewData.rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 })
    }

    // Create new review
    const newReview: Review = {
      id: reviews.length + 1,
      bookId: reviewData.bookId,
      userId: reviewData.userId,
      userName: reviewData.userName,
      rating: reviewData.rating,
      title: reviewData.title,
      content: reviewData.content,
      createdAt: new Date().toISOString(),
      helpful: 0,
    }

    reviews.push(newReview)

    return NextResponse.json(newReview, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
  }
}
