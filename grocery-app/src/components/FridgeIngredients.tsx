import { useState } from 'react';
import { Plus, X, Refrigerator, Sparkles, ChefHat, Clock, Share2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface FridgeIngredientsProps {
  onGenerateRecipe?: (ingredients: string[]) => void;
  onRecipeSelect?: (recipe: any) => void;
}

export function FridgeIngredients({ onGenerateRecipe, onRecipeSelect }: FridgeIngredientsProps) {
  const [ingredients, setIngredients] = useState<string[]>(['paradajky', 'mozzarella']);
  const [newIngredient, setNewIngredient] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestedRecipes, setSuggestedRecipes] = useState<any[]>([]);

  const addIngredient = () => {
    if (newIngredient.trim() && !ingredients.includes(newIngredient.trim().toLowerCase())) {
      setIngredients([...ingredients, newIngredient.trim().toLowerCase()]);
      setNewIngredient('');
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(item => item !== ingredient));
  };

  const generateRecipes = async () => {
    if (ingredients.length === 0) return;
    
    setIsGenerating(true);
    
    // Simulate AI recipe generation
    setTimeout(() => {
      const mockRecipes = [
        {
          id: '1',
          title: 'Caprese šalát s paradajkami',
          time: '10 min',
          difficulty: 'Ľahké',
          price: '€3.20',
          image: '🍅',
          ingredients: ingredients.slice(0, 3),
          description: 'Jednoduchý a čerstvý šalát s paradajkami a mozzarellou'
        },
        {
          id: '2', 
          title: 'Pečené paradajky s mozarellou',
          time: '25 min',
          difficulty: 'Stredné',
          price: '€4.50',
          image: '🧀',
          ingredients: ingredients.slice(0, 2),
          description: 'Zapečané paradajky plnené mozzarellou a bylinkami'
        }
      ];
      
      setSuggestedRecipes(mockRecipes);
      setIsGenerating(false);
    }, 2000);
  };

  const shareIngredients = () => {
    const shareText = `Moje ingrediencie v chladničke: ${ingredients.join(', ')}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Zdieľané ingrediencie',
        text: shareText,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(shareText).then(() => {
        // Show toast or alert that link was copied
        alert('Zoznam ingrediencií bol skopírovaný do schránky!');
      });
    }
  };

  const commonIngredients = [
    'vajcia', 'mlieko', 'maslo', 'cibuľa', 'cesnak', 'mrkva', 
    'zemiaky', 'ryža', 'cestoviny', 'chlieb', 'syr', 'jogurt'
  ];

  return (
    <div className="px-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
            <Refrigerator className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Čo máme v chladničke</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 border-[#df2935] text-[#df2935] hover:bg-[#df2935] hover:text-white rounded-xl px-3 py-2"
          onClick={shareIngredients}
        >
          <Share2 className="h-4 w-4" />
          Zdieľať
        </Button>
      </div>

      <Card className="bg-white border border-gray-100 rounded-2xl p-4 mb-4">
        {/* Add ingredient input */}
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Pridať ingredienciu..."
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
            className="flex-1 bg-gray-50 border-0 rounded-xl"
          />
          <Button
            onClick={addIngredient}
            size="sm"
            className="bg-[#df2935] hover:bg-[#c41e2a] text-white px-4 rounded-xl"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Current ingredients */}
        {ingredients.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Vaše ingrediencie:</p>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient) => (
                <Badge
                  key={ingredient}
                  className="bg-blue-50 text-blue-700 border-0 px-3 py-1 rounded-full flex items-center gap-1"
                >
                  {ingredient}
                  <button
                    onClick={() => removeIngredient(ingredient)}
                    className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Quick add common ingredients */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Časté ingrediencie:</p>
          <div className="flex flex-wrap gap-2">
            {commonIngredients
              .filter(item => !ingredients.includes(item))
              .slice(0, 6)
              .map((ingredient) => (
                <button
                  key={ingredient}
                  onClick={() => setIngredients([...ingredients, ingredient])}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                >
                  + {ingredient}
                </button>
              ))}
          </div>
        </div>

        {/* Generate button */}
        <Button
          onClick={generateRecipes}
          disabled={ingredients.length === 0 || isGenerating}
          className="w-full bg-gradient-to-r from-[#df2935] to-[#c41e2a] hover:from-[#c41e2a] hover:to-[#b01728] text-white py-3 rounded-xl disabled:opacity-50"
        >
          {isGenerating ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generujem recepty...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Vygenerovať recepty
            </div>
          )}
        </Button>
      </Card>

      {/* Generated recipes */}
      {suggestedRecipes.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ChefHat className="h-5 w-5 text-[#df2935]" />
            <h3 className="font-medium text-gray-900">Navrhované recepty</h3>
          </div>
          
          <div className="space-y-3">
            {suggestedRecipes.map((recipe) => (
              <Card 
                key={recipe.id}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onRecipeSelect?.(recipe)}
              >
                <div className="p-4">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-2xl">
                      {recipe.image}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">
                            {recipe.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {recipe.description}
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-700 text-xs px-2 py-1">
                          AI navrhnuté
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {recipe.time}
                        </div>
                        <span>•</span>
                        <span>{recipe.difficulty}</span>
                        <span>•</span>
                        <span className="font-medium text-[#df2935]">{recipe.price}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500">Používa:</span>
                        <div className="flex gap-1">
                          {recipe.ingredients.map((ingredient: string) => (
                            <Badge
                              key={ingredient}
                              className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 border-0"
                            >
                              {ingredient}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}