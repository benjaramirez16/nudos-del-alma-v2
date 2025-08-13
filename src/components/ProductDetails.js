'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import styles from '@/scss/pages/_producto-detalle.module.scss';

export default function ProductDetails({ product }) {
  const { addToCart } = useCart();

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
        <button 
          onClick={() => {
            addToCart(product);
          }} 
          className={styles.addToCartButton}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}