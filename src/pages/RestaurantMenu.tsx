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
  {
    id: 2,
    name: 'Savor & Spice',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9',
    banner: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    cuisine: 'Asian Fusion',
    location: 'East Side',
    rating: 4.7,
    priceLevel: '$$$',
    deliveryTime: '25-40 min',
    description: 'Immerse yourself in the vibrant flavors of Asia with our innovative fusion cuisine blending traditional techniques with modern creativity.',
    categories: [
      {
        id: 1,
        name: 'Appetizers',
        items: [
          {
            id: 401,
            name: 'Spicy Tuna Roll',
            description: 'Fresh tuna with spicy mayo, cucumber, and avocado',
            price: 14.99,
            image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c'
          },
          {
            id: 402,
            name: 'Vegetable Spring Rolls',
            description: 'Crispy spring rolls with mixed vegetables and sweet chili sauce',
            price: 8.99,
            image: 'https://images.unsplash.com/photo-1559847844-5315695dadae'
          },
          {
            id: 403,
            name: 'Pork Gyoza',
            description: 'Pan-fried dumplings filled with seasoned pork and vegetables',
            price: 10.99,
            image: 'https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3'
          }
        ]
      },
      {
        id: 2,
        name: 'Main Dishes',
        items: [
          {
            id: 501,
            name: 'Pad Thai',
            description: 'Stir-fried rice noodles with egg, tofu, bean sprouts, and peanuts',
            price: 16.99,
            image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e'
          },
          {
            id: 502,
            name: 'Mango Chicken Curry',
            description: 'Tender chicken in a rich curry sauce with fresh mango and jasmine rice',
            price: 18.99,
            image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd'
          },
          {
            id: 503,
            name: 'Korean BBQ Beef Bowl',
            description: 'Marinated beef with kimchi, pickled vegetables and fried egg over rice',
            price: 20.99,
            image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733'
          }
        ]
      },
      {
        id: 3,
        name: 'Desserts',
        items: [
          {
            id: 601,
            name: 'Mochi Ice Cream',
            description: 'Assorted flavors of ice cream wrapped in sweet rice dough',
            price: 7.99,
            image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb'
          },
          {
            id: 602,
            name: 'Mango Sticky Rice',
            description: 'Sweet sticky rice with fresh mango and coconut cream',
            price: 8.99,
            image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Crisp & Fresh',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2',
    banner: 'https://images.unsplash.com/photo-1557499305-87bd9783b7c6',
    cuisine: 'Salads & Healthy',
    location: 'West End',
    rating: 4.6,
    priceLevel: '$$',
    deliveryTime: '15-30 min',
    description: 'Dedicated to fresh, organic ingredients and nutritionally balanced meals that taste as good as they make you feel.',
    categories: [
      {
        id: 1,
        name: 'Signature Salads',
        items: [
          {
            id: 701,
            name: 'Super Green Goddess',
            description: 'Kale, spinach, avocado, cucumber, broccoli, and pumpkin seeds with lemon tahini dressing',
            price: 12.99,
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd'
          },
          {
            id: 702,
            name: 'Mediterranean Bowl',
            description: 'Mixed greens, cherry tomatoes, cucumber, red onion, olives, feta cheese with olive oil dressing',
            price: 13.99,
            image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af'
          },
          {
            id: 703,
            name: 'Protein Power',
            description: 'Quinoa, grilled chicken, black beans, corn, bell peppers with chipotle lime dressing',
            price: 15.99,
            image: 'https://images.unsplash.com/photo-1580013759032-c96505e24c1f'
          }
        ]
      },
      {
        id: 2,
        name: 'Smoothie Bowls',
        items: [
          {
            id: 801,
            name: 'Acai Berry Blast',
            description: 'Acai berries, banana, almond milk topped with granola, coconut flakes, and fresh berries',
            price: 10.99,
            image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2'
          },
          {
            id: 802,
            name: 'Tropical Paradise',
            description: 'Mango, pineapple, banana, coconut milk topped with chia seeds and tropical fruits',
            price: 11.99,
            image: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305'
          }
        ]
      },
      {
        id: 3,
        name: 'Fresh Juices',
        items: [
          {
            id: 901,
            name: 'Green Detox',
            description: 'Cucumber, celery, spinach, green apple, lemon, and ginger',
            price: 7.99,
            image: 'https://images.unsplash.com/photo-1582198802352-0584d1fd7d20'
          },
          {
            id: 902,
            name: 'Immunity Booster',
            description: 'Carrot, orange, turmeric, and lemon',
            price: 7.99,
            image: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd'
          },
          {
            id: 903,
            name: 'Berry Antioxidant',
            description: 'Mixed berries, pomegranate, and apple',
            price: 8.99,
            image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba'
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: 'Pasta Paradise',
    image: 'https://images.unsplash.com/photo-1481931098730-318b6f776db0',
    banner: 'https://images.unsplash.com/photo-1458644267420-66bc8a5f21e4',
    cuisine: 'Italian',
    location: 'North District',
    rating: 4.5,
    priceLevel: '$$',
    deliveryTime: '35-50 min',
    description: 'Authentic Italian pasta dishes made with traditional recipes and the finest imported ingredients.',
    categories: [
      {
        id: 1,
        name: 'Antipasti',
        items: [
          {
            id: 1001,
            name: 'Bruschetta',
            description: 'Toasted bread topped with tomatoes, garlic, basil and olive oil',
            price: 8.99,
            image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f'
          },
          {
            id: 1002,
            name: 'Caprese Salad',
            description: 'Fresh mozzarella, tomatoes, and basil with balsamic glaze',
            price: 10.99,
            image: 'https://images.unsplash.com/photo-1609167830220-7164aa360951'
          }
        ]
      },
      {
        id: 2,
        name: 'Pasta',
        items: [
          {
            id: 1101,
            name: 'Spaghetti Carbonara',
            description: 'Classic carbonara with pancetta, egg, parmesan and black pepper',
            price: 16.99,
            image: 'https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9'
          },
          {
            id: 1102,
            name: 'Fettuccine Alfredo',
            description: 'Fettuccine pasta in a rich and creamy parmesan sauce',
            price: 15.99,
            image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023882c'
          },
          {
            id: 1103,
            name: 'Penne Arrabbiata',
            description: 'Penne pasta in a spicy tomato sauce with garlic and red chili',
            price: 14.99,
            image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8'
          },
          {
            id: 1104,
            name: 'Lasagna',
            description: 'Layers of pasta, beef ragù, béchamel sauce, and cheese',
            price: 18.99,
            image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3'
          }
        ]
      },
      {
        id: 3,
        name: 'Dolci',
        items: [
          {
            id: 1201,
            name: 'Tiramisu',
            description: 'Coffee-soaked ladyfingers layered with mascarpone cream',
            price: 8.99,
            image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9'
          },
          {
            id: 1202,
            name: 'Panna Cotta',
            description: 'Vanilla cream with berry compote',
            price: 7.99,
            image: 'https://images.unsplash.com/photo-1488477181946-6428a0bdf31e'
          }
        ]
      }
    ]
  },
  {
    id: 5,
    name: 'Burger Boutique',
    image: 'https://images.unsplash.com/photo-1512152272829-e3139592d56f',
    banner: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330',
    cuisine: 'American',
    location: 'South Square',
    rating: 4.4,
    priceLevel: '$',
    deliveryTime: '20-35 min',
    description: 'Gourmet burgers made from premium grass-fed beef and topped with fresh, locally-sourced ingredients.',
    categories: [
      {
        id: 1,
        name: 'Sides',
        items: [
          {
            id: 1301,
            name: 'Loaded Fries',
            description: 'Crispy fries topped with cheese, bacon, and green onions',
            price: 6.99,
            image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713'
          },
          {
            id: 1302,
            name: 'Onion Rings',
            description: 'Beer-battered onion rings with spicy aioli',
            price: 5.99,
            image: 'https://images.unsplash.com/photo-1639024471283-03518883512d'
          }
        ]
      },
      {
        id: 2,
        name: 'Signature Burgers',
        items: [
          {
            id: 1401,
            name: 'Classic Cheeseburger',
            description: 'Beef patty with American cheese, lettuce, tomato, pickles, and special sauce',
            price: 12.99,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'
          },
          {
            id: 1402,
            name: 'Bacon Avocado Burger',
            description: 'Beef patty with bacon, avocado, lettuce, and ranch dressing',
            price: 14.99,
            image: 'https://images.unsplash.com/photo-1596662951482-0c4ba27a4cac'
          },
          {
            id: 1403,
            name: 'Mushroom Swiss Burger',
            description: 'Beef patty with sautéed mushrooms, Swiss cheese, and truffle mayo',
            price: 13.99,
            image: 'https://images.unsplash.com/photo-1550317138-10000687a72b'
          },
          {
            id: 1404,
            name: 'Veggie Burger',
            description: 'Plant-based patty with lettuce, tomato, red onion, and vegan mayo',
            price: 12.99,
            image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360'
          }
        ]
      },
      {
        id: 3,
        name: 'Milkshakes',
        items: [
          {
            id: 1501,
            name: 'Classic Vanilla',
            description: 'Creamy vanilla ice cream milkshake',
            price: 5.99,
            image: 'https://images.unsplash.com/photo-1568901839119-631418a3910d'
          },
          {
            id: 1502,
            name: 'Chocolate Fudge',
            description: 'Rich chocolate ice cream with hot fudge',
            price: 6.99,
            image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb'
          },
          {
            id: 1503,
            name: 'Strawberry',
            description: 'Fresh strawberry ice cream milkshake',
            price: 6.99,
            image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc'
          }
        ]
      }
    ]
  },
  {
    id: 6,
    name: 'Sushi Supreme',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754',
    banner: 'https://images.unsplash.com/photo-1617196701537-7329482cc9fe',
    cuisine: 'Japanese',
    location: 'Harbor View',
    rating: 4.9,
    priceLevel: '$$$',
    deliveryTime: '40-55 min',
    description: 'Premium sushi and Japanese specialties prepared by master chefs using the freshest seafood and traditional techniques.',
    categories: [
      {
        id: 1,
        name: 'Starters',
        items: [
          {
            id: 1601,
            name: 'Edamame',
            description: 'Steamed soybean pods with sea salt',
            price: 5.99,
            image: 'https://images.unsplash.com/photo-1620329595087-91e90df6786f'
          },
          {
            id: 1602,
            name: 'Miso Soup',
            description: 'Traditional Japanese soup with tofu, seaweed, and green onions',
            price: 4.99,
            image: 'https://images.unsplash.com/photo-1610725663727-08695a1ac3ff'
          },
          {
            id: 1603,
            name: 'Seaweed Salad',
            description: 'Marinated seaweed with sesame seeds',
            price: 6.99,
            image: 'https://images.unsplash.com/photo-1543093220-cf4736cb3a4f'
          }
        ]
      },
      {
        id: 2,
        name: 'Sushi Rolls',
        items: [
          {
            id: 1701,
            name: 'California Roll',
            description: 'Crab, avocado, and cucumber roll with tobiko',
            price: 10.99,
            image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a'
          },
          {
            id: 1702,
            name: 'Dragon Roll',
            description: 'Eel and cucumber roll topped with avocado and eel sauce',
            price: 16.99,
            image: 'https://images.unsplash.com/photo-1559847844-5315695dadae'
          },
          {
            id: 1703,
            name: 'Rainbow Roll',
            description: 'California roll topped with assorted sashimi',
            price: 18.99,
            image: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d'
          },
          {
            id: 1704,
            name: 'Spicy Tuna Roll',
            description: 'Spicy tuna and cucumber roll with spicy mayo',
            price: 12.99,
            image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c'
          }
        ]
      },
      {
        id: 3,
        name: 'Nigiri & Sashimi',
        items: [
          {
            id: 1801,
            name: 'Salmon Nigiri',
            description: 'Fresh salmon over pressed rice (2 pieces)',
            price: 8.99,
            image: 'https://images.unsplash.com/photo-1643402623720-fba8cd3ca718'
          },
          {
            id: 1802,
            name: 'Tuna Nigiri',
            description: 'Fresh tuna over pressed rice (2 pieces)',
            price: 9.99,
            image: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d'
          },
          {
            id: 1803,
            name: 'Sashimi Platter',
            description: 'Assorted fresh fish slices (12 pieces)',
            price: 26.99,
            image: 'https://images.unsplash.com/photo-1625937600479-982fba0a666f'
          }
        ]
      },
      {
        id: 4,
        name: 'Specialty Dishes',
        items: [
          {
            id: 1901,
            name: 'Teriyaki Salmon',
            description: 'Grilled salmon with teriyaki sauce and steamed rice',
            price: 22.99,
            image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288'
          },
          {
            id: 1902,
            name: 'Chicken Katsu',
            description: 'Breaded chicken cutlet with katsu sauce and cabbage slaw',
            price: 18.99,
            image: 'https://images.unsplash.com/photo-1622099606172-d32a6d1a5422'
          }
        ]
      }
    ]
  }
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
