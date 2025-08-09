import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import AboutTeaser from '@/components/AboutTeaser';
import FeaturedProducts from '@/components/FeaturedProducts'; // <-- 1. Importamos el nuevo componente

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <AboutTeaser />
      <FeaturedProducts /> 
    </main>
  );
}