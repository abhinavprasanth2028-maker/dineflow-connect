import React from 'react';
import { Table as TableType } from '@/types/restaurant';
import { useRestaurant } from '@/context/RestaurantContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Clock, CheckCircle, AlertCircle, Timer, UtensilsCrossed } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface TableCardProps {
  table: TableType;
}

const statusConfig = {
  available: { 
    icon: <CheckCircle className="w-4 h-4" />, 
    label: 'Available',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  occupied: { 
    icon: <UtensilsCrossed className="w-4 h-4" />, 
    label: 'Occupied',
    color: 'text-info',
    bgColor: 'bg-info/10',
  },
  'needs-attention': { 
    icon: <AlertCircle className="w-4 h-4" />, 
    label: 'Needs Attention',
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
  },
  reserved: { 
    icon: <Timer className="w-4 h-4" />, 
    label: 'Reserved',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
};

const TableCard: React.FC<TableCardProps> = ({ table }) => {
  const { getOrderByTable, updateOrderStatus, updateTableStatus } = useRestaurant();
  const order = getOrderByTable(table.id);
  const config = statusConfig[table.status];

  const handleMarkDelivered = () => {
    if (order) {
      updateOrderStatus(order.id, 'delivered');
      updateTableStatus(table.id, 'available');
    }
  };

  const handleAcknowledge = () => {
    if (table.status === 'needs-attention') {
      updateTableStatus(table.id, 'occupied');
    }
  };

  return (
    <div 
      className={cn(
        "glass-card rounded-xl overflow-hidden transition-all duration-300 animate-fade-in",
        table.status === 'needs-attention' && "ring-2 ring-destructive pulse-dot"
      )}
    >
      {/* Header */}
      <div className={cn("px-4 py-3 flex items-center justify-between", config.bgColor)}>
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl font-bold">
            {table.number}
          </span>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span className="text-sm">{table.capacity}</span>
          </div>
        </div>
        
        <Badge 
          variant="outline" 
          className={cn("gap-1", config.color)}
        >
          {config.icon}
          {config.label}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4 min-h-[120px]">
        {order ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant={order.status as 'pending' | 'preparing' | 'ready'}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(order.createdAt, { addSuffix: true })}
              </span>
            </div>
            
            <div className="space-y-1.5">
              {order.items.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{item.quantity}×</span>
                  <span className="truncate">{item.menuItem.name}</span>
                </div>
              ))}
              {order.items.length > 3 && (
                <p className="text-xs text-muted-foreground">
                  +{order.items.length - 3} more items
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-semibold text-primary">
                ${order.totalAmount.toFixed(2)}
              </span>
              {order.status === 'ready' && (
                <Button size="sm" variant="success" onClick={handleMarkDelivered}>
                  Mark Delivered
                </Button>
              )}
            </div>
          </div>
        ) : table.status === 'needs-attention' ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <AlertCircle className="w-8 h-8 text-destructive" />
            <p className="text-sm text-muted-foreground">Assistance requested</p>
            <Button size="sm" variant="outline" onClick={handleAcknowledge}>
              Acknowledge
            </Button>
          </div>
        ) : table.status === 'reserved' ? (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <Timer className="w-8 h-8 text-warning" />
            <p className="text-sm text-muted-foreground">Reserved for tonight</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground/50">
            <UtensilsCrossed className="w-8 h-8" />
            <p className="text-sm">Ready for guests</p>
          </div>
        )}
      </div>

      {/* Footer - Section indicator */}
      <div className="px-4 py-2 border-t border-border bg-muted/30">
        <p className="text-xs text-muted-foreground">
          Section: {table.section}
        </p>
      </div>
    </div>
  );
};

export default TableCard;
