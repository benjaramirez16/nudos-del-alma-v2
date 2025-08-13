'use client'; // <-- 1. Convertimos a Componente de Cliente

import Link from 'next/link';
import { useCart } from '@/context/CartContext'; // 2. Importamos nuestro hook del carrito
import { FaShoppingCart } from 'react-icons/fa'; // 3. Importamos un ícono que ya tenemos instalado
import styles from '@/scss/components/_header.module.scss';

const Header = () => {
  const { cartItems } = useCart(); // 4. Obtenemos los items del carrito desde el contexto

  // 5. Calculamos la cantidad total de productos (sumando las cantidades de cada item)
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <Link href="/" className={styles.header__logo}>
          Nudos del Alma
        </Link>
        {/* NUEVO CONTENEDOR PARA LOS ELEMENTOS DE LA DERECHA */}
        <div className={styles.header__rightGroup}>
          <ul className={styles.header__list}>
            <li><Link href="/" className={styles.header__link}>Inicio</Link></li>
            <li><Link href="/productos" className={styles.header__link}>Productos</Link></li>
            <li><Link href="/nosotros" className={styles.header__link}>Nosotros</Link></li>
            <li><Link href="/contacto" className={styles.header__link}>Contacto</Link></li>
          </ul>
          <Link href="/carrito" className={styles.cartIcon}>
            <FaShoppingCart />
            {totalItems > 0 && (
              <span className={styles.cartCount}>{totalItems}</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;