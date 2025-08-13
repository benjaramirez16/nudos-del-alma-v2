'use client';

import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = localStorage.getItem('cartItems');
    if (items) {
      setCartItems(JSON.parse(items));
    }
  }, []);

  const updateLocalStorage = (items) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  const addToCart = (product) => {
    let newItems;
    const existingItem = cartItems.find(item => item._id === product._id);
    if (existingItem) {
      newItems = cartItems.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newItems = [...cartItems, { ...product, quantity: 1 }];
    }
    updateLocalStorage(newItems);
    setCartItems(newItems);
  };

  const removeFromCart = (productId) => {
    const newItems = cartItems.filter(item => item._id !== productId);
    updateLocalStorage(newItems);
    setCartItems(newItems);
  };

  const decreaseQuantity = (product) => {
    let newItems;
    const existingItem = cartItems.find(item => item._id === product._id);
    if (existingItem.quantity === 1) {
      newItems = cartItems.filter(item => item._id !== product._id);
    } else {
      newItems = cartItems.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity - 1 } : item
      );
    }
    updateLocalStorage(newItems);
    setCartItems(newItems);
  };

  const cartTotal = cartItems.reduce((total, item) => total + parseFloat(item.price.replace('.', '')) * item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    cartTotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}