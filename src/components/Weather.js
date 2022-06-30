import React from "react";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { weatherAction } from "../redux/slices/Action";
import Weathercard from "./Weathercard";
import "./style.css";



const Weather = () => { 
  const [city, setCity] = useState("");
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(weatherAction("Bangalore"));
  },[dispatch]);

return (
    <>
      <div className="wrap">
        <div className="search">
          <input type="search" 
            placeholder="Search....."
            autoFocus
            id="search"
            className="serachTerm"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            // onClick={() => dispatch(weatherAction(city))}
          />

          <button 
          className="searchButton" 
          type="button"
          onClick={() => dispatch(weatherAction(city))}
          >Search</button>
        </div>
        
      </div>
      <Weathercard />
    </>
  );
};

export default Weather;
