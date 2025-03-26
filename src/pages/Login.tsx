
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BlurContainer } from '@/components/ui/BlurContainer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      // In a real app, this would be an API call to authenticate the user
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo login: if username is "admin" and password is "admin", login succeeds
      if (formData.username === 'admin' && formData.password === 'admin') {
        toast({
          title: "Login successful",
          description: "Welcome back to Breeze Dine & Order!",
          duration: 5000,
        });
        
        // Reset form
        setFormData({
          username: '',
          password: '',
        });
      } else {
        throw new Error('Invalid credentials');
      }
      
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-md mx-auto">
            <BlurContainer className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-medium text-gray-900">Welcome Back</h1>
                <p className="mt-2 text-gray-600">
                  Log in to your account to continue
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className={`form-input ${errors.username ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-input ${errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary/20 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  
                  <div className="text-sm">
                    <a href="#" className="text-primary hover:text-primary/80 font-medium">
                      Forgot password?
                    </a>
                  </div>
                </div>
                
                <div>
                  <Button
                    type="submit"
                    className="w-full h-11 text-base"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Log In'}
                  </Button>
                </div>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary hover:text-primary/80 font-medium">
                    Create an account
                  </Link>
                </p>
              </div>
            </BlurContainer>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
