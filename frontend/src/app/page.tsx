"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { Hero } from "@/components/Hero"
import { Features } from "@/components/Features"
import { CTA } from "@/components/CTA"
import { Navigation } from "@/components/Navigation"

export default function HomePage() {
  const router = useRouter()
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, user, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation />
      <Hero />
      <Features />
      <CTA />
    </div>
  )
}
