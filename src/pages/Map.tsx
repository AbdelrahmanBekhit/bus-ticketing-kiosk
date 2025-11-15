import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api"
import KeyboardOverlay from "../components/KeyboardOverlay"
import { extractBusLegs } from "./BusLegSummary"
import type { BusLegSummary } from "./BusLegSummary"

type LatLngLiteral = { lat: number; lng: number }

const mapContainerStyle = {
  width: "100%",
  height: "100%",
}

const DEFAULT_CENTER: LatLngLiteral = {
  lat: 51.078,
  lng: -114.137, // University of Calgary
}

export default function Map() {
  const nav = useNavigate()

  const [showKeyboard, setShowKeyboard] = useState(false)
  const [address, setAddress] = useState("Please Enter Address")

  const [center, setCenter] = useState<LatLngLiteral>(DEFAULT_CENTER)
  const [userLocation, setUserLocation] = useState<LatLngLiteral | null>(null)

  const [selectedPoint, setSelectedPoint] = useState<LatLngLiteral | null>(null)
  const [destination, setDestination] = useState<LatLngLiteral | null>(null)

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null)
  const [requestRoute, setRequestRoute] = useState(false)

  const [locationError, setLocationError] = useState<string | null>(null)

  const [routeReady, setRouteReady] = useState(false) // route is valid & shown

  const [routeData, setBusLegs] = useState<BusLegSummary[]>([])

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-maps-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    libraries: [],
  })

  // Get user location on mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported on this device.")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }
        setUserLocation(loc)
        setCenter(loc)
      },
      (err) => {
        setLocationError(err.message)
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    )
  }, [])

  // Map click → choose destination
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return
    const point: LatLngLiteral = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    }

    setSelectedPoint(point)
    setDestination(point)
    setCenter(point)

    // Invalidate any existing route when user changes destination
    setRouteReady(false)
    setDirections(null)

    // Optional: reflect that the user selected via map
    if (address === "Please Enter Address" || address.startsWith("Selected on")) {
      setAddress("Selected on map")
    }
  }

  // 1) Show Route:
  // - If user clicked on map → route from userLocation → selectedPoint
  // - Else, fall back to geocoding address text
  const handleShowRoute = () => {
    if (!userLocation) {
      setLocationError("User location not available. Allow location and retry.")
      return
    }

    // Prefer map-click destination if present
    if (selectedPoint) {
      setDestination(selectedPoint)
      setDirections(null)
      setCenter(selectedPoint)
      setRouteReady(false)
      setRequestRoute(true)
      return
    }

    // No map selection → use address
    const trimmed = address.trim()
    if (trimmed === "" || trimmed === "Please Enter Address") return

    const geocoder = new google.maps.Geocoder()

    geocoder.geocode({ address: trimmed }, (results, status) => {
      if (status !== "OK" || !results || results.length === 0) {
        setLocationError("Could not find that address. Please adjust and try again.")
        return
      }

      const loc = results[0].geometry.location
      const dest: LatLngLiteral = {
        lat: loc.lat(),
        lng: loc.lng(),
      }

      setDestination(dest)
      setSelectedPoint(dest)
      setDirections(null)
      setCenter(dest)
      setRouteReady(false)
      setRequestRoute(true)
    })
  }

  // 2) Button click handler: Show Route (if not ready) vs Confirm (if ready)
  const handlePrimaryButtonClick = () => {
    if (!routeReady) {
      // First phase: fetch and show route
      handleShowRoute()
    } else {
      // Second phase: route already shown and valid → confirm + navigate
      nav("/tickets", {
        state: {
          routeData,
        },
      })
    }
  }

  if (loadError) {
    return <div className="p-4 text-red-600">Failed to load Google Maps.</div>
  }

  if (!isLoaded) {
    return <div className="p-4">Loading map…</div>
  }

  return (
    <div className="flex flex-col items-center gap-4 relative h-full bg-white">
      {/* Address Input */}
      <button
        onClick={() => {
          if (address === "Please Enter Address") setAddress("")
          setShowKeyboard(true)
        }}
        className="flex items-center justify-between w-[90%] border border-gray-400 rounded-full px-4 py-2 text-gray-600 text-lg shadow-sm hover:shadow-md transition mt-4"
      >
        <span>{address === "" ? "Please Enter Address" : address}</span>
        <span className="text-xl font-semibold">{">"}</span>
      </button>

      {/* Map Area */}
      <div className="relative w-[90%] h-[300px] border rounded-2xl overflow-hidden">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={14}
          onClick={handleMapClick}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
          }}
        >
          {/* User Location marker */}
          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 7,
                fillColor: "#22c55e",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
              }}
            />
          )}

          {/* Selected / destination point marker (from map click or geocode) */}
          {selectedPoint && (
            <Marker
              position={selectedPoint}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 7,
                fillColor: "#ef4444",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
              }}
            />
          )}

          {/* DirectionsService: only when we just requested a route */}
          {requestRoute && userLocation && destination && (
            <DirectionsService
              options={{
                origin: userLocation,
                destination,
                travelMode: google.maps.TravelMode.TRANSIT,
                transitOptions: {
                  modes: [google.maps.TransitMode.BUS],
                },
              }}
              callback={(result, status) => {
                if (status === google.maps.DirectionsStatus.OK && result) {
                  setDirections(result)
                  const legs = extractBusLegs(result)
                  setBusLegs(legs)
                  setRouteReady(true) // route is valid → button becomes "Confirm"
                } else {
                  console.warn("Directions request failed:", status)
                  setLocationError(
                    "Could not fetch route. Try again or check address."
                  )
                  setRouteReady(false)
                }
                setRequestRoute(false)
              }}
            />
          )}

          {/* Draw the route if we have it */}
          {directions && (
            <DirectionsRenderer
              options={{
                directions,
                suppressMarkers: false,
                preserveViewport: false,
              }}
            />
          )}
        </GoogleMap>

        {/* Error overlay */}
        {locationError && (
          <div className="absolute bottom-2 left-2 right-2 bg-white/95 text-xs text-red-700 rounded-md px-2 py-2">
            {locationError}
          </div>
        )}
      </div>

      {/* Show Route / Confirm button */}
      <div className="mt-4 text-center">
        <button className="btn" onClick={handlePrimaryButtonClick}>
          {routeReady ? "Confirm" : "Show Route"}
        </button>
      </div>

      {/* Keyboard Overlay */}
      {showKeyboard && (
        <KeyboardOverlay
          onInsert={(key) => {
            if (key === "BACKSPACE") {
              if (address.length === 0) return
              setAddress((prev) => prev.slice(0, -1))
            } else if (key === " ") {
              setAddress((prev) => prev + " ")
            } else {
              setAddress((prev) => prev + key)
            }

            // user changed the address → invalidate current route
            setRouteReady(false)
            setDirections(null)
            setDestination(null)
            setSelectedPoint(null)
          }}
          onClose={() => {
            if (address.trim() === "") setAddress("Please Enter Address")
            setShowKeyboard(false)
          }}
        />
      )}
    </div>
  )
}
