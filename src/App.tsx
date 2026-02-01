import axios from "axios"
import { useState } from "react"
import type { WeatherData } from "./types/weather"
import WeatherCard from "./components/WeatherCard"

const App = () => {
  const [city, setCity] = useState<string>("")
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const getWeather = async () => {
    if (!city) return

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string

    try {
      setLoading(true)
      setError(false)

      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: city,
            appid: API_KEY,
            units: "metric",
          },
        }
      )
      setWeather(response.data)

    } catch (error) {
      console.error("Failed to fetch data", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 via-blue-400 to-blue-600 flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 mb-8 drop-shadow-xl animate-bounce">
        Weather App
      </h1>

      <p className="text-white text-lg md:text-xl mb-6 text-center drop-shadow-md">
        Get real-time weather updates for any city in the world 🌤️
      </p>

      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-64 px-4 py-2 rounded-xl border-2 border-blue-500 bg-white text-black placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={getWeather}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Get Weather
        </button>
      </div>

      {loading && (
        <p className="text-white font-semibold animate-pulse">
          Loading...
        </p>
      )}

      {error && (
        <p className="text-red-600 font-semibold">
          Error: Failed to fetch data
        </p>
      )}

      {weather && <WeatherCard weather={weather} />}
    </div>
  )
}

export default App