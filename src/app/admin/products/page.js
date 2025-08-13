import Link from 'next/link';
import styles from '@/scss/pages/_admin-products.module.scss';
import ProductsTable from '@/components/admin/ProductsTable';
import { getProducts } from '@/lib/data'; // <-- 1. Importamos la función directa

export default async function AdminProductsPage() {
  // 2. LLAMAMOS A LA FUNCIÓN DIRECTAMENTE, SIN FETCH
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
        <ProductsTable products={products} />
      </div>
    </div>
  );
}