import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api"
import KeyboardOverlay from "../components/KeyboardOverlay"
import Modal from "../components/Modal"
import { extractBusLegs } from "./BusLegSummary"
import type { BusLegSummary } from "./BusLegSummary"
import { useLang } from "../App"
import { STRINGS } from "../i18n/strings"

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
  const { lang } = useLang()
  const t = STRINGS[lang]

  const [showKeyboard, setShowKeyboard] = useState(false)
  const [address, setAddress] = useState("")

  const [center, setCenter] = useState<LatLngLiteral>(DEFAULT_CENTER)
  const [userLocation, setUserLocation] = useState<LatLngLiteral | null>(null)

  const [selectedPoint, setSelectedPoint] = useState<LatLngLiteral | null>(null)
  const [destination, setDestination] = useState<LatLngLiteral | null>(null)

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null)
  const [requestRoute, setRequestRoute] = useState(false)

  const [locationError, setLocationError] = useState<string | null>(null)
  const [showErrorModal, setShowErrorModal] = useState(false)

  const [routeReady, setRouteReady] = useState(false)

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

    if (address === "" || address.startsWith("Selected on")) {
      setAddress(t.selectedOnMap)
    }
  }

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
    if (trimmed === "") {
      setLocationError(t.pleaseEnterDestination)
      setShowErrorModal(true)
      return
    }

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

  const loc = useLocation() as any

  const handlePrimaryButtonClick = () => {
    if (!routeReady) {
      // First phase: fetch and show route
      handleShowRoute()
    } else {
      // Second phase: route already shown and valid → confirm + navigate
      if (loc.state?.fromMonthlyPass) {
        nav("/route-confirmation", {
          state: { routeData },
        })
      } else if (loc.state?.viewRoutes) {
        nav("/route-pricing", {
          state: { routeData },
        })
      } else {
        nav("/tickets", {
          state: { routeData },
        })
      }
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
      {/* Instructional text for view routes mode */}
      {loc.state?.viewRoutes && !routeReady && (
        <div className="w-[90%] mt-4">
          <p className="text-center text-xl font-semibold text-gray-700">
            {t.enterYourDestination}
          </p>
        </div>
      )}

      {/* Address Input */}
      <div className="w-[90%] mt-4">
        <div className="flex items-center justify-between border border-gray-400 rounded-full px-4 py-2 text-lg shadow-sm hover:shadow-md transition bg-white">
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-gray-600 placeholder:text-gray-400"
            value={address}
            placeholder={t.pleaseEnterAddress}
            onChange={(e) => {
              const v = e.target.value
              setAddress(v)

              setRouteReady(false)
              setDirections(null)
              setDestination(null)
              setSelectedPoint(null)
            }}
            onFocus={() => setShowKeyboard(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handlePrimaryButtonClick()
              }
            }}
          />
          <span className="text-xl font-semibold text-gray-500">{">"}</span>
        </div>
      </div>

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
                  setRouteReady(true)
                } else {
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

        {locationError && (
          <div className="absolute bottom-2 left-2 right-2 bg-white/95 text-xs text-red-700 rounded-md px-2 py-2">
            {locationError}
          </div>
        )}
      </div>

      {/* Show Route / Confirm button */}
      <div className="mt-4 text-center">
        <button className="btn" onClick={handlePrimaryButtonClick}>
          {routeReady ? t.confirm : t.showRoute}
        </button>
      </div>

      {/* Keyboard Overlay */}
      {showKeyboard && (
        <KeyboardOverlay
          onInsert={(key) => {
            if (key === "BACKSPACE") {
              setAddress(prev => (prev.length > 0 ? prev.slice(0, -1) : prev))
            } else if (key === " ") {
              setAddress(prev => prev + " ")
            } else {
              setAddress(prev => prev + key)
            }

            setRouteReady(false)
            setDirections(null)
            setDestination(null)
            setSelectedPoint(null)
          }}
          onClose={() => {
            setShowKeyboard(false)
          }}
        />
      )}


      {/* Error Modal */}
      <Modal open={showErrorModal} onClose={() => setShowErrorModal(false)}>
        <div className="flex flex-col items-center gap-6 text-center">
          <h3 className="text-xl font-bold text-red-600">
            {t.pleaseEnterDestination}
          </h3>
          <p className="text-gray-600">
            {t.pleaseEnterBeforeContinuing}
          </p>
          <button
            onClick={() => setShowErrorModal(false)}
            className="px-8 py-3 bg-orange-600 text-white rounded-xl font-semibold active:scale-95 transition-transform"
          >
            {t.ok}
          </button>
        </div>
      </Modal>
    </div>
  )
}
