
import { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { RestaurantPreview } from '@/components/home/RestaurantPreview';
import { BlurContainer } from '@/components/ui/BlurContainer';

const Index = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <BlurContainer className="max-w-7xl mx-auto my-12 p-3">
          <RestaurantPreview />
        </BlurContainer>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
