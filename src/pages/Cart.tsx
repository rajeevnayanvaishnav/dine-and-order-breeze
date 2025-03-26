
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingCart, ChevronLeft, Plus, Minus, Trash2, CheckCircle } from 'lucide-react';

// Mock cart data
const initialCart = [
  {
    id: 101,
    name: 'Truffle Arancini',
    price: 12.99,
    quantity: 2,
    restaurantId: 1,
    restaurantName: 'The Gourmet Kitchen'
  },
  {
    id: 201,
    name: 'Pan-Seared Salmon',
    price: 24.99,
    quantity: 1,
    restaurantId: 1,
    restaurantName: 'The Gourmet Kitchen'
  }
];

const Cart = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(initialCart);
  const [isLoading, setIsLoading] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    // Simulate loading cart data
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  const handleQuantityChange = (itemId: number, change: number) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === itemId) {
          const newQuantity = Math.max(0, item.quantity + change);
          return newQuantity === 0 ? { ...item, quantity: 0, removing: true } : { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
    
    // Remove items with zero quantity after animation
    setTimeout(() => {
      setCartItems(prev => prev.filter(item => item.quantity > 0));
    }, 300);
  };

  const handleRemoveItem = (itemId: number) => {
    setCartItems(prev => 
      prev.map(item => item.id === itemId ? { ...item, removing: true } : item)
    );
    
    setTimeout(() => {
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    }, 300);
    
    toast({
      title: 'Item removed',
      description: 'The item has been removed from your cart',
      duration: 3000,
    });
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDeliveryFee = () => {
    return getSubtotal() > 50 ? 0 : 4.99;
  };

  const getTotal = () => {
    return getSubtotal() + getDeliveryFee();
  };

  const handlePlaceOrder = () => {
    if (!deliveryAddress) {
      toast({
        title: 'Missing information',
        description: 'Please provide a delivery address',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate order placement
    setTimeout(() => {
      setOrderPlaced(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleContinueShopping = () => {
    navigate('/restaurants');
  };

  if (orderPlaced) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="text-center bg-white shadow-sm border border-gray-100 rounded-2xl py-16 px-8 animate-scale-in">
              <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-8">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              
              <h1 className="text-3xl font-medium text-gray-900 mb-4">Order Placed Successfully!</h1>
              <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                Your order has been confirmed and will be delivered soon.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-8 max-w-md mx-auto">
                <div className="text-left flex flex-col gap-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">#ORD-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium">${getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Address:</span>
                    <span className="font-medium text-right">{deliveryAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium">{paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery'}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleContinueShopping}>
                  Continue Shopping
                </Button>
                <Link to="/">
                  <Button variant="outline">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center mb-8">
            <Link to="/restaurants" className="inline-flex items-center text-gray-600 hover:text-primary transition-colors mr-4">
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to Restaurants
            </Link>
            <h1 className="text-2xl md:text-3xl font-medium">Your Cart</h1>
          </div>
          
          {isLoading ? (
            <div className="animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="mb-4 bg-white rounded-xl p-6 border border-gray-200 flex">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg mr-4"></div>
                      <div className="flex-1">
                        <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/5"></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 h-64">
                    <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                      </div>
                      <div className="flex justify-between">
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                      </div>
                      <div className="pt-4 mt-4 border-t border-gray-200">
                        <div className="flex justify-between">
                          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-5 bg-gray-200 rounded w-1/5"></div>
                        </div>
                      </div>
                      <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {/* Cart Items */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center">
                      <ShoppingCart className="h-5 w-5 mr-2 text-gray-500" />
                      <h2 className="text-lg font-medium">Cart Items ({cartItems.length})</h2>
                    </div>
                  </div>
                  
                  <div>
                    {cartItems.map((item) => (
                      <div 
                        key={item.id}
                        className={`flex items-center border-b border-gray-100 p-6 transition-all duration-300 ${
                          item.removing ? 'opacity-0 transform -translate-x-4' : 'opacity-100'
                        }`}
                      >
                        <div className="w-20 h-20 bg-gray-100 rounded-lg mr-4"></div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{item.restaurantName}</p>
                          <div className="flex items-center">
                            <div className="flex items-center border border-gray-200 rounded-lg">
                              <button
                                className="px-3 py-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                                onClick={() => handleQuantityChange(item.id, -1)}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-3 py-1 font-medium">{item.quantity}</span>
                              <button
                                className="px-3 py-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                                onClick={() => handleQuantityChange(item.id, 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <button
                              className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        <div className="font-medium text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Delivery Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-medium">Delivery Information</h2>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="address"
                        type="text"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="Enter your full address"
                        className="form-input"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Note (Optional)
                      </label>
                      <textarea
                        id="note"
                        value={deliveryNote}
                        onChange={(e) => setDeliveryNote(e.target.value)}
                        placeholder="Any special instructions for delivery"
                        className="form-input min-h-[100px]"
                      ></textarea>
                    </div>
                    
                    <div>
                      <p className="block text-sm font-medium text-gray-700 mb-3">Payment Method</p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            id="card"
                            name="paymentMethod"
                            type="radio"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                            className="h-4 w-4 text-primary focus:ring-primary/20 border-gray-300"
                          />
                          <label htmlFor="card" className="ml-2 block text-gray-700">
                            Credit Card (Pay Now)
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="cash"
                            name="paymentMethod"
                            type="radio"
                            value="cash"
                            checked={paymentMethod === 'cash'}
                            onChange={() => setPaymentMethod('cash')}
                            className="h-4 w-4 text-primary focus:ring-primary/20 border-gray-300"
                          />
                          <label htmlFor="cash" className="ml-2 block text-gray-700">
                            Cash on Delivery
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-medium">Order Summary</h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>${getSubtotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Fee</span>
                        <span>${getDeliveryFee().toFixed(2)}</span>
                      </div>
                      {getDeliveryFee() === 0 && (
                        <div className="text-green-600 text-sm">
                          Free delivery on orders over $50!
                        </div>
                      )}
                      <div className="pt-4 mt-4 border-t border-gray-200 flex justify-between font-medium text-lg">
                        <span>Total</span>
                        <span>${getTotal().toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button
                        className="w-full h-12 text-base"
                        onClick={handlePlaceOrder}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Processing...' : 'Place Order'}
                      </Button>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <Link to="/restaurants" className="text-sm text-gray-600 hover:text-primary transition-colors">
                        Continue shopping
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 max-w-md mx-auto">
              <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 mb-6">
                <ShoppingCart className="h-10 w-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link to="/restaurants">
                <Button className="px-8">
                  Browse Restaurants
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
