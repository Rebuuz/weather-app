import { useEffect } from "react";

/*component för  currentWeather*/
export default function Main({ currentWeather }){
    
    function kelvinToCelcius(temp) {
        return Math.round(Number(temp) - 273.15)
      }

    /*Array för dagarna i veckan,skrivna från sön-mån eftersom jag inte tar med den lokala zonen*/
    const dates = (d) => {
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      let day = days[d.getDay()];

    return `${day}`
    } 
    
    useEffect(() => {
        currentWeather && console.log(currentWeather)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    
    return currentWeather && (
      <div className="result-container">
        <div className="city-name">
          {currentWeather.name}
        </div>
      <div className="weather-icon">
        <img src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} alt="weathericon"/> 
      </div>
      <div className="today-date">
        {dates(new Date())}
      </div>
      <div className="weather-main">
        {currentWeather.weather[0].main}
      </div>
      <div className="temp">
        {kelvinToCelcius(currentWeather.main.temp)}&deg;
      </div>
      </div>
    )
   
}