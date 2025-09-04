import { QrCode, Receipt, Gift, MapPin, BarChart3, Clock } from 'lucide-react';
import { Card } from './ui/card';

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  onClick: () => void;
}

interface QuickActionsProps {
  onAction?: (actionId: string) => void;
}

export function QuickActions({ onAction }: QuickActionsProps) {
  const actions: QuickAction[] = [
    {
      id: 'scan',
      title: 'Skenovať QR',
      subtitle: 'Porovnať ceny',
      icon: QrCode,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      onClick: () => onAction?.('scan')
    },
    {
      id: 'receipts',
      title: 'Účtenky',
      subtitle: 'História nákupov',
      icon: Receipt,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      onClick: () => onAction?.('receipts')
    },
    {
      id: 'rewards',
      title: 'Odmeny',
      subtitle: 'Zbieraj body',
      icon: Gift,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      onClick: () => onAction?.('rewards')
    },
    {
      id: 'route',
      title: 'Optimálna trasa',
      subtitle: 'Najrýchlejší nákup',
      icon: MapPin,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      onClick: () => onAction?.('route')
    }
  ];

  return (
    <div className="px-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Rýchle akcie</h2>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          
          return (
            <Card 
              key={action.id}
              className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={action.onClick}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${action.bgColor} rounded-xl flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${action.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{action.title}</h3>
                  <p className="text-xs text-gray-600">{action.subtitle}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Weekly insights */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-4 mt-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900">Týždenný prehľad</h3>
            <p className="text-xs text-gray-600">Ušetrili ste 15% oproti minulému týždňu</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-purple-600">€23</p>
            <p className="text-xs text-purple-600">ušetrené</p>
          </div>
        </div>
      </Card>
    </div>
  );
}