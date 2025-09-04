import { MapPin, Clock, ArrowRight, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface Store {
  id: string;
  name: string;
  distance: string;
  openUntil: string;
  isOpen: boolean;
  offers: number;
  rating: number;
  specialOffer?: string;
}

interface NearbyStoresProps {
  onStoreSelect?: (store: Store) => void;
}

export function NearbyStores({ onStoreSelect }: NearbyStoresProps) {
  const stores: Store[] = [
    {
      id: '1',
      name: 'Tesco Extra',
      distance: '0.8 km',
      openUntil: '22:00',
      isOpen: true,
      offers: 47,
      rating: 4.2,
      specialOffer: 'Dvojbalenie za 1€'
    },
    {
      id: '2',
      name: 'Kaufland',
      distance: '1.2 km',
      openUntil: '21:00',
      isOpen: true,
      offers: 23,
      rating: 4.0
    },
    {
      id: '3',
      name: 'Lidl',
      distance: '1.5 km',
      openUntil: '20:00',
      isOpen: true,
      offers: 31,
      rating: 4.3,
      specialOffer: 'Týždeň ponúk'
    },
    {
      id: '4',
      name: 'Billa',
      distance: '2.1 km',
      openUntil: '21:30',
      isOpen: false,
      offers: 18,
      rating: 3.9
    }
  ];

  const getStoreColors = (name: string) => {
    const colors = {
      'Tesco Extra': { primary: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
      'Kaufland': { primary: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
      'Lidl': { primary: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
      'Billa': { primary: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' }
    };
    return colors[name as keyof typeof colors] || { primary: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' };
  };

  return (
    <div className="px-6 mb-8">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Obchody v okolí</h2>
          <MapPin className="h-5 w-5 text-gray-600" />
        </div>
        <button className="text-[#df2935] text-sm font-medium">Zobraziť všetky</button>
      </div>

      <div className="space-y-3">
        {stores.map((store) => {
          const colors = getStoreColors(store.name);
          
          return (
            <Card 
              key={store.id}
              className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onStoreSelect?.(store)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  {/* Store icon */}
                  <div className={`w-12 h-12 ${colors.bg} ${colors.border} border rounded-xl flex items-center justify-center`}>
                    <span className={`text-lg font-bold ${colors.primary}`}>
                      {store.name.charAt(0)}
                    </span>
                  </div>

                  {/* Store info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900">{store.name}</h3>
                      {store.specialOffer && (
                        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 text-xs px-2 py-0 h-5">
                          <Zap className="h-3 w-3 mr-1" />
                          Akcia
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{store.distance}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span className={store.isOpen ? 'text-green-600' : 'text-red-600'}>
                          {store.isOpen ? `Do ${store.openUntil}` : 'Zatvorené'}
                        </span>
                      </div>
                      
                      <span className="text-[#df2935] font-medium">
                        {store.offers} ponúk
                      </span>
                    </div>

                    {store.specialOffer && (
                      <p className="text-xs text-orange-700 mt-1 font-medium">
                        {store.specialOffer}
                      </p>
                    )}
                  </div>
                </div>

                {/* Arrow */}
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}