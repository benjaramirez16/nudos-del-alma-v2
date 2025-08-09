import styles from '@/scss/pages/_contacto.module.scss';
import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';

const ContactoPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Hablemos</h1>
        <p className={styles.pageDescription}>
          ¿Tienes una consulta o una idea para un proyecto? Me encantaría saber de ti.
        </p>
      </div>

      <div className={styles.contactContainer}>
        <div className={styles.contactInfo}>
          <h3>Información de Contacto</h3>
          <p>Completa el formulario o contáctame directamente a través de estos canales.</p>
          <ul className={styles.infoList}>
            <li>
              <FaEnvelope className={styles.icon} />
              <span>nudosdelalma@email.com</span>
            </li>
            <li>
              <FaWhatsapp className={styles.icon} />
              <span>+54 9 291 123-4567</span>
            </li>
            <li>
              <FaMapMarkerAlt className={styles.icon} />
              <span>Monte Hermoso, Buenos Aires</span>
            </li>
          </ul>
        </div>
        <form className={styles.contactForm}>
          <h3>Envíame un Mensaje</h3>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" name="message" rows="6" required></textarea>
          </div>
          <button type="submit" className={styles.submitButton}>Enviar Mensaje</button>
        </form>
      </div>
    </main>
  );
};

export default ContactoPage;