import Link from 'next/link';
import styles from '@/scss/pages/_admin-products.module.scss';
import ProductsTable from '@/components/admin/ProductsTable'; // Importamos el nuevo componente de cliente

// Esta función se ejecuta en el servidor para obtener los datos
async function getProducts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${apiUrl}/api/products`, { cache: 'no-store' });
  
  if (!res.ok) {
    // Esto mostrará un error más detallado en la consola del servidor
    const errorDetails = await res.text();
    throw new Error(`Falló la carga de productos: ${errorDetails}`);
  }
  
  return res.json();
}

// Este es el componente de página principal, que también se ejecuta en el servidor
export default async function AdminProductsPage() {
  const { data: products } = await getProducts();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Productos</h1>
        <Link href="/admin/products/new" className={styles.addButton}>
          Añadir Nuevo Producto
        </Link>
      </div>

      <div className={styles.tableWrapper}>
        {/* Aquí usamos nuestro nuevo componente de cliente.
          Le pasamos los productos que ya obtuvimos del servidor.
        */}
        <ProductsTable products={products} />
      </div>
    </div>
  );
}