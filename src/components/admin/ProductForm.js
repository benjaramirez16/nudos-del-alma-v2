'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/scss/pages/_admin-form.module.scss';

export default function ProductForm({ initialData = null }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();

  // Si recibimos datos iniciales (modo edición), llenamos el formulario
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price);
      setImageUrl(initialData.imageUrl);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, price, imageUrl };

    const apiRoute = initialData
      ? `/api/products/${initialData._id}` // Ruta para actualizar
      : '/api/products';                 // Ruta para crear

    const method = initialData ? 'PUT' : 'POST';

    try {
      const res = await fetch(apiRoute, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        router.push('/admin/products');
        router.refresh(); // Importante para que la lista se actualice
      } else {
        console.error("Error al guardar el producto");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Nombre del Producto</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="price">Precio</label>
        <input type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="imageUrl">URL de la Imagen</label>
        <input type="text" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        <small>Ej: /images/producto-nuevo.jpg</small>
      </div>
      <button type="submit" className={styles.submitButton}>
        {initialData ? 'Actualizar Producto' : 'Guardar Producto'}
      </button>
    </form>
  );
}