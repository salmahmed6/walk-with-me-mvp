"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users } from "lucide-react"

export function UpcomingWalks() {
  // Mock data - in real app, this would come from API
  const upcomingWalks = [
    {
      id: 1,
      title: "Morning Walk at Beach",
      location: "Santa Monica Beach",
      date: "2024-01-20",
      time: "07:00 AM",
      participants: 5,
      organizer: "Sarah Johnson",
    },
    {
      id: 2,
      title: "Weekend Hiking Trail",
      location: "Griffith Observatory",
      date: "2024-01-22",
      time: "09:30 AM",
      participants: 3,
      organizer: "Mike Chen",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Walks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingWalks.length === 0 ? (
            <div className="text-center py-6">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">No upcoming walks scheduled</p>
              <Button className="mt-2" size="sm">
                Create a Walk
              </Button>
            </div>
          ) : (
            upcomingWalks.map((walk) => (
              <div key={walk.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{walk.title}</h4>
                  <Badge variant="outline">upcoming</Badge>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {walk.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {walk.date} at {walk.time}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {walk.participants} participants
                  </div>
                  <p className="text-xs">Organized by {walk.organizer}</p>
                </div>
                <div className="flex space-x-2 mt-3">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm">Join Walk</Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
