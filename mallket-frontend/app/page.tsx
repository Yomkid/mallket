import Header from '@/components/header/Header';
import Hero from '@/components/Hero';
import FeaturedCategories from '@/components/FeaturedCategories';
import FlashSales from '@/components/FlashSales';
import Footer from '@/components/Footer';
import BestSellingProducts from '@/components/BestSelling';
import FeaturedProducts from '@/components/FeaturedProducts';
import SpecialOffers from '@/components/SpecialOffers';
import BrandsShowcase from '@/components/BrandShowcase';
import MallKetAboutSection from '@/components/AboutStore';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedCategories />
      <FlashSales />
      <BestSellingProducts />
      <FeaturedProducts />
      <SpecialOffers />
      <BrandsShowcase />
      <MallKetAboutSection />
      <Footer />
    </main>
  );
}