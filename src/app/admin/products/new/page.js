import ProductForm from '@/components/admin/ProductForm';
import styles from '@/scss/pages/_admin-form.module.scss';

export default function NewProductPage() {
  return (
    <div className={styles.formContainer}>
      <h1>Añadir Nuevo Producto</h1>
      <ProductForm />
    </div>
  );
}