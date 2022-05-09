import React from 'react'

const WeatherBox = ({weather}) => {
    console.profileEnd("weather?",weather)

const temperatureC =
    weather?(weather.main.temp.toFixed(2)):"";

const temperatureF =
    weather?(weather.main.temp*1.8+32).toFixed(2):"";

  return (
    <div className='weather-box'>
        <div>{weather?.name}</div>
        <h2>{temperatureC}°C/{temperatureF}°F</h2>
        <h3>{weather?.weather[0].description}</h3>
    </div>
  )
}

export default WeatherBox