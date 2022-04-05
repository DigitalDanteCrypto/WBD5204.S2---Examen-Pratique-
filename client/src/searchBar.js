import { useState } from "react";

const SearchBar = (state) => {
    
    const [inputCity, setInputCity] = useState("");

    return (
        <div className="searchContainer">
            <div className="searchBar">
                <input id="search" type="text" placeholder="Search City" onChange={(e) => setInputCity(e.target.value) }></input>
            </div>
            <div className="addButton">
                <button id="add" onClick={() => state.addCity((cities) => [...cities, inputCity])}>Add City</button>
            </div>
            <div className="cityList">
                <ul>
                    {
                        state.cities.map((city) => {
                            return <li><button onClick={() => state.selectCity({city})}>{city}</button></li>
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default SearchBar;