import Link from "next/link"
import { BookOpen, Github, Twitter, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold">BookReview Hub</span>
            </div>
            <p className="text-gray-400 text-sm">
              Discover amazing books, share your thoughts, and connect with fellow readers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/books" className="text-gray-400 hover:text-white transition-colors">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-400 hover:text-white transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Popular Genres</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/books?genre=fiction" className="text-gray-400 hover:text-white transition-colors">
                  Fiction
                </Link>
              </li>
              <li>
                <Link href="/books?genre=mystery" className="text-gray-400 hover:text-white transition-colors">
                  Mystery
                </Link>
              </li>
              <li>
                <Link href="/books?genre=romance" className="text-gray-400 hover:text-white transition-colors">
                  Romance
                </Link>
              </li>
              <li>
                <Link href="/books?genre=sci-fi" className="text-gray-400 hover:text-white transition-colors">
                  Science Fiction
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} BookReview Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
