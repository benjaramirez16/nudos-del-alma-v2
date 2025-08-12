import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import AboutTeaser from '@/components/AboutTeaser';
import FeaturedProducts from '@/components/FeaturedProducts';

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