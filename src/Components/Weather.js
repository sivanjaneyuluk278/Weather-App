import React, { useState } from "react";
import moment from "moment";

import "./weather.css";

// const url = "https://api.openweathermap.org/data/2.5";
// const api_key = "1635890035cbba097fd5c26c8ea672a1";

const api = {
  //   key: "1635890035cbba097fd5c26c8ea672a1",
  key: "f00c38e0279b7bc85480c3fe775d518c",
  base: "https://api.openweathermap.org/data/2.5/forecast",
};

const Weather = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState([]);
  const searchPressed = () => {
    fetch(`${api.base}?q=${search}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => setWeather(result.list))
      .catch((error) => {
        console.log("Error from fetching data", error);
      });
  };
  return (
    <>
      <div className="container ">
        <header className="d-flex weather-header row ">
          <div className="weather-logo col-6">
            <h1>Weather App</h1>
          </div>
          <div className="weather-input col-6 mt-2">
            <input
              type="text"
              placeholder="enter city name"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button class="btn btn-warning text-white" onClick={searchPressed}>
              Search
            </button>
          </div>
        </header>
        <div className="container mt-5">
          <div className="row weather-content">
            {weather.map((item) => (
              <div className="col-3 mb-2">
                <table className="table table-bordered w-100" key={item.id}>
                  <thead>
                    <tr>
                      <th className="text-center " colSpan="2">
                        Date:{moment(item.clouds.dt_txt).format('DD/MM/YYYY')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="text-center" colSpan="2">
                        Temparature
                      </th>
                    </tr>
                    <tr>
                      <th>Min</th>
                      <th>Max</th>
                    </tr>
                    <tr>
                      <td>{item.main.temp_min}</td>
                      <td>{item.main.temp_max}</td>
                    </tr>
                    <tr>
                      <th>Pressure</th>
                      <td>{item.main.pressure}</td>
                    </tr>
                    <tr>
                      <th>Humidity</th>
                      <td>{item.main.humidity}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
