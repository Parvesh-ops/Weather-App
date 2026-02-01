// src/components/WeatherCard.tsx
import type { WeatherData } from "../types/weather"

interface Props {
  weather: WeatherData
}

const WeatherCard = ({ weather }: Props) => {
  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-lg p-6 w-80 text-center">
      <h2 className="text-2xl font-bold mb-2">
        {weather.name}, {weather.sys.country}
      </h2>

      {/* Weather Icon */}
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
        className="mx-auto mb-2"
      />

      {/* Temperature */}
      <p className="text-lg">
        Temperature: <span className="font-semibold">{weather.main.temp}°C</span>
      </p>

      {/* Humidity */}
      <p className="text-lg">
        Humidity: <span className="font-semibold">{weather.main.humidity}%</span>
      </p>

      {/* Weather Description */}
      <p className="text-lg capitalize">
        Weather: <span className="font-semibold">{weather.weather[0].description}</span>
      </p>
    </div>
  )
}

export default WeatherCard
