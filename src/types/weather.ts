export interface WeatherData {
  name: string
  main: {
    temp: number
    humidity: number
  }
  sys: {
    country: string
  }
  weather: {
    main: string
    description: string
    icon: string
  }[] 
}
