import Image from 'next/image';
import Link from 'next/link';
import styles from '@/scss/components/_productCard.module.scss';

const ProductCard = ({ _id, imageUrl, name, price }) => {
  // Verificamos si _id existe para evitar enlaces rotos
  if (!_id) {
    console.error("ProductCard recibió un _id indefinido para el producto:", name);
    return null; // No renderizamos la tarjeta si no tiene un ID válido
  }

  return (
    <article className={styles.card}>
      <div className={styles.card__imageContainer}>
        <Image
          src={imageUrl}
          alt={name}
          width={400}
          height={400}
          className={styles.card__image}
        />
      </div>
      <div className={styles.card__content}>
        <h3 className={styles.card__name}>{name}</h3>
        <p className={styles.card__price}>$ {price}</p>
        <Link href={`/productos/${_id}`} className={styles.card__button}>
          Ver Producto
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;