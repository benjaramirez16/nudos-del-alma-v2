/** @type {import('next').NextConfig} */
const nextConfig = {
  // AÑADIMOS ESTA NUEVA CONFIGURACIÓN DE IMÁGENES
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;