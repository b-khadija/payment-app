import React, { useEffect, useState } from "react";
import Product from "../Components/Product";

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Requête pour récupérer la liste depuis localhost:8081
    fetch("http://localhost:8081/")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) =>
        console.error("Erreur récupération des produits", error)
      );
  }, []);

  return (
    <div className="bg-white mx-auto">
      <h2 className="text-2xl font-bold tracking-wide text-center mt-12">
        Nos produits
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          //Création d'un composant "Product" Pour chaque produit dans "products", avec les détails du produit
          <Product
            key={product.id}
            product={product}
            addToCart={() => addToCart(product)} //Ajouter le produit au panier
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
