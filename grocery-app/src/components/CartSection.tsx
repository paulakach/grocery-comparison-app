import { ShoppingBasket, ArrowRight, DollarSign, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface CartItem {
  id: string;
  name: string;
  store: string;
  price: number;
  quantity: number;
}

interface CartSectionProps {
  items: CartItem[];
  onViewCart: () => void;
  title?: string;
  simplified?: boolean;
}

export function CartSection({ items, onViewCart, title = "Nákupný košík", simplified = false }: CartSectionProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const estimatedSavings = 4.50; // Mock savings

  if (simplified) {
    return (
      <div className="px-6 mb-8">
        <Card 
          className="bg-white border border-gray-100 rounded-2xl p-4 cursor-pointer hover:shadow-md transition-shadow"
          onClick={onViewCart}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#df2935] bg-opacity-10 rounded-xl flex items-center justify-center">
                <ShoppingBasket className="h-6 w-6 text-[#df2935]" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600">
                  {totalItems > 0 ? `${totalItems} položiek v zozname` : 'Prázdny zoznam'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {totalItems > 0 && (
                <Badge className="bg-[#df2935] hover:bg-[#df2935] text-white">
                  {totalItems}
                </Badge>
              )}
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {totalItems > 0 && (
          <Badge className="bg-[#df2935] hover:bg-[#df2935] text-white">
            {totalItems} položiek
          </Badge>
        )}
      </div>

      {totalItems > 0 ? (
        <div className="space-y-3">
          {/* Quick preview of items */}
          <Card className="bg-white border border-gray-100 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <ShoppingBasket className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Pripravené na nákup</h3>
                  <p className="text-sm text-gray-600">{totalItems} produktov</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>

            {/* Recent items preview */}
            <div className="flex gap-2 mb-3">
              {items.slice(0, 3).map((item, index) => (
                <div key={item.id} className="flex-1 bg-gray-50 rounded-lg p-2">
                  <p className="text-xs text-gray-700 truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.quantity}x</p>
                </div>
              ))}
              {items.length > 3 && (
                <div className="flex-1 bg-gray-50 rounded-lg p-2 flex items-center justify-center">
                  <span className="text-xs text-gray-500">+{items.length - 3}</span>
                </div>
              )}
            </div>

            {/* Price summary */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-600">Celkom:</span>
                <span className="font-semibold text-gray-900">€{totalPrice.toFixed(2)}</span>
              </div>
              <div className="text-xs text-green-600 font-medium">
                Ušetríte €{estimatedSavings.toFixed(2)}
              </div>
            </div>
          </Card>

          {/* Action card */}
          <Card 
            className="bg-gradient-to-r from-[#df2935] to-[#c41e2a] border-0 rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={onViewCart}
          >
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <ShoppingBasket className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Dokončiť nákup</h3>
                  <p className="text-sm opacity-90">Optimalizovať trasu a ceny</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5" />
            </div>
          </Card>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-green-50 border-green-100 p-3 rounded-2xl">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-xs text-green-700">Čas nákupu</p>
                  <p className="font-semibold text-green-800">~25 min</p>
                </div>
              </div>
            </Card>
            <Card className="bg-blue-50 border-blue-100 p-3 rounded-2xl">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-xs text-blue-700">Úspora</p>
                  <p className="font-semibold text-blue-800">€{estimatedSavings.toFixed(2)}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <Card className="bg-gray-50 border border-gray-100 rounded-2xl p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBasket className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Košík je prázdny</h3>
            <p className="text-sm text-gray-600 mb-4">
              Začnite pridávaním produktov do košíka
            </p>
            <Button 
              onClick={() => {}}
              className="bg-[#df2935] hover:bg-[#c41e2a] text-white px-6 py-2 rounded-full"
            >
              Začať nakupovanie
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}