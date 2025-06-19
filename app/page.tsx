import { Suspense } from "react"
import FeaturedBooks from "@/components/featured-books"
import { BookOpen, Star, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">BookReview Hub</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover amazing books, share your thoughts, and connect with fellow readers
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/books"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Books
            </Link>
            <Link
              href="/profile"
              className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              My Profile
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-3xl font-bold text-gray-800">1,000+</h3>
              <p className="text-gray-600">Books Available</p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-12 h-12 text-yellow-500 mb-4" />
              <h3 className="text-3xl font-bold text-gray-800">5,000+</h3>
              <p className="text-gray-600">Reviews Written</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-3xl font-bold text-gray-800">500+</h3>
              <p className="text-gray-600">Active Readers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Books</h2>
          <Suspense fallback={<div className="text-center">Loading featured books...</div>}>
            <FeaturedBooks />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
