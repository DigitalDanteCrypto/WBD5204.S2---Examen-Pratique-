import logo from './logo.svg';
import './App.css';
import SearchBar from './searchBar';
import DisplayData from './displayData';
import React, { useEffect, useState } from 'react';

function App() {


  const [currentCity, setCurrentCity] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    console.log("WOUHOU", cities);
  }, [cities])


  return (
    <div className="App">
      <div className="WeatherContainer">
        <div>
          <SearchBar addCity={setCities} selectCity={setCurrentCity} cities={cities} />
        </div>
        <div>
          <DisplayData cityToDisplay={currentCity} />
        </div>
      </div>
    </div>
    
  );
}

export default App;
