import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Plus, Trash2, ShoppingCart, DollarSign, MapPin, Share2 } from 'lucide-react';

// Mock data for demonstration
const mockListItems = [
  { id: 1, name: 'Bio banány 1kg', completed: false, bestPrice: 1.68, bestStore: 'Tesco', category: 'Ovocie' },
  { id: 2, name: 'Mlieko 1L', completed: true, bestPrice: 1.29, bestStore: 'Lidl', category: 'Mliečne' },
  { id: 3, name: 'Celozrnný chlieb', completed: false, bestPrice: 1.89, bestStore: 'Kaufland', category: 'Pekárenské' },
  { id: 4, name: 'Kuračie prsia 1kg', completed: false, bestPrice: 5.98, bestStore: 'Billa', category: 'Mäso' },
  { id: 5, name: 'Špenát 250g', completed: false, bestPrice: 2.99, bestStore: 'Tesco', category: 'Zelenina' },
  { id: 6, name: 'Grécky jogurt', completed: true, bestPrice: 1.49, bestStore: 'Lidl', category: 'Mliečne' },
];

const storeLocations = {
  'Tesco': { address: 'Hlavná 123', distance: '0.8 km' },
  'Lidl': { address: 'Dubová 456', distance: '1.2 km' },
  'Kaufland': { address: 'Borovicová 789', distance: '2.1 km' },
  'Billa': { address: 'Lipová 321', distance: '1.5 km' }
};

