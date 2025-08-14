import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';
import styles from '@/scss/pages/_pago-exitoso.module.scss';

export default function PagoExitosoPage() {
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