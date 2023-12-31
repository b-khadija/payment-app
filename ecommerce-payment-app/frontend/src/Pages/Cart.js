import React from "react";
import { BsTrash } from "react-icons/bs";
import { useState, useEffect } from "react";

function Cart({ cart, removeFromCart }) {
  const [cartItems, setCartItems] = useState(cart);
  const [cartTotal, setCartTotal] = useState(0);
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Synchroniser cartItems avec la propriété cart à chaque changement
  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const handleOrderValidation = async () => {
    const orderData = {
      cartItems: cartItems.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
        totalPrice: product.price * product.quantity,
      })),
      totalCartPrice: cartTotal,
    };

    try {
      const response = await fetch("http://localhost:8082/Orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        console.log("Commande validée avec succès!");
        // Réinitialise le panier après la validation de la commande
        setCartItems([]);
        setOrderSuccess(true);
        console.log(orderData);
        // Vider le localStorage
        localStorage.removeItem("cart");
      } else {
        console.error("Erreur lors de la validation de la commande");
      }
    } catch (error) {
      console.error("Erreur lors de la validation de la commande:", error);
    }
  };

  useEffect(() => {
    // Met à jour l'état isCartEmpty en fonction du contenu du panier
    setIsCartEmpty(cartItems.length === 0);
  }, [cartItems]);

  useEffect(() => {
    // Charger le panier depuis le localStorage au montage du composant
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    // Sauvegarder le panier dans le localStorage à chaque changement
    // Sauvegarder que si le panier n'a pas été validé
    if (!cartTotal) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, cartTotal]);

  useEffect(() => {
    // Calcule le total du panier chaque fois que le panier change
    const calculateProductTotal = (product) => {
      return product.price * product.quantity;
    };

    const calculateCartTotal = () => {
      const total = cartItems.reduce(
        (acc, product) => acc + calculateProductTotal(product),
        0
      );
      // Arrondir le total à deux décimales
      const roundedTotal = parseFloat(total.toFixed(2));
      setCartTotal(roundedTotal);
    };

    calculateCartTotal();
  }, [cartItems]);

  // Augmente la quantité d'un produit dans le panier
  const incrementQuantity = (productId) => {
    const updatedCart = cartItems.map((product) =>
      product.id === productId
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    setCartItems(updatedCart);
  };

  // Diminue la quantité d'un produit dans le panier
  const decrementQuantity = (productId) => {
    const updatedCart = cartItems.map((product) =>
      product.id === productId && product.quantity > 1
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );
    setCartItems(updatedCart);
  };

  // Calcule le total d'un produit en fonction de sa quantité
  const calculateProductTotal = (product) => {
    return product.price * product.quantity;
  };

  return (
    <div>
      <section className="flex items-center bg-white font-poppins mx-auto">
        <div className="flex justify-center px-4 py-6 mx-auto w-full lg:py-4 md:px-6 mt-12">
          <div className="p-8 bg-white border-2 border-slate-600">
            <h2 className="mb-14 text-2xl font-bold">Mon panier</h2>
            <div className="flex flex-wrap -mx-4 items-center">
              <div className="w-full px-4 mb-8 xl:mb-0 items-center">
                <div className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8">
                  <div className="w-full md:block hidden px-5 mb-6 md:w-3/6 lg:w-5/12 md:mb-0">
                    <h2 className="font-bold">Nom de produit</h2>
                  </div>
                  <div className="hidden px-4 lg:block md:w-1/6 lg:w-2/12">
                    <h2 className="font-bold">Prix TTC</h2>
                  </div>
                  <div className="hidden md:block px-4 md:w-1/6 lg:w-1/12 ">
                    <h2 className="font-bold">Quantité</h2>
                  </div>
                  <div className="hidden md:block px-4 text-right md:w-1/6 lg:w-3/12 ">
                    <h2 className="font-bold">Total</h2>
                  </div>
                </div>
                {/* Parcourt chaque product et affiche et prend la structure HTML(JSX) suivante => */}
                {cartItems.map((product) => (
                  <div
                    key={product.id}
                    className="py-4 mb-8 border-t border-b border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8">
                      <div className="w-full px-4 mb-6 md:w-3/6 lg:w-5/12 md:mb-0">
                        <div className="flex flex-wrap items-center -mx-4">
                          <div className="w-full px-4 mb-3 md:w-1/3">
                            <div className="w-full h-96 md:h-24 md:w-24">
                              <img
                                src="https://i.postimg.cc/kGjz3dpD/pexels-cottonbro-3296434.jpg"
                                alt={product.name}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </div>
                          <div className="w-2/3 px-4">
                            <p className="mb-2 text-base font-bold">
                              {product.name}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="hidden px-4 md:w-1/6 lg:block lg:w-2/12">
                        <p className="text-lg font-bold">{product.price} €</p>
                      </div>
                      <div className="w-auto px-4 md:w-1/6 lg:w-2/12">
                        <div className="inline-flex items-center px-1 font-semibold text-gray-500 border border-gray-200 rounded-md dark:border-gray-700 ">
                          <button
                            onClick={() => decrementQuantity(product.id)}
                            className="py-2 hover:text-gray-700 dark:text-gray-400"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-dash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"></path>
                            </svg>
                          </button>
                          <input
                            type="number"
                            className="w-12 px-2 py-2 text-center border-0 rounded-md align-self text-base"
                            placeholder="1"
                            value={product.quantity}
                            readOnly
                          />
                          <button
                            onClick={() => incrementQuantity(product.id)}
                            className="py-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-plus"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="w-auto">
                        <div className="inline-flex items-center px-1">
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="hover:text-rose-600 dark:text-gray-400"
                          >
                            <BsTrash size={20} />
                          </button>
                        </div>
                      </div>
                      <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
                        <p className="text-lg font-bold">
                          {calculateProductTotal(product)} €
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {!orderSuccess && isCartEmpty && (
                  <p className="text-center text-lg text-red-500 my-20 tracking-wide">
                    Votre panier est vide.
                  </p>
                )}
                {orderSuccess && (
                  <p className="text-center text-lg font-bold text-green-500 my-20 tracking-wide">
                    Commande validée avec succès ✨
                  </p>
                )}
              </div>
              <div className="w-full px-4">
                <div className="p-6 border border-[#002961] bg-white md:p-8">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-300 dark:border-gray-700 ">
                    <span className="text-base">Frais de livraison</span>
                    <span className="text-base font-bold">Offert</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 mb-6 ">
                    <span className="text-xl font-bold">Total TTC</span>
                    <span className="text-xl font-bold">{cartTotal} €</span>
                  </div>
                  <h2 className="text-base uppercase">Nous acceptons :</h2>
                  <div className="flex items-center mb-4 ">
                    <img
                      src="https://i.postimg.cc/g22HQhX0/70599-visa-curved-icon.png"
                      alt=""
                      className="object-cover h-16 mr-2 w-26"
                    />
                    <img
                      src="https://i.postimg.cc/HW38JkkG/38602-mastercard-curved-icon.png"
                      alt=""
                      className="object-cover h-16 mr-2 w-26"
                    />
                    <img
                      src="https://i.postimg.cc/HL57j0V3/38605-paypal-straight-icon.png"
                      alt=""
                      className="object-cover h-16 mr-2 w-26"
                    />
                  </div>
                  <div className="flex items-center justify-between ">
                    <button
                      onClick={handleOrderValidation}
                      className="px-6 py-2 transition ease-in duration-200 text-xs text-center uppercase w-full block hover:bg-[#002961] text-[#002961] hover:text-white border-2 border-[#002961] focus:outline-none rounded-md"
                    >
                      Valider votre commande
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart;
