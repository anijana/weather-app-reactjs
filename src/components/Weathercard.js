import React from 'react'
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";



const Weathercard = () => {
const [weatherState, setweatherState] = useState("");


  const state = useSelector((state) => state);
  // console.log(state);

  const { weather, loading, error } = state;


  useEffect(()=>{
    if(weather?.weather[0].main){
      switch (weather?.weather[0].main) {
        case "Clouds":
          setweatherState("wi-day-cloudy");
          break;
      
        case "Haze":
          setweatherState("wi-fog");
          break;
      
        case "Sunny":
          setweatherState("wi-day-sunny");
          break;

        case "Mist":
          setweatherState("wi-dust");
          break;

        case "Rain":
          setweatherState("wi-day-rain");
          break;
      
        default:
          setweatherState("wi-day-sunny");
          break;
      }
      
    }
  
  },[weather?.weather[0].main]);

  let sec = weather?.sys.sunset;
  let date = new Date(sec * 1000);
  let timeStr = `${date.getHours()}:${date.getMinutes()}`


  const d = new Date();
  const weekDay = ['Sunday', 'Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sept','Oct','Nov','Dec'];

  const day = weekDay[d.getDay()];
  const month = months[d.getMonth()];
  const date1 = d.getDate();
  const year = d.getFullYear();

  const time = d.toLocaleTimeString();

  return (
    <>
      {loading ? (
        <h1 style={{color:"white"}}>Loading please wait......</h1>
      ) : error ? (
        <h1>{error?.message}</h1>
      ) : (
      <article className="widget">
        <div className="weatherIcon">
            <i className={`wi ${weatherState}`}></i>
        </div>
        <div className="weatherInfo">
            <div className="temperature">
                <span>{weather?.main.temp}°C</span>
            </div>
            <div className="description">
                <div className="weatherCondition">
                    {weather?.weather[0].main}
                </div>
                <div className="place">
                    {weather?.name}, {weather?.sys.country} &nbsp; {day} <br />
                    Min: {weather?.main.temp_min}°C &nbsp; | &nbsp; Max: {weather?.main.temp_max}°C
                </div>
            </div>
        </div>
        <div className="date">
          {time} <br />
          {month}{date1},&nbsp;{year}
         
        </div>

        <div className="extra-temp">
            <div className="temp-info-minmax">
                <div className="two-sided-section">
                    <p><i className={"wi wi-sunset"}></i></p>
                    <p className="extra-info-leftside">
                      {timeStr} PM <br />
                      Sunset
                    </p>
                </div> 

                <div className="two-sided-section">
                    <p><i className={"wi wi-humidity"}></i></p>
                    <p className="extra-info-leftside">
                      {weather?.main.humidity}% <br />
                      Humidity
                    </p>
                </div>
            </div>

            <div className="weather-extra-info">
                <div className="two-sided-section">
                    <p><i className={"wi wi-rain"}></i></p>
                    <p className="extra-info-leftside">
                    {weather?.main.pressure} <br />
                      Pressure
                    </p>
                </div>

                <div className="two-sided-section">
                    <p><i className={"wi wi-strong-wind"}></i></p>
                    <p className="extra-info-leftside">
                    {weather?.wind.speed}km/h <br />
                     Wind
                    </p>
                </div>
            </div>
        </div>
      </article>
      )}
    </>
  )
}

export default Weathercard;