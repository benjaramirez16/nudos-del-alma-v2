import ProductCard from '@/components/ProductCard';
import styles from '@/scss/components/_featuredProducts.module.scss';

// Función para pedir los datos a nuestra API
async function getProducts() {
  // Usamos una variable de entorno para la URL base de la API
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${apiUrl}/api/products`, {
    cache: 'no-store' // Asegura que siempre pida los datos más nuevos
  });

  if (!res.ok) {
    throw new Error('Falló la carga de datos de la API');
  }

  return res.json();
}

// El componente se convierte en una función async para poder usar 'await'
const FeaturedProducts = async () => {
  try {
    const response = await getProducts();
    const products = response.data || []; // Aseguramos que 'products' sea un array

    return (
      <section className={styles.featured}>
        <h2 className={styles.featured__title}>Nuestros Favoritos</h2>
        <div className={styles.featured__grid}>
          {products.map((product) => (
            <ProductCard
              key={product._id}
              _id={product._id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    // En caso de error, muestra un mensaje amigable en la UI
    console.error("Error al renderizar FeaturedProducts:", error);
    return (
      <section className={styles.featured}>
        <h2 className={styles.featured__title}>Nuestros Favoritos</h2>
        <p>Hubo un problema al cargar los productos. Intenta de nuevo más tarde.</p>
      </section>
    );
  }
};

export default FeaturedProducts;