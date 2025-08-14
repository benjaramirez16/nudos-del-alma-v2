'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // 1. Importamos el nuevo hook
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import styles from '@/scss/components/_header.module.scss';

const Header = () => {
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // 2. Obtenemos la ruta actual de la URL

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Efecto para cerrar el menú cuando cambia la ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Efecto para bloquear el scroll del body
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  return (
    <header className={`${styles.header} ${isMenuOpen ? styles.menuIsOpen : ''}`}>
      <nav className={styles.header__nav}>
        <Link href="/" className={styles.header__logo}>
          Nudos del Alma
        </Link>
        <div className={styles.header__rightGroup}>
          <ul className={`${styles.header__list} ${isMenuOpen ? styles.isOpen : ''}`}>
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
          <button className={styles.hamburgerButton} onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;