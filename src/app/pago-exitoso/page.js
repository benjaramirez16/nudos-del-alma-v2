'use client'; // 1. Convertimos a Componente de Cliente

import { useEffect } from 'react'; // 2. Importamos useEffect
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';
import { useCart } from '@/context/CartContext'; // 3. Importamos el hook del carrito
import styles from '@/scss/pages/_pago-exitoso.module.scss';

export default function PagoExitosoPage() {
  const { clearCart } = useCart(); // 4. Obtenemos la función para limpiar el carrito

  // 5. Usamos useEffect para limpiar el carrito solo una vez, cuando la página carga
  useEffect(() => {
    clearCart();
  }, [clearCart]); // El array de dependencias asegura que se ejecute de forma segura

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