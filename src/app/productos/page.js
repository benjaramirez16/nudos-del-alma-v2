import FeaturedProducts from '@/components/FeaturedProducts';
import styles from '@/scss/pages/_productos.module.scss';

const ProductosPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Nuestro Catálogo</h1>
        <p className={styles.pageDescription}>
          Explora todas nuestras creaciones hechas a mano, cada una con una historia única.
        </p>
      </div>
      
      {/* ¡Aquí reutilizamos el componente de la página de inicio! */}
      <FeaturedProducts />
    </main>
  );
};

export default ProductosPage;