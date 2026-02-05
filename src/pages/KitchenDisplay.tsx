import React, { useMemo } from 'react';
import { useRestaurant } from '@/context/RestaurantContext';
import KitchenOrderCard from '@/components/kitchen/KitchenOrderCard';
import { ChefHat, Clock, CheckCircle, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

const KitchenDisplay: React.FC = () => {
  const { orders } = useRestaurant();

  const { pendingOrders, preparingOrders, readyOrders } = useMemo(() => {
    const activeOrders = orders.filter(o => o.status !== 'delivered');
    return {
      pendingOrders: activeOrders.filter(o => o.status === 'pending').sort((a, b) => {
        // Priority orders first, then by time
        if (a.priority && !b.priority) return -1;
        if (!a.priority && b.priority) return 1;
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }),
      preparingOrders: activeOrders.filter(o => o.status === 'preparing'),
      readyOrders: activeOrders.filter(o => o.status === 'ready'),
    };
  }, [orders]);

  const columns = [
    {
      title: 'Pending',
      icon: <Clock className="w-5 h-5" />,
      orders: pendingOrders,
      bgClass: 'bg-warning/5',
      borderClass: 'border-warning/30',
      iconClass: 'text-warning',
    },
    {
      title: 'Preparing',
      icon: <Flame className="w-5 h-5" />,
      orders: preparingOrders,
      bgClass: 'bg-info/5',
      borderClass: 'border-info/30',
      iconClass: 'text-info',
    },
    {
      title: 'Ready',
      icon: <CheckCircle className="w-5 h-5" />,
      orders: readyOrders,
      bgClass: 'bg-success/5',
      borderClass: 'border-success/30',
      iconClass: 'text-success',
    },
  ];

  return (
    <div className="min-h-screen bg-sidebar text-sidebar-foreground">
      {/* Header */}
      <header className="bg-sidebar-accent border-b border-sidebar-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">Kitchen Display</h1>
              <p className="text-sm text-sidebar-foreground/60">
                {pendingOrders.length + preparingOrders.length} active orders
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {columns.map((col) => (
              <div 
                key={col.title}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sidebar-accent"
              >
                <span className={cn("font-bold text-xl", col.iconClass)}>
                  {col.orders.length}
                </span>
                <span className="text-sm text-sidebar-foreground/60">
                  {col.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Order Columns */}
      <div className="grid grid-cols-3 gap-6 p-6 h-[calc(100vh-88px)]">
        {columns.map((column) => (
          <div 
            key={column.title}
            className={cn(
              "rounded-2xl border-2 overflow-hidden flex flex-col",
              column.bgClass,
              column.borderClass
            )}
          >
            {/* Column Header */}
            <div className="px-4 py-3 border-b border-sidebar-border flex items-center gap-2">
              <span className={column.iconClass}>{column.icon}</span>
              <h2 className="font-display font-semibold text-lg">{column.title}</h2>
              <span className="ml-auto text-sm text-sidebar-foreground/60">
                {column.orders.length} orders
              </span>
            </div>

            {/* Order List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {column.orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-sidebar-foreground/40">
                  {column.icon}
                  <p className="mt-2 text-sm">No orders</p>
                </div>
              ) : (
                column.orders.map((order) => (
                  <KitchenOrderCard key={order.id} order={order} />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KitchenDisplay;
