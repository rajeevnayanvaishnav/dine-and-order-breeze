
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Search, MapPin } from 'lucide-react';
import { BlurContainer } from '@/components/ui/BlurContainer';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    // Animation logic for initial page load
    const elements = document.querySelectorAll('.fade-in-element');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('opacity-100', 'translate-y-0');
      }, 100 * (index + 1));
    });
  }, []);

  return (
    <div className="relative overflow-hidden bg-white pb-10">
      {/* Hero background with gradient overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=2000&q=80" 
          alt="Food background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/100"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-12 pb-24 sm:pt-20 sm:pb-32">
        <div className="max-w-3xl">
          {/* Main headline */}
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 opacity-0 translate-y-6 transition-all duration-700 ease-out fade-in-element"
          >
            Restaurants and more, <br className="hidden sm:block" />
            delivered to your door
          </h1>
          
          {/* Address search bar */}
          <div className="bg-white rounded-full shadow-lg p-1 sm:p-2 flex items-center border border-gray-200 mt-8 mb-8 opacity-0 translate-y-6 transition-all duration-700 ease-out fade-in-element">
            <div className="flex items-center flex-grow pl-4">
              <MapPin className="h-5 w-5 text-[#FF3008] mr-2" />
              <input 
                type="text" 
                placeholder="Enter delivery address" 
                className="w-full py-2 outline-none text-gray-700"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <Link to={address ? "/restaurants" : "#"} className="ml-2">
              <Button className="rounded-full px-6 h-12 bg-[#FF3008] hover:bg-[#E42B07]">
                <span className="hidden sm:inline">Find Restaurants</span>
                <span className="sm:hidden">Find Food</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          {/* Sign-in prompt */}
          <p className="text-gray-600 text-lg opacity-0 translate-y-6 transition-all duration-700 ease-out fade-in-element">
            <Link to="/login" className="text-[#FF3008] hover:underline">Sign in</Link> for your recent addresses
          </p>
        </div>
      </div>
      
      {/* Decorative food images */}
      <div className="hidden md:block absolute right-0 top-20 w-[40%] h-[70%] opacity-0 translate-y-6 transition-all duration-700 delay-300 ease-out fade-in-element">
        <div className="relative w-full h-full">
          <div className="absolute top-[10%] right-[20%] w-56 h-56 rounded-lg overflow-hidden shadow-xl transform rotate-6">
            <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80" alt="Burger" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-[35%] right-[40%] w-48 h-48 rounded-lg overflow-hidden shadow-xl transform -rotate-3">
            <img src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=500&q=80" alt="Pasta" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-[50%] right-[15%] w-52 h-52 rounded-lg overflow-hidden shadow-xl transform rotate-12">
            <img src="https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&w=500&q=80" alt="Sushi" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
