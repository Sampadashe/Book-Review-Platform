"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/contexts/user-context"
import { useReviews } from "@/contexts/review-context"
import UserProfile from "@/components/user-profile"
import UserReviews from "@/components/user-reviews"
import LoadingSpinner from "@/components/loading-spinner"

export default function ProfilePage() {
  const { currentUser, loading: userLoading, updateUser } = useUser()
  const { getUserReviews } = useReviews()
  const [userReviews, setUserReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const reviews = await getUserReviews(currentUser.id)
          setUserReviews(reviews)
        } catch (error) {
          console.error("Failed to fetch user reviews:", error)
        }
      }
      setLoading(false)
    }

    if (!userLoading) {
      fetchUserData()
    }
  }, [currentUser, userLoading, getUserReviews])

  if (userLoading || loading) return <LoadingSpinner />

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Please log in to view your profile</h1>
        <p className="text-gray-600">You need to be logged in to access your profile page.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <UserProfile user={currentUser} onUpdate={updateUser} />
        </div>

        <div className="lg:col-span-2">
          <UserReviews reviews={userReviews} />
        </div>
      </div>
    </div>
  )
}
