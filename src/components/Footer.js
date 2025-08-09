import Link from 'next/link';
import styles from '@/scss/components/_footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        {/* Columna 1: Logo y Sobre Nosotros */}
        <div className={styles.footer__col}>
          <h4 className={styles.footer__logo}>Nudos del Alma</h4>
          <p className={styles.footer__about}>
            Creando piezas únicas de macramé y tejido para darle calidez y personalidad a tu hogar.
          </p>
        </div>
        {/* Columna 2: Navegación */}
        <div className={styles.footer__col}>
          <h4 className={styles.footer__title}>Navegación</h4>
          <ul className={styles.footer__list}>
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/productos">Productos</Link></li>
            <li><Link href="/nosotros">Nosotros</Link></li>
          </ul>
        </div>
        {/* Columna 3: Ayuda */}
        <div className={styles.footer__col}>
          <h4 className={styles.footer__title}>Ayuda</h4>
          <ul className={styles.footer__list}>
            <li><Link href="/faq">Preguntas Frecuentes</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
          </ul>
        </div>
        {/* Columna 4: Redes Sociales */}
        <div className={styles.footer__col}>
          <h4 className={styles.footer__title}>Síguenos</h4>
          <div className={styles.footer__social}>
            <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">IG</a>
            <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">FB</a>
            <a href="#" aria-label="Pinterest" target="_blank" rel="noopener noreferrer">PI</a>
          </div>
        </div>
      </div>
      <div className={styles.footer__bottom}>
        <p>&copy; {new Date().getFullYear()} Nudos Del Alma. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;