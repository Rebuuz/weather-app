import React, {useState, useEffect} from "react";
import Main from "./Main";
import Daily from "./Daily";

/*Funktionen för appen*/

function App() {
  const [currentWeather,setCurrentWeather] = useState(null);
  const [searchBar,setSearchBar] = useState(""); 
  const [coords, setCoords] = useState(null);
  const [dailyWeather,setDailyWeather] = useState(null);
  const [error, setError] = useState(null);


  /**
   * funktion för att ta fram nuvarande väder från open weather api
   */ 
  function fetchCurrentWeather() {
    try {
      fetch(`${process.env.REACT_APP_OPENWEATHERMAP_URL}?q=${searchBar ? searchBar : "Bengtsfors"}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`)
        .then(data => data.json())
        .then(res => {
          console.log(res)
          if (res.cod == 200) {
            setCurrentWeather(res)
            setCoords(res.coord)
            setError(null) 
          }
          else setError(res)
        })
        .catch(error => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * funktion för att ta fram koordinationerna från one call-api
   */
  function fetchDailyWeather() {
    try {
      fetch(`${process.env.REACT_APP_OPENWEATHER_ONECALL_URL}?lat=${coords.lat}&lon=${coords.lon}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`)
        .then(data => data.json())
        .then(res => setDailyWeather(res))
        .catch(error => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 
   * @returns returnerar bilder beroende på vilket väder main är i json-filen. 
   */
  function weatherImage() {
    console.log(currentWeather)
    if(currentWeather) {
      console.log(currentWeather)
      switch(currentWeather.weather[0].main){
        case "Clouds": 
          return "url(https://images.unsplash.com/photo-1478071735433-5d8f19ad0fca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)";
        
        case "Rain": 
        return "url(https://images.unsplash.com/photo-1613162734469-c6ed33fea151?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1333&q=80)";

        case "Clear":
          return "url(https://images.unsplash.com/photo-1617142021386-ac8f0f5aff7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80)";

        case "Thunderstorm":
          return "url(https://images.unsplash.com/photo-1500674425229-f692875b0ab7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)";

        case "Drizzle": 
          return "url(https://images.unsplash.com/photo-1471644518115-1f02e9819854?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)";
          
        case "Snow": 
          return "url(https://images.unsplash.com/photo-1614467863855-337790099b35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)";

        default :
          return "url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)";
          
      }
    }
  }
  
  /*HOOKS*/ 
  useEffect(() => {
    fetchCurrentWeather()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    coords && fetchDailyWeather()
  }, [coords]) // eslint-disable-line react-hooks/exhaustive-deps

 useEffect(() => {
   console.log(dailyWeather)
   console.log(currentWeather)
 }, [dailyWeather]) // eslint-disable-line react-hooks/exhaustive-deps

 useEffect(() => {
 // console.log(weatherImage())
}, [currentWeather]) // eslint-disable-line react-hooks/exhaustive-deps


return (
  <div className="App" style={{backgroundImage: weatherImage()}}>
    <h1 className="heading">Tiny Weather</h1>
      <div className="search-wrapper">
        <div className="search-container">
          <input className="search-text" type="text" id="city" name="city" value={searchBar} onChange={e => setSearchBar(e.target.value)} placeholder="Bengtsfors"></input>
          <button className="search-btn" type="button" onClick={fetchCurrentWeather}><i className="fas fa-search-location fa-2x"></i></button>
        </div>
      </div>
      <div className="main-app">
      {error && <p className="error">{error.message}</p>}
    <Main currentWeather={currentWeather} />
    <Daily dailyWeather={dailyWeather} />
    </div>
    <footer className="footer">
      <p>Made by Rebecca Lager @ 2021</p>
    </footer>
    </div>
);
}

export default App;
