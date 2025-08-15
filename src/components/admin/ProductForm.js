'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from '@/scss/pages/_admin-form.module.scss';

export default function ProductForm({ initialData = null }) {
  // Estados para los campos del formulario
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  // Estados para el manejo del archivo de imagen
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const router = useRouter();

  // Efecto para rellenar el formulario si estamos en modo "Editar"
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setPrice(initialData.price || '');
      setDescription(initialData.description || '');
      setPreviewUrl(initialData.imageUrl || null);
    }
  }, [initialData]);

  // Maneja la selección de un nuevo archivo de imagen
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    let imageUrl = initialData?.imageUrl || '';

    // Paso 1: Si se seleccionó un nuevo archivo, subirlo a Cloudinary
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const uploadData = await uploadRes.json();

        if (uploadData.success) {
          imageUrl = uploadData.url; // Usamos la nueva URL de Cloudinary
        } else {
          throw new Error('Error al subir la imagen');
        }
      } catch (error) {
        console.error(error);
        alert('La subida de la imagen falló. Intenta de nuevo.');
        setIsUploading(false);
        return;
      }
    }
    
    // Paso 2: Preparar los datos del producto y enviarlos a nuestra API
    const productData = { name, price, imageUrl, description };

    const apiRoute = initialData
      ? `/api/products/${initialData._id}` // Ruta para ACTUALIZAR
      : '/api/products';                 // Ruta para CREAR

    const method = initialData ? 'PUT' : 'POST';

    try {
      const productRes = await fetch(apiRoute, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (productRes.ok) {
        router.push('/admin/products'); // Volvemos a la lista de productos
        router.refresh();
      } else {
        alert('Error al guardar el producto.');
      }
    } catch (error) {
      console.error(error);
      alert('Error al conectar con la API de productos.');
    } finally {
      setIsUploading(false);
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
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="image">Imagen del Producto</label>
        <input type="file" id="image" name="image" accept="image/*" onChange={handleFileChange} />
        {previewUrl && (
          <div className={styles.imagePreview}>
            <Image src={previewUrl} alt="Vista previa de la imagen" width={100} height={100} />
          </div>
        )}
      </div>
      <button type="submit" className={styles.submitButton} disabled={isUploading}>
        {isUploading ? 'Guardando...' : (initialData ? 'Actualizar Producto' : 'Guardar Producto')}
      </button>
    </form>
  );
}