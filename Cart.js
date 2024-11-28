// Cart.js
import React, { useContext } from "react";
import { CartContext } from "./CartContext";  // Import the context




const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext); // Access context to get cartItems and remove function

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <p>{item.name}</p>
            <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button> {/* Remove button */}
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
