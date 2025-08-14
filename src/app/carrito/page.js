'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/scss/pages/_carrito.module.scss';

export default function CartPage() {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, cartTotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setIsProcessing(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartItems),
      });

      if (res.ok) {
        const data = await res.json();
        // Redirigimos al usuario a la URL de pago de Mercado Pago
        router.push(data.url);
      } else {
        alert('Error al iniciar el proceso de pago. Intenta de nuevo.');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('No se pudo conectar con el servidor. Intenta de nuevo.');
      setIsProcessing(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.pageHeader}>
        <h1>Tu Carrito de Compras</h1>
      </div>
      <div className={styles.cartContainer}>
        <div className={`${styles.cartItems} ${cartItems.length === 0 ? styles.isEmpty : ''}`}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>Aún no has añadido ningún tesoro a tu carrito. ¡Explora nuestra colección y encuentra algo que te encante!</p>
              <Link href="/productos" className={styles.goToShopButton}>
                Ver Productos
              </Link>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item._id} className={styles.cartItem}>
                <Image src={item.imageUrl} alt={item.name} width={100} height={100} className={styles.itemImage}/>
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
                  ${(parseFloat(item.price.replace('.', '')) * item.quantity).toLocaleString('es-AR')}
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
            <button onClick={handleCheckout} disabled={isProcessing} className={styles.checkoutButton}>
              {isProcessing ? 'Procesando...' : 'Finalizar Compra'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}