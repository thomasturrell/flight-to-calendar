import React, { useState } from "react";
import { saveAs } from "file-saver";
import { createEvent } from "../utils/icalGenerator";
import { fetchFlightTimes } from "../utils/flightLookup";
import { Flight } from "../types/Flight";

export const FlightForm = () => {
  const [flightNumber, setFlightNumber] = useState("");
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const handleGenerate = async () => {
    if (!flightNumber || !date) {
      alert("Please enter both flight number and date");
      return;
    }

    try {
      const flightData = await fetchFlightTimes(flightNumber, date);

      //Prints each flight to the console for debugging
      flightData.forEach((flight) => {
        console.log(
          `Flight Number: ${flight.flightNumber}, Departure: ${flight.departureLocalTime}, Arrival: ${flight.arrivalLocalTime}`
        );
      });

      if (flightData.length > 1) {
        setFlights(flightData); // Show flight options to the user
      } else if (flightData.length === 1) {
        handleFlightSelection(flightData[0]);
      } else {
        alert("No flights found for the given flight number and date.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert(
        "Failed to fetch flight details. Please check the flight number or try again later."
      );
    }
  };

  const generateIcal = (flight: Flight) => {
    if (!flight) {
      alert("Invalid flight data");
      return;
    }

    const icsBlob = createEvent(flight);
    saveAs(icsBlob, `Flight_${flight.flightNumber}_${date}.ics`);
  };

  const handleFlightSelection = (flight: Flight) => {
    setSelectedFlight(flight);
    setFlights([]); // Clear flight options after selection
    generateIcal(flight);
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setFlights([]); // Clear flight options when form inputs are altered
      setSelectedFlight(null); // Clear selected flight
    };

  return (
    <div style={{ padding: 20 }}>
      <h2>Flight to iCal Generator</h2>

      {/* Input Fields */}
      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          placeholder="Flight Number (e.g. DL32)"
          value={flightNumber}
          onChange={handleInputChange(setFlightNumber)}
          style={{ margin: 5, padding: 5 }}
        />
        <input
          type="date"
          value={date}
          onChange={handleInputChange(setDate)}
          style={{ margin: 5, padding: 5 }}
        />
        <button onClick={handleGenerate} style={{ margin: 5, padding: 5 }}>
          Search Flights
        </button>
      </div>

      {/* Flight Options */}
      {flights.length > 0 && (
        <div>
          <h3>Select a Flight</h3>
          <ul>
            {flights.map((flight, index) => (
              <li key={index} style={{ marginBottom: 10 }}>
                <button
                  onClick={() => handleFlightSelection(flight)}
                  style={{ padding: 5 }}
                >
                  {flight.flightNumber} - {flight.origin} to{" "}
                  {flight.destination} (
                  {flight.departureLocalTime?.toFormat("yyyy-MM-dd HH:mm ZZZZ")}{" "}
                  - {flight.arrivalLocalTime?.toFormat("yyyy-MM-dd HH:mm ZZZZ")}
                  )
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Confirmation Message */}
      {selectedFlight && (
        <p style={{ marginTop: 20 }}>
          iCal file generated for flight{" "}
          <strong>{selectedFlight.flightNumber}</strong>!
        </p>
      )}
    </div>
  );
};