export function GroceryList() {
  const [listItems, setListItems] = useState(mockListItems);
  const [newItem, setNewItem] = useState('');
  const [selectedStore, setSelectedStore] = useState('Najlepšie ceny');

  const addItem = () => {
    if (!newItem.trim()) return;

    const item = {
      id: Date.now(),
      name: newItem,
      completed: false,
      bestPrice: Math.random() * 5 + 1, // Mock price
      bestStore: 'Tesco', // Mock best store
      category: 'Ostatné'
    };

    setListItems([...listItems, item]);
    setNewItem('');
  };

  const toggleItem = (id: number) => {
    setListItems(listItems.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const removeItem = (id: number) => {
    setListItems(listItems.filter(item => item.id !== id));
  };

  const shareShoppingList = () => {
    const shareText = `Môj nákupný zoznam: ${listItems.map(item => `${item.name} (${item.quantity}x)`).join(', ')}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Zdieľaný nákupný zoznam',
        text: shareText,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(shareText).then(() => {
        // Show toast or alert that link was copied
        alert('Nákupný zoznam bol skopírovaný do schránky!');
      });
    }
  };

  const totalCost = listItems.reduce((sum, item) => sum + item.bestPrice, 0);
  const completedItems = listItems.filter(item => item.completed);
  const pendingItems = listItems.filter(item => !item.completed);

  // Group items by store for optimized shopping
  const itemsByStore = listItems.reduce((acc, item) => {
    if (!acc[item.bestStore]) {
      acc[item.bestStore] = [];
    }
    acc[item.bestStore].push(item);
    return acc;
  }, {} as Record<string, typeof listItems>);

  const stores = Object.keys(itemsByStore);

  return (
    <div className="space-y-6">
      {/* Shopping List - Najlepšie ceny view only */}
      <Card className="bg-white border border-gray-100 rounded-2xl">
        <CardContent className="p-0">
          <div className="space-y-0">
            {/* Na nákup section */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">Na nákup</h4>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 border-[#df2935] text-[#df2935] hover:bg-[#df2935] hover:text-white rounded-xl px-3 py-2"
                    onClick={shareShoppingList}
                  >
                    <Share2 className="h-3 w-3" />
                    Zdieľať
                  </Button>
                  <Badge className="bg-[#df2935] hover:bg-[#df2935] text-white">
                    {pendingItems.length} položiek
                  </Badge>
                </div>
              </div>
              
              {pendingItems.length > 0 ? (
                <div className="space-y-3">
                  {pendingItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={item.completed}
                          onCheckedChange={() => toggleItem(item.id)}
                          className="border-2"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs bg-white border-gray-200">{item.category}</Badge>
                            <span className="text-sm text-gray-600">
                              Najlacnejšie v {item.bestStore}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-green-600">€{item.bestPrice.toFixed(2)}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {/* Add New Item - at the bottom of Na nákup section */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Pridať produkty do zoznamu..."
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addItem()}
                        className="flex-1 bg-white border border-gray-200 rounded-xl"
                      />
                      <Button 
                        onClick={addItem}
                        className="bg-[#df2935] hover:bg-[#c41e2a] text-white px-6 rounded-xl"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>Žiadne položky na nákup</p>
                  </div>
                  
                  {/* Add New Item - when list is empty */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Pridať produkty do zoznamu..."
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addItem()}
                      className="flex-1 bg-white border border-gray-200 rounded-xl"
                    />
                    <Button 
                      onClick={addItem}
                      className="bg-[#df2935] hover:bg-[#c41e2a] text-white px-6 rounded-xl"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Nakúpené section */}
            {completedItems.length > 0 && (
              <div className="border-t border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">Nakúpené</h4>
                  <Badge className="bg-green-100 text-green-700">
                    {completedItems.length} položiek
                  </Badge>
                </div>
                <div className="space-y-3">
                  {completedItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-green-50 rounded-xl opacity-75">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={item.completed}
                          onCheckedChange={() => toggleItem(item.id)}
                          className="border-2"
                        />
                        <div>
                          <p className="font-medium line-through text-gray-700">{item.name}</p>
                          <span className="text-sm text-gray-600">
                            €{item.bestPrice.toFixed(2)} v {item.bestStore}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* View Options */}
      <Card className="bg-white border border-gray-100 rounded-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-gray-900">Možnosti zobrazenia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant={selectedStore === 'Najlepšie ceny' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedStore('Najlepšie ceny')}
              className={selectedStore === 'Najlepšie ceny' ? 'bg-[#df2935] hover:bg-[#c41e2a]' : ''}
            >
              Najlepšie ceny
            </Button>
            {stores.map(store => (
              <Button
                key={store}
                variant={selectedStore === store ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStore(store)}
                className={selectedStore === store ? 'bg-[#df2935] hover:bg-[#c41e2a]' : ''}
              >
                {store} ({itemsByStore[store].length} položiek)
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shopping Summary - below view options */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 rounded-2xl">
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <p className="text-xs text-blue-700 mb-1">Celkom položiek</p>
              <p className="text-xl font-bold text-blue-900">{listItems.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 rounded-2xl">
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <p className="text-xs text-green-700 mb-1">Odhadovaná suma</p>
              <p className="text-xl font-bold text-green-900">€{totalCost.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 rounded-2xl">
          <CardContent className="pt-4 pb-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <p className="text-xs text-orange-700 mb-1">Počet obchodov</p>
              <p className="text-xl font-bold text-orange-900">{stores.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Store-specific view - shown when not "Najlepšie ceny" */}
      {selectedStore !== 'Najlepšie ceny' && (
        <Card className="bg-white border border-gray-100 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-gray-900">
              <span>Nákup v {selectedStore}</span>
              <Badge variant="secondary" className="bg-gray-100">
                {itemsByStore[selectedStore]?.length || 0} položiek
              </Badge>
            </CardTitle>
            {storeLocations[selectedStore] && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{storeLocations[selectedStore].address} • {storeLocations[selectedStore].distance}</span>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {itemsByStore[selectedStore]?.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => toggleItem(item.id)}
                      className="border-2"
                    />
                    <div>
                      <p className={`font-medium ${item.completed ? 'line-through opacity-60' : 'text-gray-900'}`}>
                        {item.name}
                      </p>
                      <Badge variant="outline" className="text-xs mt-1 bg-white border-gray-200">{item.category}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-green-600">€{item.bestPrice.toFixed(2)}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )) || (
                <p className="text-gray-600 text-center py-8">
                  Žiadne položky na nákup v tomto obchode.
                </p>
              )}
            </div>
            {itemsByStore[selectedStore] && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Suma za obchod:</span>
                  <span className="text-xl font-bold text-green-600">
                    €{itemsByStore[selectedStore].reduce((sum, item) => sum + item.bestPrice, 0).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}