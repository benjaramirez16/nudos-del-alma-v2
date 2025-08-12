'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/scss/pages/_login.module.scss';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Hook para redirigir al usuario

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Hacemos la llamada a nuestra API de login
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        // Si el login es exitoso, redirigimos al panel de administrador
        router.push('/admin/dashboard');
      } else {
        // Si falla, mostramos el error
        setError(data.error || 'Algo salió mal.');
      }
    } catch (err) {
      setError('No se pudo conectar al servidor.');
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Acceso de Administrador</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>Ingresar</button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;