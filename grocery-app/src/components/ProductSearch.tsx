import { Search, Filter, Scan, Star, MapPin, TrendingDown, ShoppingCart } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface ProductResult {
  id: string;
  name: string;
  category: string;
  image: string;
  prices: Array<{
    store: string;
    price: number;
    originalPrice?: number;
    distance: string;
    inStock: boolean;
    rating: number;
  }>;
  averageRating: number;
  totalReviews: number;
}

interface ProductSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStore?: string;
  onProductSelect?: (product: ProductResult) => void;
  onAddToCart?: (product: ProductResult, store: string) => void;
  hideHeader?: boolean;
}

export function ProductSearch({ 
  searchQuery, 
  onSearchChange, 
  selectedStore,
  onProductSelect,
  onAddToCart,
  hideHeader = false
}: ProductSearchProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Všetko');

  const categories = ['Všetko', 'Ovocie & Zelenina', 'Mäso & Ryby', 'Mliečne', 'Pekárenské', 'Nápoje'];

  const mockResults: ProductResult[] = [
    {
      id: '1',
      name: 'Bio Avokádo',
      category: 'Ovocie & Zelenina',
      image: 'https://images.unsplash.com/photo-1602595366984-709ba7028122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwc3RvcmUlMjBwcm9kdWN0cyUyMGFwcGxlc3xlbnwxfHx8fDE3NTY3NTEyNjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      averageRating: 4.3,
      totalReviews: 128,
      prices: [
        { store: 'Lidl', price: 1.19, originalPrice: 1.39, distance: '1.5 km', inStock: true, rating: 4.3 },
        { store: 'Tesco', price: 1.29, distance: '0.8 km', inStock: true, rating: 4.2 },
        { store: 'Kaufland', price: 1.35, distance: '1.2 km', inStock: true, rating: 4.0 },
        { store: 'Billa', price: 1.49, distance: '2.1 km', inStock: false, rating: 3.9 }
      ]
    },
    {
      id: '2',
      name: 'Celozrnný chlieb',
      category: 'Pekárenské',
      image: 'https://images.unsplash.com/photo-1679673987713-54f809ce417d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVhZCUyMGJha2VyeXxlbnwxfHx8fDE3NTY3MDYyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      averageRating: 4.1,
      totalReviews: 89,
      prices: [
        { store: 'Lidl', price: 1.89, originalPrice: 2.09, distance: '1.5 km', inStock: true, rating: 4.3 },
        { store: 'Tesco', price: 1.99, distance: '0.8 km', inStock: true, rating: 4.2 },
        { store: 'Kaufland', price: 2.19, distance: '1.2 km', inStock: true, rating: 4.0 },
        { store: 'Billa', price: 2.29, distance: '2.1 km', inStock: true, rating: 3.9 }
      ]
    },
    {
      id: '3',
      name: 'Grécky jogurt 500g',
      category: 'Mliečne',
      image: 'https://images.unsplash.com/photo-1581868164904-77b124b80242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2d1cnQlMjBkYWlyeSUyMHByb2R1Y3RzfGVufDF8fHx8MTc1Njc1MTI3NHww&ixlib=rb-4.1.0&q=80&w=1080',
      averageRating: 4.5,
      totalReviews: 156,
      prices: [
        { store: 'Kaufland', price: 1.29, originalPrice: 1.59, distance: '1.2 km', inStock: true, rating: 4.0 },
        { store: 'Lidl', price: 1.39, distance: '1.5 km', inStock: true, rating: 4.3 },
        { store: 'Tesco', price: 1.49, distance: '0.8 km', inStock: true, rating: 4.2 },
        { store: 'Billa', price: 1.69, distance: '2.1 km', inStock: true, rating: 3.9 }
      ]
    },
    {
      id: '4',
      name: 'Mlieko 1L',
      category: 'Mliečne',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrJTIwYm90dGxlfGVufDF8fHx8MTc1NjgxMTgwOXww&ixlib=rb-4.1.0&q=80&w=1080',
      averageRating: 4.2,
      totalReviews: 203,
      prices: [
        { store: 'Tesco', price: 0.99, distance: '0.8 km', inStock: true, rating: 4.2 },
        { store: 'Lidl', price: 1.05, distance: '1.5 km', inStock: true, rating: 4.3 },
        { store: 'Kaufland', price: 1.09, originalPrice: 1.29, distance: '1.2 km', inStock: true, rating: 4.0 },
        { store: 'Billa', price: 1.19, distance: '2.1 km', inStock: true, rating: 3.9 }
      ]
    },
    {
      id: '5',
      name: 'Paradajky 1kg',
      category: 'Ovocie & Zelenina',
      image: 'https://images.unsplash.com/photo-1546470427-e683b76b5764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b21hdG9lc3xlbnwxfHx8fDE3NTY4MTE4MTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      averageRating: 4.0,
      totalReviews: 92,
      prices: [
        { store: 'Kaufland', price: 2.79, originalPrice: 3.29, distance: '1.2 km', inStock: true, rating: 4.0 },
        { store: 'Lidl', price: 2.89, distance: '1.5 km', inStock: true, rating: 4.3 },
        { store: 'Tesco', price: 2.99, distance: '0.8 km', inStock: true, rating: 4.2 },
        { store: 'Billa', price: 3.19, distance: '2.1 km', inStock: false, rating: 3.9 }
      ]
    }
  ];

  const getStoreColor = (store: string) => {
    const colors = {
      'Tesco': { bg: 'bg-blue-600', text: 'text-blue-600', light: 'bg-blue-50' },
      'Kaufland': { bg: 'bg-red-600', text: 'text-red-600', light: 'bg-red-50' },
      'Lidl': { bg: 'bg-yellow-500', text: 'text-yellow-700', light: 'bg-yellow-50' },
      'Billa': { bg: 'bg-green-600', text: 'text-green-600', light: 'bg-green-50' }
    };
    return colors[store as keyof typeof colors] || { bg: 'bg-gray-600', text: 'text-gray-600', light: 'bg-gray-50' };
  };

  const getCheapestPrice = (product: ProductResult) => {
    return Math.min(...product.prices.filter(p => p.inStock).map(p => p.price));
  };

  const getSavings = (product: ProductResult) => {
    const cheapest = Math.min(...product.prices.filter(p => p.inStock).map(p => p.price));
    const mostExpensive = Math.max(...product.prices.filter(p => p.inStock).map(p => p.price));
    return mostExpensive - cheapest;
  };

  const filteredResults = selectedStore 
    ? mockResults.filter(product => 
        product.prices.some(price => price.store === selectedStore && price.inStock)
      )
    : mockResults;

  const searchResults = searchQuery 
    ? filteredResults.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className={hideHeader ? "" : "min-h-screen bg-gray-50/30"}>
      {/* Search Header - conditionally rendered */}
      {!hideHeader && (
        <div className="bg-white px-6 pt-[max(56px,env(safe-area-inset-top)+56px)] pb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                placeholder="Vyhľadať produkty..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder:text-gray-400 shadow-sm focus:shadow-md transition-shadow"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="p-3 border-gray-200 rounded-2xl"
            >
              <Filter className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="p-3 border-gray-200 rounded-2xl"
            >
              <Scan className="h-5 w-5" />
            </Button>
          </div>

          {selectedStore && (
            <div className="mb-4">
              <Badge className={`${getStoreColor(selectedStore).light} ${getStoreColor(selectedStore).text} border-0 px-3 py-1`}>
                Filtrované pre {selectedStore}
              </Badge>
            </div>
          )}

          {/* Categories */}
          {showFilters && (
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#df2935] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className={hideHeader ? "" : "px-6 pb-24"}>
        {/* Search suggestions when no query */}
        {!searchQuery && (
          <div className="mt-6">
            <h3 className="font-medium text-gray-900 mb-4">Populárne vyhľadávania</h3>
            <div className="grid grid-cols-2 gap-3">
              {['avokado', 'chlieb', 'mlieko', 'paradajky', 'banány', 'jogurt'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => onSearchChange(suggestion)}
                  className="bg-white border border-gray-100 rounded-2xl p-4 text-left hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <span className="font-medium text-gray-900">{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="font-medium text-gray-900 mb-4">Nedávno vyhľadávané</h3>
              <div className="space-y-2">
                {['avokado', 'mlieko'].map((recent) => (
                  <button
                    key={recent}
                    onClick={() => onSearchChange(recent)}
                    className="flex items-center gap-3 w-full p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <Search className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700">{recent}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search results with price comparison */}
        {searchQuery && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">
                Výsledky pre "{searchQuery}" ({searchResults.length})
              </h3>
            </div>

            <div className="space-y-6">
              {searchResults.map((product) => {
                const cheapestPrice = getCheapestPrice(product);
                const savings = getSavings(product);
                
                return (
                  <div key={product.id} className="space-y-4">
                    {/* Product header */}
                    <Card className="bg-white border border-gray-100 rounded-2xl p-4">
                      <div className="flex gap-4">
                        {/* Product image */}
                        <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h4>
                              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-medium text-gray-900">{product.averageRating}</span>
                                </div>
                                <span className="text-sm text-gray-500">({product.totalReviews} hodnotení)</span>
                              </div>
                            </div>
                            {savings > 0 && (
                              <Badge className="bg-green-100 text-green-700 text-sm px-3 py-1">
                                Rozdiel €{savings.toFixed(2)}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Najnižšia cena:</span>
                            <span className="font-bold text-[#df2935] text-xl">€{cheapestPrice.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Price comparison */}
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-900 px-2">Porovnanie cien</h5>
                      {product.prices
                        .sort((a, b) => a.price - b.price)
                        .map((price, index) => {
                          const storeColors = getStoreColor(price.store);
                          const isCheapest = price.price === cheapestPrice && price.inStock;
                          const hasDiscount = price.originalPrice && price.originalPrice > price.price;
                          
                          return (
                            <Card 
                              key={`${product.id}-${price.store}`}
                              className={`border rounded-2xl transition-all ${
                                isCheapest && price.inStock
                                  ? 'border-green-200 bg-green-50' 
                                  : price.inStock 
                                    ? 'border-gray-200 bg-white hover:shadow-sm' 
                                    : 'border-gray-200 bg-gray-50 opacity-60'
                              }`}
                            >
                              <div className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    {/* Store logo */}
                                    <div className={`w-12 h-12 ${storeColors.bg} rounded-xl flex items-center justify-center`}>
                                      <span className="text-white font-bold text-lg">
                                        {price.store.charAt(0)}
                                      </span>
                                    </div>
                                    
                                    {/* Store info */}
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <h6 className="font-semibold text-gray-900">{price.store}</h6>
                                        {isCheapest && price.inStock && (
                                          <Badge className="bg-green-100 text-green-700 text-xs px-2 py-1">
                                            Najlacnejšie
                                          </Badge>
                                        )}
                                        {hasDiscount && (
                                          <Badge className="bg-red-100 text-red-700 text-xs px-2 py-1">
                                            ZĽAVA
                                          </Badge>
                                        )}
                                      </div>
                                      <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                          <MapPin className="h-3 w-3" />
                                          {price.distance}
                                        </span>
                                        <span className="flex items-center gap-1">
                                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                          {price.rating}
                                        </span>
                                        {!price.inStock && (
                                          <Badge variant="secondary" className="text-xs px-2 py-1">
                                            Vypredané
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Price and action - centered */}
                                  <div className="flex flex-col items-center gap-2 min-w-[120px]">
                                    <div className="text-center">
                                      <div className="flex items-center justify-center gap-2">
                                        <span className={`font-bold text-lg ${
                                          isCheapest && price.inStock ? 'text-green-700' : 'text-gray-900'
                                        }`}>
                                          €{price.price.toFixed(2)}
                                        </span>
                                        {hasDiscount && (
                                          <span className="text-sm text-gray-400 line-through">
                                            €{price.originalPrice?.toFixed(2)}
                                          </span>
                                        )}
                                      </div>
                                      {isCheapest && price.inStock && savings > 0 && (
                                        <p className="text-xs text-green-600 font-medium">
                                          Ušetríte €{savings.toFixed(2)}
                                        </p>
                                      )}
                                    </div>
                                    
                                    <Button
                                      size="sm"
                                      onClick={() => onAddToCart?.(product, price.store)}
                                      disabled={!price.inStock}
                                      className={`px-4 py-2 rounded-xl w-full ${
                                        isCheapest && price.inStock
                                          ? 'bg-green-600 hover:bg-green-700 text-white'
                                          : 'bg-[#df2935] hover:bg-[#c41e2a] text-white'
                                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                      <ShoppingCart className="h-4 w-4 mr-1" />
                                      {price.inStock ? 'Pridať' : 'Vypredané'}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </div>

            {searchResults.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Žiadne výsledky</h3>
                <p className="text-gray-600">Skúste zmeniť vyhľadávací výraz</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}