import { ArrowLeft, ShoppingCart, MapPin, Check, Star, TrendingDown } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState } from 'react';

interface IngredientPrice {
  store: string;
  price: number;
  distance: string;
  rating: number;
  inStock: boolean;
  discount?: number;
}

interface RecipeIngredient {
  name: string;
  amount: string;
  category: string;
  isEssential: boolean;
  haveAtHome: boolean;
  prices: IngredientPrice[];
  alternatives?: string[];
}

interface RecipeIngredientsProps {
  recipeName: string;
  onBack: () => void;
  onAddToCart: (ingredient: RecipeIngredient, store: string) => void;
}

export function RecipeIngredients({ recipeName, onBack, onAddToCart }: RecipeIngredientsProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<{[key: string]: string}>({});
  const [haveAtHome, setHaveAtHome] = useState<{[key: string]: boolean}>({});

  const ingredients: RecipeIngredient[] = [
    {
      name: 'Avokádo',
      amount: '1 ks',
      category: 'Ovocie & Zelenina',
      isEssential: true,
      haveAtHome: false,
      prices: [
        { store: 'Lidl', price: 1.19, distance: '1.5 km', rating: 4.3, inStock: true, discount: 15 },
        { store: 'Tesco', price: 1.39, distance: '0.8 km', rating: 4.2, inStock: true },
        { store: 'Kaufland', price: 1.29, distance: '1.2 km', rating: 4.0, inStock: true },
        { store: 'Billa', price: 1.49, distance: '2.1 km', rating: 3.9, inStock: false }
      ],
      alternatives: ['Hummus', 'Cottage cheese']
    },
    {
      name: 'Celozrnný chlieb',
      amount: '2 plátky',
      category: 'Pekárenské výrobky',
      isEssential: true,
      haveAtHome: false,
      prices: [
        { store: 'Tesco', price: 1.99, distance: '0.8 km', rating: 4.2, inStock: true },
        { store: 'Kaufland', price: 2.19, distance: '1.2 km', rating: 4.0, inStock: true, discount: 10 },
        { store: 'Lidl', price: 1.89, distance: '1.5 km', rating: 4.3, inStock: true },
        { store: 'Billa', price: 2.29, distance: '2.1 km', rating: 3.9, inStock: true }
      ]
    },
    {
      name: 'Vajíčka',
      amount: '2 ks',
      category: 'Mliečne výrobky',
      isEssential: true,
      haveAtHome: false,
      prices: [
        { store: 'Kaufland', price: 0.59, distance: '1.2 km', rating: 4.0, inStock: true, discount: 20 },
        { store: 'Lidl', price: 0.69, distance: '1.5 km', rating: 4.3, inStock: true },
        { store: 'Tesco', price: 0.79, distance: '0.8 km', rating: 4.2, inStock: true },
        { store: 'Billa', price: 0.89, distance: '2.1 km', rating: 3.9, inStock: true }
      ]
    },
    {
      name: 'Sól a čierne korenie',
      amount: 'podľa chuti',
      category: 'Korenie',
      isEssential: false,
      haveAtHome: true,
      prices: [
        { store: 'Tesco', price: 0.49, distance: '0.8 km', rating: 4.2, inStock: true },
        { store: 'Lidl', price: 0.39, distance: '1.5 km', rating: 4.3, inStock: true },
        { store: 'Kaufland', price: 0.59, distance: '1.2 km', rating: 4.0, inStock: true },
        { store: 'Billa', price: 0.69, distance: '2.1 km', rating: 3.9, inStock: true }
      ]
    }
  ];

  const getStoreColor = (store: string) => {
    const colors = {
      'Tesco': 'text-blue-600',
      'Kaufland': 'text-red-600',
      'Lidl': 'text-yellow-600',
      'Billa': 'text-green-600'
    };
    return colors[store as keyof typeof colors] || 'text-gray-600';
  };

  const getCheapestOption = (ingredient: RecipeIngredient) => {
    return ingredient.prices
      .filter(p => p.inStock)
      .sort((a, b) => a.price - b.price)[0];
  };

  const toggleHaveAtHome = (ingredientName: string) => {
    setHaveAtHome(prev => ({
      ...prev,
      [ingredientName]: !prev[ingredientName]
    }));
  };

  const getTotalCost = () => {
    return ingredients.reduce((total, ingredient) => {
      if (haveAtHome[ingredient.name]) return total;
      const cheapest = getCheapestOption(ingredient);
      return total + (cheapest?.price || 0);
    }, 0);
  };

  const getOptimalStores = () => {
    const storeCounts: {[key: string]: {count: number, total: number}} = {};
    
    ingredients.forEach(ingredient => {
      if (haveAtHome[ingredient.name]) return;
      const cheapest = getCheapestOption(ingredient);
      if (cheapest) {
        if (!storeCounts[cheapest.store]) {
          storeCounts[cheapest.store] = { count: 0, total: 0 };
        }
        storeCounts[cheapest.store].count++;
        storeCounts[cheapest.store].total += cheapest.price;
      }
    });

    return Object.entries(storeCounts)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Header */}
      <div className="bg-white px-6 pt-[max(56px,env(safe-area-inset-top)+56px)] pb-4 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-xl"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{recipeName}</h1>
            <p className="text-sm text-gray-600">Najlacnejšie suroviny</p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-24">
        {/* Cost summary */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100 p-4 mb-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 mb-1">Celková cena optimalizovaná</p>
              <p className="text-2xl font-bold text-green-900">€{getTotalCost().toFixed(2)}</p>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingDown className="h-3 w-3" />
                Ušetrené €1.20 oproti ostatným obchodom
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-green-700">Obchody</p>
              <p className="text-lg font-bold text-green-900">{getOptimalStores().length}</p>
            </div>
          </div>
        </Card>

        {/* Optimal stores suggestion */}
        {getOptimalStores().length > 0 && (
          <Card className="bg-white border border-gray-100 rounded-2xl p-4 mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Odporúčané obchody</h3>
            <div className="space-y-2">
              {getOptimalStores().map(([store, data], index) => (
                <div key={store} className="flex items-center justify-between p-2 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center`}>
                      <span className={`text-sm font-bold ${getStoreColor(store)}`}>
                        {store.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{store}</p>
                      <p className="text-xs text-gray-600">{data.count} surovín</p>
                    </div>
                  </div>
                  <p className="font-medium text-gray-900">€{data.total.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Ingredients list */}
        <div className="space-y-4">
          {ingredients.map((ingredient, index) => {
            const cheapest = getCheapestOption(ingredient);
            const hasAtHome = haveAtHome[ingredient.name] || ingredient.haveAtHome;
            
            return (
              <Card key={index} className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-medium ${hasAtHome ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                          {ingredient.name}
                        </h3>
                        {ingredient.isEssential && (
                          <Badge variant="destructive" className="text-xs px-2 py-0 h-5">
                            Dôležité
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{ingredient.amount} • {ingredient.category}</p>
                      
                      {ingredient.alternatives && (
                        <p className="text-xs text-gray-500">
                          Alternatívy: {ingredient.alternatives.join(', ')}
                        </p>
                      )}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleHaveAtHome(ingredient.name)}
                      className={`ml-3 ${hasAtHome ? 'bg-green-100 border-green-300 text-green-700' : 'border-gray-300'}`}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      {hasAtHome ? 'Mám doma' : 'Nemám'}
                    </Button>
                  </div>

                  {!hasAtHome && (
                    <div className="space-y-2">
                      {ingredient.prices
                        .filter(price => price.inStock)
                        .sort((a, b) => a.price - b.price)
                        .slice(0, 3)
                        .map((price, priceIndex) => (
                          <div
                            key={priceIndex}
                            className={`p-3 rounded-xl border transition-colors ${
                              priceIndex === 0 
                                ? 'bg-green-50 border-green-200' 
                                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 bg-white rounded-lg flex items-center justify-center border`}>
                                  <span className={`text-sm font-bold ${getStoreColor(price.store)}`}>
                                    {price.store.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <p className="font-medium text-gray-900">{price.store}</p>
                                    {price.discount && (
                                      <Badge className="bg-red-100 text-red-700 text-xs px-1 py-0 h-4">
                                        -{price.discount}%
                                      </Badge>
                                    )}
                                    {priceIndex === 0 && (
                                      <Badge className="bg-green-100 text-green-700 text-xs px-1 py-0 h-4">
                                        Najlacnejšie
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-3 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      {price.distance}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                      {price.rating}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <p className="font-bold text-gray-900">€{price.price.toFixed(2)}</p>
                                  {price.discount && (
                                    <p className="text-xs text-gray-400 line-through">
                                      €{(price.price / (1 - price.discount / 100)).toFixed(2)}
                                    </p>
                                  )}
                                </div>
                                <Button
                                  size="sm"
                                  onClick={() => onAddToCart(ingredient, price.store)}
                                  className="bg-[#df2935] hover:bg-[#c41e2a] text-white px-3 py-1 rounded-lg text-xs"
                                >
                                  <ShoppingCart className="h-3 w-3 mr-1" />
                                  Pridať
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-6">
          <Button
            className="flex-1 bg-[#df2935] hover:bg-[#c41e2a] text-white py-3 rounded-2xl"
            onClick={() => {
              ingredients.forEach(ingredient => {
                if (!haveAtHome[ingredient.name] && !ingredient.haveAtHome) {
                  const cheapest = getCheapestOption(ingredient);
                  if (cheapest) {
                    onAddToCart(ingredient, cheapest.store);
                  }
                }
              });
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Pridať všetko do košíka
          </Button>
        </div>
      </div>
    </div>
  );
}