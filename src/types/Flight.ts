import { DateTime } from "luxon";
import { FlightStatus } from "./FlightStatus";

/**
 * Represents detailed information about a flight.
 */
export interface Flight {
  /**
   * The scheduled or predicted departure time in UTC.
   */
  departureTime?: DateTime; // UTC departure time

  /**
   * The scheduled or predicted arrival time in UTC.
   */
  arrivalTime?: DateTime; // UTC arrival time

  /**
   * The local departure time with timezone offset.
   */
  departureLocalTime?: DateTime; // Local departure time

  /**
   * The local arrival time with timezone offset.
   */
  arrivalLocalTime?: DateTime; // Local arrival time

  /**
   * The name of the departure airport.
   */
  origin: string;

  /**
   * The name of the arrival airport.
   */
  destination: string;

  /**
   * The flight number (e.g., "DL32").
   */
  flightNumber: string;

  /**
   * The name of the airline operating the flight.
   */
  airline?: string;

  /**
   * The current status of the flight (e.g., "Scheduled", "Delayed").
   */
  status: FlightStatus;

  /**
   * The model of the aircraft (e.g., "Boeing 737").
   */
  aircraftModel?: string; // Optional: May not always be available

  /**
   * The terminal at the departure airport (if available).
   */
  departureTerminal?: string; // Optional: May not always be available

  /**
   * The gate at the departure airport (if available).
   */
  departureGate?: string; // Optional: May not always be available

  /**
   * The terminal at the arrival airport (if available).
   */
  arrivalTerminal?: string; // Optional: May not always be available

  /**
   * The gate at the arrival airport (if available).
   */
  arrivalGate?: string; // Optional: May not always be available
}
