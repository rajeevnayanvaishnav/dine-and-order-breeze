
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { BlurContainer } from '@/components/ui/BlurContainer';
import { useToast } from '@/components/ui/use-toast';
import { Building, PlusCircle, Edit, Trash2, Cookie, ShoppingBag } from 'lucide-react';

// Mock admin data
const initialRestaurants = [
  {
    id: 1,
    name: 'The Gourmet Kitchen',
    address: '123 Main St, Downtown',
    cuisine: 'Contemporary'
  },
  {
    id: 2,
    name: 'Savor & Spice',
    address: '456 Oak Ave, East Side',
    cuisine: 'Asian Fusion'
  },
  {
    id: 3,
    name: 'Crisp & Fresh',
    address: '789 Pine Blvd, West End',
    cuisine: 'Salads & Healthy'
  }
];

const initialMenuItems = [
  {
    id: 101,
    restaurantId: 1,
    name: 'Truffle Arancini',
    price: 12.99
  },
  {
    id: 102,
    restaurantId: 1,
    name: 'Beet & Goat Cheese Salad',
    price: 10.99
  },
  {
    id: 201,
    restaurantId: 2,
    name: 'Spicy Tuna Roll',
    price: 14.99
  },
  {
    id: 202,
    restaurantId: 2,
    name: 'Pad Thai',
    price: 16.99
  }
];

type Restaurant = {
  id: number;
  name: string;
  address: string;
  cuisine: string;
};

type MenuItem = {
  id: number;
  restaurantId: number;
  name: string;
  price: number;
};

