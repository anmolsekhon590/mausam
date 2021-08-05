import React, { useState, useEffect } from 'react';
import './Weather.css'

export default function Weather() {

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [data, setData] = useState(null);

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(function (position) {
      setLongitude(position.coords.longitude);
      setLatitude(position.coords.latitude);
    })

    return () => {
      // Cleanup
    }
  }, [])

  useEffect(() => {
    if (latitude != null && longitude != null) {

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=3555c92ebb9a46d47a72fd004c7c7c62&units=metric`)
        .then(response => response.json())
        .then(json => setData(json))
    }

  }, [longitude, latitude])

  if (data === null) {
    return (
      <div className="container">
        Loading...
      </div>
    )
  } else {

    return (
      <div className={`container ${(data.weather[0].description).replace(/ /g, '')}`}>


        <div>
          <h2 className="heading">{data.name}</h2>
        </div>

        <div className="conditions">
          {data.weather[0].description}
        </div>

        <div className="temp">
          {(data.main.temp).toPrecision(2)}°C
        </div>
      </div>

    )
  }
}