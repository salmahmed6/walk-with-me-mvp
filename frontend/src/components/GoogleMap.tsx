"use client"

import { useEffect, useRef } from "react"
import { Loader } from "@googlemaps/js-api-loader"
import * as google from "google.maps"

interface GpsPoint {
  latitude: number
  longitude: number
  timestamp: string
}

interface GoogleMapProps {
  center: GpsPoint
  path?: GpsPoint[]
  zoom?: number
  className?: string
}

export function GoogleMap({ center, path = [], zoom = 15, className = "" }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const pathRef = useRef<google.maps.Polyline | null>(null)
  const markerRef = useRef<google.maps.Marker | null>(null)

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyBvOkBwGyiwHAnFi4R8AN2oM-pFBdMp1qQ",
        version: "weekly",
      })

      const { Map } = await loader.importLibrary("maps")
      const { Marker } = (await loader.importLibrary("marker")) as google.maps.MarkerLibrary

      if (mapRef.current) {
        const map = new Map(mapRef.current, {
          center: { lat: center.latitude, lng: center.longitude },
          zoom,
          mapTypeId: "roadmap",
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        })

        mapInstanceRef.current = map

        // Add current location marker
        markerRef.current = new Marker({
          position: { lat: center.latitude, lng: center.longitude },
          map,
          title: "Your Location",
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#4285F4",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          },
        })
      }
    }

    initMap()
  }, [center.latitude, center.longitude, zoom])

  useEffect(() => {
    if (mapInstanceRef.current && path.length > 1) {
      // Remove existing path
      if (pathRef.current) {
        pathRef.current.setMap(null)
      }

      // Create new path
      const pathCoordinates = path.map((point) => ({
        lat: point.latitude,
        lng: point.longitude,
      }))

      pathRef.current = new google.maps.Polyline({
        path: pathCoordinates,
        geodesic: true,
        strokeColor: "#4285F4",
        strokeOpacity: 1.0,
        strokeWeight: 4,
      })

      pathRef.current.setMap(mapInstanceRef.current)
    }
  }, [path])

  useEffect(() => {
    // Update marker position
    if (markerRef.current) {
      markerRef.current.setPosition({ lat: center.latitude, lng: center.longitude })
    }

    // Update map center
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter({ lat: center.latitude, lng: center.longitude })
    }
  }, [center.latitude, center.longitude])

  return <div ref={mapRef} className={`w-full h-full ${className}`} />
}
