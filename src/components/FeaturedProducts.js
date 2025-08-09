import { products } from '@/data/products'; // 1. Importamos los datos desde su nueva ubicación
import ProductCard from '@/components/ProductCard';
import styles from '@/scss/components/_featuredProducts.module.scss';

// 2. El array de productos ya no vive aquí. El componente es más simple.
const FeaturedProducts = () => {
  return (
    <section className={styles.featured}>
      <h2 className={styles.featured__title}>Nuestros Favoritos</h2>
      <div className={styles.featured__grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;