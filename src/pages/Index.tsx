
import { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { RestaurantPreview } from '@/components/home/RestaurantPreview';
import { BlurContainer } from '@/components/ui/BlurContainer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Add global CSS for fade-in elements
    const style = document.createElement('style');
    style.innerHTML = `
      .fade-in-element {
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.7s ease-out, transform 0.7s ease-out;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        
        {/* Promo section - Based on DoorDash promos */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Try DoorDash for less</h2>
                <p className="text-gray-700 mb-6 text-lg">
                  Get free delivery on your first order, plus exclusive deals and rewards when you become a member.
                </p>
                <Link to="/register">
                  <Button className="bg-[#FF3008] hover:bg-[#E42B07] text-white px-8 py-6 text-lg h-auto">
                    Sign up for free
                  </Button>
                </Link>
              </div>
              <div className="rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=80" 
                  alt="Delicious food" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        <RestaurantPreview />
        
        {/* App download section */}
        <section className="bg-white py-16 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" 
                  alt="Mobile app" 
                  className="w-2/3 md:w-auto max-h-[500px] rounded-xl shadow-xl"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-bold mb-4">Download the App</h2>
                <p className="text-gray-700 mb-6 text-lg">
                  Order food and track delivery in real-time. Available on iOS and Android devices.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                    <img src="https://placehold.co/24x24" alt="Apple logo" className="mr-2" />
                    App Store
                  </Button>
                  <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                    <img src="https://placehold.co/24x24" alt="Google logo" className="mr-2" />
                    Google Play
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
