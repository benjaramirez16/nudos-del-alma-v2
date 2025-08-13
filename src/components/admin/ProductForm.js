'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Necesitamos Image para la vista previa
import styles from '@/scss/pages/_admin-form.module.scss';

export default function ProductForm({ initialData = null }) {
  // Estados para los campos del formulario
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  
  // 1. Nuevos estados para el archivo, la vista previa y el estado de carga
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(initialData?.imageUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  
  const router = useRouter();

  // Si estamos en modo edición, llenamos los campos con los datos iniciales
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price);
    }
  }, [initialData]);

  // 2. Función para manejar la selección del archivo
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Creamos una URL local para la vista previa
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    let imageUrl = initialData?.imageUrl || '';

    // 3. Si se seleccionó un nuevo archivo, lo subimos primero a nuestra API
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
          imageUrl = uploadData.url; // Si la subida es exitosa, guardamos la URL de Cloudinary
        } else {
          throw new Error('Error al subir la imagen');
        }
      } catch (error) {
        console.error(error);
        alert('La subida de la imagen falló. Intenta de nuevo.');
        setIsUploading(false);
        return; // Detenemos la ejecución si la subida falla
      }
    }
    
    // 4. Con la URL de la imagen lista, preparamos los datos del producto
    const productData = { name, price, imageUrl };

    const apiRoute = initialData ? `/api/products/${initialData._id}` : '/api/products';
    const method = initialData ? 'PUT' : 'POST';

    // 5. Guardamos el producto (crear o actualizar)
    try {
      const productRes = await fetch(apiRoute, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (productRes.ok) {
        router.push('/admin/products');
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

      {/* 6. Nuevo campo para subir archivos */}
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