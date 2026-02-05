import React from 'react';
import { Order, OrderStatus } from '@/types/restaurant';
import { useRestaurant } from '@/context/RestaurantContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, ChefHat, CheckCircle, AlertTriangle, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface KitchenOrderCardProps {
  order: Order;
}

const statusConfig: Record<OrderStatus, { icon: React.ReactNode; label: string; nextStatus: OrderStatus | null; nextLabel: string | null }> = {
  pending: { 
    icon: <Clock className="w-4 h-4" />, 
    label: 'Pending', 
    nextStatus: 'preparing',
    nextLabel: 'Start Preparing'
  },
  preparing: { 
    icon: <ChefHat className="w-4 h-4" />, 
    label: 'Preparing', 
    nextStatus: 'ready',
    nextLabel: 'Mark Ready'
  },
  ready: { 
    icon: <CheckCircle className="w-4 h-4" />, 
    label: 'Ready', 
    nextStatus: null,
    nextLabel: null
  },
  delivered: { 
    icon: <CheckCircle className="w-4 h-4" />, 
    label: 'Delivered', 
    nextStatus: null,
    nextLabel: null
  },
};

const KitchenOrderCard: React.FC<KitchenOrderCardProps> = ({ order }) => {
  const { updateOrderStatus, getTableById } = useRestaurant();
  const table = getTableById(order.tableId);
  const config = statusConfig[order.status];

  const handleStatusUpdate = () => {
    if (config.nextStatus) {
      updateOrderStatus(order.id, config.nextStatus);
    }
  };

  const timeAgo = formatDistanceToNow(order.createdAt, { addSuffix: true });

  return (
    <div 
      className={cn(
        "glass-card rounded-xl overflow-hidden animate-slide-in-up",
        order.priority && "ring-2 ring-destructive"
      )}
    >
      {/* Header */}
      <div className={cn(
        "px-4 py-3 flex items-center justify-between",
        order.status === 'pending' && "bg-warning/10",
        order.status === 'preparing' && "bg-info/10",
        order.status === 'ready' && "bg-success/10",
      )}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="font-display font-bold text-lg">
              Table {table?.number}
            </span>
          </div>
          {order.priority && (
            <Badge variant="destructive" className="gap-1">
              <AlertTriangle className="w-3 h-3" />
              Priority
            </Badge>
          )}
        </div>
        
        <Badge variant={order.status as 'pending' | 'preparing' | 'ready'}>
          {config.icon}
          <span className="ml-1">{config.label}</span>
        </Badge>
      </div>

      {/* Order Items */}
      <div className="p-4 space-y-3">
        {order.items.map((item, index) => (
          <div 
            key={`${item.menuItem.id}-${index}`}
            className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
          >
            <span className="w-6 h-6 flex items-center justify-center bg-primary text-primary-foreground text-sm font-bold rounded-full shrink-0">
              {item.quantity}
            </span>
            <div className="flex-1">
              <p className="font-medium text-foreground">{item.menuItem.name}</p>
              {item.notes && (
                <p className="text-sm text-muted-foreground mt-1 italic">
                  Note: {item.notes}
                </p>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              ~{item.menuItem.preparationTime}m
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{timeAgo}</span>
          {order.estimatedTime && order.status !== 'ready' && (
            <>
              <span>·</span>
              <span>Est. {order.estimatedTime}min</span>
            </>
          )}
        </div>
        
        {config.nextStatus && (
          <Button
            onClick={handleStatusUpdate}
            variant={order.status === 'pending' ? 'warning' : 'success'}
            size="sm"
          >
            {config.nextLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default KitchenOrderCard;
