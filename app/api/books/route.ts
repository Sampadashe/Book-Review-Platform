import { type NextRequest, NextResponse } from "next/server"
import type { Book } from "@/types"

// Mock data - In a real app, this would come from a database
const books: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    description:
      "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream through the eyes of narrator Nick Carraway and his mysterious neighbor Jay Gatsby.",
    coverImage: "/placeholder.svg?height=400&width=300",
    publishedDate: "1925-04-10",
    isbn: "978-0-7432-7356-5",
    pageCount: 180,
    averageRating: 4.2,
    reviewCount: 1250,
    featured: true,
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    description:
      "A gripping tale of racial injustice and childhood innocence in the American South, told through the eyes of Scout Finch as her father defends a black man falsely accused of rape.",
    coverImage: "/placeholder.svg?height=400&width=300",
    publishedDate: "1960-07-11",
    isbn: "978-0-06-112008-4",
    pageCount: 324,
    averageRating: 4.5,
    reviewCount: 2100,
    featured: true,
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    genre: "Science Fiction",
    description:
      "A dystopian social science fiction novel that explores the consequences of totalitarianism, mass surveillance, and repressive regimentation of persons and behaviors.",
    coverImage: "/placeholder.svg?height=400&width=300",
    publishedDate: "1949-06-08",
    isbn: "978-0-452-28423-4",
    pageCount: 328,
    averageRating: 4.3,
    reviewCount: 1800,
    featured: true,
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    description:
      "A romantic novel that critiques the British landed gentry at the end of the 18th century, following Elizabeth Bennet as she deals with issues of manners, upbringing, morality, and marriage.",
    coverImage: "/placeholder.svg?height=400&width=300",
    publishedDate: "1813-01-28",
    isbn: "978-0-14-143951-8",
    pageCount: 432,
    averageRating: 4.4,
    reviewCount: 1650,
    featured: true,
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    description:
      "A controversial novel that follows Holden Caulfield, a teenager from New York City, who is expelled from his prep school and then takes a journey around his hometown.",
    coverImage: "/placeholder.svg?height=400&width=300",
    publishedDate: "1951-07-16",
    isbn: "978-0-316-76948-0",
    pageCount: 277,
    averageRating: 3.8,
    reviewCount: 980,
    featured: false,
  },
  {
    id: 6,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    description:
      "An epic high fantasy novel that follows the quest to destroy the One Ring and defeat the Dark Lord Sauron, featuring hobbits, elves, dwarves, and men in Middle-earth.",
    coverImage: "/placeholder.svg?height=400&width=300",
    publishedDate: "1954-07-29",
    isbn: "978-0-544-00341-5",
    pageCount: 1216,
    averageRating: 4.6,
    reviewCount: 2800,
    featured: true,
  },
  {
    id: 7,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    description:
      "The first novel in the Harry Potter series, following a young wizard's journey as he learns about his magical heritage and attends Hogwarts School of Witchcraft and Wizardry.",
    coverImage: "/placeholder.svg?height=400&width=300",
    publishedDate: "1997-06-26",
    isbn: "978-0-7475-3269-9",
    pageCount: 223,
    averageRating: 4.7,
    reviewCount: 3200,
    featured: true,
  },
  {
    id: 8,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    description:
      "A children's fantasy novel that follows Bilbo Baggins, a hobbit who embarks on an unexpected adventure with a group of dwarves to reclaim their mountain home from a dragon.",
    coverImage: "/placeholder.svg?height=400&width=300",
    publishedDate: "1937-09-21",
    isbn: "978-0-547-92822-7",
    pageCount: 366,
    averageRating: 4.3,
    reviewCount: 1900,
    featured: true,
  },
  {
    id: 9,
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    description:
      "A science fiction novel set in the distant future amidst a feudal interstellar society, following Paul Atreides as he leads a rebellion to free his desert world from the emperor's rule.",
    coverImage: "/placeholder.svg?height=400&width=300",
    publishedDate: "1965-08-01",
    isbn: "978-0-441-17271-9",
    pageCount: 688,
    averageRating: 4.1,
    reviewCount: 1400,
    featured: false,
  },
  {
    id: 10,
    title: "The Handmaid's Tale",
    author: "Margaret Atwood",
    genre: "Science Fiction",
    description:
      "A dystopian novel set in a near-future New England where a fundamentalist theocratic regime has overthrown the United States government, focusing on the subjugation of women.",
    coverImage: "/placeholder.svg?height=400&width=300",
    publishedDate: "1985-08-17",
    isbn: "978-0-385-49081-8",
    pageCount: 311,
    averageRating: 4.0,
    reviewCount: 1100,
    featured: true,
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const genre = searchParams.get("genre")
    const rating = searchParams.get("rating")
    const page = searchParams.get("page")
    const limit = searchParams.get("limit")

    let filteredBooks = [...books]

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase()
      filteredBooks = filteredBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchLower) ||
          book.author.toLowerCase().includes(searchLower) ||
          book.genre.toLowerCase().includes(searchLower),
      )
    }

    // Apply genre filter
    if (genre && genre !== "all") {
      filteredBooks = filteredBooks.filter((book) => book.genre.toLowerCase() === genre.toLowerCase())
    }

    // Apply rating filter
    if (rating) {
      const minRating = Number.parseFloat(rating)
      filteredBooks = filteredBooks.filter((book) => book.averageRating >= minRating)
    }

    // If pagination parameters are provided, return paginated response
    if (page || limit) {
      const pageNum = Number.parseInt(page || "1")
      const limitNum = Number.parseInt(limit || "10")
      const startIndex = (pageNum - 1) * limitNum
      const endIndex = startIndex + limitNum
      const paginatedBooks = filteredBooks.slice(startIndex, endIndex)

      return NextResponse.json({
        books: paginatedBooks,
        total: filteredBooks.length,
        page: pageNum,
        totalPages: Math.ceil(filteredBooks.length / limitNum),
      })
    }

    // For simple requests (like from context), return just the books array
    return NextResponse.json(filteredBooks)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const bookData = await request.json()

    // Validate required fields
    const requiredFields = ["title", "author", "genre", "description", "publishedDate", "isbn", "pageCount"]
    for (const field of requiredFields) {
      if (!bookData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Create new book
    const newBook: Book = {
      id: books.length + 1,
      title: bookData.title,
      author: bookData.author,
      genre: bookData.genre,
      description: bookData.description,
      coverImage: bookData.coverImage || "/placeholder.svg?height=400&width=300",
      publishedDate: bookData.publishedDate,
      isbn: bookData.isbn,
      pageCount: bookData.pageCount,
      averageRating: 0,
      reviewCount: 0,
      featured: bookData.featured || false,
    }

    books.push(newBook)

    return NextResponse.json(newBook, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create book" }, { status: 500 })
  }
}
