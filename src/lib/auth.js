// src/lib/auth.js

/**
 * Esta función toma nuestra clave secreta del archivo .env y la codifica
 * en un formato que la librería 'jose' puede entender.
 */
export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('La variable de entorno JWT_SECRET no está definida.');
  }
  return new TextEncoder().encode(secret);
}