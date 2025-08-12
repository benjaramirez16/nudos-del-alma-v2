import ProductForm from '@/components/admin/ProductForm';
import styles from '@/scss/pages/_admin-form.module.scss';

async function getProduct(id) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${apiUrl}/api/products/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function EditProductPage({ params }) {
  const { data: product } = await getProduct(params.id);

  return (
    <div className={styles.formContainer}>
      <h1>Editar Producto</h1>
      <ProductForm initialData={product} />
    </div>
  );
}