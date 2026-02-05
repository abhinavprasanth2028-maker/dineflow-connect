import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { MenuItem, Order, Table, Alert, CartItem, OrderStatus, DailyStats } from '@/types/restaurant';
import { mockMenuItems, mockOrders, mockTables, mockAlerts, mockDailyStats, generateId } from '@/data/mockData';

interface RestaurantContextType {
  // Menu
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;

  // Orders
  orders: Order[];
  createOrder: (tableId: string, items: CartItem[]) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrdersByStatus: (status: OrderStatus) => Order[];
  getOrderByTable: (tableId: string) => Order | undefined;

  // Tables
  tables: Table[];
  updateTableStatus: (tableId: string, status: Table['status']) => void;
  getTableById: (tableId: string) => Table | undefined;

  // Cart (for customer interface)
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, notes?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;

  // Current Table (for customer session)
  currentTableId: string | null;
  setCurrentTableId: (tableId: string | null) => void;

  // Alerts
  alerts: Alert[];
  acknowledgeAlert: (alertId: string) => void;
  createAlert: (type: Alert['type'], tableId: string, message: string) => void;

  // Stats
  dailyStats: DailyStats;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [tables, setTables] = useState<Table[]>(mockTables);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentTableId, setCurrentTableId] = useState<string | null>(null);
  const [dailyStats] = useState<DailyStats>(mockDailyStats);

  // Menu operations
  const addMenuItem = useCallback((item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = { ...item, id: generateId('menu') };
    setMenuItems(prev => [...prev, newItem]);
  }, []);

  const updateMenuItem = useCallback((id: string, updates: Partial<MenuItem>) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  }, []);

  const deleteMenuItem = useCallback((id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  }, []);

  // Order operations
  const createOrder = useCallback((tableId: string, items: CartItem[]): Order => {
    const totalAmount = items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
    const maxPrepTime = Math.max(...items.map(item => item.menuItem.preparationTime));
    
    const newOrder: Order = {
      id: generateId('order'),
      tableId,
      items,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      totalAmount,
      priority: false,
      estimatedTime: maxPrepTime + 5,
    };

    setOrders(prev => [...prev, newOrder]);
    setTables(prev => prev.map(table =>
      table.id === tableId ? { ...table, status: 'occupied', currentOrderId: newOrder.id } : table
    ));

    // Create alert for new order
    createAlert('new-order', tableId, `New order from Table ${tables.find(t => t.id === tableId)?.number}`);

    return newOrder;
  }, [tables]);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const updatedOrder = { ...order, status, updatedAt: new Date() };
        
        // Create appropriate alert
        if (status === 'ready') {
          const table = tables.find(t => t.id === order.tableId);
          createAlert('order-ready', order.tableId, `Order ready for Table ${table?.number}`);
        }
        
        if (status === 'delivered') {
          setTables(prev => prev.map(table =>
            table.id === order.tableId ? { ...table, currentOrderId: undefined } : table
          ));
        }
        
        return updatedOrder;
      }
      return order;
    }));
  }, [tables]);

  const getOrdersByStatus = useCallback((status: OrderStatus) => {
    return orders.filter(order => order.status === status);
  }, [orders]);

  const getOrderByTable = useCallback((tableId: string) => {
    return orders.find(order => order.tableId === tableId && order.status !== 'delivered');
  }, [orders]);

  // Table operations
  const updateTableStatus = useCallback((tableId: string, status: Table['status']) => {
    setTables(prev => prev.map(table =>
      table.id === tableId ? { ...table, status } : table
    ));
  }, []);

  const getTableById = useCallback((tableId: string) => {
    return tables.find(table => table.id === tableId);
  }, [tables]);

  // Cart operations
  const addToCart = useCallback((item: MenuItem, quantity = 1, notes?: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(cartItem => cartItem.menuItem.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { menuItem: item, quantity, notes }];
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart(prev => prev.filter(item => item.menuItem.id !== itemId));
  }, []);

  const updateCartItemQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.menuItem.id === itemId ? { ...item, quantity } : item
    ));
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);

  // Alert operations
  const acknowledgeAlert = useCallback((alertId: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  }, []);

  const createAlert = useCallback((type: Alert['type'], tableId: string, message: string) => {
    const newAlert: Alert = {
      id: generateId('alert'),
      type,
      tableId,
      message,
      timestamp: new Date(),
      acknowledged: false,
    };
    setAlerts(prev => [newAlert, ...prev]);
  }, []);

  const value: RestaurantContextType = {
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    orders,
    createOrder,
    updateOrderStatus,
    getOrdersByStatus,
    getOrderByTable,
    tables,
    updateTableStatus,
    getTableById,
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    cartTotal,
    currentTableId,
    setCurrentTableId,
    alerts,
    acknowledgeAlert,
    createAlert,
    dailyStats,
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = (): RestaurantContextType => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
