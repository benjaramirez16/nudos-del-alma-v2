'use client';

import { useState } from 'react';
import styles from '@/scss/pages/_contacto.module.scss';
import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactoPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Limpia el formulario
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <span>benjaramirez2003@hotmail.com</span>
            </li>
            <li>
              <FaWhatsapp className={styles.icon} />
              <span>+54 9 2921 47-1599</span>
            </li>
            <li>
              <FaMapMarkerAlt className={styles.icon} />
              <span>Monte Hermoso, Buenos Aires</span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <h3>Envíame un Mensaje</h3>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" name="message" rows="6" value={formData.message} onChange={handleChange} required></textarea>
          </div>

          {submitStatus === 'success' && <p className={styles.successMessage}>¡Gracias! Tu mensaje ha sido enviado.</p>}
          {submitStatus === 'error' && <p className={styles.errorMessage}>Hubo un error al enviar el mensaje. Intenta de nuevo.</p>}
          
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
          </button>
        </form>
      </div>
    </main>
  );
};