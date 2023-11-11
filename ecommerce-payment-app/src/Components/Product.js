import React from "react";

function Product({ addToCart, product }) {
  return (
    <div key={product.id} className="group relative">
      <div className="w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src="https://fakeimg.pl/300/"
          alt={product.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <h3 className="text-sm md:text-base">
          <p>{product.name}</p>
        </h3>
        <p className="text-sm font-medium">{product.price} €</p>
      </div>
      <div className="pt-4">
        <button
          onClick={() => addToCart(product)} // Appel de la fonction addToCart lorsque le bouton est cliqué
          disabled={product.quantity >= product.inventory} // Le bouton n'est plus cliquable si le stock est inférieure à la quantité dans le panier
          className={`px-6 py-2 transition ease-in duration-200 text-xs text-center uppercase w-full rounded-lg block hover:bg-[#002961] ${
            product.inventory > 0
              ? "hover:text-white border-2 border-[#002961]"
              : "text-red-500 cursor-not-allowed"
          } focus:outline-none`}
          type="button"
        >
          {product.inventory > 0 ? "Ajouter au panier" : "Rupture de stock"}
        </button>
      </div>
    </div>
  );
}

export default Product;
