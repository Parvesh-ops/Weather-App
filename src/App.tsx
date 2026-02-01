import axios from "axios"
import { useState } from "react"

const App = () => {
  const [city, setCity] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const getWeather = async () => {
    if (!city) return

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string
    console.log(import.meta.env.VITE_WEATHER_API_KEY)


    try {
      setLoading(true)

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

      console.log(response.data) // ✅ YOU WILL SEE DATA NOW
    } catch (error) {
      console.error("Failed to fetch data", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getWeather} disabled={loading}>
        {loading ? "Loading..." : "Get Weather"}
      </button>
    </div>
  )
}

export default App
