"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "@/types"

interface UserContextType {
  currentUser: User | null
  loading: boolean
  error: string | null
  updateUser: (userData: Partial<User>) => Promise<void>
  loginUser: (email: string) => Promise<User | null>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate getting current user (in real app, this would check authentication)
    const initializeUser = async () => {
      try {
        // For demo purposes, we'll set a default user
        const defaultUser: User = {
          id: 1,
          name: "Sampada S",
          email: "sam@gmail.com",
          bio: "Avid reader and book enthusiast",
          joinedDate: "2024-01-15",
          reviewCount: 5,
          favoriteGenres: ["Fiction", "Science Fiction", "Mystery"],
        }
        setCurrentUser(defaultUser)
      } catch (err) {
        setError("Failed to initialize user")
      } finally {
        setLoading(false)
      }
    }

    initializeUser()
  }, [])

  const updateUser = async (userData: Partial<User>) => {
    try {
      if (!currentUser) throw new Error("No user logged in")

      const response = await fetch(`/api/users/${currentUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })

      if (!response.ok) throw new Error("Failed to update user")

      const updatedUser = await response.json()
      setCurrentUser(updatedUser)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update user")
      throw err
    }
  }

  const loginUser = async (email: string): Promise<User | null> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) return null

      const user = await response.json()
      setCurrentUser(user)
      return user
    } catch (err) {
      console.error("Login error:", err)
      return null
    }
  }

  return (
    <UserContext.Provider
      value={{
        currentUser,
        loading,
        error,
        updateUser,
        loginUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
