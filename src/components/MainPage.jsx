import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import City from "./City";

const MainPage = () => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);

  const baseEndpoint = "http://api.openweathermap.org/geo/1.0/direct?q=";

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  var cityList = [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://api.openweathermap.org/geo/1.0/direct?q=" +
          query +
          "&limit=5&appid=dfb4596c0b2777246415f05bf324524e"
      );
      if (response.ok) {
        const data = await response.json();
        setCities(data);
        cityList = data;
        console.log(data);
        console.log("city list");
        console.log(cityList);
        console.log(cities);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(cityList);

  return (
    <div className="text-white">
      <Container></Container>
      <h1 className="mt-5">Search for your City!</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          type="search"
          value={query}
          onChange={handleChange}
          placeholder="type and press Enter"
        />
      </Form>

      {(cities.length !== []) &&
        cities.map((cityData, i) => <City key={i} data={cityData} />)}
    </div>
  );
};

export default MainPage;
