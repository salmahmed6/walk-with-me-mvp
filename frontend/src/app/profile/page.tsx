"use client"

import type React from "react"

import { useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Camera, MapPin, Calendar, Activity, Users } from "lucide-react"
import { useUpdateProfileMutation, useSetEmergencyContactMutation } from "@/store/api"
import toast from "react-hot-toast"

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: user?.username || "",
    emergencyPhone: user?.emergencyContact?.phoneNumber || "",
  })

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
  const [setEmergencyContact, { isLoading: isSettingEmergency }] = useSetEmergencyContactMutation()

  const handleSave = async () => {
    try {
      if (formData.username !== user?.username) {
        await updateProfile({ username: formData.username }).unwrap()
      }

      if (formData.emergencyPhone !== user?.emergencyContact?.phoneNumber) {
        await setEmergencyContact({ phoneNumber: formData.emergencyPhone }).unwrap()
      }

      setIsEditing(false)
      toast.success("Profile updated successfully!")
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  // Mock stats data
  const stats = [
    { label: "Total Walks", value: "47", icon: Activity },
    { label: "Distance", value: "234.5 km", icon: MapPin },
    { label: "Walking Partners", value: "12", icon: Users },
    { label: "Member Since", value: "Jan 2024", icon: Calendar },
  ]

  const achievements = [
    { name: "First Walk", description: "Completed your first walk", earned: true },
    { name: "10K Walker", description: "Walked 10 kilometers total", earned: true },
    { name: "Social Butterfly", description: "Walked with 5 different people", earned: true },
    { name: "Marathon Walker", description: "Walk 42km in total", earned: false },
    { name: "Daily Walker", description: "Walk 7 days in a row", earned: false },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account and walking preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user?.photoUrl || "/placeholder.svg"} alt={user?.username} />
                      <AvatarFallback className="text-2xl">{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{user?.username}</h3>
                    <p className="text-gray-600">{user?.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={user?.email || ""} disabled />
                  </div>
                </div>

                <div>
                  <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                  <Input
                    id="emergencyPhone"
                    name="emergencyPhone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.emergencyPhone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    This number will be contacted in case of emergency during walks
                  </p>
                </div>

                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave} disabled={isUpdating || isSettingEmergency}>
                        {isUpdating || isSettingEmergency ? "Saving..." : "Save Changes"}
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg ${
                        achievement.earned ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{achievement.name}</h4>
                        <Badge variant={achievement.earned ? "default" : "secondary"}>
                          {achievement.earned ? "Earned" : "Locked"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Walking Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <stat.icon className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">{stat.value}</p>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full bg-transparent" variant="outline">
                  Download Data
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  Privacy Settings
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  Notification Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
