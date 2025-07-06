"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { DashboardLayout } from "@/components/DashboardLayout"
import { StatsCards } from "@/components/dashboard/StatsCards"
import { RecentWalks } from "@/components/dashboard/RecentWalks"
import { UpcomingWalks } from "@/components/dashboard/UpcomingWalks"
import { ActivityFeed } from "@/components/dashboard/ActivityFeed"

export default function DashboardPage() {
  const router = useRouter()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.username}!</h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your walking activities.</p>
        </div>

        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <UpcomingWalks />
            <RecentWalks />
          </div>
          <div>
            <ActivityFeed />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
