'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import styles from '@/scss/pages/_pago-exitoso.module.scss';

export default function PagoExitosoPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Creamos un pequeño temporizador para retrasar la limpieza del carrito
    const timer = setTimeout(() => {
      clearCart();
    }, 100); // Un retraso de 100 milisegundos es suficiente

    // Esta es una 'función de limpieza' para evitar errores si el usuario navega muy rápido
    return () => clearTimeout(timer);
  }, [clearCart]);

  return (
    <main className={styles.main}>
      <div className={styles.confirmationBox}>
        <FaCheckCircle className={styles.icon} />
        <h1 className={styles.title}>¡Gracias por tu compra!</h1>
        <p className={styles.message}>
          Tu pago ha sido procesado exitosamente. Pronto recibirás un correo electrónico con los detalles de tu pedido.
        </p>
        <Link href="/productos" className={styles.button}>
          Seguir Comprando
        </Link>
      </div>
    </main>
  );
}