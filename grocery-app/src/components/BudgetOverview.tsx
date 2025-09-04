import { Card } from './ui/card';
import { Button } from './ui/button';
import { TrendingUp, TrendingDown, Calendar, Target } from 'lucide-react';

interface BudgetOverviewProps {
  spent: number;
  budget: number;
  onUpdate?: () => void;
}

export function BudgetOverview({ spent, budget, onUpdate }: BudgetOverviewProps) {
  const remaining = budget - spent;
  const spentPercentage = (spent / budget) * 100;
  const isOverBudget = spent > budget;
  
  // Mock data for spending categories
  const categories = [
    { name: 'Ovocie & Zelenina', amount: 35, color: '#009151', percentage: 35 },
    { name: 'Mäso & Ryby', amount: 28, color: '#df2935', percentage: 28 },
    { name: 'Mliečne výrobky', amount: 22, color: '#f5a623', percentage: 22 },
    { name: 'Ostatné', amount: 15, color: '#65737e', percentage: 15 }
  ];

  const trend = isOverBudget ? 'over' : spent > budget * 0.8 ? 'warning' : 'good';

  return (
    <div className="px-6 mb-6">
      <h2 className="text-xl font-medium text-[#333b42] mb-6">
        Výdaje na potraviny
      </h2>
      
      {/* Main budget card */}
      <Card className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-3xl p-6 mb-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Target className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Mesačný rozpočet</p>
              <p className="text-2xl font-semibold text-gray-900">€{budget}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`flex items-center gap-1 ${
              trend === 'over' ? 'text-red-600' : 
              trend === 'warning' ? 'text-orange-600' : 'text-green-600'
            }`}>
              {trend === 'over' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span className="text-sm font-medium">
                {isOverBudget ? '+' : ''}{Math.round(spentPercentage)}%
              </span>
            </div>
            <p className="text-xs text-gray-500">z rozpočtu</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Minuté: €{spent}</span>
            <span className={`font-medium ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
              {isOverBudget ? 'Prekročené o €' : 'Zostáva €'}{Math.abs(remaining)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-300 ${
                isOverBudget ? 'bg-red-500' : spentPercentage > 80 ? 'bg-orange-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(spentPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-1">
              <span className="text-green-600 text-xs font-semibold">7</span>
            </div>
            <p className="text-xs text-gray-600">Dní zostáva</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-1">
              <span className="text-blue-600 text-xs font-semibold">23</span>
            </div>
            <p className="text-xs text-gray-600">Nákupy</p>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-1">
              <span className="text-purple-600 text-xs font-semibold">€{(spent / 23).toFixed(1)}</span>
            </div>
            <p className="text-xs text-gray-600">Priemer</p>
          </div>
        </div>
      </Card>

      {/* Categories breakdown */}
      <Card className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 shadow-sm">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Kategórie výdajov</h3>
        <div className="space-y-3">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm text-gray-700">{category.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">€{category.amount}</span>
                <span className="text-xs text-gray-500">{category.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Action button */}
      <div className="flex gap-3">
        <Button
          onClick={onUpdate}
          className="flex-1 bg-[#df2935] hover:bg-[#c41e2a] text-white py-3 rounded-2xl text-sm font-medium"
        >
          Aktualizovať rozpočet
        </Button>
        <Button
          variant="outline"
          className="px-4 py-3 rounded-2xl border-gray-200 text-gray-700 hover:bg-gray-50"
        >
          <Calendar className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}