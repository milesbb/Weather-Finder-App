import "bootstrap/dist/css/bootstrap.min.css";
import { Canvas } from "react-three-fiber";
import "./App.css";
import Earth from "./components/Earth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import Title from "./components/Title";
import Favourites from "./components/Favourites";
import CityWeather from "./components/CityWeather";

function App() {
  return (
    <div className="App">
      <Title />
      <div className="d-flex mx-auto">
        <Canvas style={{height: "40rem", width: "50%"}}>
          <Earth />
        </Canvas>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage className="w-50 mx-auto" />} />
            <Route path="/:cityName" element={<CityWeather className="w-50 mx-auto" />} />
            <Route path="/favourites" element={<Favourites className="w-50 mx-auto" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
