/**
 * Enum representing the possible statuses of a flight.
 */
export enum FlightStatus {
  /**
   * Status is not available for this flight.
   */
  Unknown = 0,

  /**
   * The flight is expected.
   */
  Expected = 1,

  /**
   * The flight is en route.
   */
  EnRoute = 2,

  /**
   * Check-in is open for the flight.
   */
  CheckIn = 3,

  /**
   * Boarding is in progress or at the last call.
   */
  Boarding = 4,

  /**
   * The gate for the flight is closed.
   */
  GateClosed = 5,

  /**
   * The flight has departed.
   */
  Departed = 6,

  /**
   * The flight is delayed.
   */
  Delayed = 7,

  /**
   * The flight is on approach to its destination.
   */
  Approaching = 8,

  /**
   * The flight has arrived.
   */
  Arrived = 9,

  /**
   * The flight has been cancelled.
   */
  Canceled = 10,

  /**
   * The flight has been diverted to another destination.
   */
  Diverted = 11,

  /**
   * The status of the flight is uncertain.
   */
  CanceledUncertain = 12,
}
