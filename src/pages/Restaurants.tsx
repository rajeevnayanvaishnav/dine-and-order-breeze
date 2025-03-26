
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Search, Star, MapPin, ArrowRight } from 'lucide-react';

// Mock restaurant data
const allRestaurants = [
  {
    id: 1,
    name: 'The Gourmet Kitchen',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    cuisine: 'Contemporary',
    location: 'Downtown',
    rating: 4.8,
    priceLevel: '$$'
  },
  {
    id: 2,
    name: 'Savor & Spice',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9',
    cuisine: 'Asian Fusion',
    location: 'East Side',
    rating: 4.7,
    priceLevel: '$$$'
  },
  {
    id: 3,
    name: 'Crisp & Fresh',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2',
    cuisine: 'Salads & Healthy',
    location: 'West End',
    rating: 4.6,
    priceLevel: '$$'
  },
  {
    id: 4,
    name: 'Pasta Paradise',
    image: 'https://images.unsplash.com/photo-1481931098730-318b6f776db0',
    cuisine: 'Italian',
    location: 'North District',
    rating: 4.5,
    priceLevel: '$$'
  },
  {
    id: 5,
    name: 'Burger Boutique',
    image: 'https://images.unsplash.com/photo-1512152272829-e3139592d56f',
    cuisine: 'American',
    location: 'South Square',
    rating: 4.4,
    priceLevel: '$'
  },
  {
    id: 6,
    name: 'Sushi Supreme',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754',
    cuisine: 'Japanese',
    location: 'Harbor View',
    rating: 4.9,
    priceLevel: '$$$'
  }
];

// Filter options
const cuisines = ['All', 'Contemporary', 'Asian Fusion', 'Salads & Healthy', 'Italian', 'American', 'Japanese'];
const locations = ['All', 'Downtown', 'East Side', 'West End', 'North District', 'South Square', 'Harbor View'];
const priceLevels = ['All', '$', '$$', '$$$'];

const Restaurants = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedPriceLevel, setSelectedPriceLevel] = useState('All');
  const [filteredRestaurants, setFilteredRestaurants] = useState(allRestaurants);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter restaurants based on search term and selected filters
    const filtered = allRestaurants.filter((restaurant) => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCuisine = selectedCuisine === 'All' || restaurant.cuisine === selectedCuisine;
      const matchesLocation = selectedLocation === 'All' || restaurant.location === selectedLocation;
      const matchesPriceLevel = selectedPriceLevel === 'All' || restaurant.priceLevel === selectedPriceLevel;
      
      return matchesSearch && matchesCuisine && matchesLocation && matchesPriceLevel;
    });
    
    setFilteredRestaurants(filtered);
  }, [searchTerm, selectedCuisine, selectedLocation, selectedPriceLevel]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="bg-gradient-to-b from-sky-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">Discover Restaurants</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Find the perfect restaurant to satisfy your cravings
              </p>
            </div>
            
            <div className="mt-10 max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search restaurants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10 py-3"
                />
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700 mb-1">
                    Cuisine
                  </label>
                  <select
                    id="cuisine"
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                    className="form-input"
                  >
                    {cuisines.map((cuisine) => (
                      <option key={cuisine} value={cuisine}>
                        {cuisine}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <select
                    id="location"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="form-input"
                  >
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="priceLevel" className="block text-sm font-medium text-gray-700 mb-1">
                    Price Level
                  </label>
                  <select
                    id="priceLevel"
                    value={selectedPriceLevel}
                    onChange={(e) => setSelectedPriceLevel(e.target.value)}
                    className="form-input"
                  >
                    {priceLevels.map((priceLevel) => (
                      <option key={priceLevel} value={priceLevel}>
                        {priceLevel}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="rounded-xl overflow-hidden">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-6 bg-white border border-gray-100">
                      <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4 w-1/4"></div>
                      <div className="h-8 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRestaurants.map((restaurant) => (
                <Link 
                  key={restaurant.id}
                  to={`/restaurant/${restaurant.id}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all hover-scale"
                >
                  <div className="aspect-w-16 aspect-h-9 relative h-48 overflow-hidden">
                    <img 
                      src={`${restaurant.image}?auto=format&fit=crop&w=800&q=80`}
                      alt={restaurant.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-900 flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" /> 
                      {restaurant.rating}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div>
                      <h3 className="text-xl font-medium text-gray-900 group-hover:text-primary transition-colors">
                        {restaurant.name}
                      </h3>
                      <p className="mt-1 text-gray-600">{restaurant.cuisine}</p>
                      <div className="mt-1 flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{restaurant.location}</span>
                        <span className="mx-2">•</span>
                        <span>{restaurant.priceLevel}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <Button variant="outline" className="w-full group">
                        View Menu
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No restaurants found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Restaurants;
