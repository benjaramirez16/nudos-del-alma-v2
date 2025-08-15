import Link from 'next/link';
import styles from '@/scss/pages/_admin-products.module.scss';
import ProductsTable from '@/components/admin/ProductsTable';
import { getProducts } from '@/lib/data';

export default async function AdminProductsPage() {
  const { data: rawProducts } = await getProducts();

  
  const products = rawProducts.map(product => ({
    ...product,
    _id: product._id.toString(), // Convertimos el ObjectId de MongoDB a un string simple
  }));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Productos</h1>
        <Link href="/admin/products/new" className={styles.addButton}>
          Añadir Nuevo Producto
        </Link>
      </div>

      <div className={styles.tableWrapper}>
        {/* Ahora pasamos la lista de productos ya procesada y segura */}
        <ProductsTable products={products} />
      </div>
    </div>
  );
}