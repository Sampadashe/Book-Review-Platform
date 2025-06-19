"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Review } from "@/types"

interface ReviewContextType {
  reviews: Review[]
  loading: boolean
  error: string | null
  getReviewsByBookId: (bookId: number) => Promise<Review[]>
  getUserReviews: (userId: number) => Promise<Review[]>
  addReview: (review: Omit<Review, "id" | "createdAt">) => Promise<Review>
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined)

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getReviewsByBookId = async (bookId: number): Promise<Review[]> => {
    try {
      setLoading(true)
      const response = await fetch(`/api/reviews?bookId=${bookId}`)
      if (!response.ok) throw new Error("Failed to fetch reviews")
      const data = await response.json()
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      return []
    } finally {
      setLoading(false)
    }
  }

  const getUserReviews = async (userId: number): Promise<Review[]> => {
    try {
      setLoading(true)
      const response = await fetch(`/api/reviews?userId=${userId}`)
      if (!response.ok) throw new Error("Failed to fetch user reviews")
      const data = await response.json()
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      return []
    } finally {
      setLoading(false)
    }
  }

  const addReview = async (reviewData: Omit<Review, "id" | "createdAt">): Promise<Review> => {
    try {
      setLoading(true)
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      })
      if (!response.ok) throw new Error("Failed to add review")
      const newReview = await response.json()
      setReviews((prev) => [...prev, newReview])
      return newReview
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add review")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        loading,
        error,
        getReviewsByBookId,
        getUserReviews,
        addReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  )
}

export function useReviews() {
  const context = useContext(ReviewContext)
  if (context === undefined) {
    throw new Error("useReviews must be used within a ReviewProvider")
  }
  return context
}
