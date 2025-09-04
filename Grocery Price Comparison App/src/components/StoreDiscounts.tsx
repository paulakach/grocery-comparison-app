import { ArrowLeft, Clock, ShoppingCart, MapPin, TrendingDown } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface StoreDiscount {
  id: string;
  name: string;
  category: string;
  image: string;
  originalPrice: number;
  discountPrice: number;
  discountPercent: number;
  validUntil: string;
  rating: number;
  inStock: boolean;
  isLimitedOffer?: boolean;
}

interface StoreDiscountsProps {
  storeName: string;
  onBack: () => void;
  onAddToCart?: (product: StoreDiscount) => void;
}

export function StoreDiscounts({ storeName, onBack, onAddToCart }: StoreDiscountsProps) {
  const getStoreColor = (store: string) => {
    const colors = {
      'Tesco': { primary: 'bg-blue-600', light: 'bg-blue-50', text: 'text-blue-600' },
      'Kaufland': { primary: 'bg-red-600', light: 'bg-red-50', text: 'text-red-600' },
      'Lidl': { primary: 'bg-yellow-500', light: 'bg-yellow-50', text: 'text-yellow-700' },
      'Billa': { primary: 'bg-green-600', light: 'bg-green-50', text: 'text-green-600' }
    };
    return colors[store as keyof typeof colors] || { primary: 'bg-gray-600', light: 'bg-gray-50', text: 'text-gray-600' };
  };

  const storeColors = getStoreColor(storeName);

  const discounts: StoreDiscount[] = [
    {
      id: '1',
      name: 'Bio Avokádo',
      category: 'Ovocie & Zelenina',
      image: 'https://images.unsplash.com/photo-1602595366984-709ba7028122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwc3RvcmUlMjBwcm9kdWN0cyUyMGFwcGxlc3xlbnwxfHx8fDE3NTY3NTEyNjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      originalPrice: 1.39,
      discountPrice: 1.19,
      discountPercent: 14,
      validUntil: '6. september',
      rating: 4.3,
      inStock: true,
      isLimitedOffer: true
    },
    {
      id: '2',
      name: 'Celozrnný chlieb',
      category: 'Pekárenské',
      image: 'https://images.unsplash.com/photo-1679673987713-54f809ce417d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVhZCUyMGJha2VyeXxlbnwxfHx8fDE3NTY3MDYyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      originalPrice: 2.09,
      discountPrice: 1.89,
      discountPercent: 10,
      validUntil: '8. september',
      rating: 4.1,
      inStock: true
    },
    {
      id: '3',
      name: 'Grécky jogurt 500g',
      category: 'Mliečne',
      image: 'https://images.unsplash.com/photo-1581868164904-77b124b80242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2d1cnQlMjBkYWlyeSUyMHByb2R1Y3RzfGVufDF8fHx8MTc1Njc1MTI3NHww&ixlib=rb-4.1.0&q=80&w=1080',
      originalPrice: 1.59,
      discountPrice: 1.29,
      discountPercent: 19,
      validUntil: '5. september',
      rating: 4.5,
      inStock: true,
      isLimitedOffer: true
    },
    {
      id: '4',
      name: 'Bio Banány 1kg',
      category: 'Ovocie & Zelenina',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5hbmFzfGVufDF8fHx8MTc1NjgxMTczN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      originalPrice: 2.29,
      discountPrice: 1.79,
      discountPercent: 22,
      validUntil: '10. september',
      rating: 4.2,
      inStock: true
    },
    {
      id: '5',
      name: 'Olivový olej 500ml',
      category: 'Oleje & Octy',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGl2ZSUyMG9pbHxlbnwxfHx8fDE3NTY4MTE3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      originalPrice: 4.99,
      discountPrice: 3.99,
      discountPercent: 20,
      validUntil: '7. september',
      rating: 4.4,
      inStock: false
    }
  ];

  const inStockDiscounts = discounts.filter(item => item.inStock);
  const totalSavings = inStockDiscounts.reduce((total, item) => total + (item.originalPrice - item.discountPrice), 0);

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Header */}
      <div className={`${storeColors.primary} px-6 pt-[max(56px,env(safe-area-inset-top)+56px)] pb-6`}>
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-xl text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <span className={`text-xl font-bold ${storeColors.text}`}>
                {storeName.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">{storeName}</h1>
              <p className="text-white/80 text-sm">Aktuálne ponuky</p>
            </div>
          </div>
        </div>

        {/* Store info */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-white/80 text-sm">Produkty v akcii</p>
            <p className="text-white font-bold text-lg">{inStockDiscounts.length}</p>
          </div>
          <div className="text-center">
            <p className="text-white/80 text-sm">Celkové úspory</p>
            <p className="text-white font-bold text-lg">€{totalSavings.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-white/80 text-sm">Vzdialenosť</p>
            <p className="text-white font-bold text-lg">1.2 km</p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-24">
        {/* Current offers */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Aktuálne zľavy</h2>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Platné do nedele</span>
            </div>
          </div>

          <div className="space-y-3">
            {discounts.map((item) => (
              <Card key={item.id} className={`border rounded-2xl overflow-hidden ${
                !item.inStock ? 'opacity-60' : ''
              }`}>
                <div className="p-4">
                  <div className="flex gap-4">
                    {/* Product image */}
                    <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                            {item.isLimitedOffer && (
                              <Badge className="bg-orange-100 text-orange-700 text-xs px-2 py-0 h-5">
                                Limitované
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{item.category}</p>
                          <div className="flex items-center gap-2">
                            {!item.inStock && (
                              <Badge variant="secondary" className="text-xs px-2 py-0 h-4">
                                Vypredané
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Badge className="bg-[#df2935] text-white text-sm px-3 py-1">
                          -{item.discountPercent}%
                        </Badge>
                      </div>

                      {/* Pricing and actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div>
                            <span className="font-bold text-lg text-[#df2935]">
                              €{item.discountPrice.toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-400 line-through ml-2">
                              €{item.originalPrice.toFixed(2)}
                            </span>
                          </div>
                          <div className="text-xs text-green-600 font-medium">
                            Ušetríte €{(item.originalPrice - item.discountPrice).toFixed(2)}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="text-xs text-gray-500">
                            Do {item.validUntil}
                          </div>
                          <Button
                            size="sm"
                            onClick={() => onAddToCart?.(item)}
                            disabled={!item.inStock}
                            className="bg-[#df2935] hover:bg-[#c41e2a] text-white px-4 py-2 rounded-xl disabled:opacity-50"
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            {item.inStock ? 'Pridať' : 'Vypredané'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Store info card */}
        <Card className={`mt-6 ${storeColors.light} border-0 p-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className={`h-5 w-5 ${storeColors.text}`} />
              <div>
                <p className="font-medium text-gray-900">Najbližšia pobočka</p>
                <p className="text-sm text-gray-600">Hlavná 123, Bratislava</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">1.2 km</p>
              <p className="text-sm text-gray-600">~5 min autom</p>
            </div>
          </div>
        </Card>

        {/* Action button */}
        <div className="mt-6">
          <Button
            className={`w-full ${storeColors.primary} text-white py-3 rounded-2xl`}
            onClick={() => {
              // Add all available discounts to cart
              inStockDiscounts.forEach(item => onAddToCart?.(item));
            }}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Pridať všetky dostupné do košíka
          </Button>
        </div>
      </div>
    </div>
  );
}