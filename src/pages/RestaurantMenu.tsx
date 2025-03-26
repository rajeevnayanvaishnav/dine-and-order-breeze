import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Star, MapPin, Clock, Plus, Minus, ShoppingCart } from 'lucide-react';

// Mock restaurant data
const restaurants = [
  {
    id: 1,
    name: 'The Gourmet Kitchen',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    banner: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3',
    cuisine: 'Contemporary',
    location: 'Downtown',
    rating: 4.8,
    priceLevel: '$$',
    deliveryTime: '30-45 min',
    description: 'Experience fine dining with our contemporary cuisine prepared by expert chefs using fresh, locally-sourced ingredients.',
    categories: [
      {
        id: 1,
        name: 'Starters',
        items: [
          {
            id: 101,
            name: 'Truffle Arancini',
            description: 'Crispy risotto balls with black truffle and mozzarella',
            price: 12.99,
            image: 'https://images.unsplash.com/photo-1535400875775-0269e7a919af'
          },
          {
            id: 102,
            name: 'Beet & Goat Cheese Salad',
            description: 'Roasted beets with whipped goat cheese and balsamic glaze',
            price: 10.99,
            image: 'https://images.unsplash.com/photo-1510981034810-54af0836fc49'
          }
        ]
      },
      {
        id: 2,
        name: 'Main Courses',
        items: [
          {
            id: 201,
            name: 'Pan-Seared Salmon',
            description: 'Wild-caught salmon with lemon herb sauce and seasonal vegetables',
            price: 24.99,
            image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2'
          },
          {
            id: 202,
            name: 'Braised Short Rib',
            description: 'Slow-cooked beef short rib with garlic mashed potatoes',
            price: 28.99,
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947'
          },
          {
            id: 203,
            name: 'Wild Mushroom Risotto',
            description: 'Creamy arborio rice with assorted wild mushrooms and parmesan',
            price: 22.99,
            image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371'
          }
        ]
      },
      {
        id: 3,
        name: 'Desserts',
        items: [
          {
            id: 301,
            name: 'Chocolate Soufflé',
            description: 'Warm chocolate soufflé with vanilla bean ice cream',
            price: 9.99,
            image: 'https://images.unsplash.com/photo-1583350159858-7662eda50a7f'
          },
          {
            id: 302,
            name: 'Lemon Tart',
            description: 'Tangy lemon curd in a buttery pastry shell with fresh berries',
            price: 8.99,
            image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81'
          }
        ]
      }
    ]
  },
  // Other restaurants would be defined here in a full implementation
];

const RestaurantMenu = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[]>([]);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Simulate fetching restaurant data from API
    setTimeout(() => {
      const foundRestaurant = restaurants.find(r => r.id === Number(id));
      if (foundRestaurant) {
        setRestaurant(foundRestaurant);
        setActiveCategory(foundRestaurant.categories[0].id);
      }
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleAddToCart = (item: any) => {
    setCartItems(prev => {
      // Check if item is already in cart
      const existingItemIndex = prev.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...prev];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // Item doesn't exist, add to cart
        return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
      }
    });
    
    toast({
      title: 'Added to cart',
      description: `${item.name} has been added to your cart`,
      duration: 3000,
    });
  };

  const handleRemoveFromCart = (itemId: number) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => item.id === itemId);
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...prev];
        if (updatedItems[existingItemIndex].quantity > 1) {
          // Decrease quantity
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity - 1
          };
        } else {
          // Remove item if quantity would be 0
          updatedItems.splice(existingItemIndex, 1);
        }
        return updatedItems;
      }
      
      return prev;
    });
  };

  const scrollToCategory = (categoryId: number) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      // Offset for fixed header
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const getItemQuantityInCart = (itemId: number) => {
    const item = cartItems.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded-xl mb-8"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <div className="h-12 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded mb-2 w-2/3"></div>
                  <div className="h-8 bg-gray-200 rounded mb-2 w-2/3"></div>
                  <div className="h-8 bg-gray-200 rounded mb-2 w-2/3"></div>
                </div>
                
                <div className="md:col-span-2">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="mb-8">
                      <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[...Array(2)].map((_, itemIndex) => (
                          <div key={itemIndex} className="flex gap-4">
                            <div className="h-24 w-24 bg-gray-200 rounded-lg"></div>
                            <div className="flex-1">
                              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h1 className="text-2xl font-medium text-gray-900 mb-4">Restaurant Not Found</h1>
            <p className="text-gray-600 mb-8">The restaurant you're looking for doesn't exist or has been removed.</p>
            <Link to="/restaurants">
              <Button>Back to Restaurants</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Restaurant Banner */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img 
            src={`${restaurant.banner}?auto=format&fit=crop&w=2000&q=80`}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-medium text-white mb-2">{restaurant.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <span>{restaurant.rating}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-1" />
                  <span>{restaurant.location}</span>
                </div>
                <div>
                  <span>{restaurant.cuisine}</span>
                </div>
                <div>
                  <span>{restaurant.priceLevel}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-1" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-10">
            <p className="text-lg text-gray-700">{restaurant.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Categories Sidebar */}
            <div className="md:col-span-1 order-2 md:order-1 pb-6 border-t border-gray-200 md:border-t-0">
              <div className="sticky top-24">
                <h2 className="text-xl font-medium mb-6 pt-6 md:pt-0">Menu Categories</h2>
                <nav className="space-y-2">
                  {restaurant.categories.map((category: any) => (
                    <button
                      key={category.id}
                      className={`block w-full text-left py-3 px-4 rounded-lg transition-colors ${
                        activeCategory === category.id
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => scrollToCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  ))}
                </nav>
                
                {/* Cart Summary for desktop */}
                <div className="mt-12 hidden md:block">
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Your Order
                    </h3>
                    
                    {cartItems.length > 0 ? (
                      <>
                        <div className="mb-4 space-y-3">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between">
                              <div>
                                <span className="font-medium">{item.quantity}x</span> {item.name}
                              </div>
                              <div className="text-gray-900 font-medium">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t border-gray-200 pt-4 mt-4">
                          <div className="flex items-center justify-between font-medium text-lg">
                            <span>Total</span>
                            <span>${getTotalPrice().toFixed(2)}</span>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <Link to="/cart">
                            <Button className="w-full">
                              Proceed to Checkout
                            </Button>
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-600">Your cart is empty</p>
                        <p className="text-sm text-gray-500 mt-1">Add some items to get started</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Menu Items */}
            <div className="md:col-span-2 order-1 md:order-2">
              {restaurant.categories.map((category: any) => (
                <div key={category.id} id={`category-${category.id}`} className="mb-12">
                  <h2 className="text-2xl font-medium mb-6 pb-2 border-b border-gray-200">{category.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.items.map((item: any) => (
                      <div 
                        key={item.id}
                        className="flex gap-4 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all"
                      >
                        <div className="w-24 h-24 shrink-0">
                          <img
                            src={`${item.image}?auto=format&fit=crop&w=200&h=200&q=80`}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex justify-between mb-1">
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                            <span className="text-gray-900 font-medium">${item.price.toFixed(2)}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                          
                          <div className="flex items-center">
                            {getItemQuantityInCart(item.id) > 0 ? (
                              <div className="flex items-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleRemoveFromCart(item.id)}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="mx-3 font-medium">{getItemQuantityInCart(item.id)}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleAddToCart(item)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <Button
                                onClick={() => handleAddToCart(item)}
                                size="sm"
                                className="text-xs px-3"
                              >
                                Add to Cart
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mobile Floating Cart Button */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-6 left-0 right-0 px-4 md:hidden">
            <Link to="/cart">
              <Button className="w-full h-14 shadow-lg flex items-center justify-between">
                <div className="flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  <span>{getTotalItems()} items</span>
                </div>
                <span>${getTotalPrice().toFixed(2)}</span>
              </Button>
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default RestaurantMenu;
