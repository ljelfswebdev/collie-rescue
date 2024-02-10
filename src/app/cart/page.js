"use client";

import React from 'react';
import { useCart } from '../../utils/cartContext';

const CartPage = () => {
  const { cart, addToCart, removeFromCart, clearCart, updateQuantity } = useCart(); // Added updateQuantity function

  const handleIncreaseQuantity = (identifier) => {
    updateQuantity(identifier, 1); // Increase quantity by 1
  };

  const handleDecreaseQuantity = (identifier) => {
    // Get the current item from the cart
    const currentItem = cart.find(item => item.identifier === identifier);
    if (currentItem && currentItem.quantity > 1) {
      // Decrease quantity by 1 if it's greater than 1
      updateQuantity(identifier, -1);
    }
  };
  

  const calculateTotalCartPrice = () => {
    return cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  return (
    <div>
      <h1>Cart Page</h1>
      <ul>
        {cart.map(item => (
          <div key={`${item.id}-${item.identifier}`} className="mb-4">
            <p>{item.name}</p>
            <p>Price: {item.price}</p>
            <p>Quantity: {item.quantity}</p>
            {item.identifier && item.identifier && (
                <p>Colour: {item.identifier}</p> 
            )}
            <p>Total price: £{item.price * item.quantity}</p>
            <button onClick={() => handleIncreaseQuantity(item.identifier)}>Increase Quantity</button> {/* Increase quantity button */}
            <button onClick={() => handleDecreaseQuantity(item.identifier)}>Decrease Quantity</button> {/* Decrease quantity button */}
            <button onClick={() => removeFromCart(item.identifier)}>Remove from Cart</button>
          </div>
        ))}
      </ul>
      <p>Total Cart Price: £{calculateTotalCartPrice()}</p>
      <button onClick={() => clearCart()}>Clear Cart</button>
    </div>
  );
};

export default CartPage;
