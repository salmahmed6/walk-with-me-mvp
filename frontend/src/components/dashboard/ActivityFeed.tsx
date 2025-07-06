"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share } from "lucide-react"

export function ActivityFeed() {
  // Mock data - in real app, this would come from API
  const activities = [
    {
      id: 1,
      user: {
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "emma_w",
      },
      type: "walk_completed",
      content: "Just completed a 5km walk at Golden Gate Park! Beautiful morning for a walk 🌅",
      timestamp: "2 hours ago",
      stats: {
        distance: "5.2 km",
        duration: "1h 15m",
      },
      likes: 12,
      comments: 3,
    },
    {
      id: 2,
      user: {
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "david_k",
      },
      type: "walk_created",
      content: "Created a new walking event for this Saturday! Who's joining me for a sunset walk at the pier?",
      timestamp: "4 hours ago",
      likes: 8,
      comments: 5,
    },
    {
      id: 3,
      user: {
        name: "Lisa Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        username: "lisa_c",
      },
      type: "milestone",
      content: "🎉 Reached my goal of 100km this month! Thanks to everyone who walked with me!",
      timestamp: "1 day ago",
      likes: 24,
      comments: 8,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="border-b pb-4 last:border-b-0">
              <div className="flex space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-sm">{activity.user.name}</h4>
                    <span className="text-xs text-gray-500">@{activity.user.username}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{activity.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{activity.content}</p>

                  {activity.stats && (
                    <div className="flex space-x-4 mt-2 text-xs text-gray-600">
                      <span>📍 {activity.stats.distance}</span>
                      <span>⏱️ {activity.stats.duration}</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-4 mt-3">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Heart className="h-4 w-4 mr-1" />
                      {activity.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {activity.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
