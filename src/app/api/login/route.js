import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';
import { getJwtSecretKey } from '@/lib/auth';

export async function POST(request) {
  const body = await request.json();

  // 1. Verifica si la contraseña enviada coincide con la del entorno
  if (body.password === process.env.ADMIN_PASSWORD) {
    // 2. Si es correcta, crea un "pasaporte digital" (JWT)
    const token = await new SignJWT({
      // Aquí puedes añadir datos al pasaporte si quisieras
      role: 'admin',
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h') // El pase expira en 1 hora
      .sign(getJwtSecretKey());

    const response = NextResponse.json({ success: true });

    // 3. Guarda el pasaporte en una cookie segura en el navegador del usuario
    response.cookies.set({
      name: 'user-token',
      value: token,
      path: '/',
      httpOnly: true, // La cookie no es accesible desde JavaScript en el navegador
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
    });

    return response;
  }

  // 4. Si la contraseña es incorrecta, devuelve un error
  return NextResponse.json({ success: false, error: 'Contraseña incorrecta' }, { status: 401 });
}