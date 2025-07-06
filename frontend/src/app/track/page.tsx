"use client"

import { useState, useEffect, useRef } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Square, MapPin, Clock, Activity, AlertTriangle } from "lucide-react"
import { GoogleMap } from "@/components/GoogleMap"
import {
  useStartWalkSessionMutation,
  useUpdateWalkSessionMutation,
  useFinishWalkSessionMutation,
  useSendEmergencyAlertMutation,
} from "@/store/api"
import toast from "react-hot-toast"

interface GpsPoint {
  latitude: number
  longitude: number
  timestamp: string
}

export default function TrackPage() {
  const [isTracking, setIsTracking] = useState(false)
  const [sessionId, setSessionId] = useState<number | null>(null)
  const [currentLocation, setCurrentLocation] = useState<GpsPoint | null>(null)
  const [gpsPoints, setGpsPoints] = useState<GpsPoint[]>([])
  const [distance, setDistance] = useState(0)
  const [duration, setDuration] = useState(0)
  const [speed, setSpeed] = useState(0)

  const watchIdRef = useRef<number | null>(null)
  const startTimeRef = useRef<Date | null>(null)
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const [startWalkSession] = useStartWalkSessionMutation()
  const [updateWalkSession] = useUpdateWalkSessionMutation()
  const [finishWalkSession] = useFinishWalkSessionMutation()
  const [sendEmergencyAlert] = useSendEmergencyAlertMutation()

  useEffect(() => {
    // Get initial location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const point: GpsPoint = {
            latitude,
            longitude,
            timestamp: new Date().toISOString(),
          }
          setCurrentLocation(point)
        },
        (error) => {
          console.error("Error getting location:", error)
          toast.error("Unable to get your current location")
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      )
    }

    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current)
      }
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current)
      }
    }
  }, [])

  const startTracking = async () => {
    if (!currentLocation) {
      toast.error("Please wait for location to be detected")
      return
    }

    try {
      const result = await startWalkSession({
        walkId: 0, // Solo walk
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      }).unwrap()

      setSessionId(result.id)
      setIsTracking(true)
      startTimeRef.current = new Date()
      setGpsPoints([currentLocation])

      // Start duration timer
      durationIntervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          const now = new Date()
          const elapsed = Math.floor((now.getTime() - startTimeRef.current.getTime()) / 1000)
          setDuration(elapsed)
        }
      }, 1000)

      // Start location tracking
      if (navigator.geolocation) {
        watchIdRef.current = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude, speed: currentSpeed } = position.coords
            const newPoint: GpsPoint = {
              latitude,
              longitude,
              timestamp: new Date().toISOString(),
            }

            setCurrentLocation(newPoint)
            setSpeed(currentSpeed || 0)

            setGpsPoints((prev) => {
              const updated = [...prev, newPoint]

              // Calculate distance
              if (updated.length > 1) {
                const totalDistance = calculateTotalDistance(updated)
                setDistance(totalDistance)
              }

              return updated
            })

            // Update session on server
            if (sessionId) {
              updateWalkSession({
                sessionId,
                latitude,
                longitude,
              })
            }
          },
          (error) => {
            console.error("Location tracking error:", error)
            toast.error("Error tracking location")
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 1000,
          },
        )
      }

      toast.success("Walk tracking started!")
    } catch (error) {
      console.error("Failed to start walk session:", error)
      toast.error("Failed to start walk tracking")
    }
  }

  const stopTracking = async () => {
    if (!sessionId) return

    try {
      await finishWalkSession(sessionId).unwrap()

      setIsTracking(false)

      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current)
        watchIdRef.current = null
      }

      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current)
        durationIntervalRef.current = null
      }

      toast.success("Walk completed! Great job!")
    } catch (error) {
      console.error("Failed to finish walk session:", error)
      toast.error("Failed to stop walk tracking")
    }
  }

  const handleEmergency = async () => {
    if (!currentLocation) {
      toast.error("Unable to send emergency alert without location")
      return
    }

    if (confirm("This will send your location to your emergency contact. Continue?")) {
      try {
        await sendEmergencyAlert({
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        }).unwrap()
        toast.success("Emergency alert sent to your emergency contact")
      } catch (error) {
        console.error("Failed to send emergency alert:", error)
        toast.error("Failed to send emergency alert")
      }
    }
  }

  const calculateTotalDistance = (points: GpsPoint[]): number => {
    if (points.length < 2) return 0

    let total = 0
    for (let i = 1; i < points.length; i++) {
      total += calculateDistance(points[i - 1], points[i])
    }
    return total
  }

  const calculateDistance = (point1: GpsPoint, point2: GpsPoint): number => {
    const R = 6371e3 // Earth's radius in meters
    const φ1 = (point1.latitude * Math.PI) / 180
    const φ2 = (point2.latitude * Math.PI) / 180
    const Δφ = ((point2.latitude - point1.latitude) * Math.PI) / 180
    const Δλ = ((point2.longitude - point1.longitude) * Math.PI) / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
  }

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  const formatDistance = (meters: number): string => {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(2)} km`
    }
    return `${Math.round(meters)} m`
  }

  const formatSpeed = (metersPerSecond: number): string => {
    const kmh = metersPerSecond * 3.6
    return `${kmh.toFixed(1)} km/h`
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Track Your Walk</h1>
          <p className="text-gray-600 mt-2">Start tracking your walking activity in real-time</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Live Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 rounded-lg overflow-hidden">
                  {currentLocation ? (
                    <GoogleMap center={currentLocation} path={gpsPoints} zoom={16} />
                  ) : (
                    <div className="h-full bg-gray-100 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">Getting your location...</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats and Controls */}
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <Activity className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Distance</p>
                      <p className="text-2xl font-bold text-gray-900">{formatDistance(distance)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Duration</p>
                      <p className="text-2xl font-bold text-gray-900">{formatDuration(duration)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center">
                    <Activity className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Speed</p>
                      <p className="text-2xl font-bold text-gray-900">{formatSpeed(speed)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Control Buttons */}
            <div className="space-y-4">
              <Button
                onClick={isTracking ? stopTracking : startTracking}
                className={`w-full py-6 text-lg font-semibold ${
                  isTracking ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                }`}
                disabled={!currentLocation}
              >
                {isTracking ? (
                  <>
                    <Square className="h-5 w-5 mr-2" />
                    Stop Walk
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 mr-2" />
                    Start Walk
                  </>
                )}
              </Button>

              <Button
                onClick={handleEmergency}
                variant="destructive"
                className="w-full py-4"
                disabled={!currentLocation}
              >
                <AlertTriangle className="h-5 w-5 mr-2" />
                Emergency Alert
              </Button>
            </div>

            {/* Location Status */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <div className={`h-3 w-3 rounded-full mr-3 ${currentLocation ? "bg-green-500" : "bg-red-500"}`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {currentLocation ? "Location Active" : "Getting Location..."}
                    </p>
                    {currentLocation && (
                      <p className="text-xs text-gray-600">
                        {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
