import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";
import Board from "./components/Board/Board";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div style={{ marginTop: "50px" }}>
        <Routes>
          <Route path="/home" Component={Home} />
          <Route path="/" Component={Home} />
          <Route path="/boards/:boardID" Component={Board} />
          <Route path="/about" />
        </Routes>
      </div>
    </div>
  );
}

export default App;
