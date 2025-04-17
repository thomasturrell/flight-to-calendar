import { Flight } from "../types/Flight";

/**
 * Generates an iCalendar event for a flight.
 * @param flight The flight object containing flight details.
 * @returns A Blob representing the iCalendar event.
 */
export function createEvent(flight: Flight): Blob {
  const {
    flightNumber,
    departureTime,
    arrivalTime,
    departureLocalTime,
    arrivalLocalTime,
    origin,
    destination,
    departureTerminal,
    departureGate,
    arrivalTerminal,
    arrivalGate,
    aircraftModel,
    status,
    airline,
  } = flight;

  // Format times for iCalendar
  const formattedDepartureTime = departureTime
    ?.toUTC()
    .toFormat("yyyyMMdd'T'HHmmss'Z'");
  const formattedArrivalTime = arrivalTime
    ?.toUTC()
    .toFormat("yyyyMMdd'T'HHmmss'Z'");
  const formattedDepartureLocalTime = departureLocalTime?.toFormat(
    "yyyy-MM-dd HH:mm ZZZZ"
  );
  const formattedArrivalLocalTime = arrivalLocalTime?.toFormat(
    "yyyy-MM-dd HH:mm ZZZZ"
  );

  // Build the iCalendar content
  const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//spiky//flightcal//EN
BEGIN:VEVENT
UID:${flightNumber}-${departureTime?.toISO()}@flightcal.spiky.uk
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART:${formattedDepartureTime}
DTEND:${formattedArrivalTime}
SUMMARY:Flight ${flightNumber} (${origin} → ${destination})
LOCATION:${origin}
DESCRIPTION:Flight ${flightNumber} from ${origin} to ${destination}
Airline: ${airline || "Unknown"}
Status: ${status}
Aircraft: ${aircraftModel || "Unknown"}
Departure Terminal: ${departureTerminal || "N/A"}, Gate: ${
    departureGate || "N/A"
  }
Arrival Terminal: ${arrivalTerminal || "N/A"}, Gate: ${arrivalGate || "N/A"}
Departure Time (Local): ${formattedDepartureLocalTime || "N/A"}
Arrival Time (Local): ${formattedArrivalLocalTime || "N/A"}
END:VEVENT
END:VCALENDAR
  `
    .trim()
    .replace(/\n/g, "\r\n"); // Replace all line breaks with CRLF

  return new Blob([icsContent], { type: "text/calendar" });
}
