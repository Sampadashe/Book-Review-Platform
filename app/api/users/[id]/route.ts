import { type NextRequest, NextResponse } from "next/server"
import type { User } from "@/types"

// Mock data - In a real app, this would come from a database
const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Avid reader and book enthusiast",
    joinedDate: "2024-01-15",
    reviewCount: 5,
    favoriteGenres: ["Fiction", "Science Fiction", "Mystery"],
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const user = users.find((u) => u.id === id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const userData = await request.json()

    const userIndex = users.findIndex((u) => u.id === id)
    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update user data
    users[userIndex] = {
      ...users[userIndex],
      ...userData,
      id, // Ensure ID doesn't change
    }

    return NextResponse.json(users[userIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}
