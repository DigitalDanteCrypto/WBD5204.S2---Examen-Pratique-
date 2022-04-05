import { useEffect, useState } from "react";
import axios from "axios"

const API_KEY = "9ce4b28868e7668d1e3766646aa47fa2"

const DisplayData = (state) => {

    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (state.cityToDisplay.city !== undefined) {
            // axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${state.cityToDisplay.city}&limit=10&appid=${API_KEY}`)
            //     .then((response) => {
            //         console.log(response);
                    
            //         const lat = response.data[0]["lat"]
            //         const lon = response.data[0]["lon"]
                    
            //         axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
            //         .then((response) => {
            //             console.log(response.data);
            //             let time = new Date(response.data.dt * 1000)
            //             let formattedTime = time.getHours() + ':' + time.getMinutes()
            //             setWeather({
            //                 weather: response.data.coord.weather,
            //                 main: response.data.coord.main,
            //                 time: formattedTime,
            //                 lat: lat,
            //                 lon: lon
            //             })
            //             setLoading(true);
            //         })
            //     })
                
        }
        const response = {"coord":{"lon":6.1466,"lat":46.2018},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"base":"stations","main":{"temp":12.21,"feels_like":10.45,"temp_min":9.11,"temp_max":13.62,"pressure":1014,"humidity":37},"visibility":10000,"wind":{"speed":2.06,"deg":200},"clouds":{"all":20},"dt":1649156650,"sys":{"type":1,"id":6928,"country":"CH","sunrise":1649135264,"sunset":1649182092},"timezone":7200,"id":6691638,"name":"Vieille-Ville","cod":200}
        setWeather({
            "lat": response.coord.lat,
            "lon": response.coord.lon,
            "main": {
                "temp": response.main.temp,
                "temp_min": response.main.temp_min,
                "temp_max": response.main.temp_max
            },
            "time": response.dt
        });
    }, [state.cityToDisplay.city])



    return (
        loading ? 
        <div className="displayData">
            <div className="dataTitle">
                <h1>{state.cityToDisplay.city}</h1>
                <p>Lat : {weather["lat"]} - Long : {weather["lon"]}</p>
            </div>
            <div className='dataInfo'>
                <p>{weather["main"]["temp"]}</p>
                <p>Max : {weather["main"]["temp_max"]} - Min : {weather["main"]["temp_min"]}</p>
            </div>
            <div className="dataHour">
                <p>{weather["time"]}</p>
            </div>
            <div className="imgForWeather">
                <p>ICON</p>
            </div>
        </div>
        : ""
    )
}

export default DisplayData;