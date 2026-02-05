import React from 'react';
import { MenuItem, MenuCategory } from '@/types/restaurant';
import { useRestaurant } from '@/context/RestaurantContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const { addToCart } = useRestaurant();

  const handleAddToCart = () => {
    addToCart(item, 1);
    toast.success(`${item.name} added to cart`);
  };

  return (
    <div className="group glass-card rounded-xl overflow-hidden hover:shadow-elevated transition-all duration-300 animate-fade-in">
      {item.image ? (
        <div className="h-40 bg-muted overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="h-40 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
          <span className="text-4xl opacity-50">🍽️</span>
        </div>
      )}
      
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-foreground leading-tight">
            {item.name}
          </h3>
          <span className="font-body font-bold text-primary whitespace-nowrap">
            ${item.price}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex flex-wrap gap-1.5">
          {item.tags?.map(tag => (
            <Badge key={tag} variant="tag">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-muted-foreground">
            ~{item.preparationTime} min
          </span>
          <Button 
            onClick={handleAddToCart}
            size="sm"
            className="gap-1.5"
            disabled={!item.available}
          >
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
