import React from "react";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./Components/Nav";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Home />
      </Router>
    </div>
  );
}

export default App;
