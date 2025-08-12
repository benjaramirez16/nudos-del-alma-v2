import styles from '@/scss/pages/_dashboard.module.scss';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Panel de Administrador</h1>
        <p>Bienvenido, Benjamín. Desde aquí gestionarás Nudos del Alma.</p>
      </header>
      <nav className={styles.nav}>
        <Link href="/admin/products" className={styles.navLink}>
          Gestionar Productos
        </Link>
        <Link href="#" className={styles.navLinkDisabled}>
          Ver Pedidos (Próximamente)
        </Link>
        <Link href="#" className={styles.navLinkDisabled}>
          Ajustes del Sitio (Próximamente)
        </Link>
      </nav>
    </div>
  );
}