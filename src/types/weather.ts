export interface WeatherData {
    name: string
    main: {
        temp: number
        humidity: number
        feels_like: number
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
