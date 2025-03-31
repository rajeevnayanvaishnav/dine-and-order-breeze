
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-sm py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold flex items-center gap-1 text-gray-900"
            >
              <span className="text-[#FF3008]">Door</span>Dash
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/restaurants"
              className="nav-link px-4 py-2 text-gray-600 hover:text-[#FF3008]"
            >
              Restaurants
            </Link>
            <Link
              to="/admin"
              className="nav-link px-4 py-2 text-gray-600 hover:text-[#FF3008]"
            >
              Partners
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 text-gray-600 hover:text-[#FF3008] font-medium"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="ml-2"
            >
              <Button variant="outline" className="border-[#FF3008] text-[#FF3008] hover:bg-[#FF3008]/10">
                Sign Up
              </Button>
            </Link>
            <Link to="/cart" className="ml-3">
              <Button variant="outline" size="icon" className="relative" aria-label="Shopping cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-[#FF3008] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to="/login" className="mr-3">
              <Button variant="outline" size="icon" className="relative" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/cart" className="mr-3">
              <Button variant="outline" size="icon" className="relative" aria-label="Shopping cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-[#FF3008] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
            <button
              className="text-gray-700 hover:text-[#FF3008] focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-out-expo ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col py-4 px-6 space-y-1">
          <Link
            to="/"
            className={`py-3 px-4 rounded-lg ${
              location.pathname === '/'
                ? 'bg-[#FF3008]/10 text-[#FF3008]'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Home
          </Link>
          <Link
            to="/restaurants"
            className={`py-3 px-4 rounded-lg ${
              location.pathname === '/restaurants'
                ? 'bg-[#FF3008]/10 text-[#FF3008]'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Restaurants
          </Link>
          <Link
            to="/login"
            className={`py-3 px-4 rounded-lg ${
              location.pathname === '/login'
                ? 'bg-[#FF3008]/10 text-[#FF3008]'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className={`py-3 px-4 rounded-lg ${
              location.pathname === '/register'
                ? 'bg-[#FF3008]/10 text-[#FF3008]'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Sign Up
          </Link>
          <Link
            to="/admin"
            className={`py-3 px-4 rounded-lg ${
              location.pathname === '/admin'
                ? 'bg-[#FF3008]/10 text-[#FF3008]'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Partners
          </Link>
        </nav>
      </div>
    </header>
  );
}
