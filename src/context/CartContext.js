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
    // Leemos el estado actual directamente
    const existingItem = cartItems.find(item => item._id === product._id);

    let newItems;
    if (existingItem) {
      // Calculamos el nuevo array si el item ya existe
      newItems = cartItems.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // Calculamos el nuevo array si el item es nuevo
      newItems = [...cartItems, { ...product, quantity: 1 }];
    }

    // AHORA, HACEMOS LAS DOS COSAS POR SEPARADO Y EN ORDEN
    // 1. Guardamos en localStorage
    updateLocalStorage(newItems);
    // 2. Actualizamos el estado de React
    setCartItems(newItems);
  };

  const value = {
    cartItems,
    addToCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}