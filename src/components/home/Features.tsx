
import { useRef, useEffect, useState } from 'react';
import { Search, ShoppingBag, Clock, Star } from 'lucide-react';
import { BlurContainer } from '@/components/ui/BlurContainer';

const features = [
  {
    icon: Search,
    title: 'Find Restaurants',
    description: 'Browse through a curated list of the finest restaurants in your area.'
  },
  {
    icon: ShoppingBag,
    title: 'Order with Ease',
    description: 'Select your favorite dishes and customize them to your preferences.'
  },
  {
    icon: Clock,
    title: 'Real-time Tracking',
    description: 'Monitor the status of your order from preparation to delivery.'
  },
  {
    icon: Star,
    title: 'Rate Your Experience',
    description: 'Share your feedback and help others discover great food.'
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
            className={`text-3xl md:text-4xl font-bold text-gray-900 transition-all duration-700 delay-100 ${
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
            <BlurContainer 
              key={feature.title}
              className={`p-6 hover:shadow-md transition-all hover-scale transition-all duration-700 delay-${
                300 + index * 100
              } ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="h-12 w-12 rounded-lg bg-[#FF3008]/10 flex items-center justify-center mb-5">
                <feature.icon className="h-6 w-6 text-[#FF3008]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </BlurContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
