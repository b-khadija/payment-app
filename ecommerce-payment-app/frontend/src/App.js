import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Nav from "./Components/Nav";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";

function App() {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const addToCart = (product) => {
    // Vérifiez si le produit est déjà dans le panier
    const productIndex = cart.findIndex((item) => item.id === product.id);

    if (productIndex !== -1) {
      const updatedCart = [...cart];
      const quantityInCart = updatedCart[productIndex].quantity;

      // Vérifiez si la quantité dans le panier plus 1 est inférieure ou égale à l'inventaire
      if (quantityInCart + 1 <= product.inventory) {
        updatedCart[productIndex].quantity += 1;
        setCart(updatedCart);
      }
    } else {
      if (product.inventory > 0) {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    // Retirez les produits dont la quantité est de 0
    const filteredCart = updatedCart.filter((item) => item.quantity > 0);
    setCart(filteredCart);
  };

  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route
            path="/Cart.js"
            element={<Cart cart={cart} removeFromCart={removeFromCart} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
