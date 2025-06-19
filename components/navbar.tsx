"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, User } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">BookReview Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`hover:text-blue-600 transition-colors ${
                isActive("/") ? "text-blue-600 font-semibold" : "text-gray-700"
              }`}
            >
              Home
            </Link>
            <Link
              href="/books"
              className={`hover:text-blue-600 transition-colors ${
                isActive("/books") ? "text-blue-600 font-semibold" : "text-gray-700"
              }`}
            >
              Books
            </Link>
            <Link
              href="/profile"
              className={`flex items-center space-x-1 hover:text-blue-600 transition-colors ${
                isActive("/profile") ? "text-blue-600 font-semibold" : "text-gray-700"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"}`}
              ></span>
              <span
                className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
              ></span>
              <span
                className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"}`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`hover:text-blue-600 transition-colors ${
                  isActive("/") ? "text-blue-600 font-semibold" : "text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/books"
                className={`hover:text-blue-600 transition-colors ${
                  isActive("/books") ? "text-blue-600 font-semibold" : "text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Books
              </Link>
              <Link
                href="/profile"
                className={`flex items-center space-x-1 hover:text-blue-600 transition-colors ${
                  isActive("/profile") ? "text-blue-600 font-semibold" : "text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
