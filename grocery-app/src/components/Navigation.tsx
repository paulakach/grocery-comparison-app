import { Home, Heart, Search, ShoppingCart, BarChart3, ChefHat, Menu } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount?: number;
}

export function Navigation({ activeTab, onTabChange, cartCount = 0 }: NavigationProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Domov' },
    { id: 'recipes', icon: ChefHat, label: 'Recepty' },
    { id: 'search', icon: Search, label: 'Hľadať' },
    { id: 'cart', icon: ShoppingCart, label: 'Nákupný zoznam', count: cartCount },
    { id: 'profile', icon: BarChart3, label: 'Štatistiky' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-[rgba(51,59,66,0.08)] shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-[#df2935]">GroceryApp</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="flex items-center space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'text-[#df2935] bg-red-50'
                        : 'text-gray-600 hover:text-[#df2935] hover:bg-gray-50'
                    }`}
                  >
                    <Icon 
                      className="h-5 w-5" 
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    <span className="font-medium">{tab.label}</span>
                    {tab.count && tab.count > 0 && (
                      <div className="bg-[#df2935] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {tab.count}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-[#df2935] p-2">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="flex items-center justify-around py-2 px-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex flex-col items-center justify-center p-2 rounded-lg transition-all ${
                  isActive
                    ? 'text-[#df2935]'
                    : 'text-gray-600'
                }`}
              >
                <Icon 
                  className="h-5 w-5" 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className="text-xs mt-1">{tab.label}</span>
                {tab.count && tab.count > 0 && (
                  <div className="absolute -top-1 -right-1 bg-[#df2935] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {tab.count}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}