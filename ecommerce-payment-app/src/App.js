import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./Components/Nav";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Cart.js" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
