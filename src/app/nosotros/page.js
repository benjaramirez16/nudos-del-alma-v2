import Image from 'next/image';
import styles from '@/scss/pages/_nosotros.module.scss';

const NosotrosPage = () => {
  return (
    <main>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>El Alma Detrás de Cada Nudo</h1>
        <p className={styles.pageDescription}>
          Un poco sobre mi historia y la filosofía de Nudos del Alma.
        </p>
      </div>

      <section className={styles.contentSection}>
        <div className={styles.imageContainer}>
          <Image
            src="/images/majo-nosotros.jpg" // Necesitarás una imagen tuya o representativa aquí
            alt="Majo Llinares, artesana de Nudos del Alma"
            width={500}
            height={600}
            className={styles.profileImage}
          />
        </div>
        <div className={styles.textContainer}>
          <h2>Mi Historia</h2>
          <p>
            Bienvenidos a Nudos Del Alma. Lo que comenzó como una pasión personal en las tranquilas costas de Monte Hermoso, se ha convertido en un sueño hecho realidad. Soy Majo Llinares, la artesana detrás de cada pieza.
          </p>
          <p>
            Desde siempre, he encontrado una profunda conexión en el arte de tejer, en la paciencia de cada nudo y en la capacidad de transformar simples hilos en objetos que cuentan una historia y decoran con calidez.
          </p>
          <h2>Nuestra Filosofía</h2>
          <p>
            Creemos en la belleza de lo imperfecto y en el valor de lo artesanal. Cada tapiz, manta o espejo es confeccionado a mano, dedicándole el tiempo y la atención que merece. Utilizamos materiales naturales y buscamos que cada diseño refleje la serenidad y la belleza de nuestro entorno, creando piezas que no solo adornan un espacio, sino que también le aportan un alma.
          </p>
        </div>
      </section>
    </main>
  );
};

export default NosotrosPage;