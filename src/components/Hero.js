// Corregimos la ruta para que incluya el guion bajo del nombre del archivo
import styles from '@/scss/components/_hero.module.scss';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__content}>
        <h1 className={styles.hero__title}>Nudos del Alma</h1>
        <p className={styles.hero__description}>
          Artesanía que teje historias. Descubre piezas únicas de macramé hechas con pasión y dedicación.
        </p>
        <a href="#catalogo" className={styles.hero__button}>
          Ver catálogo
        </a>
      </div>
    </section>
  );
};

export default Hero;