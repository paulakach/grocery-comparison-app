import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Header } from "../components/Header";
import { DealsSection } from "../components/DealsSection";
import { BudgetOverview } from "../components/BudgetOverview";
import { CartSection } from "../components/CartSection";
import { NearbyStores } from "../components/NearbyStores";
import { QuickActions } from "../components/QuickActions";
import { RecipeFeed } from "../components/RecipeFeed";
import { WeeklyMealPlan } from "../components/WeeklyMealPlan";
import { RecipeIngredients } from "../components/RecipeIngredients";
import { ProductSearch } from "../components/ProductSearch";
import { StoreDiscounts } from "../components/StoreDiscounts";
import { FridgeIngredients } from "../components/FridgeIngredients";
import { PriceComparison } from "../components/PriceComparison";
import { BudgetManager } from "../components/BudgetManager";
import { GroceryList } from "../components/GroceryList";

// Mock data
const mockDeals = [
  {
    id: "1",
    name: "Fresh Organic Apples",
    store: "Tesco",
    originalPrice: 2.69,
    salePrice: 1.59,
    category: "Fruits",
  },
  {
    id: "2",
    name: "Kaufland Rice 1kg",
    store: "Kaufland",
    originalPrice: 3.49,
    salePrice: 2.14,
    category: "Pantry",
  },
  {
    id: "3",
    name: "Greek Yogurt 500g",
    store: "Lidl",
    originalPrice: 1.89,
    salePrice: 1.29,
    category: "Dairy",
  },
  {
    id: "4",
    name: "Whole Wheat Bread",
    store: "Billa",
    originalPrice: 2.99,
    salePrice: 1.99,
    category: "Bakery",
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Bio banány",
      store: "Tesco",
      price: 1.68,
      quantity: 2,
    },
    {
      id: "2",
      name: "Grécky jogurt",
      store: "Lidl",
      price: 1.49,
      quantity: 1,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showRecipeIngredients, setShowRecipeIngredients] =
    useState(false);
  const [selectedRecipe, setSelectedRecipe] =
    useState<string>("");
  const [selectedStore, setSelectedStore] =
    useState<string>("");
  const [showStoreDiscounts, setShowStoreDiscounts] =
    useState(false);

  const handleAddToCart = (deal: any) => {
    const existingItem = cartItems.find(
      (item) => item.id === deal.id,
    );
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === deal.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          id: deal.id,
          name: deal.name,
          store: deal.store,
          price: deal.salePrice,
          quantity: 1,
        },
      ]);
    }
  };

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const handleRecipeSelect = (recipe: any) => {
    setSelectedRecipe(recipe.title);
    setShowRecipeIngredients(true);
  };

  const handleBackFromIngredients = () => {
    setShowRecipeIngredients(false);
    setSelectedRecipe("");
  };

  const handlePlanMeal = (recipe: any) => {
    console.log("Planning meal:", recipe.title);
    setActiveTab("recipes"); // Switch to recipes tab to show meal planning
  };

  const handleAddIngredientToCart = (
    ingredient: any,
    store: string,
  ) => {
    const newItem = {
      id: `${ingredient.name}-${store}`,
      name: ingredient.name,
      store: store,
      price:
        ingredient.prices.find((p: any) => p.store === store)
          ?.price || 0,
      quantity: 1,
    };

    const existingItem = cartItems.find(
      (item) => item.id === newItem.id,
    );
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCartItems([...cartItems, newItem]);
    }
  };

  const handleStoreSelect = (store: string) => {
    setSelectedStore(store);
    setShowStoreDiscounts(true);
  };

  const handleBackFromStoreDiscounts = () => {
    setShowStoreDiscounts(false);
    setSelectedStore("");
  };

  const renderContent = () => {
    // Show store discounts if selected
    if (showStoreDiscounts && selectedStore) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <StoreDiscounts
            storeName={selectedStore}
            onBack={handleBackFromStoreDiscounts}
            onAddToCart={(product) =>
              handleAddToCart({
                id: product.id,
                name: product.name,
                store: selectedStore,
                salePrice: product.discountPrice,
                category: product.category,
              })
            }
          />
        </div>
      );
    }

    // Show recipe ingredients if selected
    if (showRecipeIngredients && selectedRecipe) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <RecipeIngredients
            recipeName={selectedRecipe}
            onBack={handleBackFromIngredients}
            onAddToCart={handleAddIngredientToCart}
          />
        </div>
      );
    }
    switch (activeTab) {
      case "home":
        return (
          <div className="bg-gray-50/30 min-h-screen">
            {/* Hero Section */}
            <div className="bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                      Ahoj, Paula!
                    </h1>
                    <p className="text-gray-600 mt-1">
                      Vitajte späť
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  <DealsSection
                    deals={mockDeals}
                    onAddToCart={handleAddToCart}
                  />

                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Populárne recepty
                      </h2>
                      <button
                        onClick={() => setActiveTab("recipes")}
                        className="text-[#df2935] font-medium hover:underline"
                      >
                        Zobraziť všetky
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        onClick={() =>
                          handleRecipeSelect({
                            title: "Avokádový toast s vajíčkom",
                          })
                        }
                        className="bg-gray-50 rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <div className="h-32 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                          <span className="text-4xl">🥑</span>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-gray-900 mb-1">
                            Avokádový toast
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            10 min • €3.20
                          </p>
                          <p className="text-sm text-[#df2935] font-medium">
                            127 ❤️
                          </p>
                        </div>
                      </div>
                      <div
                        onClick={() =>
                          handleRecipeSelect({
                            title: "Cestoviny s paradajkami",
                          })
                        }
                        className="bg-gray-50 rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <div className="h-32 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                          <span className="text-4xl">🍝</span>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-gray-900 mb-1">
                            Cestoviny s paradajkami
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            25 min • €4.50
                          </p>
                          <p className="text-sm text-[#df2935] font-medium">
                            89 ❤️
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <QuickActions
                    onAction={(actionId) =>
                      console.log("Quick action:", actionId)
                    }
                  />
                  <NearbyStores
                    onStoreSelect={handleStoreSelect}
                  />
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <CartSection
                    items={cartItems}
                    onViewCart={() => setActiveTab("cart")}
                    title="Nákupný zoznam"
                    simplified={true}
                  />
                  <BudgetOverview
                    spent={100}
                    budget={250}
                    onUpdate={() => setActiveTab("profile")}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case "recipes":
        return (
          <div className="bg-gray-50/30 min-h-screen">
            <div className="bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                      Ahoj, Paula!
                    </h1>
                    <p className="text-gray-600 mt-1">
                      Čo si dnes uvaríme?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
              <FridgeIngredients
                onRecipeSelect={handleRecipeSelect}
                onGenerateRecipe={(ingredients) =>
                  console.log(
                    "Generate recipes with:",
                    ingredients,
                  )
                }
              />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <RecipeFeed
                    onRecipeSelect={handleRecipeSelect}
                    onPlanMeal={handlePlanMeal}
                  />
                </div>
                <div>
                  <WeeklyMealPlan
                    onAddMeal={(day, mealType) =>
                      console.log("Add meal:", day, mealType)
                    }
                    onGenerateShoppingList={(ingredients) =>
                      console.log(
                        "Generate shopping list:",
                        ingredients,
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case "search":
        return (
          <div className="bg-gray-50/30 min-h-screen">
            <div className="bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                      Ahoj, Paula!
                    </h1>
                    <p className="text-gray-600 mt-1">
                      Čo dnes hľadáš?
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Search Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Vyhľadať produkty
                  </h2>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Zadajte názov produktu..."
                      value={searchQuery}
                      onChange={(e) =>
                        setSearchQuery(e.target.value)
                      }
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#df2935] focus:outline-none"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Store Discounts Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Zľavy v obchodoch
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleStoreSelect("Tesco")}
                      className="flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl hover:shadow-md transition-all duration-200 hover:scale-105"
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <span className="text-white font-bold">
                            T
                          </span>
                        </div>
                        <p className="font-semibold text-blue-900">
                          Tesco
                        </p>
                        <p className="text-xs text-blue-700">
                          Zobraziť zľavy
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleStoreSelect("Lidl")}
                      className="flex items-center justify-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl hover:shadow-md transition-all duration-200 hover:scale-105"
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <span className="text-white font-bold">
                            L
                          </span>
                        </div>
                        <p className="font-semibold text-yellow-900">
                          Lidl
                        </p>
                        <p className="text-xs text-yellow-700">
                          Zobraziť zľavy
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() =>
                        handleStoreSelect("Kaufland")
                      }
                      className="flex items-center justify-center p-4 bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl hover:shadow-md transition-all duration-200 hover:scale-105"
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <span className="text-white font-bold">
                            K
                          </span>
                        </div>
                        <p className="font-semibold text-red-900">
                          Kaufland
                        </p>
                        <p className="text-xs text-red-700">
                          Zobraziť zľavy
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleStoreSelect("Billa")}
                      className="flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl hover:shadow-md transition-all duration-200 hover:scale-105"
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                          <span className="text-white font-bold">
                            B
                          </span>
                        </div>
                        <p className="font-semibold text-green-900">
                          Billa
                        </p>
                        <p className="text-xs text-green-700">
                          Zobraziť zľavy
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Show search results if there's a search query */}
              {searchQuery && (
                <div className="mt-8">
                  <ProductSearch
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedStore={selectedStore}
                    onProductSelect={(product) =>
                      console.log("Product selected:", product)
                    }
                    onAddToCart={(product, store) =>
                      handleAddToCart({
                        id: product.id,
                        name: product.name,
                        store: store,
                        salePrice:
                          product.prices.find(
                            (p) => p.store === store,
                          )?.price || 0,
                        category: product.category,
                      })
                    }
                    hideHeader={true}
                  />
                </div>
              )}
            </div>
          </div>
        );
      case "cart":
        return (
          <div className="bg-gray-50/30 min-h-screen">
            <div className="bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                      Nákupný zoznam
                    </h1>
                    <p className="text-gray-600 mt-1">
                      Spravujte svoj nákupný zoznam
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <GroceryList />
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="bg-gray-50/30 min-h-screen">
            <div className="bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                      Rozpočet
                    </h1>
                    <p className="text-gray-600 mt-1">
                      Sledujte svoje výdavky
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <BudgetManager />
            </div>
          </div>
        );
      case "favorites":
        return (
          <div className="bg-gray-50/30 min-h-screen">
            <div className="bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                      Obľúbené recepty
                    </h1>
                    <p className="text-gray-600 mt-1">
                      Vaše najobľúbenejšie recepty
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <p className="text-gray-600 text-lg">
                    Zatiaľ nemáte žiadne obľúbené recepty.
                  </p>
                  <p className="text-gray-500 mt-2">
                    Prehliadajte recepty a pridajte si ich medzi
                    obľúbené!
                  </p>
                  <button
                    onClick={() => setActiveTab("recipes")}
                    className="mt-6 px-6 py-3 bg-[#df2935] text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Prehliadnuť recepty
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cartCount={cartCount}
      />
      <main className="pt-16 md:pt-20">{renderContent()}</main>
    </div>
  );
}