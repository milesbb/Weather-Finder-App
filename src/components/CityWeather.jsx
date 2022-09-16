import { useEffect, useState } from "react";
import { Image, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const CityWeather = () => {
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(0);
  const [sunriseset, setSunriseset] = useState([]);
  const params = useParams();
  const cityInfo = params.cityName.split("&");

  const getWeather = async () => {
    try {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          cityInfo[1] +
          "&lon=" +
          cityInfo[2] +
          "&units=metric&appid=dfb4596c0b2777246415f05bf324524e"
      );
      if (response.ok) {
        const data = await response.json();
        setWeather(data);
        console.log(weather);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  useEffect(() => {
    if (loading < 4) {
      setLoading(loading + 1);
      getWeather();
      if (loading > 1) {
        convertFromUnix();
      }
    }
  }, [weather]);

  const convertFromUnix = () => {
    let date = new Date(weather.sys.sunrise * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let sunrise = hours + ":" + minutes;

    let date2 = new Date(weather.sys.sunset * 1000);
    let hours2 = date2.getHours();
    let minutes2 = date.getMinutes();
    let sunset = hours2 + ":" + minutes2;
    setSunriseset([sunrise, sunset]);
    console.log(sunriseset);
  };

  if (loading > 1) {
    return (
      <div className="mt-5 text-white">
        <h1>{cityInfo[0]} Weather</h1>
        <h3>
          {weather.weather[0].main}
          <Image
            src={
              "http://openweathermap.org/img/wn/" +
              weather.weather[0].icon +
              "@2x.png"
            }
          />
        </h3>
        <Table striped bordered hover className="text-white">
          <thead>
            <tr>
              <th>Temp.</th>
              <th>Feels Like</th>
              <th>Highest Temp</th>
              <th>Lowest Temp</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white">{weather.main.temp}°C</td>
              <td className="text-white">{weather.main.feels_like}°C</td>
              <td className="text-white">{weather.main.temp_max}°C</td>
              <td className="text-white">{weather.main.temp_min}°C</td>
            </tr>
          </tbody>
        </Table>

        <Table striped bordered hover className="text-white">
          <thead>
            <tr>
              <th>Humidity</th>
              <th>Pressure</th>
              <th>Cloudiness</th>
              <th>Wind</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-white">{weather.main.humidity}%</td>
              <td className="text-white">{weather.main.pressure} hPa</td>
              <td className="text-white">{weather.clouds.all}%</td>
              <td className="text-white">{weather.wind.speed}m/s</td>
            </tr>
          </tbody>
        </Table>
        <div className="d-flex">
          <div className="mx-auto">
            <p className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                className="bi bi-sunrise"
                viewBox="0 0 16 16"
              >
                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708l1.5-1.5zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7zm3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
              </svg>
              <h5 className="text-white">{sunriseset[0]}</h5>
            </p>
          </div>
          <div className="mx-auto">
            <p className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                class="bi bi-sunset"
                viewBox="0 0 16 16"
              >
                <path d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708l1.5 1.5zm-5.303-.51a.5.5 0 0 1 .707 0l1.414 1.413a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .706l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7zm3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
              </svg>
              <h5 className="text-white">{sunriseset[1]}</h5>
            </p>
          </div>
        </div>

        <Link to="/" className="nav-link mt-5">
          Back to Search
        </Link>
      </div>
    );
  }
};

export default CityWeather;
