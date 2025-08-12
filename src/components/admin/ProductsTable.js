'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '@/scss/pages/_admin-products.module.scss';

export default function ProductsTable({ products }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          router.refresh(); // Recarga los datos de la página para mostrar la tabla actualizada
        } else {
          alert('Error al eliminar el producto');
        }
      } catch (error) {
        alert('Error de red al eliminar el producto');
      }
    }
  };

  return (
    <table className={styles.productsTable}>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td>
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={50}
                height={50}
                className={styles.productImage}
              />
            </td>
            <td>{product.name}</td>
            <td>$ {product.price}</td>
            <td className={styles.actions}>
              <Link href={`/admin/products/edit/${product._id}`} className={styles.actionButton}>
                Editar
              </Link>
              <button
                onClick={() => handleDelete(product._id)}
                className={`${styles.actionButton} ${styles.deleteButton}`}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}