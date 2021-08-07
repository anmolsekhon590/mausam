import React, { useState, useEffect } from 'react';
import './Weather.css'

export default function Weather() {

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState("");

  const handleCityChange = (e) => setCity(e.target.value);
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

  useEffect(() => {
    if (city !== "") {

      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3555c92ebb9a46d47a72fd004c7c7c62&units=metric`)
        .then(response => response.json())
        .then(json => setData(json))

      return () => {
      }

    }
  }, [])

  if (data === null) {
    return (
      <div className="container">
        Loading...
      </div>
    )
  } else {

    return (
      <div>
        <div></div>
        <div className={`container ${(data.weather[0].description).replace(/ /g, '')}`}>

          <div className="search-container">
            <input value={city} className="search-bar" onChange={handleCityChange} type="text"></input>
            <button onClick={()=>console.log()} className="search-btn" type="button">Go</button>
          </div>

          <div>
            <h2 className="heading">{data.name}</h2>
          </div>

          <div className="conditions">
            {data.weather[0].description}
          </div>

          <div className="temp">
            {(data.main.temp).toPrecision(2)}°C
          </div>

          <div>
            <p>City: {city}</p>
          </div>
        </div>
      </div>


    )
  }
}