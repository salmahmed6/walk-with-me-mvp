"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Start Walking?</h2>
        <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
          Join thousands of people who are already improving their health and building connections through walking.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
              Start Your Journey
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 bg-transparent"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
