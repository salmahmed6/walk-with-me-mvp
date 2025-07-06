"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock } from "lucide-react"

export function RecentWalks() {
  // Mock data - in real app, this would come from API
  const recentWalks = [
    {
      id: 1,
      location: "Central Park",
      date: "2024-01-15",
      distance: "3.2 km",
      duration: "45 min",
      status: "completed",
    },
    {
      id: 2,
      location: "Riverside Trail",
      date: "2024-01-12",
      distance: "5.1 km",
      duration: "1h 12m",
      status: "completed",
    },
    {
      id: 3,
      location: "Downtown Loop",
      date: "2024-01-10",
      distance: "2.8 km",
      duration: "38 min",
      status: "completed",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Walks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentWalks.map((walk) => (
            <div key={walk.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-green-600" />
                <div>
                  <p className="font-medium">{walk.location}</p>
                  <p className="text-sm text-gray-600">{walk.date}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>{walk.distance}</span>
                  <Clock className="h-3 w-3" />
                  <span>{walk.duration}</span>
                </div>
                <Badge variant="secondary" className="mt-1">
                  {walk.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
