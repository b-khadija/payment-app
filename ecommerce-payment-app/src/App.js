import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./Components/Nav";
import "./index.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
      </Router>
    </div>
  );
}

export default App;
