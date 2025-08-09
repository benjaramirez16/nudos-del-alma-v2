// src/components/Header.js

import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link href="/" className="header__logo">
          Nudos Del Alma
        </Link>
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <Link href="#productos" className="nav__link">Productos</Link>
            </li>
            <li className="nav__item">
              <Link href="#sobre-mi" className="nav__link">Sobre Mí</Link>
            </li>
            <li className="nav__item">
              <Link href="#contacto" className="nav__link">Contacto</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}