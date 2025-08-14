'use client';

import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Al cargar la aplicación, intenta recuperar el carrito desde localStorage
  useEffect(() => {
    const items = localStorage.getItem('cartItems');
    if (items) {
      setCartItems(JSON.parse(items));
    }
  }, []);

  // Función auxiliar para mantener sincronizado el localStorage
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
    const existingItem = cartItems.find(item => item._id === product._id);
    let newItems;

    if (existingItem?.quantity === 1) {
      // Si la cantidad es 1, disminuir es lo mismo que eliminar
      newItems = cartItems.filter(item => item._id !== product._id);
    } else {
      newItems = cartItems.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity - 1 } : item
      );
    }
    updateLocalStorage(newItems);
    setCartItems(newItems);
  };

  const clearCart = () => {
    setCartItems([]);
    updateLocalStorage([]);
  };

  // Calcula el total del carrito
  const cartTotal = cartItems.reduce((total, item) => {
    const price = Number(item.price.replace(/[^0-9,-]+/g, "").replace(",", "."));
    return total + price * item.quantity;
  }, 0);

  // El objeto 'value' que se pasa a todos los componentes hijos
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    clearCart,
    cartTotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}