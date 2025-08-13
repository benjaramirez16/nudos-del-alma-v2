import styles from '@/scss/pages/_producto-detalle.module.scss';
import { notFound } from 'next/navigation';
import ProductDetails from '@/components/ProductDetails'; // Importa el nuevo componente de cliente

// Esta función se ejecuta en el servidor para obtener los datos del producto
async function getProduct(id) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${apiUrl}/api/products/${id}`, {
    cache: 'no-store',
  });

  // Si la API devuelve un error (ej. 404), mostramos la página de "No Encontrado" de Next.js
  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

// Este es el componente de página principal (Componente de Servidor)
export default async function ProductDetailPage({ params }) {
  const response = await getProduct(params.id);
  const product = response.data;

  return (
    <main className={styles.main}>
      {/* Renderizamos el Componente de Cliente y le pasamos los datos del producto
        que ya obtuvimos aquí en el servidor.
      */}
      <ProductDetails product={product} />
    </main>
  );
}