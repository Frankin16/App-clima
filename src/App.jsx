import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

const apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?"
const apiKey = "bb12cf61ee6723c202343dfefde65708"
const units = "&units=metric"




function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [respData, setRespData] = useState({});
  const [isMeter, setIsMeter] = useState(true);
  // const temperature = {respData.main?.temp}

  const changeUnits = () => {
    setIsMeter(!isMeter)
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    })
    let finalApiEndpoint = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}${units}`;
    axios
    
      .get(finalApiEndpoint)
      .then(resp => {
        setRespData(resp.data)
      })

     
  })
 
  
 


  return (
    <>
    <section>
      <h1>Weather App</h1>
    </section>
      <div className='container'>
        <div className='column1'>
          <h2 className='temp'>{Math.round(isMeter ? respData.main?.temp : respData.main?.temp * 1.8 + 32)}{isMeter ? "°C" : "°F"} </h2>
          <h3>Wind:{respData.wind?.speed}</h3>
          <h3>Pressure:{respData.main?.pressure}</h3>
          <h3>Humidity:{respData.main?.humidity}</h3>
        <h2>{respData.name}, {respData.sys?.country}</h2>
        </div>

        <div className='column2'>
            {respData.weather ? <img src={`https://openweathermap.org/img/wn/${respData.weather[0].icon}@4x.png`} alt="weather icon"/> : null } 
            {respData.weather ? <h3>{respData.weather[0].description}</h3> : null }
            
        </div>
        
      </div>
      <section className='button'>
        <button onClick={changeUnits} className='change'>Change temperature units</button>
      </section>
    </>
  )
}

export default App
