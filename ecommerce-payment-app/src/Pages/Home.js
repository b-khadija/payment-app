import React from "react";
import Product from "../Components/Product";

function Home() {
  return (
    <div className="bg-white mx-auto">
      <h2 className="text-2xl font-bold tracking-wide	text-center mt-12">
        Nos produits
      </h2>
      <Product />
    </div>
  );
}

export default Home;
