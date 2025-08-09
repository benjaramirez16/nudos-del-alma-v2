import Link from 'next/link';
import styles from '@/scss/components/_header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <Link href="/" className={styles.header__logo}>
          Nudos del Alma
        </Link>
        <ul className={styles.header__list}>
          <li>
            <Link href="/" className={styles.header__link}>
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/productos" className={styles.header__link}>
              Productos
            </Link>
          </li>
          <li>
            <Link href="/nosotros" className={styles.header__link}>
              Nosotros
            </Link>
          </li>
          <li>
            <Link href="/contacto" className={styles.header__link}>
              Contacto
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;