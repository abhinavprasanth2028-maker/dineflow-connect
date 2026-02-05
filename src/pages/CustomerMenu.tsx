import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useRestaurant } from '@/context/RestaurantContext';
import { MenuCategory } from '@/types/restaurant';
import MenuItemCard from '@/components/customer/MenuItemCard';
import CategoryTabs from '@/components/customer/CategoryTabs';
import CartDrawer from '@/components/customer/CartDrawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Utensils } from 'lucide-react';
import { toast } from 'sonner';

const CustomerMenu: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tableId = searchParams.get('table') || 'table-1';
  
  const { menuItems, cart, cartTotal, getTableById, createOrder, clearCart, setCurrentTableId } = useRestaurant();
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const table = getTableById(tableId);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Set current table on mount
  React.useEffect(() => {
    setCurrentTableId(tableId);
  }, [tableId, setCurrentTableId]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return menuItems.filter(item => item.available);
    return menuItems.filter(item => item.category === activeCategory && item.available);
  }, [menuItems, activeCategory]);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    createOrder(tableId, cart);
    clearCart();
    setIsCartOpen(false);
    toast.success('Order placed successfully!', {
      description: 'Your order has been sent to the kitchen.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <Utensils className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-xl font-bold text-foreground">DineFlow</h1>
                <p className="text-xs text-muted-foreground">
                  Table {table?.number || '?'} · {table?.section}
                </p>
              </div>
            </div>

            <Button
              variant="glass"
              size="icon"
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <div className="sticky top-[73px] z-20 bg-background/80 backdrop-blur-md py-3 px-4 border-b border-border/50">
        <div className="max-w-4xl mx-auto">
          <CategoryTabs 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </div>

      {/* Menu Grid */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No items available in this category</p>
          </div>
        )}
      </main>

      {/* Floating Cart Button (Mobile) */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-6 left-4 right-4 md:hidden z-30">
          <Button
            variant="hero"
            size="lg"
            className="w-full justify-between py-6"
            onClick={() => setIsCartOpen(true)}
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <span>{cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}</span>
            </div>
            <span className="font-bold">${cartTotal.toFixed(2)}</span>
          </Button>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default CustomerMenu;
