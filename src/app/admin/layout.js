import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';
import { getJwtSecretKey } from '@/lib/auth';

// Función para verificar el token en el servidor
async function verifyAuth() {
  const token = cookies().get('user-token')?.value;

  // Si no hay token, redirigimos a login
  if (!token) {
    redirect('/login');
  }

  // Si hay token, intentamos verificarlo
  try {
    await jwtVerify(token, getJwtSecretKey());
    // Si el token es válido, no hacemos nada y permitimos el acceso.
  } catch (error) {
    console.error("Token de JWT inválido:", error);
    // Si el token no es válido, redirigimos a login
    redirect('/login');
  }
}

export default async function AdminLayout({ children }) {
  // La magia está aquí: esta función se ejecuta ANTES de renderizar la página.
  await verifyAuth();

  return (
    <>
      {/* Aquí podríamos poner un header o nav específico para el admin en el futuro */}
      {children}
    </>
  );
}