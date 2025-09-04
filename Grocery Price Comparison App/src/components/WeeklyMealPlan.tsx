import { Plus, Calendar, ShoppingCart, Check, X } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState } from 'react';

interface MealPlan {
  day: string;
  date: string;
  meals: {
    breakfast?: { name: string; cost: number; ingredients: number };
    lunch?: { name: string; cost: number; ingredients: number };
    dinner?: { name: string; cost: number; ingredients: number };
  };
}

interface Ingredient {
  name: string;
  amount: string;
  price: number;
  store: string;
  haveAtHome: boolean;
}

interface WeeklyMealPlanProps {
  onAddMeal?: (day: string, mealType: string) => void;
  onGenerateShoppingList?: (ingredients: Ingredient[]) => void;
}

export function WeeklyMealPlan({ onAddMeal, onGenerateShoppingList }: WeeklyMealPlanProps) {
  const [selectedWeek, setSelectedWeek] = useState('Tento týždeň');
  
  const currentWeek: MealPlan[] = [
    {
      day: 'Pondelok',
      date: '2.9',
      meals: {
        breakfast: { name: 'Avokádový toast', cost: 3.20, ingredients: 4 },
        lunch: { name: 'Cestoviny s paradajkami', cost: 4.50, ingredients: 4 },
      }
    },
    {
      day: 'Utorok',
      date: '3.9',
      meals: {
        breakfast: { name: 'Müsli s ovocím', cost: 2.80, ingredients: 5 },
        dinner: { name: 'Grilovaný losos', cost: 12.80, ingredients: 4 },
      }
    },
    {
      day: 'Streda',
      date: '4.9',
      meals: {
        lunch: { name: 'Kurací šalát', cost: 6.20, ingredients: 6 },
      }
    },
    {
      day: 'Štvrtok',
      date: '5.9',
      meals: {}
    },
    {
      day: 'Piatok',
      date: '6.9',
      meals: {}
    },
    {
      day: 'Sobota',
      date: '7.9',
      meals: {}
    },
    {
      day: 'Nedeľa',
      date: '8.9',
      meals: {}
    }
  ];

  const allIngredients: Ingredient[] = [
    { name: 'Avokádo', amount: '2 ks', price: 2.40, store: 'Lidl', haveAtHome: false },
    { name: 'Chlieb', amount: '1 ks', price: 1.60, store: 'Tesco', haveAtHome: true },
    { name: 'Vajíčka', amount: '6 ks', price: 1.80, store: 'Kaufland', haveAtHome: false },
    { name: 'Cestoviny', amount: '500g', price: 2.00, store: 'Lidl', haveAtHome: false },
    { name: 'Paradajky', amount: '1kg', price: 4.20, store: 'Tesco', haveAtHome: false },
    { name: 'Müsli', amount: '1 ks', price: 3.50, store: 'Billa', haveAtHome: true },
    { name: 'Banány', amount: '1kg', price: 1.90, store: 'Lidl', haveAtHome: false },
    { name: 'Lososový filet', amount: '400g', price: 11.20, store: 'Tesco', haveAtHome: false }
  ];

  const totalCost = currentWeek.reduce((total, day) => {
    return total + Object.values(day.meals).reduce((dayTotal, meal) => dayTotal + (meal?.cost || 0), 0);
  }, 0);

  const totalIngredients = allIngredients.filter(ing => !ing.haveAtHome).length;
  const neededIngredientsCost = allIngredients
    .filter(ing => !ing.haveAtHome)
    .reduce((total, ing) => total + ing.price, 0);

  const getMealTypeIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return '🥞';
      case 'lunch': return '🥗';
      case 'dinner': return '🍽️';
      default: return '🍴';
    }
  };

  const getMealTypeName = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return 'Raňajky';
      case 'lunch': return 'Obed';
      case 'dinner': return 'Večera';
      default: return '';
    }
  };

  return (
    <div className="px-6 mb-8">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Týždenný plán</h2>
          <Calendar className="h-5 w-5 text-[#df2935]" />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-[#df2935] border-[#df2935] hover:bg-[#df2935] hover:text-white rounded-xl"
        >
          {selectedWeek}
        </Button>
      </div>

      {/* Weekly summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-4 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-blue-700">Celková cena</p>
            <p className="text-xl font-bold text-blue-900">€{totalCost.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-blue-700">Naplánované jedlá</p>
            <p className="text-xl font-bold text-blue-900">
              {currentWeek.reduce((total, day) => total + Object.keys(day.meals).length, 0)}
            </p>
          </div>
          <div>
            <p className="text-sm text-blue-700">Potrebné suroviny</p>
            <p className="text-xl font-bold text-blue-900">{totalIngredients}</p>
          </div>
        </div>
      </Card>

      {/* Daily meal plan */}
      <div className="space-y-3 mb-6">
        {currentWeek.map((day, index) => (
          <Card key={index} className="bg-white border border-gray-100 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-medium text-gray-900">{day.day}</h3>
                <p className="text-sm text-gray-500">{day.date}. september</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  €{Object.values(day.meals).reduce((total, meal) => total + (meal?.cost || 0), 0).toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">
                  {Object.keys(day.meals).length}/3 jedál
                </p>
              </div>
            </div>

            {/* Meals for the day */}
            <div className="grid grid-cols-3 gap-2">
              {['breakfast', 'lunch', 'dinner'].map((mealType) => {
                const meal = day.meals[mealType as keyof typeof day.meals];
                
                return (
                  <div key={mealType} className="text-center">
                    <p className="text-xs text-gray-500 mb-2">{getMealTypeName(mealType)}</p>
                    {meal ? (
                      <div className="bg-gray-50 rounded-xl p-3 min-h-[80px] flex flex-col justify-center">
                        <span className="text-lg mb-1">{getMealTypeIcon(mealType)}</span>
                        <p className="text-xs font-medium text-gray-900 mb-1">{meal.name}</p>
                        <p className="text-xs text-[#df2935] font-medium">€{meal.cost.toFixed(2)}</p>
                      </div>
                    ) : (
                      <button
                        onClick={() => onAddMeal?.(day.day, mealType)}
                        className="bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-200 rounded-xl p-3 min-h-[80px] flex flex-col items-center justify-center w-full transition-colors"
                      >
                        <Plus className="h-5 w-5 text-gray-400 mb-1" />
                        <p className="text-xs text-gray-400">Pridať</p>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>

      {/* Shopping list preview */}
      <Card className="bg-white border border-gray-100 rounded-2xl p-4 mb-4">
        <h3 className="font-medium text-gray-900 mb-3">Potrebné suroviny</h3>
        <div className="space-y-2 mb-4">
          {allIngredients.slice(0, 4).map((ingredient, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <button className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  ingredient.haveAtHome 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : 'border-gray-300 hover:border-[#df2935]'
                }`}>
                  {ingredient.haveAtHome && <Check className="h-3 w-3" />}
                </button>
                <div>
                  <p className={`text-sm ${ingredient.haveAtHome ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                    {ingredient.name} - {ingredient.amount}
                  </p>
                  <p className="text-xs text-gray-500">{ingredient.store}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${ingredient.haveAtHome ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                  €{ingredient.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100 mb-4">
          <span className="font-medium text-gray-900">Celkom potrebujem:</span>
          <span className="font-bold text-[#df2935]">€{neededIngredientsCost.toFixed(2)}</span>
        </div>

        <Button
          onClick={() => onGenerateShoppingList?.(allIngredients)}
          className="w-full bg-[#df2935] hover:bg-[#c41e2a] text-white rounded-2xl"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Vytvoriť nákupný zoznam
        </Button>
      </Card>
    </div>
  );
}