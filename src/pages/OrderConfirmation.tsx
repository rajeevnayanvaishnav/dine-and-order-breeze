
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, ChevronLeft, ShoppingBag } from 'lucide-react';

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  const orderId = searchParams.get('orderId') || Math.floor(100000 + Math.random() * 900000).toString();
  const total = searchParams.get('total') || '75.98';
  const address = searchParams.get('address') || '123 Main St, City';
  const paymentMethod = searchParams.get('paymentMethod') || 'Credit Card';

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  const handleContinueShopping = () => {
    navigate('/restaurants');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="animate-pulse">
              <div className="h-24 w-24 bg-gray-200 rounded-full mx-auto mb-8"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8"></div>
              <div className="h-40 bg-gray-200 rounded w-full max-w-md mx-auto mb-8"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto"></div>
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
                  <span className="font-medium">#{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-medium">${total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Address:</span>
                  <span className="font-medium text-right">{address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium">{paymentMethod}</span>
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
};

export default OrderConfirmation;
