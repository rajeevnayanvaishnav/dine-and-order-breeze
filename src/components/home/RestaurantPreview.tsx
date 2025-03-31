
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Clock, MapPin, Heart, DollarSign } from 'lucide-react';
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
    location: 'Downtown',
    price: '$$',
    featured: true
  },
  {
    id: 2,
    name: 'Savor & Spice',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9',
    cuisine: 'Asian Fusion',
    rating: 4.7,
    deliveryTime: '25-35 min',
    location: 'East Side',
    price: '$$$',
    featured: true
  },
  {
    id: 3,
    name: 'Crisp & Fresh',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2',
    cuisine: 'Salads & Healthy',
    rating: 4.6,
    deliveryTime: '15-25 min',
    location: 'West End',
    price: '$$',
    featured: false
  },
  {
    id: 4,
    name: 'Pasta Paradise',
    image: 'https://images.unsplash.com/photo-1481931098730-318b6f776db0',
    cuisine: 'Italian',
    rating: 4.5,
    deliveryTime: '35-50 min',
    location: 'North District',
    price: '$$',
    featured: true
  },
  {
    id: 5,
    name: 'Burger Boutique',
    image: 'https://images.unsplash.com/photo-1512152272829-e3139592d56f',
    cuisine: 'American',
    rating: 4.4,
    deliveryTime: '20-35 min',
    location: 'South Square',
    price: '$',
    featured: false
  },
  {
    id: 6,
    name: 'Sushi Supreme',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754',
    cuisine: 'Japanese',
    rating: 4.9,
    deliveryTime: '40-55 min',
    location: 'Harbor View',
    price: '$$$',
    featured: true
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
      className="py-16 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <h2 
              className={`text-3xl font-bold text-gray-900 transition-all duration-700 delay-100 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Local favorites
            </h2>
            <p 
              className={`mt-3 text-xl text-gray-600 max-w-2xl transition-all duration-700 delay-200 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              The best restaurants in your area, ready to serve
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
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
              <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={`${restaurant.image}?auto=format&fit=crop&w=800&q=80`}
                    alt={restaurant.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:text-[#FF3008] transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                  
                  {restaurant.featured && (
                    <div className="absolute top-4 left-4 bg-[#FF3008] text-white text-xs font-medium py-1 px-2 rounded-md">
                      Popular
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#FF3008] transition-colors">
                        {restaurant.name}
                      </h3>
                      <p className="mt-1 text-gray-600">{restaurant.cuisine}</p>
                    </div>
                    <div className="flex items-center bg-[#F6F6F6] px-2 py-1 rounded">
                      <Star className="h-4 w-4 text-[#FF3008] fill-[#FF3008] mr-1" />
                      <span className="font-medium">{restaurant.rating}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>{restaurant.price}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{restaurant.location}</span>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-[#FF3008] font-medium">Free delivery</span>
                      
                      <span className="text-sm text-gray-700 group-hover:text-[#FF3008] transition-colors flex items-center">
                        Order Now
                        <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Become a Dasher</h2>
          <p className="max-w-2xl mx-auto text-gray-600 mb-6">
            As a delivery driver, you'll make reliable money—working anytime, anywhere.
          </p>
          <Button className="bg-[#FF3008] hover:bg-[#E42B07]">Start Earning</Button>
        </div>
      </div>
    </section>
  );
}
