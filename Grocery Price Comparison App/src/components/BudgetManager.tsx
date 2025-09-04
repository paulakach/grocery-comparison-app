import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { PlusCircle, BarChart3, AlertTriangle, CheckCircle, TrendingUp, ShoppingBag } from 'lucide-react';

// Mock data for demonstration - Slovak version with 250 EUR budget
const mockBudget = {
  monthly: 250,
  spent: 157.34,
  categories: [
    { name: 'Ovocie & Zelenina', budget: 60, spent: 43.25 },
    { name: 'Mäso & Ryby', budget: 80, spent: 67.89 },
    { name: 'Mliečne & Vajcia', budget: 40, spent: 28.60 },
    { name: 'Pekárenské', budget: 35, spent: 17.60 },
    { name: 'Nápoje & Ostatné', budget: 35, spent: 0 }
  ]
};

const mockTransactions = [
  { id: 1, store: 'Tesco', amount: 23.45, category: 'Ovocie & Zelenina', date: '2. september' },
  { id: 2, store: 'Lidl', amount: 35.67, category: 'Mäso & Ryby', date: '1. september' },
  { id: 3, store: 'Kaufland', amount: 12.30, category: 'Mliečne & Vajcia', date: '31. august' },
  { id: 4, store: 'Billa', amount: 8.90, category: 'Pekárenské', date: '30. august' },
  { id: 5, store: 'Tesco', amount: 19.80, category: 'Ovocie & Zelenina', date: '29. august' }
];

