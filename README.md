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

> You'll need a [RapidAPI](https://rapidapi.com/) key to use the AeroDataBox API. Replace `<YOUR_RAPIDAPI_KEY>` in `vite.config.ts` with your actual key.
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