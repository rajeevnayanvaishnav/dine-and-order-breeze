
import { useRef, useEffect, useState } from 'react';
import { ShoppingBag, Clock, Star, Award, Utensils, Coffee } from 'lucide-react';
import { BlurContainer } from '@/components/ui/BlurContainer';

// Updated to match the categories section on doordash.com
const categories = [
  {
    icon: ShoppingBag,
    title: 'Pickup',
    description: 'Save time and money - skip the delivery fees',
    image: 'https://images.unsplash.com/photo-1484659619207-9165d119dafe?auto=format&fit=crop&w=300&q=80'
  },
  {
    icon: Coffee,
    title: 'Breakfast',
    description: 'Start your day with a delicious morning meal',
    image: 'https://images.unsplash.com/photo-1533089860892-a9b9ac34e9e9?auto=format&fit=crop&w=300&q=80'
  },
  {
    icon: Utensils,
    title: 'Dinner',
    description: 'Order in for the perfect evening meal',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=300&q=80'
  },
  {
    icon: Award,
    title: 'Top Rated',
    description: 'Highest-rated restaurants in your area',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80'
  }
];

export function Features() {
  const [isInView, setIsInView] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  
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
    
    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 bg-white" ref={featuresRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 
            className={`text-3xl font-bold text-gray-900 transition-all duration-700 delay-100 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Find what you're craving
          </h2>
          <p 
            className={`mt-3 text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-700 delay-200 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Explore top restaurants and local favorites
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <div 
              key={category.title}
              className={`group cursor-pointer transition-all duration-700 delay-${
                300 + index * 100
              } ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="rounded-xl overflow-hidden relative aspect-square shadow-sm hover:shadow-md transition-all">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg md:text-xl font-bold">{category.title}</h3>
                  <p className="text-sm text-white/90 mt-1 line-clamp-2">{category.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`rounded-xl bg-gray-50 p-6 hover:shadow-md transition-all ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Clock className="h-12 w-12 text-[#FF3008] mb-4" />
            <h3 className="text-xl font-bold mb-3">Every Flavor Welcome</h3>
            <p className="text-gray-600">From your neighborhood sushi spot to the burger place you've been wanting to try, choose from over 300,000 local and national favorites.</p>
          </div>
          
          <div className={`rounded-xl bg-gray-50 p-6 hover:shadow-md transition-all delay-100 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <ShoppingBag className="h-12 w-12 text-[#FF3008] mb-4" />
            <h3 className="text-xl font-bold mb-3">Easy Ordering</h3>
            <p className="text-gray-600">Browse menus, read reviews, and order with a simple tap. Save your favorite items and places for faster checkout.</p>
          </div>
          
          <div className={`rounded-xl bg-gray-50 p-6 hover:shadow-md transition-all delay-200 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Star className="h-12 w-12 text-[#FF3008] mb-4" />
            <h3 className="text-xl font-bold mb-3">Delivery You Can Count On</h3>
            <p className="text-gray-600">Real-time tracking lets you know exactly when your order will arrive. Get your food faster with priority delivery.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
