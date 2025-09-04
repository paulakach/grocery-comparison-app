import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Search, TrendingDown, TrendingUp } from 'lucide-react';

// Mock data for demonstration
const mockProducts = [
  {
    id: 1,
    name: 'Organic Bananas (1 lb)',
    category: 'Fruits',
    stores: [
      { name: 'Whole Foods', price: 1.99, priceChange: 0.1 },
      { name: 'Trader Joe\'s', price: 1.79, priceChange: -0.05 },
      { name: 'Kroger', price: 1.89, priceChange: 0.02 },
      { name: 'Walmart', price: 1.68, priceChange: -0.08 }
    ]
  },
  {
    id: 2,
    name: 'Whole Milk (1 gallon)',
    category: 'Dairy',
    stores: [
      { name: 'Whole Foods', price: 4.49, priceChange: 0.15 },
      { name: 'Trader Joe\'s', price: 3.99, priceChange: 0.05 },
      { name: 'Kroger', price: 3.79, priceChange: -0.1 },
      { name: 'Walmart', price: 3.68, priceChange: 0.08 }
    ]
  },
  {
    id: 3,
    name: 'Bread - Whole Wheat',
    category: 'Bakery',
    stores: [
      { name: 'Whole Foods', price: 3.99, priceChange: 0 },
      { name: 'Trader Joe\'s', price: 2.99, priceChange: -0.2 },
      { name: 'Kroger', price: 2.79, priceChange: 0.1 },
      { name: 'Walmart', price: 2.48, priceChange: 0.05 }
    ]
  },
  {
    id: 4,
    name: 'Chicken Breast (1 lb)',
    category: 'Meat',
    stores: [
      { name: 'Whole Foods', price: 8.99, priceChange: 0.3 },
      { name: 'Trader Joe\'s', price: 7.99, priceChange: 0.15 },
      { name: 'Kroger', price: 6.99, priceChange: -0.25 },
      { name: 'Walmart', price: 5.98, priceChange: 0.12 }
    ]
  }
];

export function PriceComparison() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Fruits', 'Dairy', 'Bakery', 'Meat', 'Vegetables'];
  
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const findBestPrice = (stores: any[]) => {
    return Math.min(...stores.map(store => store.price));
  };

  const findWorstPrice = (stores: any[]) => {
    return Math.max(...stores.map(store => store.price));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search for groceries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredProducts.map(product => {
          const bestPrice = findBestPrice(product.stores);
          const worstPrice = findWorstPrice(product.stores);
          const savings = worstPrice - bestPrice;

          return (
            <Card key={product.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{product.name}</CardTitle>
                    <Badge variant="secondary" className="mt-2">{product.category}</Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Potential Savings</p>
                    <p className="text-lg font-medium text-green-600">${savings.toFixed(2)}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {product.stores
                    .sort((a, b) => a.price - b.price)
                    .map((store, index) => (
                    <div
                      key={store.name}
                      className={`p-4 rounded-lg border-2 ${
                        store.price === bestPrice 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-border bg-card'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{store.name}</h4>
                        {store.price === bestPrice && (
                          <Badge variant="default" className="bg-green-600">Best Price</Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-medium">${store.price}</span>
                        <div className="flex items-center gap-1">
                          {store.priceChange > 0 ? (
                            <TrendingUp className="h-4 w-4 text-red-500" />
                          ) : store.priceChange < 0 ? (
                            <TrendingDown className="h-4 w-4 text-green-500" />
                          ) : null}
                          <span className={`text-sm ${
                            store.priceChange > 0 ? 'text-red-500' : 
                            store.priceChange < 0 ? 'text-green-500' : 
                            'text-muted-foreground'
                          }`}>
                            {store.priceChange > 0 ? '+' : ''}${store.priceChange.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}