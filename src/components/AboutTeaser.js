import styles from '@/scss/components/_aboutTeaser.module.scss';
import Link from 'next/link';

const AboutTeaser = () => {
  return (
    <section className={styles.teaser}>
      <h2 className={styles.teaser__title}>Hola! Soy Majo</h2>
      <p className={styles.teaser__text}>
        Lo que comenzó como una pasión personal, se ha convertido en un sueño hecho realidad. Bienvenidos a Nudos del Alma, un espacio donde cada nudo cuenta una historia.
      </p>
      <Link href="/nosotros" className={styles.teaser__button}>
        Conocé mi historia
      </Link>
    </section>
  );
};

export default AboutTeaser;