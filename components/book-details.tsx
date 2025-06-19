import Image from "next/image"
import { Star, Calendar, BookOpen, Hash } from "lucide-react"
import type { Book } from "@/types"

interface BookDetailsProps {
  book: Book
}

export default function BookDetails({ book }: BookDetailsProps) {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Book Cover */}
      <div className="lg:col-span-1">
        <div className="relative aspect-[3/4] max-w-sm mx-auto">
          <Image
            src={book.coverImage || "/placeholder.svg"}
            alt={book.title}
            fill
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Book Information */}
      <div className="lg:col-span-2">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-4">by {book.author}</p>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold">{book.averageRating.toFixed(1)}</span>
                <span className="text-gray-500">({book.reviewCount} reviews)</span>
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{book.genre}</span>
            </div>
          </div>

          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{book.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Published: {book.publishedDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Pages: {book.pageCount}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Hash className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">ISBN: {book.isbn}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
