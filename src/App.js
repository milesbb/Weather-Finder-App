import "bootstrap/dist/css/bootstrap.min.css";
import { Canvas } from "react-three-fiber";
import "./App.css";
import Earth from "./components/Earth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import Title from "./components/Title";
import City from "./components/City";
import Favourites from "./components/Favourites";

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
            <Route path="/" element={<MainPage className="w-50" />} />
            <Route path="/:cityName" element={<City />} />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