export function BudgetManager() {
  const [budget, setBudget] = useState(mockBudget);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [newTransaction, setNewTransaction] = useState({
    store: '',
    amount: '',
    category: 'Ovocie & Zelenina'
  });

  const totalProgress = Math.min((budget.spent / budget.monthly) * 100, 100);
  const isOverBudget = budget.spent > budget.monthly;

  const getBudgetStatus = (spent: number, budgetAmount: number) => {
    const percentage = (spent / budgetAmount) * 100;
    if (percentage >= 100) return 'over';
    if (percentage >= 80) return 'warning';
    return 'good';
  };

  const getStoreColor = (store: string) => {
    const colors = {
      'Tesco': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
      'Lidl': { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' },
      'Kaufland': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
      'Billa': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' }
    };
    return colors[store as keyof typeof colors] || { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' };
  };

  const addTransaction = () => {
    if (!newTransaction.store || !newTransaction.amount) return;

    const amount = parseFloat(newTransaction.amount);
    const transaction = {
      id: Date.now(),
      store: newTransaction.store,
      amount,
      category: newTransaction.category,
      date: new Date().toLocaleDateString('sk-SK', { day: 'numeric', month: 'long' })
    };

    setTransactions([transaction, ...transactions]);
    
    // Update budget
    const updatedBudget = { ...budget };
    updatedBudget.spent += amount;
    const categoryIndex = updatedBudget.categories.findIndex(c => c.name === newTransaction.category);
    if (categoryIndex !== -1) {
      updatedBudget.categories[categoryIndex].spent += amount;
    }
    setBudget(updatedBudget);

    // Reset form
    setNewTransaction({ store: '', amount: '', category: 'Ovocie & Zelenina' });
  };

  return (
    <div className="space-y-6">
      {/* Overall Budget Overview */}
      <Card className="bg-white border border-gray-100 rounded-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <div className="w-8 h-8 bg-[#df2935] bg-opacity-10 rounded-xl flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-[#df2935]" />
            </div>
            Mesačný rozpočet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Celkové výdavky</span>
              <span className={`text-xl font-bold ${isOverBudget ? 'text-red-600' : 'text-gray-900'}`}>
                €{budget.spent.toFixed(2)} / €{budget.monthly}
              </span>
            </div>
            <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  isOverBudget ? 'bg-red-500' : totalProgress >= 80 ? 'bg-yellow-500' : 'bg-[#df2935]'
                }`}
                style={{ width: `${Math.min(totalProgress, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{totalProgress.toFixed(1)}% využité</span>
              <span>€{(budget.monthly - budget.spent).toFixed(2)} zostáva</span>
            </div>
            {isOverBudget && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-xl">
                <AlertTriangle className="h-4 w-4" />
                <span>Prekročili ste rozpočet o €{(budget.spent - budget.monthly).toFixed(2)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Category Budgets */}
      <Card className="bg-white border border-gray-100 rounded-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-gray-900">Rozpočet podľa kategórií</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budget.categories.map(category => {
              const percentage = (category.spent / category.budget) * 100;
              const status = getBudgetStatus(category.spent, category.budget);
              
              return (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{category.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700">€{category.spent.toFixed(2)} / €{category.budget}</span>
                      {status === 'good' && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {status === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                      {status === 'over' && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        status === 'over' ? 'bg-red-500' : 
                        status === 'warning' ? 'bg-yellow-500' : 
                        'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{percentage.toFixed(1)}% využité</span>
                    <span>€{(category.budget - category.spent).toFixed(2)} zostáva</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Add New Transaction */}
      <Card className="bg-white border border-gray-100 rounded-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center">
              <PlusCircle className="h-5 w-5 text-green-600" />
            </div>
            Pridať nový nákup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="store" className="text-gray-700">Obchod</Label>
              <select 
                id="store"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:ring-2 focus:ring-[#df2935] focus:border-transparent"
                value={newTransaction.store}
                onChange={(e) => setNewTransaction({...newTransaction, store: e.target.value})}
              >
                <option value="">Vyberte obchod</option>
                <option value="Tesco">Tesco</option>
                <option value="Lidl">Lidl</option>
                <option value="Kaufland">Kaufland</option>
                <option value="Billa">Billa</option>
              </select>
            </div>
            <div>
              <Label htmlFor="amount" className="text-gray-700">Suma</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                className="bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#df2935] focus:border-transparent"
              />
            </div>
            <div>
              <Label htmlFor="category" className="text-gray-700">Kategória</Label>
              <select 
                id="category"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:ring-2 focus:ring-[#df2935] focus:border-transparent"
                value={newTransaction.category}
                onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
              >
                {budget.categories.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={addTransaction} 
                className="w-full bg-[#df2935] hover:bg-[#c41e2a] text-white rounded-xl"
              >
                Pridať nákup
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="bg-white border border-gray-100 rounded-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-blue-600" />
            </div>
            Nedávne nákupy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.slice(0, 8).map((transaction, index) => {
              const storeColors = getStoreColor(transaction.store);
              
              return (
                <div key={transaction.id}>
                  <div className="flex justify-between items-center py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${storeColors.bg} rounded-xl flex items-center justify-center`}>
                        <span className={`font-bold text-sm ${storeColors.text}`}>
                          {transaction.store.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.store}</p>
                        <div className="flex items-center gap-2">
                          <Badge 
                            className={`text-xs px-2 py-1 ${storeColors.bg} ${storeColors.text} border-0`}
                          >
                            {transaction.category}
                          </Badge>
                          <span className="text-sm text-gray-500">{transaction.date}</span>
                        </div>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900">€{transaction.amount.toFixed(2)}</span>
                  </div>
                  {index < transactions.slice(0, 8).length - 1 && <Separator className="my-1" />}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Statistics Summary */}
      <Card className="bg-gradient-to-br from-[#df2935] to-[#c41e2a] border-0 rounded-2xl text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">Štatistiky tohto mesiaca</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-white/80 text-sm">Najnavštevovanejší obchod</p>
              <p className="font-bold">Tesco</p>
            </div>
            <div>
              <p className="text-white/80 text-sm">Priemerný nákup</p>
              <p className="font-bold">€{(budget.spent / transactions.length).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-white/80 text-sm">Najdrahšia kategória</p>
              <p className="font-bold">Mäso & Ryby</p>
            </div>
            <div>
              <p className="text-white/80 text-sm">Počet nákupov</p>
              <p className="font-bold">{transactions.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}