import React from 'react';
import { MenuCategory } from '@/types/restaurant';
import { cn } from '@/lib/utils';
import { UtensilsCrossed, Salad, Cake, Wine, Sparkles } from 'lucide-react';

interface CategoryTabsProps {
  activeCategory: MenuCategory | 'all';
  onCategoryChange: (category: MenuCategory | 'all') => void;
}

const categories: { id: MenuCategory | 'all'; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All', icon: <UtensilsCrossed className="w-4 h-4" /> },
  { id: 'appetizers', label: 'Starters', icon: <Salad className="w-4 h-4" /> },
  { id: 'mains', label: 'Mains', icon: <UtensilsCrossed className="w-4 h-4" /> },
  { id: 'desserts', label: 'Desserts', icon: <Cake className="w-4 h-4" /> },
  { id: 'beverages', label: 'Drinks', icon: <Wine className="w-4 h-4" /> },
  { id: 'specials', label: 'Specials', icon: <Sparkles className="w-4 h-4" /> },
];

const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 p-1 min-w-max">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
              activeCategory === category.id
                ? "bg-primary text-primary-foreground shadow-soft"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
          >
            {category.icon}
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
