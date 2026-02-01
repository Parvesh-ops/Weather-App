import axios from "axios"
import { useState } from "react"
import type { WeatherData } from "./types/weather"
import WeatherCard from "./components/WeatherCard"

const App = () => {
  const [city, setCity] = useState<string>("")
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const getWeather = async () => {
    if (!city.trim()) return

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string

    try {
      setLoading(true)
      setError("")

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
      console.log(response.data)
      
      setWeather(response.data)

    } catch (error) {
      console.error("Failed to fetch data", error)
      setError("City not found. Please try again.")
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      getWeather()
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            weather check
          </h1>
          <p className="text-slate-600">
            type in a city, see what's up
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-blue-500 text-slate-900"
            />

            <button
              onClick={getWeather}
              disabled={loading || !city.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "..." : "Search"}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-3 text-red-600 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Weather Card */}
        {weather && <WeatherCard weather={weather} />}

        {/* Loading state */}
        {loading && !weather && (
          <div className="text-center py-12 text-slate-500">
            loading weather...
          </div>
        )}

        {/* Empty state */}
        {!weather && !loading && !error && (
          <div className="text-center py-16 text-slate-400">
            <div className="text-5xl mb-3">☁️</div>
            <p>search for a city to start</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App