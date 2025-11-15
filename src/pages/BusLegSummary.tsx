export type BusLegSummary = {
  routeShortName: string | null
  routeLongName: string | null
  fromStop: string | null
  toStop: string | null
  departureTimeText: string | null
  arrivalTimeText: string | null
  departureTime: Date | null
  arrivalTime: Date | null
  travelMinutes: number | null
  numStops: number | null
}

export function extractBusLegs(
  result: google.maps.DirectionsResult
): BusLegSummary[] {
  const legs: BusLegSummary[] = []

  if (!result.routes?.length) return legs

  const route = result.routes[0]
  for (const leg of route.legs ?? []) {
    for (const step of leg.steps ?? []) {
      if (step.travel_mode !== google.maps.TravelMode.TRANSIT) continue
      const t: any = step.transit || step.transit_details
      if (!t) continue

      const line = t.line
      const depTime = t.departure_time?.value instanceof Date ? t.departure_time.value : null
      const arrTime = t.arrival_time?.value instanceof Date ? t.arrival_time.value : null

      legs.push({
        routeShortName: line?.short_name ?? null,
        routeLongName: line?.name ?? line?.long_name ?? null,
        fromStop: t.departure_stop?.name ?? null,
        toStop: t.arrival_stop?.name ?? null,
        departureTimeText: t.departure_time?.text ?? null,
        arrivalTimeText: t.arrival_time?.text ?? null,
        departureTime: depTime,
        arrivalTime: arrTime,
        travelMinutes:
          depTime && arrTime
            ? Math.round((arrTime.getTime() - depTime.getTime()) / 60000)
            : null,
        numStops: typeof t.num_stops === "number" ? t.num_stops : null,
      })
    }
  }

  return legs
}
