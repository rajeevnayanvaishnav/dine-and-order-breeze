
import { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { RestaurantPreview } from '@/components/home/RestaurantPreview';

const Index = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <RestaurantPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
