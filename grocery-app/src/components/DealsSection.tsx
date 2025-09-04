import { Plus, Star, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Deal {
  id: string;
  name: string;
  store: string;
  originalPrice: number;
  salePrice: number;
  image?: string;
  category: string;
}

interface DealsSectionProps {
  deals: Deal[];
  onAddToCart: (deal: Deal) => void;
}

export function DealsSection({ deals, onAddToCart }: DealsSectionProps) {
  const calculateDiscount = (original: number, sale: number) => {
    return Math.round(((original - sale) / original) * 100);
  };

  const getStoreColor = (store: string) => {
    const colors = {
      'Tesco': { bg: 'bg-blue-600', text: 'text-blue-600', light: 'bg-blue-50' },
      'Kaufland': { bg: 'bg-red-600', text: 'text-red-600', light: 'bg-red-50' },
      'Lidl': { bg: 'bg-yellow-500', text: 'text-yellow-700', light: 'bg-yellow-50' },
      'Billa': { bg: 'bg-green-600', text: 'text-green-600', light: 'bg-green-50' }
    };
    return colors[store as keyof typeof colors] || { bg: 'bg-gray-600', text: 'text-gray-600', light: 'bg-gray-50' };
  };

  const getProductImage = (id: string) => {
    const images = {
      '1': 'https://images.unsplash.com/photo-1602595366984-709ba7028122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwc3RvcmUlMjBwcm9kdWN0cyUyMGFwcGxlc3xlbnwxfHx8fDE3NTY3NTEyNjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      '2': 'https://images.unsplash.com/photo-1627482265910-5c0ff6bee088?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwcGFja2FnZSUyMGdyb2Nlcnl8ZW58MXx8fHwxNzU2NzUxMjcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      '3': 'https://images.unsplash.com/photo-1581868164904-77b124b80242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2d1cnQlMjBkYWlyeSUyMHByb2R1Y3RzfGVufDF8fHx8MTc1Njc1MTI3NHww&ixlib=rb-4.1.0&q=80&w=1080',
      '4': 'https://images.unsplash.com/photo-1679673987713-54f809ce417d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVhZCUyMGJha2VyeXxlbnwxfHx8fDE3NTY3MDYyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080'
    };
    return images[id as keyof typeof images];
  };

  return (
    <div className="px-6 mb-8">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">
            Najlepšie ponuky
          </h2>
          <span className="text-lg">🔥</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>Platí 48h</span>
        </div>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {deals.map((deal) => {
          const storeColors = getStoreColor(deal.store);
          const discount = calculateDiscount(deal.originalPrice, deal.salePrice);
          
          return (
            <Card key={deal.id} className="relative min-w-[180px] bg-white shadow-lg border-0 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow">
              {/* Discount badge */}
              {discount > 0 && (
                <div className="absolute top-3 left-3 z-10">
                  <Badge className="bg-[#df2935] hover:bg-[#df2935] text-white px-2 py-1 text-xs font-semibold">
                    -{discount}%
                  </Badge>
                </div>
              )}

              {/* Add button */}
              <Button
                size="sm"
                onClick={() => onAddToCart(deal)}
                className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 p-0 shadow-md"
              >
                <Plus className="h-4 w-4" />
              </Button>

              {/* Product image */}
              <div className="h-32 bg-gray-100 flex items-center justify-center overflow-hidden">
                <ImageWithFallback
                  src={getProductImage(deal.id) || ''}
                  alt={deal.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                {/* Store badge */}
                <div className={`inline-flex items-center px-2 py-1 rounded-full mb-3 ${storeColors.light}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${storeColors.bg}`} />
                  <span className={`text-xs font-medium ${storeColors.text}`}>
                    {deal.store}
                  </span>
                </div>

                {/* Product name */}
                <h3 className="text-sm font-medium text-gray-900 mb-2 h-10 overflow-hidden leading-5">
                  {deal.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <Star className="h-3 w-3 fill-gray-200 text-gray-200" />
                  <span className="text-xs text-gray-500 ml-1">4.2</span>
                </div>

                {/* Prices */}
                <div className="flex items-center justify-between">
                  <div>
                    {deal.originalPrice > deal.salePrice && (
                      <span className="text-xs text-gray-400 line-through block">
                        €{deal.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="text-lg font-bold text-[#df2935]">
                      €{deal.salePrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    /ks
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}