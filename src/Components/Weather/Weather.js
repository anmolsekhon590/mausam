import React, { useState, useEffect } from 'react';
import './Weather.css'

export default function Weather() {

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [city, setCity] = useState("");
    const [cityUserInput, setCityUserInput] = useState("");

    const handleCityChange = (e) => setCityUserInput(e.target.value);
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
                .then(function (response) {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response;
                })
                .then(response => response.json())
                .then(json => setData(json))
                .catch(function (error) {
                    console.log(error);
                });

            return () => {
            }

        }
    }, [city])

    if (data === null) {
        return (
            <div className="container">
                <div className=''>
                    Please allow location access to use the app
                </div>
            </div>
        )
    } else {

        return (
            <div>

                <div className={`container ${(data.weather[0].description).replace(/ /g, '')}`}>

                    <div >
                        <form className="search-container" onSubmit={e => { e.preventDefault(); setCity(cityUserInput); }} action="none">
                            <input value={cityUserInput} className="search-bar" onChange={handleCityChange} placeholder="Enter a City" type="text"></input>
                            <button onClick={() => setCity(cityUserInput)} className="search-btn" type="submit">Go</button>
                        </form>
                    </div>

                    <div>
                        <h2 className="heading">{data.name}, {data.sys.country}</h2>
                    </div>

                    <div className="conditions">
                        {data.weather[0].description}
                    </div>

                    <div className="temp">
                        {(data.main.temp).toPrecision(2)}°C
                    </div>
                    <div className="max-min">
                        <div>Min: {(data.main.temp_min).toPrecision(3)}°C</div>
                        <div>Max: {(data.main.temp_max).toPrecision(3)}°C</div>
                    </div>


                </div>
            </div>


        )
    }
}