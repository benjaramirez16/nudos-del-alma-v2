// /src/components/Header.js

'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import styles from '@/scss/components/_header.module.scss';

const Header = () => {
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // --- INICIO DE LA LÓGICA NUEVA ---
  const isAdminRoute = pathname.startsWith('/admin');
  const logoHref = isAdminRoute ? '/admin/dashboard' : '/';
  // --- FIN DE LA LÓGICA NUEVA ---

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

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
        {/* El logo ahora usa el enlace dinámico */}
        <Link href={logoHref} className={styles.header__logo}>
          Nudos del Alma
        </Link>
        
        <div className={styles.header__rightGroup}>
          {/* --- RENDERIZADO CONDICIONAL DEL MENÚ --- */}

          {/* Si NO es una ruta de admin, muestra el menú público */}
          {!isAdminRoute && (
            <ul className={`${styles.header__list} ${isMenuOpen ? styles.isOpen : ''}`}>
              <li><Link href="/" className={styles.header__link}>Inicio</Link></li>
              <li><Link href="/productos" className={styles.header__link}>Productos</Link></li>
              <li><Link href="/nosotros" className={styles.header__link}>Nosotros</Link></li>
              <li><Link href="/contacto" className={styles.header__link}>Contacto</Link></li>
            </ul>
          )}

          {/* Si SÍ es una ruta de admin, muestra el menú de admin */}
          {isAdminRoute && (
            <ul className={`${styles.header__list} ${isMenuOpen ? styles.isOpen : ''}`}>
              <li><Link href="/admin/dashboard" className={styles.header__link}>Dashboard</Link></li>
              <li><Link href="/admin/products" className={styles.header__link}>Productos</Link></li>
            </ul>
          )}

          {/* El carrito solo se muestra si NO es una ruta de admin */}
          {!isAdminRoute && (
            <Link href="/carrito" className={styles.cartIcon}>
              <FaShoppingCart />
              {totalItems > 0 && (
                <span className={styles.cartCount}>{totalItems}</span>
              )}
            </Link>
          )}

          <button className={styles.hamburgerButton} onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;