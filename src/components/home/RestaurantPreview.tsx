
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Clock, MapPin } from 'lucide-react';
import { BlurContainer } from '@/components/ui/BlurContainer';

// Mock restaurant data
const popularRestaurants = [
  {
    id: 1,
    name: 'The Gourmet Kitchen',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    cuisine: 'Contemporary',
    rating: 4.8,
    deliveryTime: '30-40 min',
    location: 'Downtown'
  },
  {
    id: 2,
    name: 'Savor & Spice',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9',
    cuisine: 'Asian Fusion',
    rating: 4.7,
    deliveryTime: '25-35 min',
    location: 'East Side'
  },
  {
    id: 3,
    name: 'Crisp & Fresh',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2',
    cuisine: 'Salads & Healthy',
    rating: 4.6,
    deliveryTime: '15-25 min',
    location: 'West End'
  }
];

export function RestaurantPreview() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 
              className={`text-3xl md:text-4xl font-bold text-gray-900 transition-all duration-700 delay-100 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Featured Restaurants
            </h2>
            <p 
              className={`mt-4 text-xl text-gray-600 max-w-2xl transition-all duration-700 delay-200 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Discover our selection of premium dining establishments.
            </p>
          </div>
          
          <Link 
            to="/restaurants"
            className={`mt-6 md:mt-0 transition-all duration-700 delay-300 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Button variant="outline" className="group border-[#FF3008] text-[#FF3008] hover:bg-[#FF3008]/10">
              View All Restaurants
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularRestaurants.map((restaurant, index) => (
            <Link 
              key={restaurant.id}
              to={`/restaurant/${restaurant.id}`}
              className={`group transition-all duration-700 delay-${
                400 + index * 100
              } ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <BlurContainer className="overflow-hidden hover:shadow-md transition-all hover-scale h-full">
                <div className="aspect-w-16 aspect-h-9 relative h-48 overflow-hidden">
                  <img 
                    src={`${restaurant.image}?auto=format&fit=crop&w=800&q=80`}
                    alt={restaurant.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-900 flex items-center">
                    <Star className="h-4 w-4 text-[#FF3008] fill-[#FF3008] mr-1" />
                    <span>{restaurant.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#FF3008] transition-colors">
                        {restaurant.name}
                      </h3>
                      <p className="mt-1 text-gray-600">{restaurant.cuisine}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{restaurant.location}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-[#FF3008]/10 px-3 py-1 text-sm font-medium text-[#FF3008]">
                      Featured
                    </span>
                    
                    <span className="text-sm text-gray-600 group-hover:text-[#FF3008] transition-colors flex items-center">
                      View Menu
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </BlurContainer>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
