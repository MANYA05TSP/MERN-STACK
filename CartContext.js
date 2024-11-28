import React, { createContext, useState } from "react";

// Create CartContext
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);  // Holds the list of items in the cart

  // Add item to the cart
  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  // Remove item from the cart
  const removeFromCart = (id) => {
    console.log(`Removing item with id: ${id}`); // Debugging line
    setCartItems((prev) => {
      const updatedCart = prev.filter((i) => i.id !== id);
      console.log("Updated Cart: ", updatedCart); // Debugging line
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}  {/* Provide cart data to all children components */}
    </CartContext.Provider>
  );
};

export default CartContext;
