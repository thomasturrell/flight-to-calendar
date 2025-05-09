/**
 * Enum representing the possible statuses of a flight.
 */
export enum FlightStatus {
  /**
   * Status is not available for this flight.
   */
  Unknown = "Unknown",

  /**
   * The flight is expected.
   */
  Expected = "Expected",

  /**
   * The flight is en route.
   */
  EnRoute = "EnRoute",

  /**
   * Check-in is open for the flight.
   */
  CheckIn = "CheckIn",

  /**
   * Boarding is in progress or at the last call.
   */
  Boarding = "Boarding",

  /**
   * The gate for the flight is closed.
   */
  GateClosed = "GateClosed",

  /**
   * The flight has departed.
   */
  Departed = "Departed",

  /**
   * The flight is delayed.
   */
  Delayed = "Delayed",

  /**
   * The flight is on approach to its destination.
   */
  Approaching = "Approaching",

  /**
   * The flight has arrived.
   */
  Arrived = "Arrived",

  /**
   * The flight has been cancelled.
   */
  Canceled = "Canceled",

  /**
   * The flight has been diverted to another destination.
   */
  Diverted = "Diverted",

  /**
   * The status of the flight is uncertain.
   */
  CanceledUncertain = "CanceledUncertain",
}
