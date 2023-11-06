import React from "react";

function Product() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <div className="group relative">
            <div className="w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src=""
                alt="produit"
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <h3 className="text-sm">
                <p>Nom de l'article</p>
              </h3>
              <p className="text-sm font-medium">Prix €</p>
            </div>
            <div className="pt-4">
              <button
                className="px-6 py-2 transition ease-in duration-200 text-xs text-center uppercase w-full rounded-lg block hover:bg-[#002961] hover:text-white border-2 border-[#002961] focus:outline-none"
                type="button"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
