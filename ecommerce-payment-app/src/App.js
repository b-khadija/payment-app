//import logo from './logo.svg';
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./Components/Nav";
import "./index.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <p className="body bg-orange-950">DIB✨</p>
      </Router>
    </div>
  );
}

export default App;
