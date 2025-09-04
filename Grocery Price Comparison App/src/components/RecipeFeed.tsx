import { Heart, MessageCircle, Share2, Clock, Users, ChefHat, ShoppingCart } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Recipe {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  image: string;
  prepTime: string;
  servings: number;
  difficulty: 'Jednoduché' | 'Stredné' | 'Náročné';
  tags: string[];
  likes: number;
  comments: number;
  isLiked: boolean;
  estimatedCost: number;
  ingredients: Array<{
    name: string;
    amount: string;
    price: number;
    store: string;
  }>;
  description: string;
}

interface RecipeFeedProps {
  onRecipeSelect: (recipe: Recipe) => void;
  onPlanMeal: (recipe: Recipe) => void;
}

export function RecipeFeed({ onRecipeSelect, onPlanMeal }: RecipeFeedProps) {
  const recipes: Recipe[] = [
    {
      id: '1',
      title: 'Avokádový toast s vajíčkom',
      author: 'Mária K.',
      authorAvatar: '👩‍🍳',
      image: 'https://images.unsplash.com/photo-1676471970358-1cff04452e7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdm9jYWRvJTIwdG9hc3QlMjBicmVha2Zhc3R8ZW58MXx8fHwxNzU2NzExNjI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      prepTime: '10 min',
      servings: 2,
      difficulty: 'Jednoduché',
      tags: ['Raňajky', 'Zdravé', 'Vegetariánske'],
      likes: 127,
      comments: 23,
      isLiked: true,
      estimatedCost: 3.20,
      ingredients: [
        { name: 'Avokádo', amount: '1 ks', price: 1.20, store: 'Lidl' },
        { name: 'Chlieb', amount: '2 plátky', price: 0.80, store: 'Tesco' },
        { name: 'Vajíčka', amount: '2 ks', price: 0.60, store: 'Kaufland' },
        { name: 'Sól, korenie', amount: 'podľa chuti', price: 0.60, store: 'Billa' }
      ],
      description: 'Perfektné raňajky pre dobrý začiatok dňa!'
    },
    {
      id: '2',
      title: 'Cestoviny s paradajkami a bazalkou',
      author: 'Peter S.',
      authorAvatar: '👨‍🍳',
      image: 'https://images.unsplash.com/photo-1714385988516-85f063e4fcdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMHRvbWF0b2VzJTIwaXRhbGlhbnxlbnwxfHx8fDE3NTY4MTE1NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      prepTime: '25 min',
      servings: 4,
      difficulty: 'Jednoduché',
      tags: ['Obed', 'Talianske', 'Vegetariánske'],
      likes: 89,
      comments: 15,
      isLiked: false,
      estimatedCost: 4.50,
      ingredients: [
        { name: 'Cestoviny', amount: '300g', price: 1.20, store: 'Lidl' },
        { name: 'Paradajky', amount: '500g', price: 2.10, store: 'Tesco' },
        { name: 'Bazalka', amount: '1 zväzok', price: 0.80, store: 'Billa' },
        { name: 'Olivový olej', amount: '2 lyžice', price: 0.40, store: 'Kaufland' }
      ],
      description: 'Klasická talianská jednoduchost na tanieri.'
    },
    {
      id: '3',
      title: 'Grilovaný losos so zeleninou',
      author: 'Anna M.',
      authorAvatar: '👩‍🍳',
      image: 'https://images.unsplash.com/photo-1746783840967-738ea85b0f25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjB2ZWdldGFibGVzJTIwZGlubmVyfGVufDF8fHx8MTc1NjgxMTU2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      prepTime: '30 min',
      servings: 2,
      difficulty: 'Stredné',
      tags: ['Večera', 'Zdravé', 'Ryby'],
      likes: 156,
      comments: 31,
      isLiked: true,
      estimatedCost: 12.80,
      ingredients: [
        { name: 'Lososový filet', amount: '300g', price: 8.50, store: 'Tesco' },
        { name: 'Brokolica', amount: '200g', price: 1.80, store: 'Lidl' },
        { name: 'Mrkva', amount: '150g', price: 0.90, store: 'Kaufland' },
        { name: 'Citrón', amount: '1 ks', price: 1.60, store: 'Billa' }
      ],
      description: 'Zdravá večera plná omega-3 mastných kyselín.'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Jednoduché': return 'bg-green-100 text-green-700';
      case 'Stredné': return 'bg-yellow-100 text-yellow-700';
      case 'Náročné': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="px-6 mb-8">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Recepty komunity</h2>
          <ChefHat className="h-5 w-5 text-[#df2935]" />
        </div>
        <button className="text-[#df2935] text-sm font-medium">Pridať recept</button>
      </div>

      <div className="space-y-6">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
            {/* Recipe header */}
            <div className="p-4 pb-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">{recipe.authorAvatar}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{recipe.author}</h3>
                    <p className="text-xs text-gray-500">2 hodiny</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              <h4 className="font-medium text-gray-900 mb-2">{recipe.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{recipe.description}</p>

              {/* Tags */}
              <div className="flex gap-2 mb-3">
                {recipe.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                    {tag}
                  </Badge>
                ))}
                <Badge className={`text-xs px-2 py-1 ${getDifficultyColor(recipe.difficulty)}`}>
                  {recipe.difficulty}
                </Badge>
              </div>
            </div>

            {/* Recipe image */}
            <div className="aspect-[4/3] relative overflow-hidden">
              <ImageWithFallback
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay info */}
              <div className="absolute top-3 left-3 flex gap-2">
                <div className="bg-black/70 text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {recipe.prepTime}
                </div>
                <div className="bg-black/70 text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {recipe.servings}
                </div>
              </div>

              <div className="absolute top-3 right-3">
                <div className="bg-[#df2935] text-white px-2 py-1 rounded-lg text-xs font-bold">
                  €{recipe.estimatedCost.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Recipe actions */}
            <div className="p-4 pt-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2">
                    <Heart className={`h-5 w-5 ${recipe.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                    <span className="text-sm text-gray-600">{recipe.likes}</span>
                  </button>
                  <button className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">{recipe.comments}</span>
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={() => onRecipeSelect(recipe)}
                  variant="outline"
                  className="flex-1 rounded-2xl border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Nájsť najlacnejšie
                </Button>
                <Button
                  onClick={() => onPlanMeal(recipe)}
                  className="flex-1 bg-[#df2935] hover:bg-[#c41e2a] text-white rounded-2xl"
                >
                  Pridať do plánu
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}