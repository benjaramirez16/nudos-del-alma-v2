'use client';

import { useState } from 'react'; // 1. Solo necesitamos useState aquí ahora
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import styles from '@/scss/pages/_producto-detalle.module.scss';

export default function ProductDetails({ product }) {
  const { addToCart } = useCart();
  // 2. Nuevo estado para el feedback del botón
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true); // 3. Activamos el estado "agregado"

    // 4. Hacemos que el botón vuelva a la normalidad después de 2 segundos
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <div className={styles.productContainer}>
      <div className={styles.imageColumn}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={600}
          height={600}
          className={styles.productImage}
          priority
        />
      </div>
      <div className={styles.detailsColumn}>
        <h1 className={styles.productName}>{product.name}</h1>
        <p className={styles.productPrice}>$ {product.price}</p>
        <p className={styles.productDescription}>
          Aquí iría una descripción detallada del producto. Cada pieza es única, tejida a mano con materiales 100% naturales para llevar calidez a tu hogar.
        </p>
        {/* 5. El botón ahora llama a nuestra nueva función handleAddToCart */}
        <button 
          onClick={handleAddToCart} 
          className={`${styles.addToCartButton} ${added ? styles.added : ''}`}
          disabled={added} // Opcional: deshabilita el botón mientras muestra el mensaje
        >
          {added ? '¡Agregado al carrito!' : 'Agregar al Carrito'}
        </button>
      </div>
    </div>
  );
}