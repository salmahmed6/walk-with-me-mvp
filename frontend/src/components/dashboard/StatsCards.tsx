"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, MapPin, Users, Clock } from "lucide-react"

export function StatsCards() {
  // Mock data - in real app, this would come from API
  const stats = [
    {
      title: "Total Distance",
      value: "127.5 km",
      icon: MapPin,
      color: "text-green-600",
      change: "+12% from last month",
    },
    {
      title: "Walking Sessions",
      value: "23",
      icon: Activity,
      color: "text-blue-600",
      change: "+5 this week",
    },
    {
      title: "Walking Partners",
      value: "8",
      icon: Users,
      color: "text-purple-600",
      change: "+2 new connections",
    },
    {
      title: "Total Time",
      value: "42h 15m",
      icon: Clock,
      color: "text-orange-600",
      change: "+8h this month",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
