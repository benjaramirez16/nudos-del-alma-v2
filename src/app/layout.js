import { Cormorant_Garamond, Lato } from 'next/font/google'; // 1. Nuevas fuentes importadas
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/scss/style.scss';

// 2. Configuración de las nuevas fuentes
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-primary', // Asignada a la variable de los títulos
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-secondary', // Asignada a la variable de los párrafos
});

export const metadata = {
  title: 'Nudos Del Alma',
  description: 'Artesanía en macramé y tejido hecho con pasión.',
};

export default function RootLayout({ children }) {
  // 3. Aplicación de las nuevas clases de fuente al body
  return (
    <html lang="es">
      <body className={`${cormorant.variable} ${lato.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}