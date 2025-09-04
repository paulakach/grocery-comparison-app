import { Search, Bell, MapPin, TrendingDown } from 'lucide-react';
import { Input } from './ui/input';
import { Card } from './ui/card';

interface HeaderProps {
  userName?: string;
  onSearch?: (query: string) => void;
  onStoreSelect?: (store: string) => void;
}

export function Header({ userName = "Paula", onSearch, onStoreSelect }: HeaderProps) {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50/30 px-6 pt-[max(56px,env(safe-area-inset-top)+56px)] pb-6">
      {/* Profile section with location */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="h-4 w-4 text-[#65737e]" />
            <p className="text-sm text-[#65737e]">Bratislava, SK</p>
          </div>
          <p className="text-sm text-[#65737e] mb-1">Vitaj späť 👋</p>
          <h1 className="text-2xl text-[#333b42]">{userName}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell className="h-6 w-6 text-[#65737e]" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#df2935] rounded-full"></div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-[#df2935] to-[#c41e2a] rounded-full flex items-center justify-center shadow-lg">
            <span className="text-xl">👤</span>
          </div>
        </div>
      </div>

      {/* Store logos */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <button 
          onClick={() => onStoreSelect?.('Tesco')}
          className="bg-white border border-gray-200 p-3 rounded-2xl hover:shadow-md transition-shadow"
        >
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <p className="text-xs text-gray-600">Tesco</p>
          </div>
        </button>
        <button 
          onClick={() => onStoreSelect?.('Lidl')}
          className="bg-white border border-gray-200 p-3 rounded-2xl hover:shadow-md transition-shadow"
        >
          <div className="text-center">
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <p className="text-xs text-gray-600">Lidl</p>
          </div>
        </button>
        <button 
          onClick={() => onStoreSelect?.('Kaufland')}
          className="bg-white border border-gray-200 p-3 rounded-2xl hover:shadow-md transition-shadow"
        >
          <div className="text-center">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <p className="text-xs text-gray-600">Kaufland</p>
          </div>
        </button>
        <button 
          onClick={() => onStoreSelect?.('Billa')}
          className="bg-white border border-gray-200 p-3 rounded-2xl hover:shadow-md transition-shadow"
        >
          <div className="text-center">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <p className="text-xs text-gray-600">Billa</p>
          </div>
        </button>
      </div>

      {/* Search bar */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <Search className="h-5 w-5 text-[#9ca3af]" />
        </div>
        <Input
          placeholder="Vyhľadať produkty, obchody, značky..."
          className="pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder:text-[#9ca3af] shadow-sm focus:shadow-md transition-shadow"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>
    </div>
  );
}