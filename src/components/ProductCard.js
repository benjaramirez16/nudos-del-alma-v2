import Image from 'next/image';
import styles from '@/scss/components/_productCard.module.scss';

// Este componente recibirá 'props' (propiedades) para ser reutilizable.
// Le pasaremos la URL de la imagen, el nombre y el precio de cada producto.
const ProductCard = ({ imageUrl, name, price }) => {
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
        <a href="#" className={styles.card__button}>
          Ver Producto
        </a>
      </div>
    </article>
  );
};

export default ProductCard;