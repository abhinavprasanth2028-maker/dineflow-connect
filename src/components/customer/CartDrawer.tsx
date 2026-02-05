import React from 'react';
import { useRestaurant } from '@/context/RestaurantContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onCheckout }) => {
  const { cart, cartTotal, updateCartItemQuantity, removeFromCart, clearCart } = useRestaurant();

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="font-display text-xl font-semibold">Your Order</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-1">
                Add items from the menu to get started
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div 
                key={item.menuItem.id}
                className="flex gap-4 p-4 bg-muted/50 rounded-xl animate-fade-in"
              >
                <div className="flex-1 space-y-1">
                  <h4 className="font-medium text-foreground">
                    {item.menuItem.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    ${item.menuItem.price} each
                  </p>
                  {item.notes && (
                    <p className="text-xs text-muted-foreground italic">
                      Note: {item.notes}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-end justify-between">
                  <span className="font-semibold text-primary">
                    ${(item.menuItem.price * item.quantity).toFixed(2)}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={() => updateCartItemQuantity(item.menuItem.id, item.quantity - 1)}
                    >
                      {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={() => updateCartItemQuantity(item.menuItem.id, item.quantity + 1)}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex items-center justify-between text-lg">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-display font-bold text-foreground">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            
            <Button 
              variant="hero"
              size="lg"
              className="w-full"
              onClick={onCheckout}
            >
              Place Order
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-muted-foreground"
              onClick={clearCart}
            >
              Clear cart
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
