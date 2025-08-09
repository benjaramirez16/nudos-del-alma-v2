import Link from 'next/link';
import styles from '@/scss/components/_footer.module.scss';
// 1. Importamos los iconos que necesitamos
import { FaInstagram, FaFacebookF, FaPinterestP } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* 2. Nueva sección de Llamada a la Acción (CTA) */}
      <div className={styles.ctaSection}>
        <h3 className={styles.ctaSection__title}>¿Tienes una idea en mente?</h3>
        <p className={styles.ctaSection__text}>Hablemos para crear juntos tu próxima pieza soñada.</p>
        <Link href="/contacto" className={styles.ctaSection__button}>Contáctame</Link>
      </div>

      <div className={styles.footer__container}>
        <div className={styles.footer__col}>
          <h4 className={styles.footer__logo}>Nudos del Alma</h4>
          <p className={styles.footer__about}>
            Creando piezas únicas de macramé y tejido para darle calidez y personalidad a tu hogar.
          </p>
        </div>
        <div className={styles.footer__col}>
          <h4 className={styles.footer__title}>Navegación</h4>
          <ul className={styles.footer__list}>
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/productos">Productos</Link></li>
            <li><Link href="/nosotros">Nosotros</Link></li>
          </ul>
        </div>
        <div className={styles.footer__col}>
          <h4 className={styles.footer__title}>Ayuda</h4>
          <ul className={styles.footer__list}>
            <li><Link href="/faq">Preguntas Frecuentes</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
          </ul>
        </div>
        <div className={styles.footer__col}>
          <h4 className={styles.footer__title}>Síguenos</h4>
          <div className={styles.footer__social}>
            {/* 3. Usamos los iconos como si fueran componentes */}
            <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className={styles.social__icon}>
              <FaInstagram />
            </a>
            <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className={styles.social__icon}>
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Pinterest" target="_blank" rel="noopener noreferrer" className={styles.social__icon}>
              <FaPinterestP />
            </a>
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