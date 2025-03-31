
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="text-xl font-bold inline-flex items-center gap-2 text-gray-900">
              <span className="text-[#FF3008]">Door</span>Dash
            </Link>
            <p className="mt-3 text-gray-600 max-w-md">
              Experience the most elegant way to order food from your favorite restaurants. 
              Premium service with a focus on design and user experience.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-[#FF3008] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/restaurants" className="text-gray-600 hover:text-[#FF3008] transition-colors">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-[#FF3008] transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-[#FF3008] transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-[#FF3008] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-[#FF3008] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            © {currentYear} DoorDash. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
