
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { BlurContainer } from '@/components/ui/BlurContainer';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // These would normally be handled by IntersectionObserver for scroll
    // but for an initial mount animation this is simpler
    const animateIn = () => {
      if (titleRef.current) {
        titleRef.current.style.opacity = '1';
        titleRef.current.style.transform = 'translateY(0)';
      }
      
      setTimeout(() => {
        if (subtitleRef.current) {
          subtitleRef.current.style.opacity = '1';
          subtitleRef.current.style.transform = 'translateY(0)';
        }
      }, 200);
      
      setTimeout(() => {
        if (ctaRef.current) {
          ctaRef.current.style.opacity = '1';
          ctaRef.current.style.transform = 'translateY(0)';
        }
      }, 400);
      
      setTimeout(() => {
        if (imageRef.current) {
          imageRef.current.style.opacity = '1';
          imageRef.current.style.transform = 'translateY(0)';
        }
      }, 600);
    };
    
    // Run animation after component mounts
    const timer = setTimeout(animateIn, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={heroRef} className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-white to-gray-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,48,8,0.08),transparent)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h1 
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-gray-900 opacity-0 transform translate-y-6 transition-all duration-700 ease-out-expo"
            >
              Delicious food <span className="text-[#FF3008]">delivered</span> to your door
            </h1>
            
            <p 
              ref={subtitleRef}
              className="mt-6 text-xl text-gray-600 max-w-lg opacity-0 transform translate-y-6 transition-all duration-700 delay-100 ease-out-expo"
            >
              Order from your favorite restaurants with a premium experience focused on simplicity, beauty, and functionality.
            </p>
            
            <div 
              ref={ctaRef}
              className="mt-10 flex flex-wrap gap-4 opacity-0 transform translate-y-6 transition-all duration-700 delay-200 ease-out-expo"
            >
              <Link to="/restaurants">
                <Button className="h-12 px-8 text-base bg-[#FF3008] hover:bg-[#E42B07]">
                  Browse Restaurants
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              
              <Link to="/register">
                <Button variant="outline" className="h-12 px-8 text-base border-[#FF3008] text-[#FF3008] hover:bg-[#FF3008]/10">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
          
          <div 
            ref={imageRef}
            className="relative h-[420px] opacity-0 transform translate-y-10 transition-all duration-700 delay-300 ease-out-expo"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Decorative circles */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-[#FF3008]/5 animate-pulse-soft"></div>
                <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-[#FF3008]/5 animate-pulse-soft animation-delay-1000"></div>
                
                {/* Main image container */}
                <BlurContainer className="w-full h-full overflow-hidden">
                  <div className="relative p-6 h-full flex flex-col items-center justify-center">
                    <div className="text-center mb-4">
                      <span className="inline-block px-3 py-1 bg-[#FF3008]/10 rounded-full text-[#FF3008] text-sm font-medium mb-2">Premium Experience</span>
                      <h3 className="text-2xl font-medium text-gray-900">Delightful Ordering</h3>
                    </div>
                    
                    {/* Food images */}
                    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                      <div className="bg-gray-100 rounded-xl h-32 overflow-hidden shadow-md animate-float">
                        <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&q=80" alt="Pizza" className="w-full h-full object-cover" />
                      </div>
                      <div className="bg-gray-100 rounded-xl h-32 overflow-hidden shadow-md animate-float animation-delay-500">
                        <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80" alt="Burger" className="w-full h-full object-cover" />
                      </div>
                      <div className="bg-gray-100 rounded-xl h-32 overflow-hidden shadow-md animate-float animation-delay-1000">
                        <img src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=300&q=80" alt="Pasta" className="w-full h-full object-cover" />
                      </div>
                      <div className="bg-gray-100 rounded-xl h-32 overflow-hidden shadow-md animate-float animation-delay-1500">
                        <img src="https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&w=300&q=80" alt="Sushi" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </BlurContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
