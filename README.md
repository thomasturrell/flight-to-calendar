# Flight to Calendar ✈️🗓

A simple React app that takes a flight number and date as input, looks up real-time flight information, and generates a downloadable iCal (.ics) file for easy calendar import.

## 🚀 Features

- 🛫 Real-time flight lookup using the AeroDataBox API
- 📅 Generates `.ics` calendar files compatible with Apple Calendar, Google Calendar, Outlook, etc.
- ⚛️ Built with React and TypeScript
- 💾 Download calendar events directly from the browser

## 🔧 Getting Started

```bash
git clone https://github.com/thomasturrell/flight-to-calendar.git
cd flight-to-calendar
npm install
npm run dev
```

### 🔑 Setting Up Your API Key

1. Sign up for a [RapidAPI](https://rapidapi.com/) account and subscribe to the AeroDataBox API.
2. Create a `.env` file in the root of the project:
   ```bash
   touch .env
   ```
3. Add your API key to the `.env` file:
   ```env
   VITE_RAPIDAPI_KEY=your-actual-rapidapi-key
   ```

> **Note**: The `VITE_` prefix is required for Vite to expose the variable to the client-side code.

## 🛠 Tech Stack

- React
- TypeScript
- Vite
- date-fns
- file-saver
- AeroDataBox API (via RapidAPI)

## 📄 License

This project is licensed under the MIT License.

---

Made by Thomas ✌️
