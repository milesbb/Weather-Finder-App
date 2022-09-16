import "bootstrap/dist/css/bootstrap.min.css";
import { Canvas } from "react-three-fiber";
import "./App.css";
import Earth from "./components/Earth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import Title from "./components/Title";
import Favourites from "./components/Favourites";
import CityWeather from "./components/CityWeather";
import { Camera } from "three";

function App() {
  return (
    <div className="App">
      
      <Canvas
      className="position-absolute"
        style={{ width: "100%", height: "100%" }}
        orthographic
        camera={{ zoom: 300, position: [0, 0, 5] }}
      >
        <Earth />
      </Canvas>
      <Title className="position-absolute" />

      <div
        className="d-flex mx-auto position-absolute"
        style={{ width: "30%", right: "15%" }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage className="w-50 mx-auto" />} />
            <Route
              path="/:cityName"
              element={<CityWeather className="w-50 mx-auto" />}
            />
            <Route
              path="/favourites"
              element={<Favourites className="w-50 mx-auto" />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
