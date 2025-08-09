import ProductCard from './ProductCard';
import styles from '@/scss/components/_featuredProducts.module.scss';

// Datos de ejemplo. Más adelante, esta información vendrá de una base de datos.
const products = [
  {
    id: 1,
    name: 'Tapiz "Sol del Desierto"',
    price: '4,500',
    imageUrl: '/images/producto-tapiz.jpg', // Asegúrate de tener estas imágenes en la carpeta public/images
  },
  {
    id: 2,
    name: 'Espejo "Reflejo Bohemio"',
    price: '6,200',
    imageUrl: '/images/producto-espejo.jpg',
  },
  {
    id: 3,
    name: 'Llavero "Nudo Simple"',
    price: '900',
    imageUrl: '/images/producto-llavero.jpg',
  },
];

const FeaturedProducts = () => {
  return (
    <section className={styles.featured}>
      <h2 className={styles.featured__title}>Nuestros Favoritos</h2>
      <div className={styles.featured__grid}>
        {/*
          Usamos .map() para recorrer la lista de productos
          y crear un componente <ProductCard> para cada uno.
        */}
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