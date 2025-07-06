"use client"

import type React from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loadFromStorage } from "@/store/authSlice"
import { Navigation } from "./Navigation"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadFromStorage())
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{children}</main>
    </div>
  )
}
