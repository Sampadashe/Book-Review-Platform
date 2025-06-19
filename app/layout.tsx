import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { BookProvider } from "@/contexts/book-context"
import { ReviewProvider } from "@/contexts/review-context"
import { UserProvider } from "@/contexts/user-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BookReview Hub - Discover and Review Books",
  description: "A platform for book lovers to discover, review, and rate their favorite books",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <BookProvider>
            <ReviewProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </ReviewProvider>
          </BookProvider>
        </UserProvider>
      </body>
    </html>
  )
}
