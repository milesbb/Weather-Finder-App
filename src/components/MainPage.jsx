import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import City from "./City";
import Loading from "./Loading";
import WarningSign from "./WarningSign";

const MainPage = () => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorOccurred, setError] = useState([false, ""]);

  const baseEndpoint = "http://api.openweathermap.org/geo/1.0/direct?q=";

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  var cityList = [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError([false, ""]);
    try {
      const response = await fetch(
        "http://api.openweathermap.org/geo/1.0/direct?q=" +
          query +
          "&limit=5&appid=dfb4596c0b2777246415f05bf324524e"
      );
      if (response.ok) {
        const data = await response.json();
        if (data.length === 0) {
          setError("No Results");
        } else {
          setCities(data);
          cityList = data;
          console.log(data);
          console.log("city list");
          console.log(cityList);
          console.log(cities);
        }
      } else {
        setError("Error fetching results");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

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

      {loading === true && <Loading />}

      {loading === false && errorOccurred[0] === true && (
        <WarningSign text={errorOccurred[1]} />
      )}

      {loading === false &&
        errorOccurred[0] === false &&
        cities.map((cityData, i) => <City key={i} data={cityData} />)}
    </div>
  );
};

export default MainPage;
