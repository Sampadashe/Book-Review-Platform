"use client"

import type React from "react"

import { useState } from "react"
import { User, Edit2, Save, X } from "lucide-react"
import type { User as UserType } from "@/types"

interface UserProfileProps {
  user: UserType
  onUpdate: (userData: Partial<UserType>) => Promise<void>
}

export default function UserProfile({ user, onUpdate }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.bio || "",
    favoriteGenres: user.favoriteGenres,
  })
  const [isUpdating, setIsUpdating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsUpdating(true)
      await onUpdate(formData)
      setIsEditing(false)
    } catch (error) {
      alert("Failed to update profile")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: user.name,
      bio: user.bio || "",
      favoriteGenres: user.favoriteGenres,
    })
    setIsEditing(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Profile</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="flex space-x-2">
            <button
              type="submit"
              disabled={isUpdating}
              className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isUpdating ? "Saving..." : "Save"}</span>
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center space-x-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          {user.bio && (
            <div>
              <h4 className="font-medium text-gray-700 mb-2">About</h4>
              <p className="text-gray-600">{user.bio}</p>
            </div>
          )}

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Stats</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Reviews Written</span>
                <p className="font-semibold">{user.reviewCount}</p>
              </div>
              <div>
                <span className="text-gray-500">Member Since</span>
                <p className="font-semibold">{new Date(user.joinedDate).getFullYear()}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Favorite Genres</h4>
            <div className="flex flex-wrap gap-2">
              {user.favoriteGenres.map((genre) => (
                <span key={genre} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
