import { describe, it, expect } from "vitest";
import { createEvent } from "./icalGenerator";
import { DateTime } from "luxon";
import { FlightStatus } from "../types/FlightStatus";

describe("createEvent", () => {
  it("should generate a valid iCalendar event", () => {
    // Mock flight data
    const mockFlight = {
      flightNumber: "DL32",
      departureTime: DateTime.fromISO("2025-04-18T21:50:00Z"),
      arrivalTime: DateTime.fromISO("2025-04-19T10:10:00Z"),
      departureLocalTime: DateTime.fromISO("2025-04-18T17:50:00-04:00"),
      arrivalLocalTime: DateTime.fromISO("2025-04-19T11:10:00+01:00"),
      origin: "Atlanta Hartsfield Jackson",
      destination: "London Heathrow",
      departureTerminal: "I",
      departureGate: "A12",
      arrivalTerminal: "3",
      arrivalGate: "B34",
      aircraftModel: "Boeing 767-400",
      status: FlightStatus.Unknown,
      airline: "Delta Air Lines",
    };

    // Generate the iCalendar event
    const eventBlob = createEvent(mockFlight);

    // Convert Blob to string for testing
    const reader = new FileReader();
    reader.readAsText(eventBlob);

    reader.onload = () => {
      const icsContent = reader.result;

      // Assertions
      expect(icsContent).toContain("BEGIN:VCALENDAR");
      expect(icsContent).toContain("VERSION:2.0");
      expect(icsContent).toContain("PRODID:-//spiky//flightcal//EN");
      expect(icsContent).toContain("BEGIN:VEVENT");
      expect(icsContent).toContain(
        "UID:DL32-2025-04-18T21:50:00.000Z@flightcal.spiky.uk"
      );
      expect(icsContent).toContain("DTSTART:20250418T215000Z");
      expect(icsContent).toContain("DTEND:20250419T101000Z");
      expect(icsContent).toContain(
        "SUMMARY:Flight DL32 (Atlanta Hartsfield Jackson → London Heathrow)"
      );
      expect(icsContent).toContain("LOCATION:Atlanta Hartsfield Jackson");
      expect(icsContent).toContain(
        "DESCRIPTION:Flight DL32 from Atlanta Hartsfield Jackson to London Heathrow"
      );
      expect(icsContent).toContain("Airline: Delta Air Lines");
      expect(icsContent).toContain("Status: Scheduled");
      expect(icsContent).toContain("Aircraft: Boeing 767-400");
      expect(icsContent).toContain("Departure Terminal: I, Gate: A12");
      expect(icsContent).toContain("Arrival Terminal: 3, Gate: B34");
      expect(icsContent).toContain(
        "Departure Time (Local): 2025-04-18 17:50 EDT"
      );
      expect(icsContent).toContain(
        "Arrival Time (Local): 2025-04-19 11:10 BST"
      );
      expect(icsContent).toContain("END:VEVENT");
      expect(icsContent).toContain("END:VCALENDAR");
    };
  });

  it("should handle missing optional fields gracefully", () => {
    // Mock flight data with missing optional fields
    const mockFlight = {
      flightNumber: "DL32",
      departureTime: DateTime.fromISO("2025-04-18T21:50:00Z"),
      arrivalTime: DateTime.fromISO("2025-04-19T10:10:00Z"),
      departureLocalTime: DateTime.fromISO("2025-04-18T17:50:00-04:00"),
      arrivalLocalTime: DateTime.fromISO("2025-04-19T11:10:00+01:00"),
      origin: "Atlanta Hartsfield Jackson",
      destination: "London Heathrow",
      departureTerminal: undefined,
      departureGate: undefined,
      arrivalTerminal: undefined,
      arrivalGate: undefined,
      aircraftModel: undefined,
      status: FlightStatus.Unknown,
      airline: undefined,
    };

    // Generate the iCalendar event
    const eventBlob = createEvent(mockFlight);

    // Convert Blob to string for testing
    const reader = new FileReader();
    reader.readAsText(eventBlob);

    reader.onload = () => {
      const icsContent = reader.result;

      // Assertions for missing fields
      expect(icsContent).toContain("Airline: Unknown");
      expect(icsContent).toContain("Status: Unknown");
      expect(icsContent).toContain("Aircraft: Unknown");
      expect(icsContent).toContain("Departure Terminal: N/A, Gate: N/A");
      expect(icsContent).toContain("Arrival Terminal: N/A, Gate: N/A");
    };
  });
});
