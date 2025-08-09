import Image from 'next/image';
import styles from '@/scss/components/_categories.module.scss';

// Datos de ejemplo para las categorías
const categoryData = [
  {
    id: 1,
    name: 'Tapices',
    imageUrl: '/images/categoria-tapiz.jpg', // Asegúrate de tener estas imágenes en public/images
  },
  {
    id: 2,
    name: 'Espejos',
    imageUrl: '/images/categoria-espejo.jpg',
  },
  {
    id: 3,
    name: 'Llaveros',
    imageUrl: '/images/categoria-llavero.jpg',
  },
];

const Categories = () => {
  return (
    <section className={styles.categories}>
      <div className={styles.categories__container}>
        {categoryData.map((category) => (
          <a href="#" key={category.id} className={styles.categoryItem}>
            <div className={styles.categoryItem__imageWrapper}>
              <Image
                src={category.imageUrl}
                alt={`Categoría de ${category.name}`}
                width={200}
                height={200}
              />
            </div>
            <h3 className={styles.categoryItem__name}>{category.name}</h3>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Categories;