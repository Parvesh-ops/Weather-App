import type { WeatherData } from "../types/weather"

interface WeatherProps {
  weather: WeatherData
}

const WeatherCard = ({ weather }: WeatherProps) => {
  // Get weather icon from OpenWeatherMap
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`

  return (
    <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
      {/* Location */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-slate-800">
          {weather.name}, {weather.sys.country}
        </h2>
      </div>

      {/* Main weather info */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-6xl font-bold text-slate-900 mb-1">
            {Math.round(weather.main.temp)}°
          </div>
          <p className="text-lg text-slate-600 capitalize">
            {weather.weather[0].description}
          </p>
          <p className="text-sm text-slate-500 mt-1">
            feels like {Math.round(weather.main.feels_like)}°
          </p>
        </div>
        
        <img 
          src={iconUrl} 
          alt={weather.weather[0].description}
          className="w-24 h-24 -mt-2"
        />
      </div>

      {/* Humidity */}
      <div className="pt-4 border-t border-slate-200">
        <div className="flex justify-between items-center">
          <span className="text-slate-600">humidity</span>
          <span className="text-lg font-semibold text-slate-800">
            {weather.main.humidity}%
          </span>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard