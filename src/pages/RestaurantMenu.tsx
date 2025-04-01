
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Star, MapPin, Clock, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from "sonner";

// Mock restaurant data
const restaurants = [
  {
    id: 1,
    name: 'The Gourmet Kitchen',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    banner: 'https://images.unsplash.com/photo-1514516345957-556ca7c90a40',
    cuisine: 'Contemporary',
    location: 'Downtown',
    rating: 4.8,
    priceLevel: '$$',
    deliveryTime: '25-35 min',
    description: 'Experience fine dining with our creative dishes made from locally-sourced ingredients. Our chefs blend traditional techniques with modern innovations.',
    categories: [
      {
        id: 101,
        name: 'Appetizers',
        items: [
          {
            id: 1001,
            name: 'Truffle Fries',
            description: 'Hand-cut fries tossed with truffle oil, parmesan, and herbs',
            price: 8.99,
            image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877'
          },
          {
            id: 1002,
            name: 'Bruschetta',
            description: 'Grilled bread rubbed with garlic, topped with diced tomatoes, fresh basil, and olive oil',
            price: 7.99,
            image: 'https://images.unsplash.com/photo-1572695157366-5e585ab80031'
          }
        ]
      },
      {
        id: 102,
        name: 'Main Courses',
        items: [
          {
            id: 1003,
            name: 'Pan-Seared Salmon',
            description: 'Fresh salmon with a lemon butter sauce, served with seasonal vegetables',
            price: 21.99,
            image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2'
          },
          {
            id: 1004,
            name: 'Filet Mignon',
            description: '8oz grass-fed beef tenderloin, with red wine reduction and truffle mashed potatoes',
            price: 29.99,
            image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Savor & Spice',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9',
    banner: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
    cuisine: 'Asian Fusion',
    location: 'East Side',
    rating: 4.7,
    priceLevel: '$$$',
    deliveryTime: '30-40 min',
    description: 'A bold fusion of flavors from across Asia, with a modern twist. Our menu features spicy, sweet, and savory dishes that will take your taste buds on a journey.',
    categories: [
      {
        id: 201,
        name: 'Starters',
        items: [
          {
            id: 2001,
            name: 'Spring Rolls',
            description: 'Crispy rolls filled with vegetables, served with sweet chili sauce',
            price: 6.99,
            image: 'https://images.unsplash.com/photo-1584527368439-8a638db04983'
          },
          {
            id: 2002,
            name: 'Chicken Satay',
            description: 'Grilled chicken skewers with peanut sauce',
            price: 9.99,
            image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2'
          }
        ]
      },
      {
        id: 202,
        name: 'Main Dishes',
        items: [
          {
            id: 2003,
            name: 'Pad Thai',
            description: 'Stir-fried rice noodles with egg, tofu, bean sprouts, and peanuts',
            price: 14.99,
            image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641'
          },
          {
            id: 2004,
            name: 'Red Curry',
            description: 'Spicy curry with coconut milk, bamboo shoots, and your choice of protein',
            price: 16.99,
            image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Crisp & Fresh',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2',
    banner: 'https://images.unsplash.com/photo-1498654200943-1088dd4438ae',
    cuisine: 'Salads & Healthy',
    location: 'West End',
    rating: 4.6,
    priceLevel: '$$',
    deliveryTime: '15-25 min',
    description: 'Fresh, healthy options for the health-conscious food lover. We use organic produce and sustainably sourced proteins in all our dishes.',
    categories: [
      {
        id: 301,
        name: 'Salads',
        items: [
          {
            id: 3001,
            name: 'Quinoa Bowl',
            description: 'Mixed greens, quinoa, avocado, chickpeas, and tahini dressing',
            price: 12.99,
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'
          },
          {
            id: 3002,
            name: 'Cobb Salad',
            description: 'Romaine lettuce, grilled chicken, bacon, avocado, blue cheese, and ranch dressing',
            price: 13.99,
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd'
          }
        ]
      },
      {
        id: 302,
        name: 'Smoothies',
        items: [
          {
            id: 3003,
            name: 'Green Machine',
            description: 'Spinach, kale, apple, banana, and ginger',
            price: 7.99,
            image: 'https://images.unsplash.com/photo-1622597467836-f3e6707e1536'
          },
          {
            id: 3004,
            name: 'Berry Blast',
            description: 'Mixed berries, banana, almond milk, and protein powder',
            price: 8.99,
            image: 'https://images.unsplash.com/photo-1553530979-7ee52a2670c4'
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: 'Pasta Paradise',
    image: 'https://images.unsplash.com/photo-1481931098730-318b6f776db0',
    banner: 'https://images.unsplash.com/photo-1629116155918-0677bc81db62',
    cuisine: 'Italian',
    location: 'North District',
    rating: 4.5,
    priceLevel: '$$',
    deliveryTime: '25-35 min',
    description: 'Authentic Italian pasta dishes made with traditional recipes and the freshest ingredients. Our homemade pasta is prepared daily.',
    categories: [
      {
        id: 401,
        name: 'Pasta',
        items: [
          {
            id: 4001,
            name: 'Spaghetti Carbonara',
            description: 'Spaghetti with pancetta, egg, pecorino cheese, and black pepper',
            price: 15.99,
            image: 'https://images.unsplash.com/photo-1588013273468-315fd88ea34c'
          },
          {
            id: 4002,
            name: 'Fettuccine Alfredo',
            description: 'Fettuccine pasta in a creamy parmesan sauce',
            price: 14.99,
            image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023882c'
          }
        ]
      },
      {
        id: 402,
        name: 'Pizza',
        items: [
          {
            id: 4003,
            name: 'Margherita Pizza',
            description: 'Classic pizza with tomato sauce, mozzarella, and basil',
            price: 13.99,
            image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca'
          },
          {
            id: 4004,
            name: 'Quattro Formaggi',
            description: 'Four cheese pizza with mozzarella, gorgonzola, fontina, and parmesan',
            price: 16.99,
            image: 'https://images.unsplash.com/photo-1595854341625-f33e218bd2ba'
          }
        ]
      }
    ]
  },
  {
    id: 5,
    name: 'Burger Boutique',
    image: 'https://images.unsplash.com/photo-1512152272829-e3139592d56f',
    banner: 'https://images.unsplash.com/photo-1561758033-7e924f619b47',
    cuisine: 'American',
    location: 'South Square',
    rating: 4.4,
    priceLevel: '$',
    deliveryTime: '20-30 min',
    description: 'Gourmet burgers made with premium beef and creative toppings. Each burger is crafted to perfection and served with our signature seasoned fries.',
    categories: [
      {
        id: 501,
        name: 'Signature Burgers',
        items: [
          {
            id: 5001,
            name: 'Classic Cheeseburger',
            description: 'Beef patty, cheddar cheese, lettuce, tomato, and special sauce',
            price: 10.99,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'
          },
          {
            id: 5002,
            name: 'Mushroom Swiss Burger',
            description: 'Beef patty with sautéed mushrooms, swiss cheese, and garlic aioli',
            price: 12.99,
            image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add'
          }
        ]
      },
      {
        id: 502,
        name: 'Sides',
        items: [
          {
            id: 5003,
            name: 'Loaded Fries',
            description: 'Seasoned fries topped with cheese, bacon, and green onions',
            price: 6.99,
            image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713'
          },
          {
            id: 5004,
            name: 'Onion Rings',
            description: 'Beer-battered onion rings with spicy dipping sauce',
            price: 5.99,
            image: 'https://images.unsplash.com/photo-1613564210246-18274616d9fe'
          }
        ]
      }
    ]
  },
  {
    id: 6,
    name: 'Sushi Supreme',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754',
    banner: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
    cuisine: 'Japanese',
    location: 'Harbor View',
    rating: 4.9,
    priceLevel: '$$$',
    deliveryTime: '35-45 min',
    description: 'Premium sushi and Japanese dishes prepared by master chefs. We use only the freshest fish and authentic ingredients to create a memorable dining experience.',
    categories: [
      {
        id: 601,
        name: 'Sushi Rolls',
        items: [
          {
            id: 6001,
            name: 'California Roll',
            description: 'Crab, avocado, and cucumber roll with tobiko',
            price: 9.99,
            image: 'https://images.unsplash.com/photo-1561666737-937f45a643a8'
          },
          {
            id: 6002,
            name: 'Spicy Tuna Roll',
            description: 'Fresh tuna with spicy mayo and cucumber',
            price: 11.99,
            image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252'
          }
        ]
      },
      {
        id: 602,
        name: 'Nigiri & Sashimi',
        items: [
          {
            id: 6003,
            name: 'Salmon Nigiri (2pc)',
            description: 'Fresh salmon over seasoned rice',
            price: 8.99,
            image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa'
          },
          {
            id: 6004,
            name: 'Tuna Sashimi',
            description: 'Thinly sliced fresh tuna with wasabi and soy sauce',
            price: 12.99,
            image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351'
          }
        ]
      }
    ]
  }
];

const RestaurantMenu = () => {
  const { id } = useParams<{ id: string }>();
  const { toast: shadcnToast } = useToast();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const { items: cartItems, addItem, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
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
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      restaurantId: Number(id)
    });
    
    toast("Added to cart", {
      description: `${item.name} has been added to your cart`,
      duration: 3000,
    });
  };

  const handleRemoveFromCart = (itemId: number) => {
    const item = cartItems.find(item => item.id === itemId);
    
    if (item && item.quantity > 1) {
      updateQuantity(itemId, item.quantity - 1);
    } else {
      removeItem(itemId);
    }
  };

  const scrollToCategory = (categoryId: number) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const getItemQuantityInCart = (itemId: number) => {
    const item = cartItems.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };

  // Add console logs for debugging
  useEffect(() => {
    console.log("Restaurant data:", restaurant);
    console.log("Cart items in RestaurantMenu:", cartItems);
  }, [restaurant, cartItems]);

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
                            <span>${totalPrice.toFixed(2)}</span>
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
        
        {cartItems.length > 0 && (
          <div className="fixed bottom-6 left-0 right-0 px-4 md:hidden">
            <Link to="/cart">
              <Button className="w-full h-14 shadow-lg flex items-center justify-between">
                <div className="flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  <span>{totalItems} items</span>
                </div>
                <span>${totalPrice.toFixed(2)}</span>
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