const Admin = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('restaurants');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  
  // Form states
  const [showRestaurantForm, setShowRestaurantForm] = useState(false);
  const [showMenuItemForm, setShowMenuItemForm] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  
  const [restaurantForm, setRestaurantForm] = useState({
    name: '',
    address: '',
    cuisine: ''
  });
  
  const [menuItemForm, setMenuItemForm] = useState({
    restaurantId: 0,
    name: '',
    price: ''
  });

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setRestaurants(initialRestaurants);
      setMenuItems(initialMenuItems);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Restaurant form handlers
  const resetRestaurantForm = () => {
    setRestaurantForm({ name: '', address: '', cuisine: '' });
    setEditingRestaurant(null);
  };

  const handleShowRestaurantForm = (restaurant: Restaurant | null = null) => {
    if (restaurant) {
      setEditingRestaurant(restaurant);
      setRestaurantForm({
        name: restaurant.name,
        address: restaurant.address,
        cuisine: restaurant.cuisine
      });
    } else {
      resetRestaurantForm();
    }
    setShowRestaurantForm(true);
    setShowMenuItemForm(false);
  };

  const handleRestaurantFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRestaurantForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRestaurantFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!restaurantForm.name || !restaurantForm.address || !restaurantForm.cuisine) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    
    if (editingRestaurant) {
      // Update existing restaurant
      const updatedRestaurants = restaurants.map(r => 
        r.id === editingRestaurant.id 
          ? { ...r, ...restaurantForm } 
          : r
      );
      setRestaurants(updatedRestaurants);
      
      toast({
        title: 'Restaurant updated',
        description: `${restaurantForm.name} has been updated successfully`,
      });
    } else {
      // Add new restaurant
      const newRestaurant = {
        id: Math.max(0, ...restaurants.map(r => r.id)) + 1,
        ...restaurantForm
      };
      setRestaurants([...restaurants, newRestaurant]);
      
      toast({
        title: 'Restaurant added',
        description: `${restaurantForm.name} has been added successfully`,
      });
    }
    
    resetRestaurantForm();
    setShowRestaurantForm(false);
  };

  const handleDeleteRestaurant = (id: number) => {
    // Find associated menu items
    const associatedMenuItems = menuItems.filter(item => item.restaurantId === id);
    
    if (associatedMenuItems.length > 0) {
      toast({
        title: 'Cannot delete restaurant',
        description: 'This restaurant has menu items. Delete them first.',
        variant: 'destructive',
      });
      return;
    }
    
    setRestaurants(restaurants.filter(r => r.id !== id));
    
    toast({
      title: 'Restaurant deleted',
      description: 'The restaurant has been deleted successfully',
    });
  };

  // Menu item form handlers
  const resetMenuItemForm = () => {
    setMenuItemForm({ restaurantId: 0, name: '', price: '' });
    setEditingMenuItem(null);
  };

  const handleShowMenuItemForm = (menuItem: MenuItem | null = null) => {
    if (restaurants.length === 0) {
      toast({
        title: 'No restaurants available',
        description: 'Please add a restaurant first',
        variant: 'destructive',
      });
      return;
    }
    
    if (menuItem) {
      setEditingMenuItem(menuItem);
      setMenuItemForm({
        restaurantId: menuItem.restaurantId,
        name: menuItem.name,
        price: menuItem.price.toString()
      });
    } else {
      resetMenuItemForm();
      // Set default restaurant ID to the first one in the list
      setMenuItemForm(prev => ({ ...prev, restaurantId: restaurants[0].id }));
    }
    setShowMenuItemForm(true);
    setShowRestaurantForm(false);
  };

  const handleMenuItemFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setMenuItemForm(prev => ({ ...prev, [name]: value }));
  };

  const handleMenuItemFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!menuItemForm.restaurantId || !menuItemForm.name || !menuItemForm.price) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    
    // Validate price is a number
    if (isNaN(parseFloat(menuItemForm.price))) {
      toast({
        title: 'Invalid price',
        description: 'Price must be a number',
        variant: 'destructive',
      });
      return;
    }
    
    if (editingMenuItem) {
      // Update existing menu item
      const updatedMenuItems = menuItems.map(item => 
        item.id === editingMenuItem.id 
          ? { 
              ...item, 
              restaurantId: Number(menuItemForm.restaurantId),
              name: menuItemForm.name,
              price: parseFloat(menuItemForm.price)
            } 
          : item
      );
      setMenuItems(updatedMenuItems);
      
      toast({
        title: 'Menu item updated',
        description: `${menuItemForm.name} has been updated successfully`,
      });
    } else {
      // Add new menu item
      const newMenuItem = {
        id: Math.max(0, ...menuItems.map(item => item.id)) + 1,
        restaurantId: Number(menuItemForm.restaurantId),
        name: menuItemForm.name,
        price: parseFloat(menuItemForm.price)
      };
      setMenuItems([...menuItems, newMenuItem]);
      
      toast({
        title: 'Menu item added',
        description: `${menuItemForm.name} has been added successfully`,
      });
    }
    
    resetMenuItemForm();
    setShowMenuItemForm(false);
  };

  const handleDeleteMenuItem = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    
    toast({
      title: 'Menu item deleted',
      description: 'The menu item has been deleted successfully',
    });
  };

  const getRestaurantNameById = (id: number) => {
    const restaurant = restaurants.find(r => r.id === id);
    return restaurant ? restaurant.name : 'Unknown Restaurant';
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h1 className="text-3xl font-medium text-gray-900 mb-4 md:mb-0">Admin Panel</h1>
            
            <div className="flex space-x-2">
              <Button
                variant={activeTab === 'restaurants' ? 'default' : 'outline'}
                onClick={() => setActiveTab('restaurants')}
                className="flex items-center"
              >
                <Building className="h-4 w-4 mr-2" />
                Restaurants
              </Button>
              <Button
                variant={activeTab === 'menuItems' ? 'default' : 'outline'}
                onClick={() => setActiveTab('menuItems')}
                className="flex items-center"
              >
                <Cookie className="h-4 w-4 mr-2" />
                Menu Items
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="space-y-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="h-20 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className={`md:col-span-2 ${showRestaurantForm || showMenuItemForm ? 'hidden md:block' : ''}`}>
                {/* Restaurant List */}
                {activeTab === 'restaurants' && (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-medium">Manage Restaurants</h2>
                      <Button 
                        onClick={() => handleShowRestaurantForm()}
                        className="flex items-center"
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Restaurant
                      </Button>
                    </div>
                    
                    {restaurants.length > 0 ? (
                      <div className="space-y-4">
                        {restaurants.map((restaurant) => (
                          <div 
                            key={restaurant.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-lg font-medium text-gray-900">{restaurant.name}</h3>
                                <p className="text-gray-600 mt-1">{restaurant.address}</p>
                                <p className="text-gray-600 mt-1">Cuisine: {restaurant.cuisine}</p>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleShowRestaurantForm(restaurant)}
                                  className="h-8 px-2"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteRestaurant(restaurant.id)}
                                  className="h-8 px-2 text-red-500 hover:text-red-700 hover:border-red-200 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                        <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Restaurants Found</h3>
                        <p className="text-gray-600 mb-6">Add your first restaurant to get started</p>
                        <Button 
                          onClick={() => handleShowRestaurantForm()}
                          className="flex items-center mx-auto"
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Restaurant
                        </Button>
                      </div>
                    )}
                  </>
                )}
                
                {/* Menu Items List */}
                {activeTab === 'menuItems' && (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-medium">Manage Menu Items</h2>
                      <Button 
                        onClick={() => handleShowMenuItemForm()}
                        className="flex items-center"
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Menu Item
                      </Button>
                    </div>
                    
                    {menuItems.length > 0 ? (
                      <div className="space-y-4">
                        {menuItems.map((menuItem) => (
                          <div 
                            key={menuItem.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-lg font-medium text-gray-900">{menuItem.name}</h3>
                                <p className="text-gray-600 mt-1">
                                  Price: ${menuItem.price.toFixed(2)}
                                </p>
                                <p className="text-gray-600 mt-1">
                                  Restaurant: {getRestaurantNameById(menuItem.restaurantId)}
                                </p>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleShowMenuItemForm(menuItem)}
                                  className="h-8 px-2"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteMenuItem(menuItem.id)}
                                  className="h-8 px-2 text-red-500 hover:text-red-700 hover:border-red-200 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                        <Cookie className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Menu Items Found</h3>
                        <p className="text-gray-600 mb-6">Add your first menu item to get started</p>
                        <Button 
                          onClick={() => handleShowMenuItemForm()}
                          className="flex items-center mx-auto"
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Menu Item
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              <div className={`md:col-span-1 ${!showRestaurantForm && !showMenuItemForm ? 'hidden md:block' : ''}`}>
                {/* Restaurant Form */}
                {showRestaurantForm && (
                  <BlurContainer className="p-6">
                    <h2 className="text-xl font-medium mb-6">
                      {editingRestaurant ? 'Edit Restaurant' : 'Add Restaurant'}
                    </h2>
                    
                    <form onSubmit={handleRestaurantFormSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Restaurant Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={restaurantForm.name}
                          onChange={handleRestaurantFormChange}
                          placeholder="Enter restaurant name"
                          className="form-input"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="address"
                          name="address"
                          type="text"
                          value={restaurantForm.address}
                          onChange={handleRestaurantFormChange}
                          placeholder="Enter restaurant address"
                          className="form-input"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700 mb-1">
                          Cuisine <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="cuisine"
                          name="cuisine"
                          type="text"
                          value={restaurantForm.cuisine}
                          onChange={handleRestaurantFormChange}
                          placeholder="Enter cuisine type"
                          className="form-input"
                          required
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            resetRestaurantForm();
                            setShowRestaurantForm(false);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">
                          {editingRestaurant ? 'Update' : 'Add'} Restaurant
                        </Button>
                      </div>
                    </form>
                  </BlurContainer>
                )}
                
                {/* Menu Item Form */}
                {showMenuItemForm && (
                  <BlurContainer className="p-6">
                    <h2 className="text-xl font-medium mb-6">
                      {editingMenuItem ? 'Edit Menu Item' : 'Add Menu Item'}
                    </h2>
                    
                    <form onSubmit={handleMenuItemFormSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="restaurantId" className="block text-sm font-medium text-gray-700 mb-1">
                          Restaurant <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="restaurantId"
                          name="restaurantId"
                          value={menuItemForm.restaurantId}
                          onChange={handleMenuItemFormChange}
                          className="form-input"
                          required
                        >
                          <option value="">Select a restaurant</option>
                          {restaurants.map((restaurant) => (
                            <option key={restaurant.id} value={restaurant.id}>
                              {restaurant.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Item Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={menuItemForm.name}
                          onChange={handleMenuItemFormChange}
                          placeholder="Enter item name"
                          className="form-input"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                          Price <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="price"
                          name="price"
                          type="text"
                          value={menuItemForm.price}
                          onChange={handleMenuItemFormChange}
                          placeholder="Enter price (e.g., 12.99)"
                          className="form-input"
                          required
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            resetMenuItemForm();
                            setShowMenuItemForm(false);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">
                          {editingMenuItem ? 'Update' : 'Add'} Menu Item
                        </Button>
                      </div>
                    </form>
                  </BlurContainer>
                )}
                
                {/* Information Card */}
                {!showRestaurantForm && !showMenuItemForm && (
                  <BlurContainer className="p-6">
                    <div className="text-center mb-6">
                      <ShoppingBag className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h2 className="text-xl font-medium">Admin Dashboard</h2>
                      <p className="text-gray-600 mt-2">
                        Manage your restaurants and menu items here
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-medium mb-2">Quick Stats</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-white rounded-lg p-3 text-center">
                            <div className="text-2xl font-semibold text-primary">
                              {restaurants.length}
                            </div>
                            <div className="text-xs text-gray-600">Restaurants</div>
                          </div>
                          <div className="bg-white rounded-lg p-3 text-center">
                            <div className="text-2xl font-semibold text-primary">
                              {menuItems.length}
                            </div>
                            <div className="text-xs text-gray-600">Menu Items</div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Quick Actions</h3>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            onClick={() => handleShowRestaurantForm()}
                            className="w-full justify-start"
                          >
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Restaurant
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleShowMenuItemForm()}
                            className="w-full justify-start"
                          >
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Menu Item
                          </Button>
                        </div>
                      </div>
                    </div>
                  </BlurContainer>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
