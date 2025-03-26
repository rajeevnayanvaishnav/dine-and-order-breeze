
import { useRef, useEffect, useState } from 'react';
import { SearchIcon, ShoppingBagIcon, UserIcon, ClockIcon } from 'lucide-react';

const features = [
  {
    icon: SearchIcon,
    title: 'Find Restaurants',
    description: 'Browse through a curated list of the finest restaurants in your area.'
  },
  {
    icon: ShoppingBagIcon,
    title: 'Order with Ease',
    description: 'Select your favorite dishes and customize them to your preferences.'
  },
  {
    icon: ClockIcon,
    title: 'Real-time Tracking',
    description: 'Monitor the status of your order from preparation to delivery.'
  },
  {
    icon: UserIcon,
    title: 'Personalized Experience',
    description: 'Your preferences are remembered for a better ordering experience.'
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
    <section className="py-24 bg-white" ref={featuresRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl md:text-4xl font-medium text-gray-900 transition-all duration-700 delay-100 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            An exceptional experience at every step
          </h2>
          <p 
            className={`mt-4 text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            We've designed every aspect of the ordering process with care and attention to detail.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all hover-scale transition-all duration-700 delay-${
                300 + index * 100
              } ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
