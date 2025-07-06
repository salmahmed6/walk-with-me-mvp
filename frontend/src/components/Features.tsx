"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Users, Activity, Shield, Calendar, Heart } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: MapPin,
      title: "GPS Tracking",
      description: "Track your walks with precise GPS location and see your route on interactive maps.",
      color: "text-green-600",
    },
    {
      icon: Users,
      title: "Social Walking",
      description: "Create walking events, invite friends, and build a community of walking enthusiasts.",
      color: "text-blue-600",
    },
    {
      icon: Activity,
      title: "Progress Analytics",
      description: "Monitor your walking statistics, distance covered, and fitness improvements over time.",
      color: "text-purple-600",
    },
    {
      icon: Shield,
      title: "Safety Features",
      description: "Emergency alert system to keep you safe during your walks with instant SMS notifications.",
      color: "text-red-600",
    },
    {
      icon: Calendar,
      title: "Event Planning",
      description: "Schedule walking events, set reminders, and never miss a walking session with friends.",
      color: "text-orange-600",
    },
    {
      icon: Heart,
      title: "Health Benefits",
      description: "Improve your physical and mental health while building meaningful social connections.",
      color: "text-pink-600",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose Walk With Me?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines fitness tracking, social networking, and safety features to create the perfect walking
            experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
