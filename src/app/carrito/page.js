'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/scss/pages/_carrito.module.scss';

export default function CartPage() {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <main className={styles.main}>
      <div className={styles.pageHeader}>
        <h1>Tu Carrito de Compras</h1>
      </div>
      <div className={styles.cartContainer}>
        <div className={styles.cartItems}>
          {cartItems.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            cartItems.map(item => (
              <div key={item._id} className={styles.cartItem}>
                <Image src={item.imageUrl} alt={item.name} width={100} height={100} />
                <div className={styles.itemDetails}>
                  <h2>{item.name}</h2>
                  <p>${item.price}</p>
                </div>
                <div className={styles.quantityControl}>
                  <button onClick={() => decreaseQuantity(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addToCart(item)}>+</button>
                </div>
                <div className={styles.itemTotal}>
                  ${parseFloat(item.price.replace('.', '')) * item.quantity}
                </div>
                <button onClick={() => removeFromCart(item._id)} className={styles.removeButton}>
                  &times;
                </button>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className={styles.cartSummary}>
            <h2>Resumen del Pedido</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${cartTotal.toLocaleString('es-AR')}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Envío</span>
              <span>A calcular</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Total</span>
              <span>${cartTotal.toLocaleString('es-AR')}</span>
            </div>
            <button className={styles.checkoutButton}>Finalizar Compra</button>
          </div>
        )}
      </div>
    </main>
  );
}