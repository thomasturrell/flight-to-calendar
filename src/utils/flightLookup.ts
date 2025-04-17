import { Flight } from "../types/Flight";
import { FlightStatus } from "../types/FlightStatus";
import { DateTime } from "luxon";

export async function fetchFlightTimes(
  flightNumber: string,
  date: string
): Promise<Flight[]> {
  const params = new URLSearchParams({
    withAircraftImage: "false",
    withLocation: "false",
    dateLocalRole: "Both",
  });

  const response = await fetch(
    `/api/flights/number/${flightNumber}/${date}?${params.toString()}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    switch (response.status) {
      case 204:
        throw new Error(
          "No flights found for the given flight number and date."
        );
      case 400:
        throw new Error(
          "Invalid request. Please check the flight number and date."
        );
      case 401:
        throw new Error("Unauthorized. Please check your API key.");
      case 451:
        throw new Error("Access restricted for legal reasons.");
      case 500:
      case 503:
        throw new Error("Server error. Please try again later.");
      default:
        throw new Error(`Failed to fetch flight data: ${response.statusText}`);
    }
  }

  const data = await response.json();

  if (!Array.isArray(data) || data.length === 0) {
    console.error("Unexpected API response:", data); // Debug log
    throw new Error("No flights found for the given flight number and date.");
  }

  return data.map(
    (flight: any): Flight => ({
      departureTime: flight.departure?.scheduledTime?.utc
        ? DateTime.fromFormat(
            flight.departure.scheduledTime.utc,
            "yyyy-MM-dd HH:mm'Z'",
            { zone: "utc" }
          )
        : undefined,
      arrivalTime: flight.arrival?.scheduledTime?.utc
        ? DateTime.fromFormat(
            flight.arrival.scheduledTime.utc,
            "yyyy-MM-dd HH:mm'Z'",
            { zone: "utc" }
          )
        : undefined,
      departureLocalTime: flight.departure?.scheduledTime?.local
        ? DateTime.fromFormat(
            flight.departure.scheduledTime.local,
            "yyyy-MM-dd HH:mmZZ"
          )
        : undefined,
      arrivalLocalTime: flight.arrival?.scheduledTime?.local
        ? DateTime.fromFormat(
            flight.arrival.scheduledTime.local,
            "yyyy-MM-dd HH:mmZZ"
          )
        : undefined,
      origin: flight.departure?.airport?.name,
      destination: flight.arrival?.airport?.name,
      flightNumber: flight.number,
      airline: flight.airline?.name,
      status: flight.status as FlightStatus,
      aircraftModel: flight.aircraft?.model,
      departureTerminal: flight.departure?.terminal,
      departureGate: flight.departure?.gate,
      arrivalTerminal: flight.arrival?.terminal,
      arrivalGate: flight.arrival?.gate,
    })
  );
}
