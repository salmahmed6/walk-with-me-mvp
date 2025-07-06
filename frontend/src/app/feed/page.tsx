"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share, Send } from "lucide-react"
import { useGetFeedQuery, useCreatePostMutation } from "@/store/api"
import toast from "react-hot-toast"

export default function FeedPage() {
  const [newPost, setNewPost] = useState("")
  const { data: posts = [], isLoading } = useGetFeedQuery({ page: 1, limit: 20 })
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation()

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.trim()) return

    try {
      await createPost({ text: newPost }).unwrap()
      setNewPost("")
      toast.success("Post shared!")
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create post")
    }
  }

  // Mock data for demo
  const mockPosts = [
    {
      id: 1,
      user: { id: 1, username: "sarah_walker", photoUrl: "/placeholder.svg?height=40&width=40" },
      text: "Just completed my morning 5K walk! The sunrise was absolutely beautiful today 🌅 #MorningWalk #Fitness",
      createdAt: "2024-01-15T08:30:00Z",
      walkSession: { distance: 5200, duration: 2700 },
    },
    {
      id: 2,
      user: { id: 2, username: "mike_hiker", photoUrl: "/placeholder.svg?height=40&width=40" },
      text: "Exploring new trails today with my walking group. Found this amazing viewpoint! Who wants to join next time?",
      createdAt: "2024-01-15T10:15:00Z",
    },
    {
      id: 3,
      user: { id: 3, username: "emma_steps", photoUrl: "/placeholder.svg?height=40&width=40" },
      text: "Week 3 of my walking challenge complete! 💪 Already feeling stronger and more energetic. Thanks to everyone for the motivation!",
      createdAt: "2024-01-14T19:45:00Z",
    },
  ]

  const displayPosts = posts.length > 0 ? posts : mockPosts

  const formatDistance = (meters: number) => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)}km`
    }
    return `${meters}m`
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`
    }
    return `${minutes}m`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community Feed</h1>
          <p className="text-gray-600 mt-2">Share your walking achievements and connect with others</p>
        </div>

        {/* Create Post */}
        <Card>
          <CardHeader>
            <CardTitle>Share Your Walking Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <Textarea
                placeholder="What's on your mind? Share your walking experience..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                rows={3}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isCreating || !newPost.trim()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isCreating ? "Posting..." : "Share Post"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-6">
          {isLoading ? (
            // Loading skeleton
            [...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex space-x-3">
                    <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : displayPosts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-600">Be the first to share your walking experience!</p>
              </CardContent>
            </Card>
          ) : (
            displayPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-6">
                  <div className="flex space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.user.photoUrl || "/placeholder.svg"} alt={post.user.username} />
                      <AvatarFallback>{post.user.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{post.user.username}</h4>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
                      </div>
                      <p className="text-gray-700 mt-2">{post.text}</p>

                      {post.walkSession && (
                        <div className="mt-3 p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center space-x-4 text-sm text-green-700">
                            <span>📍 {formatDistance(post.walkSession.distance)}</span>
                            <span>⏱️ {formatDuration(post.walkSession.duration)}</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-6 mt-4">
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                          <Heart className="h-4 w-4 mr-1" />
                          Like
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Comment
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                          <Share className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
