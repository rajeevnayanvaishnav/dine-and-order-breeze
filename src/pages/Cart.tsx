import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BlurContainer } from '@/components/ui/BlurContainer';

// Mock cart data
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  restaurantId: number;
  restaurantName: string;
  removing?: boolean;
};

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Margherita Pizza',
      price: 12.99,
      quantity: 1,
      restaurantId: 1,
      restaurantName: 'The Gourmet Kitchen',
    },
    {
      id: 2,
      name: 'Caesar Salad',
      price: 8.99,
      quantity: 1,
      restaurantId: 1,
      restaurantName: 'The Gourmet Kitchen',
    },
    {
      id: 3,
      name: 'Tiramisu',
      price: 6.99,
      quantity: 2,
      restaurantId: 1,
      restaurantName: 'The Gourmet Kitchen',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, removing: true } : item
      )
    );

    // Simulate API call delay
    setTimeout(() => {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }, 300);
  };

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleCheckout = () => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      navigate('/order-confirmation');
    }, 1500);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateDeliveryFee = () => {
    return 3.99;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateDeliveryFee();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const renderEmptyCart = () => (
    <div className="text-center py-16">
      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <ShoppingBag className="h-8 w-8 text-gray-400" />
      </div>
      <h2 className="text-2xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
      <p className="text-gray-600 mb-8">
        Looks like you haven't added any items to your cart yet.
      </p>
      <Link to="/restaurants">
        <Button className="bg-[#FF3008] hover:bg-[#E42B07]">Browse Restaurants</Button>
      </Link>
    </div>
  );

  const renderCartItem = (item: CartItem) => (
    <div
      key={item.id}
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 border-b border-gray-100 transition-opacity duration-300 ${
        item.removing ? 'opacity-50' : ''
      }`}
    >
      <div className="flex-grow mb-4 sm:mb-0">
        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.restaurantName}</p>
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="flex items-center border border-gray-200 rounded-lg">
          <button
            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
            className="px-3 py-1 text-gray-500 hover:text-[#FF3008] transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-3 py-1 text-gray-700 min-w-[40px] text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
            className="px-3 py-1 text-gray-500 hover:text-[#FF3008] transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="text-right min-w-[80px]">
          <p className="font-medium text-gray-900">
            {formatCurrency(item.price * item.quantity)}
          </p>
          <p className="text-sm text-gray-500">
            {item.quantity > 1 && `${formatCurrency(item.price)} each`}
          </p>
        </div>

        <button
          onClick={() => handleRemoveItem(item.id)}
          className="p-2 text-gray-400 hover:text-[#FF3008] transition-colors"
          aria-label="Remove item"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );

  const renderCartItems = () => (
    <div>
      <div className="mb-8">
        {cartItems.map((item) => renderCartItem(item))}
      </div>

      <div className="flex justify-between items-center mb-6">
        <Link to="/restaurants" className="text-[#FF3008] hover:underline flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Continue Shopping
        </Link>
      </div>
    </div>
  );

  const renderOrderSummary = () => (
    <BlurContainer className="p-6 sticky top-24">
      <h2 className="text-xl font-medium text-gray-900 mb-6">Order Summary</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatCurrency(calculateSubtotal())}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span>{formatCurrency(calculateTax())}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span>{formatCurrency(calculateDeliveryFee())}</span>
        </div>
        <div className="border-t border-gray-100 pt-3 mt-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-900">Total</span>
            <span className="font-medium text-gray-900">
              {formatCurrency(calculateTotal())}
            </span>
          </div>
        </div>
      </div>

      <Button
        onClick={handleCheckout}
        className="w-full bg-[#FF3008] hover:bg-[#E42B07]"
        disabled={cartItems.length === 0 || isLoading}
      >
        {isLoading ? 'Processing...' : 'Proceed to Checkout'}
      </Button>
    </BlurContainer>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

          {cartItems.length === 0 ? (
            renderEmptyCart()
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <BlurContainer className="p-6">
                  {renderCartItems()}
                </BlurContainer>
              </div>
              <div className="lg:col-span-1">{renderOrderSummary()}</div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
