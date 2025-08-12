import Image from 'next/image';
import styles from '@/scss/pages/_producto-detalle.module.scss';
import { notFound } from 'next/navigation';

// Función para pedir los datos de UN SOLO producto
async function getProduct(id) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${apiUrl}/api/products/${id}`, {
    cache: 'no-store',
  });

  // Si la API devuelve un error 404, activamos la página 404 de Next.js
  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

export default async function ProductDetailPage({ params }) {
  const response = await getProduct(params.id);
  const product = response.data;

  return (
    <main className={styles.main}>
      <div className={styles.productContainer}>
        <div className={styles.imageColumn}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={600}
            className={styles.productImage}
            priority // Damos prioridad a esta imagen por ser el contenido principal
          />
        </div>
        <div className={styles.detailsColumn}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productPrice}>$ {product.price}</p>
          <p className={styles.productDescription}>
            Aquí iría una descripción detallada del producto. Como aún no la tenemos en la base de datos, usamos este texto de ejemplo. Cada pieza es única, tejida a mano con materiales 100% naturales para llevar calidez a tu hogar.
          </p>
          <button className={styles.addToCartButton}>Agregar al Carrito</button>
        </div>
      </div>
    </main>
  );
}