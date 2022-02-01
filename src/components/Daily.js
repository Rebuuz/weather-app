import {
    useEffect
} from "react";

export default function Daily({ dailyWeather }) {
    /**
     * 
     * @param {index parameter för indexet i arrayen} index 
     * @returns returnerar dagarna i ordning, där datumen är omvandlade från unix till millisekunder och därefter matchar det med min array med dagarna. 
     */

    function Dates(index) {
        let d = "";
        if(dailyWeather) {
            const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const date = new Date(dailyWeather.daily[index].dt * 1000);

        d = days[date.getDay()];
        }
        
        return d;
    }

    /**
     * @param {temp för temperaturen i arrayen} temp 
     * @returns ett avrundat värde för grader i celcius istället för kelvin.
     */
    function kelvinToCelcius(temp) {
        return Math.round(Number(temp) - 273.15)
      }
    

    useEffect(() => {
        dailyWeather && console.log(dailyWeather)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    /**
     * returnerar korten för de nästkommande dagarna
     */
    return dailyWeather && (
        <div className="card-container">
                {dailyWeather.daily.filter((day,i) => i < 5).map((day,i) => (
                        <div className="card" key={i}>
                            <p className="days-style">{Dates(i)}</p>
                            <img className="icon-style" src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="weathericon"/>
                            <p className="degrees-style">{kelvinToCelcius(day.temp.day)}&deg;
                            </p>
                        </div>
                ))}
            </div>
    )
}